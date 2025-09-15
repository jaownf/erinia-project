import "./AboutSection.css";

// Texto introdutório sobre o jogo com CTA
export default function AboutSection() {
  return (
    <div className="about-section">
      <h2 className="section-title">SOBRE O JOGO</h2>
      <p className="about-description">
        Erinia Tuorhence é um MMORPG épico de fantasia sombria ambientado em um mundo medieval.
      </p>
      <button className="learn-more-btn">SAIBA MAIS</button>
    </div>
  );
}


