import "./NewsSection.css";

export default function NewsSection() {
  return (
    <section className="news-section">
      <h2 className="section-title">NOVIDADES</h2>

      <div className="carousel-container">
        <button className="carousel-arrow" aria-label="Anterior">‹</button>
        <div className="carousel">
          <div className="carousel-item">
            <div className="card-image" />
            <hr className="card-div-row" />
            <h3>Título da notícia</h3>
            <p>Resumo breve da notícia para chamar atenção do jogador.</p>
          </div>
          <div className="carousel-item">
            <div className="card-image" />
            <hr className="card-div-row" />
            <h3>Título da notícia</h3>
            <p>Resumo breve da notícia para chamar atenção do jogador.</p>
          </div>
          <div className="carousel-item">
            <div className="card-image" />
            <hr className="card-div-row" />
            <h3>Título da notícia</h3>
            <p>Resumo breve da notícia para chamar atenção do jogador.</p>
          </div>
        </div>
        <button className="carousel-arrow" aria-label="Próximo">›</button>
      </div>
    </section>
  );
}


