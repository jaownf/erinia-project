import { useState } from "react";
import "./DownloadSection.css";

export default function DownloadSection() {
  const [isInstalling, setIsInstalling] = useState(false);

  const handleDownload = () => {
    setIsInstalling(true);
    // Download na mesma página
    window.location.href = "https://drive.google.com/file/d/1ioev7lTD70tuvEW2Dgl4aHbjq80qLb9h/view";
  };

  return (
    <section className="download-section">
      <button 
        className={`download-btn ${isInstalling ? "installing" : ""}`}
        onClick={handleDownload}
        disabled={isInstalling}
      >
        {isInstalling ? (
          <span className="installing-text">
            <span className="spinner"></span>
            INSTALANDO...
          </span>
        ) : (
          <>
            <span className="download-text">BAIXAR O JOGO</span>
            <span className="download-free">GRÁTIS • WINDOWS</span>
          </>
        )}
      </button>
    </section>
  );
}
