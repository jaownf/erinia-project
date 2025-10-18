import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BestiaryGrid from './BestiaryGrid';
import BestiaryDetails from './BestiaryDetails';
import './Bestiary.css';

export interface Creature {
  id: number;
  name: string;
  image: string;
  type: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  danger: 'low' | 'medium' | 'high' | 'extreme';
  description: string;
  habitat: string;
  abilities: string[];
  weaknesses: string[];
  rewards: {
    xp: number;
    gold: number;
    items: string[];
  };
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  history: string;
  curiosities: string[];
  lore: string;
  size: string;
  diet: string;
  lifespan: string;
  level: number;
}

const mockCreatures: Creature[] = [
  {
    id: 1,
    name: 'Dragão de Fogo',
    image: '/src/assets/bestiary/grid-images/aranha.png',
    type: 'Dragão',
    rarity: 'legendary',
    danger: 'extreme',
    description: 'Um dragão ancestral que domina as chamas. Extremamente perigoso e raro.',
    habitat: 'Montanhas vulcânicas',
    abilities: ['Sopro de Fogo', 'Voo', 'Regeneração'],
    weaknesses: ['Gelo', 'Água'],
    rewards: {
      xp: 5000,
      gold: 10000,
      items: ['Escama de Dragão', 'Cristal de Fogo', 'Espada Flamejante']
    },
    stats: {
      health: 1000,
      attack: 150,
      defense: 120,
      speed: 80
    },
    history: 'Os dragões de fogo são criaturas ancestrais que habitam as montanhas vulcânicas há milênios. Considerados os mais poderosos entre todos os dragões, eles possuem uma conexão profunda com o elemento fogo e são capazes de controlar vulcões inteiros.',
    lore: 'Segundo as lendas antigas, os primeiros dragões de fogo foram criados pelos deuses do caos para proteger os tesouros mais valiosos do mundo. Suas escamas brilham como brasas vivas e seus olhos cintilam com a intensidade de mil sóis.',
    curiosities: [
      'Pode voar por até 24 horas sem descanso',
      'Suas escamas são mais resistentes que o aço',
      'Só se reproduz a cada 100 anos',
      'Seu hálito pode derreter rochas sólidas',
      'Possui memória ancestral de milênios'
    ],
    size: 'Gigante (15-20 metros)',
    diet: 'Carnívoro (principalmente grandes presas)',
    lifespan: 'Imortal (até 10.000 anos)',
    level: 85
  },
  {
    id: 2,
    name: 'Lobo Sombrio',
    image: '/src/assets/bestiary/grid-images/goblin.png',
    type: 'Bestial',
    rarity: 'uncommon',
    danger: 'medium',
    description: 'Um lobo que vive nas sombras da floresta, caçando em matilhas.',
    habitat: 'Florestas escuras',
    abilities: ['Visão Noturna', 'Velocidade', 'Caça em Grupo'],
    weaknesses: ['Fogo', 'Luz'],
    rewards: {
      xp: 500,
      gold: 800,
      items: ['Pele de Lobo', 'Dente Afiado']
    },
    stats: {
      health: 200,
      attack: 60,
      defense: 40,
      speed: 90
    },
    history: 'Os lobos sombrios são predadores noturnos que se adaptaram à vida nas florestas. Eles desenvolveram uma pelagem especial que os torna quase invisíveis na escuridão.',
    lore: 'Dizem que os lobos sombrios são espíritos de guerreiros que falharam em suas missões e foram condenados a vagar eternamente nas florestas, caçando para expiar seus pecados.',
    curiosities: [
      'Caçam em matilhas de 5-8 indivíduos',
      'Podem ver no escuro total',
      'Comunicam-se através de uivos ultrassônicos',
      'Sua pelagem muda de cor conforme a lua',
      'São imunes a magias de ilusão'
    ],
    size: 'Médio (1.5-2 metros)',
    diet: 'Carnívoro (pequenos e médios animais)',
    lifespan: '15-20 anos',
    level: 25
  },
  {
    id: 3,
    name: 'Golem de Pedra',
    image: '/src/assets/bestiary/grid-images/kraken.png',
    type: 'Elemental',
    rarity: 'rare',
    danger: 'high',
    description: 'Uma criatura de pedra animada por magia antiga, extremamente resistente.',
    habitat: 'Ruínas antigas',
    abilities: ['Resistência', 'Golpe Devastador', 'Regeneração de Pedra'],
    weaknesses: ['Magia', 'Ácido'],
    rewards: {
      xp: 2000,
      gold: 3000,
      items: ['Fragmento de Golem', 'Cristal de Terra']
    },
    stats: {
      health: 800,
      attack: 100,
      defense: 150,
      speed: 20
    },
    history: 'Criados por magos antigos para proteger templos e tesouros sagrados. Cada golem é único, esculpido à mão e animado com rituais complexos.',
    lore: 'Os golems de pedra são guardiões eternos, criados através de antigos rituais de animação. Eles não sentem dor, fome ou cansaço, dedicando-se exclusivamente à sua missão de proteção.',
    curiosities: [
      'Pode se regenerar absorvendo pedras',
      'Imune a ataques físicos convencionais',
      'Só pode ser destruído com magia poderosa',
      'Possui runas mágicas gravadas em seu corpo',
      'Pode viver por milênios sem se mover'
    ],
    size: 'Grande (3-4 metros)',
    diet: 'Nenhuma (sustentado por magia)',
    lifespan: 'Eterno (até ser destruído)',
    level: 45
  },
  {
    id: 4,
    name: 'Fênix',
    image: '/src/assets/bestiary/grid-images/lobisomem.png',
    type: 'Ave Mística',
    rarity: 'epic',
    danger: 'high',
    description: 'Uma ave mística que renasce das próprias cinzas, símbolo de renascimento.',
    habitat: 'Picos montanhosos',
    abilities: ['Renascimento', 'Voo', 'Cura'],
    weaknesses: ['Gelo', 'Água'],
    rewards: {
      xp: 3000,
      gold: 5000,
      items: ['Pena de Fênix', 'Cristal de Renascimento']
    },
    stats: {
      health: 600,
      attack: 120,
      defense: 80,
      speed: 100
    },
    history: 'As fênix são criaturas sagradas que representam o ciclo de vida e morte. Elas são consideradas mensageiras dos deuses e portadoras de esperança.',
    lore: 'A fênix é uma criatura divina que morre em chamas e renasce das próprias cinzas. Cada renascimento a torna mais sábia e poderosa, acumulando conhecimento através das eras.',
    curiosities: [
      'Renasce das cinzas quando morre',
      'Suas lágrimas têm poder curativo',
      'Só aparece uma vez por século',
      'Suas penas brilham como ouro líquido',
      'Pode curar feridas apenas com sua presença'
    ],
    size: 'Grande (2-3 metros de envergadura)',
    diet: 'Néctar de flores raras',
    lifespan: 'Cíclica (renasce a cada 100 anos)',
    level: 65
  },
  {
    id: 5,
    name: 'Orc Guerreiro',
    image: '/src/assets/bestiary/grid-images/aranha.png',
    type: 'Humanóide',
    rarity: 'common',
    danger: 'medium',
    description: 'Um guerreiro orc forte e agressivo, conhecido por sua ferocidade em batalha.',
    habitat: 'Territórios selvagens',
    abilities: ['Força Bruta', 'Resistência', 'Fúria'],
    weaknesses: ['Magia', 'Armas afiadas'],
    rewards: {
      xp: 300,
      gold: 500,
      items: ['Troféu Orc', 'Arma Orc']
    },
    stats: {
      health: 300,
      attack: 70,
      defense: 50,
      speed: 60
    },
    history: 'Os orcs são uma raça guerreira que habita as terras selvagens. Eles valorizam a força e a honra em combate.',
    lore: 'Os orcs são descendentes de antigos guerreiros que foram amaldiçoados pelos deuses. Eles carregam o peso dessa maldição, mas também a força que ela lhes concedeu.',
    curiosities: [
      'Podem lutar por dias sem descanso',
      'Valorizam a força acima de tudo',
      'Têm uma sociedade baseada em hierarquia militar',
      'Sua pele verde os protege de algumas magias',
      'São excelentes ferreiros e artesãos'
    ],
    size: 'Médio-Grande (1.8-2.2 metros)',
    diet: 'Onívoro (prefere carne)',
    lifespan: '50-70 anos',
    level: 20
  },
  {
    id: 6,
    name: 'Troll da Montanha',
    image: '/src/assets/bestiary/grid-images/goblin.png',
    type: 'Gigante',
    rarity: 'rare',
    danger: 'high',
    description: 'Um troll massivo que habita as montanhas, conhecido por sua força bruta e regeneração.',
    habitat: 'Cavernas montanhosas',
    abilities: ['Regeneração', 'Força Colossal', 'Resistência à Magia'],
    weaknesses: ['Fogo', 'Ácido'],
    rewards: {
      xp: 1800,
      gold: 2500,
      items: ['Pele de Troll', 'Cristal de Regeneração']
    },
    stats: {
      health: 900,
      attack: 120,
      defense: 100,
      speed: 30
    },
    history: 'Os trolls da montanha são criaturas antigas que vivem nas cavernas mais profundas. Eles são conhecidos por sua capacidade de regenerar feridas rapidamente.',
    lore: 'Dizem que os trolls foram criados pelos deuses da terra para proteger os segredos das montanhas. Sua pele é tão resistente quanto a rocha.',
    curiosities: [
      'Pode regenerar membros perdidos',
      'Sua pele é mais dura que granito',
      'Vive em cavernas há milênios',
      'Tem medo de luz solar intensa',
      'Coleciona tesouros de viajantes perdidos'
    ],
    size: 'Gigante (4-5 metros)',
    diet: 'Carnívoro (qualquer coisa)',
    lifespan: '500-800 anos',
    level: 50
  },
  {
    id: 7,
    name: 'Sereia Encantadora',
    image: '/src/assets/bestiary/grid-images/kraken.png',
    type: 'Aquática',
    rarity: 'epic',
    danger: 'medium',
    description: 'Uma criatura aquática mística que usa sua voz para encantar os viajantes.',
    habitat: 'Oceanos profundos',
    abilities: ['Canto Encantador', 'Natação', 'Magia Aquática'],
    weaknesses: ['Secura', 'Ruído'],
    rewards: {
      xp: 2500,
      gold: 4000,
      items: ['Escama de Sereia', 'Pérola Encantada']
    },
    stats: {
      health: 400,
      attack: 80,
      defense: 60,
      speed: 95
    },
    history: 'As sereias são criaturas místicas que habitam os oceanos mais profundos. Elas são conhecidas por sua beleza e por sua voz hipnotizante.',
    lore: 'As sereias são descendentes das ninfas aquáticas que se apaixonaram por mortais. Elas guardam os segredos dos oceanos há milênios.',
    curiosities: [
      'Sua voz pode hipnotizar qualquer criatura',
      'Vive em palácios subaquáticos',
      'Coleciona tesouros de naufrágios',
      'Pode se transformar em humana temporariamente',
      'Tem conhecimento de magias antigas'
    ],
    size: 'Médio (1.5 metros)',
    diet: 'Peixes e algas marinhas',
    lifespan: '200-300 anos',
    level: 40
  },
  {
    id: 8,
    name: 'Minotauro Guardião',
    image: '/src/assets/bestiary/grid-images/lobisomem.png',
    type: 'Humanóide',
    rarity: 'rare',
    danger: 'high',
    description: 'Um guardião poderoso com cabeça de touro, protetor de labirintos antigos.',
    habitat: 'Labirintos subterrâneos',
    abilities: ['Carregada Devastadora', 'Resistência', 'Instinto de Caça'],
    weaknesses: ['Magia', 'Armas de prata'],
    rewards: {
      xp: 2200,
      gold: 3500,
      items: ['Chifre de Minotauro', 'Cristal de Proteção']
    },
    stats: {
      health: 750,
      attack: 110,
      defense: 90,
      speed: 50
    },
    history: 'Os minotauros são guardiões ancestrais criados para proteger labirintos sagrados. Eles são conhecidos por sua força e lealdade.',
    lore: 'O primeiro minotauro foi criado por um deus vingativo para punir um rei arrogante. Desde então, eles servem como guardiões eternos.',
    curiosities: [
      'Nunca abandona seu posto',
      'Pode encontrar qualquer coisa em labirintos',
      'Sua força aumenta com a raiva',
      'Respeita apenas os mais corajosos',
      'Conhece todos os segredos dos labirintos'
    ],
    size: 'Grande (2.5-3 metros)',
    diet: 'Carnívoro (prefere carne fresca)',
    lifespan: '300-500 anos',
    level: 55
  }
];

const Bestiary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedDanger, setSelectedDanger] = useState('');
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCreatures = useMemo(() => {
    let filtered = mockCreatures.filter(creature => {
      const matchesSearch = creature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          creature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          creature.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || creature.type === selectedType;
      const matchesRarity = !selectedRarity || creature.rarity === selectedRarity;
      const matchesDanger = !selectedDanger || creature.danger === selectedDanger;
      
      return matchesSearch && matchesType && matchesRarity && matchesDanger;
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'danger':
          const dangerOrder = { low: 1, medium: 2, high: 3, extreme: 4 };
          return dangerOrder[b.danger] - dangerOrder[a.danger];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedRarity, selectedDanger, sortBy]);

  const uniqueTypes = [...new Set(mockCreatures.map(creature => creature.type))];
  const uniqueRarities = [...new Set(mockCreatures.map(creature => creature.rarity))];
  const uniqueDangers = [...new Set(mockCreatures.map(creature => creature.danger))];

  const handleCreatureSelect = (creature: Creature) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCreature(creature);
      setIsLoading(false);
    }, 300);
  };

  const handleCloseDetails = () => {
    setSelectedCreature(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className={`bestiary-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className="floating-particles"></div>
        <div className="ambient-light"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="bestiary-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <h1 className="bestiary-title">
            <span className="title-main">Bestiário</span>
            <span className="title-sub">de Erinia</span>
          </h1>
          <p className="bestiary-subtitle">
            Explore as criaturas misteriosas que habitam o mundo de Erinia
          </p>
        </div>
        
        <div className="header-actions">
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="bestiary-controls"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
        <input
          type="text"
                className="bestiary-search"
                placeholder="Buscar criaturas, tipos ou habitats..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="search-icon">
                <motion.span
                  animate={{ rotate: searchTerm ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  🔍
                </motion.span>
              </div>
              {searchTerm && (
                <motion.button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ✕
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Tipo</label>
            <select
              className="bestiary-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Raridade</label>
            <select
              className="bestiary-filter"
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
            >
              <option value="">Todas as raridades</option>
              {uniqueRarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Perigo</label>
            <select
              className="bestiary-filter"
              value={selectedDanger}
              onChange={(e) => setSelectedDanger(e.target.value)}
            >
              <option value="">Todos os níveis</option>
              {uniqueDangers.map(danger => (
                <option key={danger} value={danger}>
                  {danger.charAt(0).toUpperCase() + danger.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por</label>
          <select
              className="bestiary-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nome</option>
              <option value="rarity">Raridade</option>
              <option value="danger">Perigo</option>
          </select>
        </div>
      </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="bestiary-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <BestiaryGrid 
          creatures={filteredCreatures} 
          onCreatureSelect={handleCreatureSelect}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Details Panel */}
      <AnimatePresence>
        {selectedCreature && (
          <BestiaryDetails 
            creature={selectedCreature} 
            onClose={handleCloseDetails}
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
        <AnimatePresence>
        {isLoading && (
              <motion.div
            className="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
          >
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Carregando detalhes...</p>
            </div>
              </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default Bestiary;
