import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProfile,
  readSessionToken,
  clearSessionToken,
  revealOfficialPassword,
  logoutUser,
  type ProfileResponse,
} from "../../services/authApi";
import "./Profile.css";

type TabType = "perfil" | "configuracoes" | "tutorial";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileResponse["profile"] | null>(null);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [activeTab, setActiveTab] = useState<TabType>("perfil");
  const [showPassword, setShowPassword] = useState(false);
  const [revealedPassword, setRevealedPassword] = useState<string | null>(null);
  const [revealingPassword, setRevealingPassword] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const token = readSessionToken();
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetchProfile(token);
        setProfile(response.profile);
        setTheme(response.profile.profile.theme);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro ao carregar perfil.";
        setStatus({ loading: false, error: message });
        clearSessionToken();
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleRevealPassword = async () => {
    if (!showPasswordWarning) {
      setShowPasswordWarning(true);
      return;
    }

    const token = readSessionToken();
    if (!token) return;

    setRevealingPassword(true);
    try {
      const response = await revealOfficialPassword(token);
      setRevealedPassword(response.password);
      setShowPassword(true);
    } catch (error) {
      alert("Erro ao revelar senha: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    } finally {
      setRevealingPassword(false);
      setShowPasswordWarning(false);
    }
  };

  const handleLogout = async () => {
    const token = readSessionToken();
    if (token) {
      try {
        await logoutUser(token);
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    clearSessionToken();
    navigate("/", { replace: true });
  };

  const formatDate = (isoDate: string) => {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "medium",
      }).format(new Date(isoDate));
    } catch (_) {
      return isoDate;
    }
  };

  if (status.loading) {
    return (
      <section className="profile-page">
        <div className="auth-background" />
        <div className="profile-loading">
          <div className="button-spinner" />
          <p>Carregando perfil...</p>
        </div>
      </section>
    );
  }

  if (status.error || !profile) {
    return (
      <section className="profile-page">
        <div className="auth-background" />
        <div className="profile-error-container">
          <p className="profile-error">{status.error || "Erro ao carregar perfil"}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="auth-background" />
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-layout">
          {/* Sidebar Navigation */}
          <aside className="profile-sidebar">
            <nav className="profile-nav">
              <button
                className={`profile-nav-item ${activeTab === "perfil" ? "active" : ""}`}
                onClick={() => setActiveTab("perfil")}
              >
                <span>👤</span> Perfil
              </button>
              <button
                className={`profile-nav-item ${activeTab === "configuracoes" ? "active" : ""}`}
                onClick={() => setActiveTab("configuracoes")}
              >
                <span>⚙️</span> Configurações
              </button>
              <button
                className={`profile-nav-item ${activeTab === "tutorial" ? "active" : ""}`}
                onClick={() => setActiveTab("tutorial")}
              >
                <span>📖</span> Tutorial do Jogo
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            <AnimatePresence mode="wait">
              {activeTab === "perfil" && (
                <motion.div
                  key="perfil"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="profile-tab-content"
                >
                  <h2 className="profile-tab-title">Perfil do Jogador</h2>

                  {/* Basic User Panel */}
                  <div className="profile-section">
                    <h3 className="profile-section-title">Informações Básicas</h3>
                    <div className="profile-avatar-section">
                      <div className="profile-avatar">
                        {profile.profile.avatarUrl ? (
                          <img src={profile.profile.avatarUrl} alt="Avatar" />
                        ) : (
                          <span>{profile.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <button className="avatar-upload-btn">📷 Alterar Foto</button>
                    </div>
                    <div className="profile-info-grid">
                      <div className="profile-info-item">
                        <span className="info-label">Nome Completo</span>
                        <span className="info-value">{profile.name}</span>
                      </div>
                      <div className="profile-info-item">
                        <span className="info-label">E-mail</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="profile-info-item">
                        <span className="info-label">Usuário (Site)</span>
                        <span className="info-value">{profile.username}</span>
                      </div>
                      {profile.officialCredentials && (
                        <>
                          <div className="profile-info-item">
                            <span className="info-label">Login Oficial (Jogo)</span>
                            <span className="info-value">{profile.officialCredentials.login}</span>
                          </div>
                          <div className="profile-info-item">
                            <span className="info-label">Senha Oficial (Jogo)</span>
                            <div className="password-reveal-container">
                              {showPassword && revealedPassword ? (
                                <span className="info-value">{revealedPassword}</span>
                              ) : (
                                <span className="info-value password-hidden">••••••••</span>
                              )}
                              <button
                                className="reveal-password-btn"
                                onClick={handleRevealPassword}
                                disabled={revealingPassword}
                              >
                                {revealingPassword ? "..." : showPassword ? "Ocultar" : "Mostrar"}
                              </button>
                            </div>
                            {showPasswordWarning && (
                              <div className="password-warning">
                                <p>⚠️ Atenção: Você está prestes a revelar sua senha oficial.</p>
                                <div className="warning-actions">
                                  <button onClick={handleRevealPassword} className="warning-confirm">
                                    Confirmar
                                  </button>
                                  <button
                                    onClick={() => setShowPasswordWarning(false)}
                                    className="warning-cancel"
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Game Vault */}
                  {profile.officialCredentials && (
                    <div className="profile-section">
                      <h3 className="profile-section-title">Cofre do Jogador</h3>
                      <div className="game-vault">
                        <div className="vault-item">
                          <span className="vault-label">Login Oficial</span>
                          <span className="vault-value">{profile.officialCredentials.login}</span>
                        </div>
                        <div className="vault-item">
                          <span className="vault-label">Senha Oficial</span>
                          <div className="vault-password-container">
                            {showPassword && revealedPassword ? (
                              <span className="vault-value">{revealedPassword}</span>
                            ) : (
                              <span className="vault-value password-hidden">🔒 Criptografada</span>
                            )}
                            <button
                              className="vault-reveal-btn"
                              onClick={handleRevealPassword}
                              disabled={revealingPassword}
                            >
                              {revealingPassword ? "Carregando..." : showPassword ? "Ocultar" : "Revelar Info"}
                            </button>
                          </div>
                          {showPasswordWarning && (
                            <div className="password-warning">
                              <p>⚠️ Atenção: Você está prestes a revelar informações criptografadas.</p>
                              <div className="warning-actions">
                                <button onClick={handleRevealPassword} className="warning-confirm">
                                  Confirmar
                                </button>
                                <button
                                  onClick={() => setShowPasswordWarning(false)}
                                  className="warning-cancel"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="vault-item">
                          <span className="vault-label">Data de Criação</span>
                          <span className="vault-value">
                            {formatDate(profile.officialCredentials.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "configuracoes" && (
                <motion.div
                  key="configuracoes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="profile-tab-content"
                >
                  <h2 className="profile-tab-title">Configurações</h2>
                  <div className="profile-section">
                    <h3 className="profile-section-title">Aparência</h3>
                    <div className="settings-item">
                      <span className="settings-label">Tema</span>
                      <div className="theme-selector">
                        <button
                          className={`theme-option ${theme === "light" ? "active" : ""}`}
                          onClick={() => setTheme("light")}
                        >
                          ☀️ Claro
                        </button>
                        <button
                          className={`theme-option ${theme === "dark" ? "active" : ""}`}
                          onClick={() => setTheme("dark")}
                        >
                          🌙 Escuro
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="profile-section">
                    <h3 className="profile-section-title">Conta</h3>
                    <button className="logout-button" onClick={handleLogout}>
                      Sair da Conta
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "tutorial" && (
                <motion.div
                  key="tutorial"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="profile-tab-content"
                >
                  <h2 className="profile-tab-title">Tutorial do Jogo</h2>
                  <div className="profile-section">
                    <div className="tutorial-content">
                      <h3 className="tutorial-section-title">Guia para Iniciantes</h3>
                      <div className="tutorial-section">
                        <h4>Bem-vindo a Erinia!</h4>
                        <p>
                          Este é o seu guia completo para começar sua jornada no mundo de Erinia.
                          Aqui você encontrará todas as informações necessárias para dominar o jogo.
                        </p>
                      </div>
                      <div className="tutorial-section">
                        <h4>Primeiros Passos</h4>
                        <p>
                          Após criar sua conta, você receberá suas credenciais oficiais do jogo.
                          Use essas credenciais para fazer login no servidor oficial.
                        </p>
                      </div>
                      <div className="tutorial-section">
                        <h4>Dicas Importantes</h4>
                        <ul>
                          <li>Mantenha suas credenciais seguras</li>
                          <li>Explore o mundo e complete missões</li>
                          <li>Interaja com outros jogadores</li>
                          <li>Participe de eventos especiais</li>
                        </ul>
                      </div>
                      {/* Space for future images/GIFs */}
                      <div className="tutorial-media-placeholder">
                        <p>📸 Área para imagens e GIFs do tutorial</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </section>
  );
}
