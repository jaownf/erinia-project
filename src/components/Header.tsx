import "./Header.css";
import logo from "../assets/logo/logo-erinia.png";

// Cabeçalho fixo com logo, navegação e botão de conta
export default function Header() {
  const menu = ["JOGO", "BESTIÁRIO", "COMUNIDADE", "LOJA"]; 

  return (
    <header className="site-header">
      <a href="#" className="logo-link">
        <img src={logo} alt="Erinia logo" className="logo" />
      </a>
      <nav className="nav">
        {menu.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
            {item}
          </a>
        ))}
      </nav>
      <button className="account-btn">CONTA</button>
    </header>
  );
}


