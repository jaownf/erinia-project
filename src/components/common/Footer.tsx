import "./Footer.css";
import whatsapp from "../../assets/footer/social/whatsapp-logo.png";
import facebook from "../../assets/footer/social/facebook-logo.png";
import twitter from "../../assets/footer/social/twitter-logo.png";

interface FooterProps {
  withBackground?: boolean;
}

// Rodapé com navegação secundária e redes sociais
export default function Footer({ withBackground = true }: FooterProps) {
  const footerClass = withBackground ? "footer with-background" : "footer without-background";
  
  return (
    <footer className={footerClass}>
      <div className="footer-content">
        <ul className="pages-ul">
          <a href="#"><li className="pages-li">HOME</li></a>
          <a href="#"><li className="pages-li">BESTIÁRIO</li></a>
          <a href="#"><li className="pages-li">COMUNIDADE</li></a>
          <a href="#"><li className="pages-li">LOJA</li></a>
          <a href="#"><li className="pages-li">PERFIL</li></a>
          <a href="#"><li className="pages-li">HISTÓRIA</li></a>
        </ul>
        <ul>
          <div className="social"><a href="https://chat.whatsapp.com/DVz4XmcJnZq0lw7T6Fu01W"><img src={whatsapp} alt="whatsapp" /></a></div>
          <div className="social"><a href="https://www.facebook.com/eriniabrasil"><img src={facebook} alt="facebook" /></a></div>
          <div className="social"><a href="https://x.com/mundoerinia"><img src={twitter} alt="twitter" /></a></div>
        </ul>
        <p>© Copyright {new Date().getFullYear()} - Erinia Team </p>
      </div>
    </footer>
  );
}


