import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NewsSection.css";

const newsItems = [
  {
    id: 1,
    title: "Novo Bestiário Expandido",
    description: "Descubra mais de 30 criaturas místicas do folclore brasileiro em nosso bestiário atualizado!",
    date: "29 Out 2024",
    category: "Atualização"
  },
  {
    id: 2,
    title: "Sistema de Combate Renovado",
    description: "Experiência de batalha completamente reformulada com novas mecânicas e animações fluidas.",
    date: "15 Out 2024",
    category: "Gameplay"
  },
  {
    id: 3,
    title: "Exploração do Sertão",
    description: "Novos biomas e regiões para explorar, incluindo o misterioso Sertão Encantado.",
    date: "01 Out 2024",
    category: "Conteúdo"
  },
  {
    id: 4,
    title: "Modo Multiplayer em Breve",
    description: "Prepare-se para aventuras cooperativas com seus amigos no mundo de Erinia!",
    date: "20 Set 2024",
    category: "Novidade"
  }
];

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = newsItems.length - 1;
      if (nextIndex >= newsItems.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="news-section">
      <h2 className="section-title">NOVIDADES</h2>

      <div className="carousel-container">
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={() => paginate(-1)}
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="carousel-wrapper">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="carousel-item"
            >
              <div className="news-card">
                <div className="news-card-header">
                  <span className="news-category">{newsItems[currentIndex].category}</span>
                  <span className="news-date">{newsItems[currentIndex].date}</span>
                </div>
                <div className="card-image" />
                <div className="news-card-content">
                  <h3 className="news-title">{newsItems[currentIndex].title}</h3>
                  <p className="news-description">{newsItems[currentIndex].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={() => paginate(1)}
          aria-label="Próximo"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {newsItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Ir para notícia ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}


