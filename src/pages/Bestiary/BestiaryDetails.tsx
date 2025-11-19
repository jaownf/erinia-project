import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import type { Creature } from './Bestiary';
import './BestiaryDetails.css';

interface BestiaryDetailsProps {
  creature: Creature;
  onClose: () => void;
}

const BestiaryDetails: React.FC<BestiaryDetailsProps> = ({ creature, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '' },
    { id: 'lore', label: 'Lore', icon: '' },
    { id: 'curiosities', label: 'Curiosidades', icon: '' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content-section">
            <div className="overview-grid">
              <div className="overview-item">
                <h4>História</h4>
                <p>{creature.history}</p>
              </div>
              <div className="overview-item">
                <h4>Habitat</h4>
                <p><strong>Localização:</strong> {creature.habitat}</p>
              </div>
              <div className="overview-item">
                <h4>Características Físicas</h4>
                <div className="characteristics">
                  <div className="char-item">
                    <span className="char-label">Tamanho:</span>
                    <span className="char-value">{creature.size}</span>
                  </div>
                  <div className="char-item">
                    <span className="char-label">Dieta:</span>
                    <span className="char-value">{creature.diet}</span>
                  </div>
                  <div className="char-item">
                    <span className="char-label">Longevidade:</span>
                    <span className="char-value">{creature.lifespan}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      
      
      case 'lore':
        return (
          <div className="tab-content-section">
            <div className="lore-content">
              <h4>Lore e Mitologia</h4>
              <p>{creature.lore}</p>
            </div>
          </div>
        );
      
      case 'curiosities':
        return (
          <div className="tab-content-section">
            <div className="curiosities-list">
              {creature.curiosities.map((curiosity, index) => (
                <motion.div 
                  key={index} 
                  className="curiosity-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="curiosity-icon">💡</div>
                  <p>{curiosity}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return createPortal(
    <motion.div
      className="bestiary-details-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bestiary-details-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div 
          className="details-image-panel"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="poster-frame">
            <img src={creature.image} alt={creature.name} />
          </div>
        </motion.div>

        <motion.div
          className="bestiary-details-panel"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 30, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="details-header">
            <div className="header-info">
              <motion.h2 
                className="details-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {creature.name}
              </motion.h2>
              
              <motion.div 
                className="details-meta"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span 
                  className="meta-badge rarity-badge"
                  style={{ backgroundColor: getRarityColor(creature.rarity) }}
                >
                  {getRarityLabel(creature.rarity)}
                </span>
                <span 
                  className="meta-badge danger-badge"
                  style={{ backgroundColor: getDangerColor(creature.danger) }}
                >
                  {getDangerLabel(creature.danger)}
                </span>
                <span className="meta-badge type-badge">{creature.type}</span>
              </motion.div>
              
              <motion.p 
                className="details-description"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {creature.description}
              </motion.p>
            </div>
            
            <motion.button
              className="close-btn" 
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.button>
          </div>

          <div className="details-tabs">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default BestiaryDetails;