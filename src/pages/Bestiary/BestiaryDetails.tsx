import React from "react";
import "./BestiaryDetails.css";

interface DetailsProps {
  creature: any;
}

const BestiaryDetails: React.FC<DetailsProps> = ({ creature }) => {
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
        <p><strong>Perigo:</strong> {creature.perigo}</p>
        <p><strong>Fraqueza:</strong> {creature.fraqueza}</p>
        <p><strong>Habitat:</strong> {creature.habitat}</p>
        <p><strong>Comportamento:</strong> {creature.comportamento}</p>
        <p><strong>Status:</strong> {creature.status}</p>
      </div>
    </div>
  );
};

export default BestiaryDetails;
