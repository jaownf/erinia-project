import React from "react";
import "./BestiaryDetails.css";

interface DetailsProps {
  creature: any;
}

const BestiaryDetails: React.FC<DetailsProps> = ({ creature }) => {
  const colorMap: Record<string, string> = {
    perigo: "#e63946",       // vermelho
    fraqueza: "#ffb703",     // amarelo
    habitat: "#457b9d",      // azul
    comportamento: "#2a9d8f",// verde
    status: "#6a4c93",       // roxo
  };
  return (
    <div className="bestiary-details">
      <div className="details-image-placeholder">
        <span>🦅</span>
        <p>Imagem de detalhes em breve</p>
        <small>Usando placeholder temporário</small>
      </div>
      <h2 className="details-name">{creature.name}</h2>
      <h3 className="details-section">Descrição:</h3>
      <p className="details-description">{creature.description}</p>
      <div className="details-info">
        <p style={{ color: colorMap.perigo }}><strong>Perigo:</strong> {creature.perigo}</p>
        <p style={{ color: colorMap.fraqueza }}><strong>Fraqueza:</strong> {creature.fraqueza}</p>
        <p style={{ color: colorMap.habitat }}><strong>Habitat:</strong> {creature.habitat}</p>
        <p style={{ color: colorMap.comportamento }}><strong>Comportamento:</strong> {creature.comportamento}</p>
        <p style={{ color: colorMap.status }}><strong>Status:</strong> {creature.status}</p>
      </div>
    </div>
  );
};

export default BestiaryDetails;
