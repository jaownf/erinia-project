import React, { useState } from "react";
import "./BestiaryCard.css";

interface CardProps {
  creature: any;
  onClick: () => void;
}

const BestiaryCard: React.FC<CardProps> = ({ creature, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bestiary-card" onClick={onClick}>
      {!imageError ? (
        <img 
          src={creature.image} 
          alt={creature.name}
          onError={handleImageError}
        />
      ) : (
        <div className="image-placeholder">
          <span>🦅</span>
          <p>Imagem não disponível</p>
        </div>
      )}
      <h2>{creature.name}</h2>
    </div>
  );
};

export default BestiaryCard;
