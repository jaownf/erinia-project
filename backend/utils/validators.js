const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const usernameRegex = /^[a-zA-Z0-9._-]{4,20}$/;
const phoneRegex = /^[0-9+\-()\s]{8,20}$/;

function sanitize(value = "") {
  return String(value).trim();
}

function validateRegistrationPayload(payload = {}) {
  const errors = {};

  const fullName = sanitize(payload.fullName);
  if (!fullName || fullName.length < 3) {
    errors.fullName = "Informe um nome completo válido (mínimo 3 caracteres).";
  }

  const email = sanitize(payload.email).toLowerCase();
  if (!emailRegex.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  const username = sanitize(payload.username).toLowerCase();
  if (!usernameRegex.test(username)) {
    errors.username =
      "O usuário deve ter 4-20 caracteres e pode conter letras, números, pontos, traços e underlines.";
  }

  const whatsapp = sanitize(payload.whatsapp || "");
  if (whatsapp && !phoneRegex.test(whatsapp)) {
    errors.whatsapp = "Informe um WhatsApp válido (somente números e símbolos comuns).";
  }

  const password = payload.password || "";
  if (password.length < 8) {
    errors.password = "A senha deve ter pelo menos 8 caracteres.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function validateLoginPayload(payload = {}) {
  const errors = {};

  const username = sanitize(payload.username);
  if (!username) {
    errors.username = "Informe seu usuário.";
  }

  const password = payload.password || "";
  if (!password) {
    errors.password = "Informe sua senha.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

module.exports = {
  validateRegistrationPayload,
  validateLoginPayload,
};
