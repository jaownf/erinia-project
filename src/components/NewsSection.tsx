import "./NewsSection.css";

// Carrossel simples para novidades/patch notes
export default function NewsSection() {
  return (
    <div className="news-section">
      <h2 className="section-title">NOVIDADES / PATCH NOTES</h2>
      <div className="carousel-container">
        <button className="carousel-arrow left">‹</button>
        <div className="carousel">
          <div className="carousel-item">
            <div className="card-image"></div>
            <hr className="card-div-row"></hr>
            <h3>PATCH 2.1 LANÇADO</h3>
            <p>26 DE JUNHO DE 2025</p>
          </div>
          <div className="carousel-item">
            <div className="card-image"></div>
            <hr className="card-div-row"></hr>
            <h3>PRÓXIMO EVENTO: "A QUEDA"</h3>
            <p>30 DE JUNHO DE 2025</p>
          </div>
          <div className="carousel-item">
            <div className="card-image"></div>
            <hr className="card-div-row"></hr>
            <h3>ENTRE NO GRUPO  DO WHATSAPP</h3>
            <p>26 DE JUNHO DE 2025</p>
          </div>
        </div>
        <button className="carousel-arrow right">›</button>
      </div>
    </div>
  );
}


