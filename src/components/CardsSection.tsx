import "./CardsSection.css";

// Bloco com dois cards informativos
export default function CardsSection() {
  return (
    <div className="cards-section">
      <div className="card">
        <h3 className="card-title">EXPLORE O MAPA EM 3D</h3>
        <div className="map-image"></div>
        <button className="learn-more-btn">SAIBA MAIS</button>
      </div>
      <div className="card">
        <h3 className="card-title">BESTIÁRIO EM DESTAQUE</h3>
        <div className="bestiary-image"></div>
        <button className="learn-more-btn">SAIBA MAIS</button>
      </div>
    </div>
  );
}


