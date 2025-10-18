import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import logo from "../../assets/logo/logo-erinia.png";

// Cabeçalho fixo com logo, navegação e botão de conta
export default function Header() {
  const menu = [
    { name: "JOGO", path: "/" },
    { name: "BESTIÁRIO", path: "/bestiario" },
    { name: "COMUNIDADE", path: "/comunidade" },
    { name: "LOJA", path: "/loja" }
  ]; 
  const [open, setOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const accountMenuItems = [
    { id: "profile", label: "Perfil", icon: "👤", path: "/perfil" },
    { id: "settings", label: "Configurações", icon: "⚙️", path: "/configuracoes" },
    { id: "customize", label: "Personalizar Perfil", icon: "🎨", path: "/personalizar" },
    { id: "history", label: "Histórico", icon: "📊", path: "/historico" },
    { id: "notifications", label: "Notificações", icon: "🔔", path: "/notificacoes" },
    { id: "logout", label: "Sair", icon: "🚪", action: "logout" }
  ];

  const handleAccountClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.action === "logout") {
      // Lógica de logout
      console.log("Logout");
    } else {
      // Navegação para outras páginas
      console.log("Navigate to:", item.path);
    }
    setShowAccountMenu(false);
  };

  return (
    <motion.header 
      className="site-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="header-inner"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Link to="/" className="logo-link">
          <img src={logo} alt="Erinia logo" className="logo" />
        </Link>
        <button className="hamburger" aria-label="Abrir menu" onClick={() => setOpen(!open)}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.nav 
              className="nav mobile-nav"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setOpen(false)}
            >
              {menu.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NavLink 
                    to={item.path} 
                    className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="nav desktop-nav">
          {menu.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="account-container" ref={accountMenuRef}>
          <motion.button 
            className="account-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAccountClick}
          >
            CONTA
            <span className="account-arrow">▼</span>
          </motion.button>
          
          <AnimatePresence>
            {showAccountMenu && (
              <motion.div
                className="account-menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="account-menu-header">
                  <div className="user-info">
                    <div className="user-avatar">👤</div>
                    <div className="user-details">
                      <span className="user-name">Artemis</span>
                      <span className="user-level">Nível 15</span>
                    </div>
                  </div>
                </div>
                
                <div className="account-menu-items">
                  {accountMenuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className={`menu-item ${item.action === 'logout' ? 'logout-item' : ''}`}
                      onClick={() => handleMenuItemClick(item)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                      {item.path && <span className="menu-arrow">→</span>}
                    </motion.button>
                  ))}
                </div>
                
                <div className="account-menu-footer">
                  <div className="user-stats">
                    <div className="stat">
                      <span className="stat-value">42</span>
                      <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">156</span>
                      <span className="stat-label">Comentários</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">892</span>
                      <span className="stat-label">Curtidas</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.header>
  );
}