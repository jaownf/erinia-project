import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo/logo-erinia.png";

// Cabeçalho fixo com logo, navegação e botão de conta
export default function Header() {
  const menu = [
    { name: "JOGO", path: "/" },
    { name: "BESTIÁRIO", path: "/bestiario" },
    { name: "COMUNIDADE", path: "/" },
    { name: "LOJA", path: "/" }
  ]; 

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Erinia logo" className="logo" />
      </Link>
      <nav className="nav">
        {menu.map((item) => (
          <Link key={item.name} to={item.path} className="nav-link">
            {item.name}
          </Link>
        ))}
      </nav>
      <button className="account-btn">CONTA</button>
    </header>
  );
}


