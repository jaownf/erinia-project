import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BestiaryCard from './BestiaryCard';
import type { Creature } from './Bestiary';
import './BestiaryGrid.css';

interface BestiaryGridProps {
  creatures: Creature[];
  onCreatureSelect: (creature: Creature) => void;
  isLoading?: boolean;
}

const BestiaryGrid: React.FC<BestiaryGridProps> = ({ creatures, onCreatureSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };


  if (creatures.length === 0) {
    return (
      <motion.div 
        className="no-results"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="no-results-content">
          <motion.div 
            className="no-results-icon"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔍
          </motion.div>
          <h3>Nenhuma criatura encontrada</h3>
          <p>Tente ajustar os filtros ou termos de busca para encontrar mais criaturas.</p>
          <div className="search-suggestions">
            <span>Sugestões:</span>
            <div className="suggestion-tags">
              <span className="tag">Dragão</span>
              <span className="tag">Lobo</span>
              <span className="tag">Golem</span>
              <span className="tag">Fênix</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bestiary-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {creatures.map((creature, index) => (
          <motion.div
            key={creature.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            layout
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className="grid-item"
          >
            <BestiaryCard
              creature={creature}
              onClick={() => onCreatureSelect(creature)}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default BestiaryGrid;