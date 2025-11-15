import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import logo from "../../assets/logo/logo-erinia.png";

// Cabeçalho fixo com logo, navegação e botão de conta
export default function Header() {
  const menu = [
    { name: "JOGO", path: "/" },
    { name: "BESTIÁRIO", path: "/bestiario" },
    { name: "HISTÓRIA", path: "/historia" },
    { name: "CADASTRO", path: "/login" },
  ]; 
  const [open, setOpen] = useState(false);

 return (
  <motion.header
    className="site-header"

  >
    <motion.div
      className="header-inner"
    >
      {/* LOGO À ESQUERDA */}
      <Link to="/" className="logo-link">
        <img src={logo} alt="Erinia logo" className="logo" />
      </Link>

      {/* BOTÃO MOBILE */}
      <button
        className="hamburger"
        aria-label="Abrir menu"
        onClick={() => setOpen(!open)}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* BARRA CENTRAL DO MENU (marrom com gradiente) */}
      <div className="nav-bar">
        <nav className="nav desktop-nav">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* SERVER STATUS */}
      <div className="server-status-container">
        <span className="server-status-text">STATUS SERVER:</span>
        <div className="status-indicator">
          <span className="status-dot online"></span>
          <span className="status-text">ONLINE</span>
        </div>
      </div>

      {/* MENU MOBILE (abre sobre tudo) */}
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
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.header>
);
}
