import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo/logo-erinia.png";
import "./Register.css";

export default function Register() {
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
                <p className="auth-game-subtitle">Comece sua aventura</p>
              </div>
            </div>

            {/* Formulário à direita */}
            <div className="auth-form-section">
              <div className="auth-header">
                <h1 className="auth-title">CRIAR CONTA</h1>
                <p className="auth-subtitle">Junte-se aos heróis</p>
              </div>

              <form className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="auth-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

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
                    type="text"
                    placeholder="Nome de usuário"
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

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirmar senha"
                    className="auth-input"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="auth-checkbox" required />
                    <span className="checkmark"></span>
                    Aceito os termos de uso e politica de privacidade.{" "}
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="auth-button primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CRIAR CONTA
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
                  Cadastrar com Google
                </motion.button>
              </div>

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
    </section>
  );
}
