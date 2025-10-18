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
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#95a5a6';
      case 'uncommon': return '#27ae60';
      case 'rare': return '#3498db';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'low': return '#27ae60';
      case 'medium': return '#f39c12';
      case 'high': return '#e74c3c';
      case 'extreme': return '#8e44ad';
      default: return '#95a5a6';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Comum';
      case 'uncommon': return 'Incomum';
      case 'rare': return 'Raro';
      case 'epic': return 'Épico';
      case 'legendary': return 'Lendário';
      default: return rarity;
    }
  };

  const getDangerLabel = (danger: string) => {
    switch (danger) {
      case 'low': return 'Baixo';
      case 'medium': return 'Médio';
      case 'high': return 'Alto';
      case 'extreme': return 'Extremo';
      default: return danger;
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '●';
      case 'uncommon': return '◆';
      case 'rare': return '▲';
      case 'epic': return '★';
      case 'legendary': return '✦';
      default: return '●';
    }
  };

  const getDangerIcon = (danger: string) => {
    switch (danger) {
      case 'low': return '●';
      case 'medium': return '▲';
      case 'high': return '■';
      case 'extreme': return '⚠';
      default: return '●';
    }
  };

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

        {/* Badges */}
        <div className="card-badges">
          <motion.div 
            className="rarity-badge"
            style={{ backgroundColor: getRarityColor(creature.rarity) }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="badge-icon">{getRarityIcon(creature.rarity)}</span>
            <span className="badge-text">{getRarityLabel(creature.rarity)}</span>
          </motion.div>
          
          <motion.div 
            className="danger-badge"
            style={{ backgroundColor: getDangerColor(creature.danger) }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="badge-icon">{getDangerIcon(creature.danger)}</span>
            <span className="badge-text">{getDangerLabel(creature.danger)}</span>
          </motion.div>
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
        
        <div className="card-stats">
          <div className="stat-item">
            <span className="stat-icon">❤</span>
            <span className="stat-value">{creature.stats.health}</span>
            <span className="stat-label">HP</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚔</span>
            <span className="stat-value">{creature.stats.attack}</span>
            <span className="stat-label">ATK</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🛡</span>
            <span className="stat-value">{creature.stats.defense}</span>
            <span className="stat-label">DEF</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💨</span>
            <span className="stat-value">{creature.stats.speed}</span>
            <span className="stat-label">SPD</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="habitat-info">
            <span className="habitat-icon">🏞</span>
            <span className="habitat-text">{creature.habitat}</span>
          </div>
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