import "./CardsSection.css";

export default function CardsSection() {
  return (
    <section className="cards-section">

      {/* CARD: LEADERBOARD */}
      <div className="card leaderboard-card">
        <h3 className="card-section-title">Ranking da Guerra</h3>

        <ul className="leaderboard-list">

          {/* TOP 4 (já existiam) */}
          <li className="leaderboard-item first">
            <span className="pos">👑 1°</span>
            <span className="name">DsReiAwp</span>
            <span className="level">Nível 900</span>
          </li>

          <li className="leaderboard-item second">
            <span className="pos">🥈 2°</span>
            <span className="name">VdgGames</span>
            <span className="level">Nível 870</span>
          </li>

          <li className="leaderboard-item third">
            <span className="pos">🥉 3°</span>
            <span className="name">SmurfPtn</span>
            <span className="level">Nível 850</span>
          </li>

          <li className="leaderboard-item">
            <span className="pos">4°</span>
            <span className="name">AbacaxiETC</span>
            <span className="level">Nível 820</span>
          </li>

          {/* NOVOS PLAYERS */}
          <li className="leaderboard-item">
            <span className="pos">5°</span>
            <span className="name">DarkSlayer</span>
            <span className="level">Nível 803</span>
          </li>

          <li className="leaderboard-item">
            <span className="pos">6°</span>
            <span className="name">NinjaRoxo</span>
            <span className="level">Nível 780</span>
          </li>

          <li className="leaderboard-item">
            <span className="pos">7°</span>
            <span className="name">MagoDoCaos</span>
            <span className="level">Nível 755</span>
          </li>

     


        </ul>
      </div>

      {/* CARD MAPA */}
      <div className="card">
        <h3 className="card-section-title">Mapa</h3>
        <div className="map-image" />
      </div>

    </section>
  );
}
