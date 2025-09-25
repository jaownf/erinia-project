import React from "react";
import BestiaryCard from "../../components/BestiaryCard";
import "./BestiaryGrid.css";

interface GridProps {
  onSelect: (creature: any) => void;
  search: string;
  filter: string;
  hasSelection: boolean;
}

import lobisomemImg from "../../assets/bestiary/grid-images/lobisomem.png";
import aranhaImg from "../../assets/bestiary/grid-images/aranha.png";
import goblinImg from "../../assets/bestiary/grid-images/goblin.png";
import krakenImg from "../../assets/bestiary/grid-images/kraken.png";

const mockCreatures = [
  {
    name: "Lobisomem",
    image: lobisomemImg,
    description: "Uma fera amaldiçoada que vaga sob a lua cheia. Transforma-se durante as noites de lua cheia, perdendo toda a humanidade e se tornando uma criatura selvagem e perigosa. Sua força é incomparável e sua sede por sangue é insaciável.",
    perigo: "Alto",
    fraqueza: "Prata e fogo ritual",
    habitat: "Florestas do norte",
    comportamento: "Noturno e territorial",
    status: "Vivo em lendas e caçadas"
  },
  {
    name: "Aranha Gigante",
    image: aranhaImg,
    description: "Habita cavernas escuras e tece teias mortais. Suas teias são tão resistentes quanto aço e seu veneno pode paralisar uma pessoa em segundos. Prefere emboscar suas presas nas profundezas das cavernas.",
    perigo: "Médio",
    fraqueza: "Fogo",
    habitat: "Cavernas",
    comportamento: "Agressiva e caçadora",
    status: "Encontrada em caçadas raras"
  },
  {
    name: "Dragão de Gelo",
    image: "https://via.placeholder.com/200x200",
    description: "Um dragão ancião que domina os picos gelados das montanhas. Seu sopro pode congelar qualquer coisa em segundos, criando esculturas de gelo perfeitamente preservadas. É uma das criaturas mais antigas e sábias do mundo.",
    perigo: "Alto",
    fraqueza: "Fogo e magia solar",
    habitat: "Picos das montanhas geladas",
    comportamento: "Territorial e sábio",
    status: "Lendário e raramente avistado"
  },
  {
    name: "Goblin Shaman",
    image: goblinImg,
    description: "Um goblin ancião que domina as artes das trevas. Pode convocar espíritos malignos e lançar maldições terríveis. Embora pequeno em estatura, sua inteligência e poder mágico o tornam extremamente perigoso.",
    perigo: "Médio",
    fraqueza: "Luz sagrada e sal",
    habitat: "Ruínas antigas",
    comportamento: "Inteligente e vingativo",
    status: "Ativo em cultos sombrios"
  },
  {
    name: "Fênix",
    image: "https://via.placeholder.com/200x200",
    description: "Uma criatura mítica de fogo que renasce de suas próprias cinzas. Suas penas brilham como brasas vivas e seu canto pode curar feridas e purificar almas. É um símbolo de renascimento e renovação.",
    perigo: "Baixo",
    fraqueza: "Água sagrada",
    habitat: "Vulcões ativos",
    comportamento: "Nobre e protetor",
    status: "Sagrado e protegido"
  },
  {
    name: "Kraken",
    image: krakenImg,
    description: "Um monstro marinho colossal com tentáculos que podem envolver navios inteiros. Habita as profundezas abissais e raramente emerge à superfície. Quando o faz, é um sinal de mau presságio para todos os navegantes.",
    perigo: "Alto",
    fraqueza: "Raio e magia elétrica",
    habitat: "Profundezas oceânicas",
    comportamento: "Agressivo e territorial",
    status: "Lendário e temido"
  }
];

const BestiaryGrid: React.FC<GridProps> = ({ onSelect, search, filter, hasSelection }) => {
  const filteredCreatures = mockCreatures.filter((creature) => {
    const matchesSearch = creature.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Todos" || creature.perigo === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`bestiary-grid ${hasSelection ? 'has-selection' : ''}`}>
      {filteredCreatures.map((creature, index) => (
        <BestiaryCard
          key={index}
          creature={creature}
          onClick={() => onSelect(creature)}
        />
      ))}
    </div>
  );
};

export default BestiaryGrid;
