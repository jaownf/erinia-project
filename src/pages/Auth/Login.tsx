import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo-erinia.png";
import "./Login.css";

export default function Login() {
  return (
    <section className="auth-page">
      {/* Background igual ao da Hero */}
      <div className="auth-background" />
      
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-card">
          <div className="auth-content">
            {/* Logo à esquerda */}
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

            {/* Formulário à direita */}
            <div className="auth-form-section">
              <div className="auth-header">
                <h1 className="auth-title">BEM-VINDO</h1>
                <p className="auth-subtitle">Entre na sua aventura</p>
              </div>

              <form className="auth-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="auth-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Senha"
                    className="auth-input"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="auth-checkbox" />
                    <span className="checkmark"></span>
                    Lembrar-me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Esqueceu a senha?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  className="auth-button primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ENTRAR
                </motion.button>
              </form>

              <div className="auth-divider">
                <span>OU</span>
              </div>

              <div className="social-login">
                <motion.button
                  className="social-button google"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="social-icon">G</span>
                  Continuar com Google
                </motion.button>
              </div>

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
