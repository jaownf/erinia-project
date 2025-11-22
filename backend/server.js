// Entry point for the automation backend. This server exposes
// registration/login APIs and orchestrates the Playwright automation.
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  submitOfficialRegistration,
  OFFICIAL_REGISTRATION_URL,
} = require("./automation/registerAutomation");
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  readUsers,
} = require("./db/userStore");
const {
  validateRegistrationPayload,
  validateLoginPayload,
} = require("./utils/validators");
const { HttpError } = require("./utils/errors");

// ------------------------
// Basic server configuration
// ------------------------
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

const SESSION_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const activeSessions = new Map(); // token -> { username, issuedAt }

const app = express();

// Enable JSON parsing with a small limit to guard against large payloads
app.use(express.json({ limit: "1mb" }));

// Configure CORS so only explicit frontends can call the backend
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true); // Allow server-to-server scripts / Postman
      }
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// Rate-limit auth-sensitive routes
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Many registration attempts detected. Please try again later.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Wait a few minutes and try again.",
  },
});

// Utility wrapper to avoid repeating try/catch in every async route
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

// Helper function to ensure encryption key is exactly 32 bytes
function getEncryptionKey() {
  const envKey = process.env.ENCRYPTION_KEY;
  if (envKey) {
    // If it's a hex string (64 chars = 32 bytes), use it directly
    if (/^[0-9a-fA-F]{64}$/.test(envKey)) {
      return Buffer.from(envKey, "hex");
    }
    // Otherwise, hash it to get exactly 32 bytes
    return crypto.createHash("sha256").update(envKey).digest();
  }
  // Default: generate a consistent key from a fixed string (for development)
  // In production, always set ENCRYPTION_KEY environment variable
  return crypto.createHash("sha256").update("erinia-default-encryption-key-change-in-production").digest();
}

// Clean expired sessions on each request to avoid unbounded growth
app.use((req, _res, next) => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.issuedAt > SESSION_TTL_MS) {
      activeSessions.delete(token);
    }
  }
  next();
});

// Health endpoint for quick monitoring
app.get("/health", async (_req, res) => {
  const users = await readUsers();
  res.json({
    status: "ok",
    playwrightReady: Boolean(OFFICIAL_REGISTRATION_URL),
    usersStored: users.length,
    activeSessions: activeSessions.size,
  });
});

// ------------------------
// Registration endpoint: validates data, runs automation, persists user
// ------------------------
app.post(
  "/api/register",
  registrationLimiter,
  asyncHandler(async (req, res) => {
    const payload = req.body;
    const { isValid, errors } = validateRegistrationPayload(payload);

    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const existingUsername = await findUserByUsername(payload.username);
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Nome de usuário já está em uso. Escolha outro.",
      });
    }

    const existingEmail = await findUserByEmail(payload.email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "E-mail já cadastrado. Faça login ou use outro e-mail.",
      });
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);

    // Call Playwright automation to submit the official form
    let registrationResult;
    try {
      registrationResult = await submitOfficialRegistration(payload);
    } catch (automationError) {
      if (automationError instanceof HttpError) {
        return res
          .status(automationError.statusCode)
          .json({ success: false, message: automationError.message });
      }
      throw automationError;
    }

    // Encrypt official password before storing
    const algorithm = "aes-256-cbc";
    const secretKey = getEncryptionKey();
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encryptedPassword = cipher.update(registrationResult.officialPassword, "utf8", "hex");
    encryptedPassword += cipher.final("hex");
    const passwordEncrypted = iv.toString("hex") + ":" + encryptedPassword;

    const newUser = {
      id: crypto.randomUUID(),
      name: payload.fullName,
      email: payload.email.toLowerCase(),
      username: payload.username.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
      officialCredentials: {
        login: registrationResult.officialLogin,
        passwordEncrypted,
        createdAt: new Date().toISOString(),
      },
      profile: {
        avatarUrl: "",
        theme: "dark",
      },
    };

    await createUser(newUser);

    return res.status(201).json({
      success: true,
      message: "Cadastro realizado com sucesso!",
      playerName: registrationResult.playerName,
      officialLogin: registrationResult.officialLogin,
      officialPassword: registrationResult.officialPassword,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        createdAt: newUser.createdAt,
      },
    });
  })
);

// ------------------------
// Login endpoint: verify credentials and issue a session token
// ------------------------
app.post(
  "/api/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const payload = req.body;
    const { isValid, errors } = validateLoginPayload(payload);

    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    // Support login with email or username
    let user = await findUserByUsername(payload.username);
    if (!user && payload.username.includes("@")) {
      user = await findUserByEmail(payload.username);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas." });
    }

    const token = crypto.randomUUID();
    activeSessions.set(token, { username: user.username, issuedAt: Date.now() });

    return res.json({
      success: true,
      message: "Login realizado com sucesso.",
      token,
      expiresIn: SESSION_TTL_MS / 1000,
    });
  })
);

// Middleware used by authenticated routes
function authenticateRequest(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Token ausente." });
  }

  const token = authHeader.replace("Bearer", "").trim();
  const session = activeSessions.get(token);
  if (!session) {
    return res.status(401).json({ success: false, message: "Sessão inválida." });
  }

  req.session = { token, username: session.username };
  return next();
}

// Profile endpoint: returns the stored user data for the authenticated session
app.get(
  "/api/profile",
  authenticateRequest,
  asyncHandler(async (req, res) => {
    const user = await findUserByUsername(req.session.username);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado." });
    }

    return res.json({
      success: true,
      profile: {
        id: user.id,
        name: user.name || user.fullName,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        officialCredentials: user.officialCredentials ? {
          login: user.officialCredentials.login,
          createdAt: user.officialCredentials.createdAt,
        } : null,
        profile: user.profile || {
          avatarUrl: "",
          theme: "dark",
        },
      },
    });
  })
);

// Endpoint to reveal encrypted official password
app.post(
  "/api/profile/reveal-password",
  authenticateRequest,
  asyncHandler(async (req, res) => {
    const user = await findUserByUsername(req.session.username);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado." });
    }

    if (!user.officialCredentials || !user.officialCredentials.passwordEncrypted) {
      return res.status(404).json({ success: false, message: "Credenciais oficiais não encontradas." });
    }

    // Decrypt password
    const algorithm = "aes-256-cbc";
    const secretKey = getEncryptionKey();
    const [ivHex, encryptedHex] = user.officialCredentials.passwordEncrypted.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return res.json({
      success: true,
      password: decrypted,
    });
  })
);

// Logout endpoint
app.post(
  "/api/logout",
  authenticateRequest,
  asyncHandler(async (req, res) => {
    const token = req.session.token;
    activeSessions.delete(token);
    return res.json({
      success: true,
      message: "Logout realizado com sucesso.",
    });
  })
);

// Centralized error handler with redacted internal details
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Unhandled error", err);
  res.status(500).json({
    success: false,
    message:
      "Ocorreu um erro inesperado no servidor. Tente novamente e, se o erro persistir, verifique os logs.",
  });
});

app.listen(PORT, () => {
  console.log(`Auth automation server running on port ${PORT}`);
});
