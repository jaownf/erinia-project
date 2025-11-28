import { motion } from 'framer-motion';
import './History.css';

const timelineEvents = [
  {
    year: 'Primórdios',
    title: 'A Ascensão das Criaturas',
    description:
      'Nos primeiros dias da humanidade, homens frágeis dividiam a Terra com criaturas monstruosas, inteligentes e poderosas, que temiam o avanço humano e atacavam seus povoados.',
    icon: '👁️'
  },
  {
    year: 'Era dos Magos',
    title: 'As Crianças Raptadas',
    description:
      'Algumas crianças sequestradas pelas criaturas sobreviveram e aprenderam seus poderes. Ao escapar, tornaram-se magos — figuras temidas, mas essenciais para a sobrevivência humana.',
    icon: '✨'
  },
  {
    year: 'A Grande Travessia',
    title: 'O Sacrifício de Hur',
    description:
      'Magos descobriram um ritual capaz de banir as criaturas através da “Porta dos Mundos”. Para executá-lo, entregaram sua vida e energia ao mago Hur. O ritual funcionou — mas levou humanos junto.',
    icon: '🔥'
  },
  {
    year: 'Profecia Gravada',
    title: 'A Gruta de Hur',
    description:
      'Hur atravessou o portal, reuniu os humanos perdidos e entalhou uma profecia nas paredes da Grande Gruta. Depois desapareceu, deixando apenas seu legado.',
    icon: '📜'
  },
  {
    year: 'Mil Anos Depois',
    title: 'O Sinal no Céu',
    description:
      'Um cometa iluminou Erinia por sete dias. As marés mudaram e restou apenas a Ilha de Tuorhence, onde surgiriam Aquilonius, Erynian e Hesperius.',
    icon: '☄️'
  },
  {
    year: 'Guerra das Três Cidades',
    title: 'A Queda das Fortificações',
    description:
      'Criaturas semearam discórdia entre os humanos, gerando a mais sangrenta guerra da história de Erinia. As três cidades arruinaram-se em batalha.',
    icon: '⚔️'
  },
  {
    year: '2001–2004',
    title: 'A Criação da Ignis Games',
    description:
      'Três desenvolvedores brasileiros largaram seus empregos, venderam bens pessoais e fundaram a Ignis Games para criar o primeiro MMORPG totalmente brasileiro.',
    icon: '🔥'
  },
  {
    year: '2004',
    title: 'O Lançamento Oficial',
    description:
      'Erinia é lançado com assinatura mensal, criaturas folclóricas, “macumbas”, cidades e um imenso mapa. Um feito histórico no Brasil.',
    icon: '🎮'
  },
  {
    year: '2004–2015',
    title: 'Quedas, Renascimentos e a Comunidade',
    description:
      'Servidores abriram e fecharam várias vezes. A comunidade manteve wikis, mapas, blogs e sites, preservando o jogo com paixão.',
    icon: '💠'
  },
  {
    year: '2016–2024',
    title: 'O Legado Vivo',
    description:
      'Grupos independentes mantiveram o jogo ativo, fazendo ajustes e experimentando novos rumos. O futuro ainda guarda segredos.',
    icon: '🌙'
  }
];

export default function History() {
  return (
    <div className="history-page">

      {/* HERO */}
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
          <h1 className="history-title">A História de Erinia</h1>
          <p className="history-subtitle">
            Uma saga que mistura lenda, coragem, sacrifício — e o nascimento do primeiro MMORPG folclórico brasileiro.
          </p>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section">
        <div className="timeline-bg-creatures">
          <img src="/src/assets/bestiary/grid-images/saci das planices.png" className="creature-bg creature-1" />
          <img src="/src/assets/bestiary/grid-images/Caipora.png" className="creature-bg creature-2" />
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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

      {/* GALERIA — mantém igual */}
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


      {/* --- NOVAS SEÇÕES --- */}

      {/* Lore Antiga */}
      <section className="lore-section">
        <motion.h2 className="lore-title">O Mundo Antes da Travessia</motion.h2>
        <p className="lore-text">
          Nos primórdios da humanidade, criaturas monstruosas dominavam a Terra. Inteligentes, astutas e dotadas de poderes arcanos,
          elas temiam o avanço humano — e atacavam suas aldeias, raptavam suas crianças e dificultavam seu progresso.
          Desses sequestros surgiram os primeiros magos, que aprenderam segredos proibidos e buscaram libertar a humanidade.
        </p>
      </section>

      {/* A Grande Travessia */}
      <section className="lore-section alt">
        <motion.h2 className="lore-title">A Grande Travessia e a Profecia de Hur</motion.h2>
        <p className="lore-text">
          Após séculos de sofrimento, os magos se uniram em um último ritual. O sacrifício de Hur baniria as criaturas,
          mas também arrastaria humanos para outro mundo. Esse evento ficou marcado como A Grande Travessia.
        </p>

        <div className="prophecy-container">
          <h3 className="prophecy-title">A Profecia de Hur</h3>
          <p className="prophecy-text">
            “Quando o fogo reluzente atravessar o céu…<br />
            ...a corrida do poder terá iniciado.”
          </p>
        </div>
      </section>

      {/* Tuorhence */}
      <section className="lore-section">
        <motion.h2 className="lore-title">A Ascensão de Tuorhence</motion.h2>
        <p className="lore-text">
          Mil anos depois, o cometa profetizado iluminou Erinia. As marés mudaram e restou apenas a Ilha de Tuorhence.
          Ali surgiram três grandes cidades: Aquilonius, Erynian e Hesperius. Era a promessa de um novo começo.
        </p>
      </section>

      {/* Guerra das 3 Cidades */}
      <section className="lore-section alt">
        <motion.h2 className="lore-title">A Guerra das Três Cidades</motion.h2>
        <p className="lore-text">
          Criaturas semearam discórdia entre os humanos, levando à guerra mais sangrenta da história. As cidades ruíram, e a ilha
          foi tomada por saqueadores e monstros vagantes. Tuorhence aguardava novos heróis.
        </p>
      </section>

      {/* Desenvolvimento real */}
      <section className="dev-section">
        <motion.h2 className="dev-title">A História Real por Trás do Jogo</motion.h2>

        <p className="dev-text">
          Em 2001, três amigos largaram seus empregos, mudaram de cidade e venderam bens pessoais — incluindo um apartamento —
          para fundar a Ignis Games e criar o primeiro MMORPG brasileiro baseado em folclore.
        </p>

        <p className="dev-text">
          Com apoio de instituições públicas e privadas, nasceu o projeto Erinia. Em 2004, o jogo foi lançado com assinatura
          mensal, criaturas folclóricas, trilha única e um mapa gigantesco.
        </p>

        <p className="dev-text">
          Apesar de apaixonante, Erinia competia com gigantes como Lineage II, Ragnarok e World of Warcraft. Bugs, limitações
          técnicas e a era dos MMOs pagos enfraqueceram o crescimento, mas não apagaram o impacto.
        </p>

        <p className="dev-text">
          Entre 2004 e 2024, o jogo abriu e fechou inúmeras vezes. A comunidade preservou mapas, wikis, blogs, screenshots,
          regras de clãs e histórias pessoais que atravessaram décadas.
        </p>

        <p className="dev-text highlight">
          Em silêncio, grupos independentes mantiveram a chama acesa — ajustando, estudando e, em lugares discretos da internet,
          experimentando novos caminhos inspirados no legado do jogo.
        </p>
      </section>

      {/* VÍDEOS RELACIONADOS */}
      <section className="videos-section">
        <motion.h2 className="section-title">Vídeos Relacionados</motion.h2>
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FtD36B4Ikfg?start=699"
              title="Erinia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-video"
            ></iframe>
          </div>
          <div className="video-description">
            <h3>A História de Erinia</h3>
            <p>O vídeo conta a história do Erínia, um MMO brasileiro dos anos 2000 que recebeu alto investimento e tinha uma proposta ambiciosa inspirada no folclore nacional. O projeto, porém, enfrentou decisões ruins de produção e vários problemas técnicos que impediram seu crescimento. Mesmo assim, o jogo conquistou uma comunidade pequena, fiel e nostálgica, tornando-se um título cult lembrado mais pelo potencial do que pelo sucesso.</p>
            <p>Neste vídeo, você verá depoimentos dos criadores, imagens raras do desenvolvimento e histórias incríveis da comunidade que manteve o jogo vivo por todos esses anos.</p>
          </div>
        </div>
      </section>

      {/* VISÃO */}
      <section className="vision-section">
        <h2 className="vision-title">Nossa Visão</h2>
        <p className="vision-text">
          Erinia não é apenas um jogo — é um marco na história dos MMOs brasileiros.
        </p>
        <p className="vision-text">
          O passado continua vivo. E o futuro ainda guarda muitos segredos.
        </p>
      </section>
    </div>
  );
}