import { motion } from 'framer-motion';
import './History.css';

const timelineEvents = [
  {
    year: '2020',
    title: 'O Início da Jornada',
    description: 'Erinia nasce como um conceito ambicioso: criar um RPG que celebra o folclore brasileiro e suas lendas ancestrais.',
    icon: '🌱'
  },
  {
    year: '2021',
    title: 'Desenvolvimento do Mundo',
    description: 'A equipe mergulha nas histórias do sertão, criando um universo rico inspirado nas tradições nordestinas e na cultura popular brasileira.',
    icon: '🗺️'
  },
  {
    year: '2022',
    title: 'Primeiras Criaturas',
    description: 'O bestiário ganha vida com as primeiras criaturas: Boiúna, Caipora, Saci e outros seres místicos do folclore brasileiro.',
    icon: '🐉'
  },
  {
    year: '2023',
    title: 'Sistema de Combate',
    description: 'Implementação do sistema de batalha estratégico, mesclando elementos de RPG clássico com mecânicas modernas e dinâmicas.',
    icon: '⚔️'
  },
  {
    year: '2024',
    title: 'Beta Aberto',
    description: 'Lançamento da versão beta para a comunidade, recebendo feedback valioso de jogadores apaixonados pelo projeto.',
    icon: '🎮'
  },
  {
    year: '2025',
    title: 'Lançamento Oficial',
    description: 'Erinia é lançado oficialmente, trazendo uma experiência única que une tradição e inovação em um RPG genuinamente brasileiro.',
    icon: '🚀'
  }
];

export default function History() {
  return (
    <div className="history-page">
      {/* Hero Section */}
      <section className="history-hero">
        <div className="hero-background">
          <div className="hero-bg-image"></div>
          <div className="hero-overlay"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="history-hero-content"
        >
          <motion.div 
            className="hero-logo-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img 
              src="/src/assets/logo/erinia-logo.png" 
              alt="Erinia Logo" 
              className="hero-logo"
            />
          </motion.div>
          <h1 className="history-title">A História de Erinia</h1>
          <p className="history-subtitle">
            Uma jornada épica que começou com um sonho: celebrar a rica cultura brasileira através de um RPG inesquecível
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-bg-creatures">
          <img src="/src/assets/bestiary/grid-images/saci das planices.png" alt="" className="creature-bg creature-1" />
          <img src="/src/assets/bestiary/grid-images/Caipora.png" alt="" className="creature-bg creature-2" />
        </div>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-content">
                <div className="timeline-icon">{event.icon}</div>
                <div className="timeline-year">{event.year}</div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-background">
          <div className="gallery-pattern"></div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gallery-title"
        >
          Criaturas de Erinia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="gallery-description"
        >
          Conheça algumas das lendárias criaturas que habitam o mundo místico de Erinia
        </motion.p>
        
        <div className="gallery-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gallery-item featured-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/Draconius ivo.png" 
                alt="Draconius Ivo" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Draconius Ivo</h3>
              <p className="creature-type">Dragão Celestial</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/boiuna.png" 
                alt="Boiúna" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Boiúna</h3>
              <p className="creature-type">Serpente das Águas</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/Caipora.png" 
                alt="Caipora" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Caipora</h3>
              <p className="creature-type">Protetor da Floresta</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/cupendipe.png" 
                alt="Cupendipe" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Cupendipe</h3>
              <p className="creature-type">Guardião Aquático</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/mapiguari.png" 
                alt="Mapiguari" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Mapiguari</h3>
              <p className="creature-type">Fera das Selvas</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/corpo seco.png" 
                alt="Corpo Seco" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Corpo Seco</h3>
              <p className="creature-type">Morto-Vivo Amaldiçoado</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="gallery-item"
          >
            <div className="gallery-image-container">
              <img 
                src="/src/assets/bestiary/grid-images/guará.png" 
                alt="Guará" 
                className="gallery-image creature-image"
              />
            </div>
            <div className="gallery-info">
              <h3 className="creature-name">Guará</h3>
              <p className="creature-type">Criatura Mística</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="gallery-item"
          >

          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vision-content"
        >
          <h2 className="vision-title">Nossa Visão</h2>
          <p className="vision-text">
            Erinia não é apenas um jogo - é uma celebração da cultura brasileira. 
            Nosso objetivo é criar uma experiência que honre as lendas e tradições 
            do nosso povo, enquanto oferece mecânicas de jogo modernas e envolventes.
          </p>
          <p className="vision-text">
            Cada criatura, cada local, cada história foi cuidadosamente elaborada 
            para transportar os jogadores para um mundo onde o folclore ganha vida 
            e a aventura aguarda em cada esquina do sertão místico.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
