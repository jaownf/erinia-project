import "./CardsSection.css";

export default function CardsSection() {
  return (
    <section className="cards-section">
      <div className="card">
        <h3 className="card-title">Bestiário</h3>
        <div className="bestiary-image" />
      </div>

      <div className="card">
        <h3 className="card-title">Mapa</h3>
        <div className="map-image" />
      </div>
    </section>
  );
}


