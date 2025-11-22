import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo-erinia.png";
import "./Login.css";
import {
  loginUser,
  saveSessionToken,
  readSessionToken,
} from "../../services/authApi";

interface LoginErrors {
  username?: string;
  password?: string;
}

const initialData = {
  username: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });
  const [remember, setRemember] = useState(true);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  useEffect(() => {
    const token = readSessionToken();
    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (redirectCountdown === null) return;
    if (redirectCountdown === 0) {
      navigate("/profile");
      return;
    }
    const timer = setTimeout(
      () => setRedirectCountdown((prev) => (prev === null ? null : prev - 1)),
      1000
    );
    return () => clearTimeout(timer);
  }, [redirectCountdown, navigate]);

  const handleChange = (field: keyof typeof initialData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const validationErrors: LoginErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Informe seu usuário ou e-mail.";
    }
    if (!formData.password) {
      validationErrors.password = "Informe sua senha.";
    }
    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ loading: true, success: "", error: "" });
    setRedirectCountdown(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ loading: false, success: "", error: "Corrija os campos destacados." });
      return;
    }

    try {
      const response = await loginUser(formData);
      if (remember) {
        saveSessionToken(response.token);
      } else {
        // Fallback: store even when not remembering so profile works.
        saveSessionToken(response.token);
      }
      setStatus({ loading: false, success: response.message, error: "" });
      setRedirectCountdown(3);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido.";
      setStatus({ loading: false, success: "", error: message });
    }
  };

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
                <p className="auth-game-subtitle">Uma jornada épica espera</p>
              </div>
            </div>

            <div className="auth-form-section">
              <div className="auth-header">
                <h1 className="auth-title">BEM-VINDO</h1>
                <p className="auth-subtitle">Entre na sua aventura</p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Usuário ou E-mail"
                    className="auth-input"
                    value={formData.username}
                    onChange={(event) => handleChange("username", event.target.value)}
                    required
                  />
                  {errors.username && <span className="input-error">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Senha"
                    className="auth-input"
                    value={formData.password}
                    onChange={(event) => handleChange("password", event.target.value)}
                    required
                  />
                  {errors.password && <span className="input-error">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="auth-checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Lembrar-me
                  </label>
                  <span className="forgot-link" aria-live="polite">
                    Segurança reforçada: senha nunca é salva no navegador.
                  </span>
                </div>

                <div className="form-status" aria-live="polite">
                  {status.loading && <span className="status-loading">Validando credenciais...</span>}
                  {status.error && <span className="status-error">{status.error}</span>}
                  {status.success && (
                    <span className="status-success">
                      {status.success}
                      {redirectCountdown !== null && (
                        <span className="redirect-hint">
                          {" "}- Abrindo perfil em {redirectCountdown}s
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
                  {status.loading ? <span className="button-spinner" /> : "ENTRAR"}
                </motion.button>
              </form>

              <div className="auth-footer">
                <p>
                  Não tem uma conta?{" "}
                  <Link to="/register" className="auth-link">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
