
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo/logo-erinia.png";
import "./Register.css";
import {
  registerUser,
  type RegistrationPayload,
} from "../../services/authApi";

type RegistrationErrors = Partial<Record<keyof RegistrationPayload, string>>;

const initialData: RegistrationPayload = {
  fullName: "",
  email: "",
  whatsapp: "",
  username: "",
  password: "",
};

interface SuccessModalData {
  playerName: string;
  officialLogin: string;
  officialPassword: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const usernameRegex = /^[a-zA-Z0-9._-]{4,20}$/;
const phoneRegex = /^[0-9+\-()\s]{8,20}$/;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationPayload>(initialData);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successModal, setSuccessModal] = useState<SuccessModalData | null>(null);

  const handleChange = (field: keyof RegistrationPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): RegistrationErrors => {
    const validationErrors: RegistrationErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      validationErrors.fullName = "Informe seu nome completo (mínimo 3 caracteres).";
    }

    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Use um e-mail válido.";
    }

    if (!usernameRegex.test(formData.username)) {
      validationErrors.username =
        "Usuário deve conter 4-20 caracteres (letras, números, ., -, _).";
    }

    if (formData.whatsapp && !phoneRegex.test(formData.whatsapp)) {
      validationErrors.whatsapp = "Informe apenas números e símbolos comuns.";
    }

    if (formData.password.length < 8) {
      validationErrors.password = "Senha deve ter ao menos 8 caracteres.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ loading: false, success: "", error: "Corrija os campos destacados." });
      return;
    }

    try {
      const response = await registerUser(formData);
      setStatus({ loading: false, success: "", error: "" });
      setFormData(initialData);
      // Show success modal with official credentials
      setSuccessModal({
        playerName: response.playerName || formData.fullName,
        officialLogin: response.officialLogin || formData.username,
        officialPassword: response.officialPassword || formData.password,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido.";
      setStatus({ loading: false, success: "", error: message });
    }
  };
const [redirectCountdown] = useState(5);

  return (
    <section className="auth-page">
      <div className="auth-background" />

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-card">
          <div className="auth-content">
            <div className="auth-logo-section">
              <motion.img
                src={logo}
                alt="Erinia Logo"
                className="auth-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <div className="auth-logo-text">
                <h2 className="auth-game-title">ERINIA</h2>
                <p className="auth-game-subtitle">Comece sua aventura</p>
              </div>
            </div>

            <div className="auth-form-section">
              <div className="auth-header">
                <h1 className="auth-title">CRIAR CONTA</h1>
                <p className="auth-subtitle">
                  Somente os campos aceitos pelo formulário oficial são exibidos.
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="auth-input"
                    value={formData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                    required
                  />
                  {errors.fullName && <span className="input-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="auth-input"
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    required
                  />
                  {errors.email && <span className="input-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="WhatsApp (opcional)"
                    className="auth-input"
                    value={formData.whatsapp}
                    onChange={(event) => handleChange("whatsapp", event.target.value)}
                  />
                  <span className="helper-text">Inclua DDD e apenas símbolos comuns.</span>
                  {errors.whatsapp && <span className="input-error">{errors.whatsapp}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nome de usuário"
                    className="auth-input"
                    value={formData.username}
                    onChange={(event) => handleChange("username", event.target.value)}
                    required
                  />
                  {errors.username && <span className="input-error">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      className="auth-input"
                      value={formData.password}
                      onChange={(event) => handleChange("password", event.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ rotate: showPassword ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {showPassword ? (
                          <>
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </>
                        ) : (
                          <>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        )}
                      </motion.svg>
                    </button>
                  </div>
                  {errors.password && <span className="input-error">{errors.password}</span>}
                </div>

                <div className="form-status" aria-live="polite">
                  {status.loading && <span className="status-loading">Automatizando cadastro...</span>}
                  {status.error && <span className="status-error">{status.error}</span>}
                  {status.success && (
                    <span className="status-success">
                      {status.success}
                      {redirectCountdown !== null && (
                        <span className="redirect-hint">
                          {" "}- Redirecionando para o login em {redirectCountdown}s
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="auth-button primary"
                  whileHover={{ scale: status.loading ? 1 : 1.02 }}
                  whileTap={{ scale: status.loading ? 1 : 0.98 }}
                  disabled={status.loading}
                >
                  {status.loading ? <span className="button-spinner" /> : "CRIAR CONTA"}
                </motion.button>
              </form>

              <div className="auth-footer">
                <p>
                  Já tem uma conta?{" "}
                  <Link to="/login" className="auth-link">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal - Rendered via Portal to ensure proper positioning */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {successModal && (
              <>
                <motion.div
                  className="modal-backdrop"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100vw",
                    height: "100vh",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setSuccessModal(null);
                    navigate("/profile");
                  }}
                />
                <motion.div
                  className="success-modal"
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="success-modal-header">
                    <motion.div
                      className="success-icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      ✓
                    </motion.div>
                    <h2 className="success-modal-title">Cadastro Realizado com Sucesso!</h2>
                    <p className="success-modal-subtitle">Suas credenciais oficiais do jogo:</p>
                  </div>

                  <div className="success-modal-content">
                    <div className="credential-item">
                      <span className="credential-label">Nome do Jogador:</span>
                      <span className="credential-value">{successModal.playerName}</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-label">Login Oficial:</span>
                      <span className="credential-value">{successModal.officialLogin}</span>
                    </div>
                    <div className="credential-item">
                      <span className="credential-label">Senha Oficial:</span>
                      <span className="credential-value">{successModal.officialPassword}</span>
                    </div>
                  </div>

                  <div className="success-modal-footer">
                    <motion.button
                      className="success-modal-button"
                      onClick={() => {
                        setSuccessModal(null);
                        navigate("/profile");
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ir para meu Perfil
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
