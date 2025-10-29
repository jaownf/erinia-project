import React from 'react';
import { motion } from 'framer-motion';
import type { Creature } from './Bestiary';
import './BestiaryCard.css';

interface BestiaryCardProps {
  creature: Creature;
  onClick: () => void;
  index?: number;
}

const BestiaryCard: React.FC<BestiaryCardProps> = ({ creature, onClick, index = 0 }) => {
  return (
    <motion.div
      className="bestiary-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Card Background Effects */}
      <div className="card-bg-effects">
        <div className="card-glow"></div>
        <div className="card-pattern"></div>
      </div>

      {/* Image Container */}
      <div className="card-image-container">
        <motion.img 
          src={creature.image} 
          alt={creature.name}
          className="card-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Image Overlay */}
        <div className="image-overlay">
          <div className="overlay-gradient"></div>
        </div>

        {/* Level Badge */}
        <div className="level-badge">
          <span className="level-text">Nv. {creature.level}</span>
        </div>

        {/* Hover Effect */}
        <div className="hover-effect">
          <div className="hover-icon">👁</div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{creature.name}</h3>
          <div className="card-type">{creature.type}</div>
        </div>
        
        <p className="card-description">{creature.description}</p>

        <div className="card-footer">
          <div className="view-details">
            <span>Ver detalhes</span>
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BestiaryCard;