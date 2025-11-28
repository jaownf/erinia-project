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
    name: 'Zumbi',
    image: '/src/assets/bestiary/grid-images/zumbi.png',
    type: 'Morto-Vivo',
    rarity: 'common',
    danger: 'low',
    description: 'Um morto-vivo lento mas persistente que busca carne fresca.',
    habitat: 'Cemitérios e ruínas',
    abilities: ['Mordida Infectante', 'Resistência à Dor', 'Visão Noturna'],
    weaknesses: ['Fogo', 'Decapitação', 'Magia sagrada'],
    rewards: {
      xp: 200,
      gold: 300,
      items: ['Carne Podre', 'Osso']
    },
    stats: {
      health: 180,
      attack: 35,
      defense: 20,
      speed: 25
    },
    history: 'Zumbis são cadáveres reanimados por magia negra ou maldições.',
    lore: 'Vagam sem propósito, guiados apenas pela fome insaciável.',
    curiosities: [
      'Não sente dor',
      'Pode infectar com mordida',
      'Atrai outros zumbis',
      'Lento mas incansável',
      'Pode ser controlado por necromantes'
    ],
    size: 'Médio (1.70 metros)',
    diet: 'Carne humana',
    lifespan: 'Indefinido',
    level: 8
  },
  {
    id: 2,
    name: 'Zumbi Coto',
    image: '/src/assets/bestiary/grid-images/zumbi coto.png',
    type: 'Morto-Vivo',
    rarity: 'uncommon',
    danger: 'medium',
    description: 'Um zumbi mutilado mas ainda perigoso, rastejando em busca de presas.',
    habitat: 'Campos de batalha e cemitérios',
    abilities: ['Rastejo Silencioso', 'Garras Afiadas', 'Emboscada'],
    weaknesses: ['Fogo', 'Luz sagrada'],
    rewards: {
      xp: 350,
      gold: 500,
      items: ['Garra Necrótica', 'Fragmento Amaldiçoado']
    },
    stats: {
      health: 220,
      attack: 55,
      defense: 30,
      speed: 35
    },
    history: 'Zumbis cotos são resultado de mortes violentas e mutilações.',
    lore: 'Sua raiva os torna mais perigosos que zumbis comuns.',
    curiosities: [
      'Mais agressivo que zumbis normais',
      'Pode rastejar silenciosamente',
      'Suas garras são venenosas',
      'Embosca vítimas desavisadas',
      'Difícil de detectar no escuro'
    ],
    size: 'Médio (1.20 metros rastejando)',
    diet: 'Carne fresca',
    lifespan: 'Indefinido',
    level: 18
  },
  {
    id: 3,
    name: 'Visagem',
    image: '/src/assets/bestiary/grid-images/visagem.png',
    type: 'Espírito',
    rarity: 'rare',
    danger: 'medium',
    description: 'Um espírito aterrorizante que assume formas assustadoras.',
    habitat: 'Estradas desertas e florestas',
    abilities: ['Metamorfose', 'Medo', 'Intangibilidade'],
    weaknesses: ['Coragem', 'Orações', 'Amuletos'],
    rewards: {
      xp: 1600,
      gold: 2400,
      items: ['Essência Espectral', 'Véu Fantasmagórico']
    },
    stats: {
      health: 400,
      attack: 70,
      defense: 40,
      speed: 80
    },
    history: 'Visagens são espíritos que se manifestam para assustar os vivos.',
    lore: 'Podem assumir formas terríveis para causar pânico.',
    curiosities: [
      'Muda de forma constantemente',
      'Alimenta-se do medo',
      'Aparece em noites sem lua',
      'Pode ser afastada com fé',
      'Raramente causa dano físico'
    ],
    size: 'Variável',
    diet: 'Medo',
    lifespan: 'Eterno',
    level: 35
  },
  {
    id: 4,
    name: 'Draconius Ivo',
    image: '/src/assets/bestiary/grid-images/Draconius ivo.png',
    type: 'Dragão Celestial',
    rarity: 'epic',
    danger: 'high',
    description: 'Um dragão celestial que brilha com luz divina.',
    habitat: 'Picos montanhosos',
    abilities: ['Sopro de Luz', 'Voo', 'Cura'],
    weaknesses: ['Escuridão', 'Magia sombria'],
    rewards: {
      xp: 3500,
      gold: 6000,
      items: ['Escama Luminosa', 'Cristal Celestial']
    },
    stats: {
      health: 850,
      attack: 130,
      defense: 100,
      speed: 105
    },
    history: 'Draconius Ivo é um dragão sagrado que protege os inocentes.',
    lore: 'Nascido da luz das estrelas, traz esperança onde há desespero.',
    curiosities: [
      'Suas escamas brilham como estrelas',
      'Pode curar ferimentos graves',
      'Só aparece para os puros de coração',
      'Seu rugido afasta as trevas',
      'Guardião de locais sagrados'
    ],
    size: 'Grande (12-15 metros)',
    diet: 'Energia celestial',
    lifespan: 'Imortal',
    level: 70
  },
  {
    id: 5,
    name: 'Alma Penada',
    image: '/src/assets/bestiary/grid-images/alma penada.png',
    type: 'Espírito',
    rarity: 'uncommon',
    danger: 'low',
    description: 'Um espírito atormentado que vaga em busca de redenção.',
    habitat: 'Cemitérios e locais assombrados',
    abilities: ['Intangibilidade', 'Lamento', 'Possessão Fraca'],
    weaknesses: ['Exorcismo', 'Sal', 'Luz sagrada'],
    rewards: {
      xp: 600,
      gold: 900,
      items: ['Ectoplasma', 'Memória Perdida']
    },
    stats: {
      health: 250,
      attack: 50,
      defense: 20,
      speed: 75
    },
    history: 'Almas que não encontraram paz após a morte.',
    lore: 'Vagam eternamente até resolverem seus assuntos pendentes.',
    curiosities: [
      'Não pode ser ferida por armas físicas',
      'Seu lamento causa tristeza',
      'Aparece em noites de neblina',
      'Busca ajuda dos vivos',
      'Pode ser libertada com rituais'
    ],
    size: 'Médio (1.5-1.8 metros)',
    diet: 'Nenhuma',
    lifespan: 'Eterno (até ser libertado)',
    level: 22
  },
  {
    id: 6,
    name: 'Caipora',
    image: '/src/assets/bestiary/grid-images/Caipora.png',
    type: 'Protetor da Floresta',
    rarity: 'epic',
    danger: 'medium',
    description: 'Guardião das matas que protege os animais e pune caçadores gananciosos.',
    habitat: 'Florestas densas',
    abilities: ['Controle Animal', 'Ilusões', 'Velocidade Sobrenatural'],
    weaknesses: ['Fumo de corda', 'Oferendas'],
    rewards: {
      xp: 2800,
      gold: 4200,
      items: ['Amuleto da Floresta', 'Essência Natural']
    },
    stats: {
      health: 550,
      attack: 85,
      defense: 70,
      speed: 110
    },
    history: 'O Caipora é um dos mais antigos protetores das florestas brasileiras.',
    lore: 'Montado em seu porco selvagem, confunde caçadores e protege a fauna.',
    curiosities: [
      'Anda montado em um porco do mato',
      'Pode se tornar invisível',
      'Aprecia oferendas de fumo',
      'Protege especialmente animais jovens',
      'Pode criar ilusões na floresta'
    ],
    size: 'Médio (1.2-1.5 metros)',
    diet: 'Frutas e raízes',
    lifespan: 'Imortal',
    level: 48
  },
  {
    id: 7,
    name: 'Capelantha',
    image: '/src/assets/bestiary/grid-images/Capelantha.png',
    type: 'Criatura Mística',
    rarity: 'rare',
    danger: 'medium',
    description: 'Uma criatura enigmática que habita as profundezas das cavernas.',
    habitat: 'Cavernas místicas',
    abilities: ['Camuflagem', 'Veneno', 'Visão no Escuro'],
    weaknesses: ['Luz intensa', 'Fogo'],
    rewards: {
      xp: 1900,
      gold: 2800,
      items: ['Cristal de Caverna', 'Escama Brilhante']
    },
    stats: {
      health: 480,
      attack: 75,
      defense: 65,
      speed: 70
    },
    history: 'Capelanthas são criaturas raras que vivem em simbiose com as cavernas.',
    lore: 'Dizem que guardam segredos ancestrais nas profundezas.',
    curiosities: [
      'Suas escamas brilham no escuro',
      'Pode se camuflar perfeitamente',
      'Vive em colônias subterrâneas',
      'Seu veneno causa alucinações',
      'Raramente vista por humanos'
    ],
    size: 'Médio (1.5-2 metros)',
    diet: 'Insetos e minerais',
    lifespan: '80-120 anos',
    level: 38
  },
  {
    id: 8,
    name: 'Draconius Iwari',
    image: '/src/assets/bestiary/grid-images/Draconius iwari.png',
    type: 'Dragão Elemental',
    rarity: 'legendary',
    danger: 'extreme',
    description: 'Um dragão lendário que controla as águas e tempestades.',
    habitat: 'Lagos profundos',
    abilities: ['Controle de Água', 'Tempestade', 'Voo'],
    weaknesses: ['Raios', 'Secura'],
    rewards: {
      xp: 5500,
      gold: 11000,
      items: ['Escama Aquática', 'Cristal de Tempestade']
    },
    stats: {
      health: 1100,
      attack: 140,
      defense: 110,
      speed: 85
    },
    history: 'Iwari é um dos dragões elementais mais poderosos de Erinia.',
    lore: 'Nascido das profundezas oceânicas, comanda as tempestades.',
    curiosities: [
      'Pode respirar debaixo d\'água',
      'Suas escamas refletem a luz lunar',
      'Controla marés e correntes',
      'Raramente visto em terra',
      'Guardião de tesouros submersos'
    ],
    size: 'Gigante (18-25 metros)',
    diet: 'Peixes gigantes',
    lifespan: 'Imortal',
    level: 88
  },
  {
    id: 9,
    name: 'Draconius Yakir',
    image: '/src/assets/bestiary/grid-images/Draconius yakir.png',
    type: 'Dragão Sombrio',
    rarity: 'legendary',
    danger: 'extreme',
    description: 'Dragão das sombras que se alimenta de pesadelos e medos.',
    habitat: 'Dimensão das Sombras',
    abilities: ['Manipulação de Sombras', 'Voo', 'Drenar Vida'],
    weaknesses: ['Luz sagrada', 'Magia divina'],
    rewards: {
      xp: 5800,
      gold: 12000,
      items: ['Essência Sombria', 'Garra das Trevas']
    },
    stats: {
      health: 1050,
      attack: 160,
      defense: 100,
      speed: 95
    },
    history: 'Yakir é temido como o dragão que habita os pesadelos.',
    lore: 'Nascido da escuridão primordial, se alimenta do medo.',
    curiosities: [
      'Pode se tornar intangível',
      'Vive entre dimensões',
      'Seus olhos hipnotizam',
      'Causa pesadelos em quem o vê',
      'Raramente derrotado'
    ],
    size: 'Gigante (16-22 metros)',
    diet: 'Energia vital',
    lifespan: 'Eterno',
    level: 92
  },
  {
    id: 10,
    name: 'Saci das Planícies',
    image: '/src/assets/bestiary/grid-images/saci das planices.png',
    type: 'Criatura Folclórica',
    rarity: 'uncommon',
    danger: 'low',
    description: 'Um saci travesso que prega peças em viajantes desavisados.',
    habitat: 'Planícies e campos',
    abilities: ['Teleporte', 'Ilusões', 'Controle de Vento'],
    weaknesses: ['Peneira', 'Nó de corda'],
    rewards: {
      xp: 450,
      gold: 700,
      items: ['Cachimbo Mágico', 'Gorro Vermelho']
    },
    stats: {
      health: 200,
      attack: 35,
      defense: 25,
      speed: 120
    },
    history: 'O Saci é uma das criaturas mais conhecidas do folclore brasileiro.',
    lore: 'Com seu cachimbo e gorro vermelho, adora pregar peças.',
    curiosities: [
      'Tem apenas uma perna',
      'Pode desaparecer em redemoinhos',
      'Adora fazer tranças em cavalos',
      'Seu gorro é fonte de seus poderes',
      'Pode ser capturado com uma peneira'
    ],
    size: 'Pequeno (0.9-1.1 metros)',
    diet: 'Onívoro',
    lifespan: 'Imortal',
    level: 16
  },
  {
    id: 11,
    name: 'Boiúna',
    image: '/src/assets/bestiary/grid-images/boiuna.png',
    type: 'Serpente Gigante',
    rarity: 'epic',
    danger: 'extreme',
    description: 'Uma serpente colossal que habita os rios da Amazônia.',
    habitat: 'Rios profundos',
    abilities: ['Constrição', 'Natação', 'Regeneração'],
    weaknesses: ['Fogo', 'Magia'],
    rewards: {
      xp: 3500,
      gold: 5500,
      items: ['Escama de Boiúna', 'Veneno Primordial']
    },
    stats: {
      health: 950,
      attack: 125,
      defense: 95,
      speed: 60
    },
    history: 'A Boiúna é uma das criaturas mais antigas da Amazônia.',
    lore: 'Dizem que pode engolir embarcações inteiras.',
    curiosities: [
      'Pode ter até 50 metros de comprimento',
      'Seus olhos brilham como tochas',
      'Protege tesouros submersos',
      'Pode criar redemoinhos',
      'É temida por todos os ribeirinhos'
    ],
    size: 'Colossal (30-50 metros)',
    diet: 'Carnívoro (grandes animais)',
    lifespan: '500-1000 anos',
    level: 68
  },
  {
    id: 12,
    name: 'Corpo Seco',
    image: '/src/assets/bestiary/grid-images/corpo seco.png',
    type: 'Morto-Vivo',
    rarity: 'rare',
    danger: 'high',
    description: 'Um cadáver ressecado que vaga eternamente como punição.',
    habitat: 'Cemitérios e terras amaldiçoadas',
    abilities: ['Toque Dessecante', 'Resistência', 'Maldição'],
    weaknesses: ['Água benta', 'Fogo'],
    rewards: {
      xp: 2300,
      gold: 3400,
      items: ['Osso Amaldiçoado', 'Pó Ressecado']
    },
    stats: {
      health: 650,
      attack: 90,
      defense: 85,
      speed: 40
    },
    history: 'Corpo Seco é a punição para aqueles que maltrataram a própria mãe.',
    lore: 'Condenado a vagar sem encontrar paz ou água.',
    curiosities: [
      'Não pode beber ou comer',
      'Resseca tudo que toca',
      'Busca vingança contra os vivos',
      'Imune a ataques físicos comuns',
      'Sua presença seca plantas'
    ],
    size: 'Médio (1.70 metros)',
    diet: 'Nenhuma',
    lifespan: 'Eterno (até ser destruído)',
    level: 50
  },
  {
    id: 13,
    name: 'Mapiguari',
    image: '/src/assets/bestiary/grid-images/mapiguari.png',
    type: 'Criatura Lendária',
    rarity: 'legendary',
    danger: 'extreme',
    description: 'Uma criatura colossal e aterrorizante da Amazônia.',
    habitat: 'Floresta Amazônica',
    abilities: ['Força Descomunal', 'Pele Impenetrável', 'Rugido Aterrorizante'],
    weaknesses: ['Olhos', 'Magia antiga'],
    rewards: {
      xp: 6500,
      gold: 13000,
      items: ['Couro Impenetrável', 'Garra Colossal']
    },
    stats: {
      health: 1400,
      attack: 170,
      defense: 150,
      speed: 50
    },
    history: 'O Mapiguari é uma das criaturas mais temidas da Amazônia.',
    lore: 'Dizem que é indestrutível e devora tudo em seu caminho.',
    curiosities: [
      'Sua pele repele flechas',
      'Pode derrubar árvores gigantes',
      'Seu rugido paralisa de medo',
      'Raramente visto',
      'Lendas dizem que protege a floresta'
    ],
    size: 'Colossal (5-7 metros)',
    diet: 'Carnívoro',
    lifespan: 'Desconhecido',
    level: 85
  },
  {
    id: 14,
    name: 'Perna Cabeluda',
    image: '/src/assets/bestiary/grid-images/perna cabeluda.png',
    type: 'Criatura Folclórica',
    rarity: 'uncommon',
    danger: 'low',
    description: 'Uma criatura bizarra que é literalmente uma perna peluda.',
    habitat: 'Florestas e matas',
    abilities: ['Chute Poderoso', 'Salto Alto', 'Velocidade'],
    weaknesses: ['Desequilíbrio', 'Armadilhas'],
    rewards: {
      xp: 500,
      gold: 700,
      items: ['Pelo Estranho', 'Unha Grande']
    },
    stats: {
      health: 240,
      attack: 60,
      defense: 35,
      speed: 85
    },
    history: 'A Perna Cabeluda é uma das criaturas mais bizarras do folclore.',
    lore: 'Ninguém sabe de onde veio ou por que existe.',
    curiosities: [
      'Literalmente apenas uma perna',
      'Pula com força surpreendente',
      'Coberta de pelos grossos',
      'Aparece sem aviso',
      'Desaparece misteriosamente'
    ],
    size: 'Médio (1.5 metros)',
    diet: 'Desconhecido',
    lifespan: 'Desconhecido',
    level: 20
  },
  {
    id: 15,
    name: 'Uaiuara',
    image: '/src/assets/bestiary/grid-images/uaiuara.png',
    type: 'Espírito Aquático',
    rarity: 'epic',
    danger: 'high',
    description: 'Um espírito protetor das águas amazônicas.',
    habitat: 'Rios e lagos da Amazônia',
    abilities: ['Controle de Água', 'Transformação', 'Cura'],
    weaknesses: ['Poluição', 'Desrespeito'],
    rewards: {
      xp: 3200,
      gold: 5000,
      items: ['Lágrima de Uaiuara', 'Essência Aquática']
    },
    stats: {
      health: 750,
      attack: 90,
      defense: 80,
      speed: 95
    },
    history: 'Uaiuara é uma protetora ancestral das águas.',
    lore: 'Pune aqueles que poluem e desrespeitam os rios.',
    curiosities: [
      'Pode assumir forma humana',
      'Protege peixes e animais aquáticos',
      'Suas lágrimas curam doenças',
      'Canta melodias hipnotizantes',
      'Pode criar ondas gigantes'
    ],
    size: 'Médio (1.65 metros)',
    diet: 'Nenhuma',
    lifespan: 'Imortal',
    level: 60
  },
  {
    id: 16,
    name: 'GM',
    image: '/src/assets/bestiary/grid-images/GM.png',
    type: 'Entidade Misteriosa',
    rarity: 'legendary',
    danger: 'extreme',
    description: 'Uma entidade enigmática que observa e manipula o destino.',
    habitat: 'Plano Astral',
    abilities: ['Onisciência', 'Manipulação da Realidade', 'Teleporte'],
    weaknesses: ['Desconhecidas'],
    rewards: {
      xp: 10000,
      gold: 20000,
      items: ['Fragmento do Destino', 'Olho que Tudo Vê']
    },
    stats: {
      health: 9999,
      attack: 200,
      defense: 200,
      speed: 150
    },
    history: 'Uma entidade além da compreensão mortal.',
    lore: 'Alguns dizem que GM é o próprio tecido da realidade.',
    curiosities: [
      'Conhece todos os eventos passados e futuros',
      'Pode alterar a realidade',
      'Nunca foi verdadeiramente visto',
      'Comunica-se através de símbolos',
      'Sua verdadeira forma é incompreensível'
    ],
    size: 'Variável',
    diet: 'Nenhuma',
    lifespan: 'Eterno',
    level: 99
  },
  {
    id: 17,
    name: 'Cangaceiro Chefe',
    image: '/src/assets/bestiary/grid-images/cangaceiro chefe.png',
    type: 'Humano',
    rarity: 'rare',
    danger: 'high',
    description: 'Líder temido de um bando de cangaceiros do sertão.',
    habitat: 'Sertão nordestino',
    abilities: ['Liderança', 'Tiro Certeiro', 'Estratégia'],
    weaknesses: ['Emboscadas', 'Traição'],
    rewards: {
      xp: 1800,
      gold: 2800,
      items: ['Rifle Antigo', 'Chapéu de Couro']
    },
    stats: {
      health: 620,
      attack: 105,
      defense: 70,
      speed: 75
    },
    history: 'Um líder carismático que comanda seu bando com punho de ferro.',
    lore: 'Sua fama se espalha por todo o sertão.',
    curiosities: [
      'Nunca erra um tiro',
      'Tem cicatrizes de muitas batalhas',
      'Protege os pobres do sertão',
      'Procurado pelas autoridades',
      'Conhece todos os esconderijos da região'
    ],
    size: 'Médio (1.75 metros)',
    diet: 'Onívoro',
    lifespan: '60-80 anos',
    level: 44
  },
  {
    id: 18,
    name: 'Cangaceiro',
    image: '/src/assets/bestiary/grid-images/cangaceiro normal.png',
    type: 'Humano',
    rarity: 'common',
    danger: 'medium',
    description: 'Um cangaceiro comum que segue as ordens de seu líder.',
    habitat: 'Sertão nordestino',
    abilities: ['Tiro', 'Sobrevivência', 'Emboscada'],
    weaknesses: ['Superioridade numérica'],
    rewards: {
      xp: 350,
      gold: 550,
      items: ['Munição', 'Cantil']
    },
    stats: {
      health: 280,
      attack: 65,
      defense: 45,
      speed: 70
    },
    history: 'Cangaceiros são guerreiros do sertão que vivem fora da lei.',
    lore: 'Muitos se tornaram cangaceiros por necessidade.',
    curiosities: [
      'Usa roupas de couro para proteção',
      'Conhece bem o terreno',
      'Leal ao seu bando',
      'Sobrevive em condições extremas',
      'Segue um código de honra'
    ],
    size: 'Médio (1.70 metros)',
    diet: 'Onívoro',
    lifespan: '50-70 anos',
    level: 18
  },
  {
    id: 19,
    name: 'Jagunço Chefe',
    image: '/src/assets/bestiary/grid-images/jagunço chefe.png',
    type: 'Humano',
    rarity: 'rare',
    danger: 'high',
    description: 'Líder brutal de jagunços que controla territórios com mão de ferro.',
    habitat: 'Sertão e fazendas',
    abilities: ['Intimidação', 'Combate Corpo a Corpo', 'Comando'],
    weaknesses: ['Lei', 'Justiça'],
    rewards: {
      xp: 1700,
      gold: 2600,
      items: ['Facão Enferrujado', 'Botas de Couro']
    },
    stats: {
      health: 600,
      attack: 100,
      defense: 75,
      speed: 70
    },
    history: 'Jagunços chefes são contratados por fazendeiros para proteger terras.',
    lore: 'Sua reputação de brutalidade precede sua chegada.',
    curiosities: [
      'Comanda com medo e respeito',
      'Nunca recua de uma luta',
      'Tem muitos inimigos',
      'Conhece todos os truques sujos',
      'Leal apenas ao dinheiro'
    ],
    size: 'Médio (1.80 metros)',
    diet: 'Onívoro',
    lifespan: '50-70 anos',
    level: 42
  },
  {
    id: 20,
    name: 'Jagunço',
    image: '/src/assets/bestiary/grid-images/jagunço normal.png',
    type: 'Humano',
    rarity: 'common',
    danger: 'medium',
    description: 'Um capanga contratado para fazer o trabalho sujo.',
    habitat: 'Fazendas e vilas',
    abilities: ['Combate', 'Intimidação', 'Furtividade'],
    weaknesses: ['Superioridade numérica'],
    rewards: {
      xp: 320,
      gold: 500,
      items: ['Arma Improvisada', 'Moedas']
    },
    stats: {
      health: 260,
      attack: 60,
      defense: 40,
      speed: 65
    },
    history: 'Jagunços são contratados para proteger propriedades e intimidar.',
    lore: 'Trabalham por dinheiro, sem questionar ordens.',
    curiosities: [
      'Segue ordens sem questionar',
      'Usa táticas de intimidação',
      'Conhece o terreno local',
      'Evita confrontos justos',
      'Sempre trabalha em grupo'
    ],
    size: 'Médio (1.72 metros)',
    diet: 'Onívoro',
    lifespan: '50-65 anos',
    level: 16
  },
  {
    id: 21,
    name: 'Canhambora',
    image: '/src/assets/bestiary/grid-images/canhambora normal.png',
    type: 'Criatura Bestial',
    rarity: 'uncommon',
    danger: 'medium',
    description: 'Uma criatura selvagem que habita as matas fechadas.',
    habitat: 'Matas densas',
    abilities: ['Força', 'Resistência', 'Faro Aguçado'],
    weaknesses: ['Fogo', 'Armadilhas'],
    rewards: {
      xp: 550,
      gold: 750,
      items: ['Pele Grossa', 'Garra Afiada']
    },
    stats: {
      health: 380,
      attack: 70,
      defense: 60,
      speed: 55
    },
    history: 'Canhamoras são criaturas territoriais e agressivas.',
    lore: 'Protegem ferozmente seu território.',
    curiosities: [
      'Marca território com arranhões',
      'Caça em duplas',
      'Tem olfato excepcional',
      'Pode rastrear por quilômetros',
      'Evita água corrente'
    ],
    size: 'Grande (2-2.5 metros)',
    diet: 'Carnívoro',
    lifespan: '30-50 anos',
    level: 26
  },
  {
    id: 22,
    name: 'Canhambora Chefe',
    image: '/src/assets/bestiary/grid-images/canhambora chefe.png',
    type: 'Criatura Bestial',
    rarity: 'rare',
    danger: 'high',
    description: 'O líder alfa das canhamoras, maior e mais feroz.',
    habitat: 'Matas profundas',
    abilities: ['Força Brutal', 'Rugido Intimidador', 'Regeneração'],
    weaknesses: ['Fogo intenso', 'Armadilhas pesadas'],
    rewards: {
      xp: 2100,
      gold: 3300,
      items: ['Pele Reforçada', 'Garra Gigante', 'Troféu Alpha']
    },
    stats: {
      health: 820,
      attack: 115,
      defense: 95,
      speed: 65
    },
    history: 'O Mega Crioulo é o alfa de seu bando, respeitado e temido.',
    lore: 'Apenas os mais corajosos ousam desafiá-lo.',
    curiosities: [
      'Lidera bandos de canhamoras',
      'Seu rugido paralisa presas',
      'Cicatrizes de inúmeras batalhas',
      'Protege seu território ferozmente',
      'Pode regenerar ferimentos leves'
    ],
    size: 'Gigante (3-3.5 metros)',
    diet: 'Carnívoro',
    lifespan: '60-80 anos',
    level: 52
  },
  {
    id: 23,
    name: 'Capellobo',
    image: '/src/assets/bestiary/grid-images/capellobo.png',
    type: 'Criatura Híbrida',
    rarity: 'rare',
    danger: 'high',
    description: 'Um híbrido misterioso entre homem e lobo das lendas.',
    habitat: 'Florestas e montanhas',
    abilities: ['Transformação Parcial', 'Garras', 'Velocidade'],
    weaknesses: ['Prata', 'Magia'],
    rewards: {
      xp: 2000,
      gold: 3100,
      items: ['Pelo Místico', 'Dente Encantado']
    },
    stats: {
      health: 700,
      attack: 100,
      defense: 80,
      speed: 90
    },
    history: 'Capellobos são resultado de maldições antigas.',
    lore: 'Mantêm parte de sua consciência humana.',
    curiosities: [
      'Pode controlar sua transformação',
      'Mais inteligente que lobisomens',
      'Vive em solidão',
      'Busca cura para sua maldição',
      'Pode se comunicar com lobos'
    ],
    size: 'Grande (2.2 metros)',
    diet: 'Carnívoro',
    lifespan: '200-300 anos',
    level: 47
  },
  {
    id: 24,
    name: 'Cupendipe',
    image: '/src/assets/bestiary/grid-images/cupendipe.png',
    type: 'Criatura Aquática',
    rarity: 'epic',
    danger: 'high',
    description: 'Uma criatura anfíbia que protege os rios e lagos.',
    habitat: 'Rios e lagos',
    abilities: ['Natação', 'Controle de Água', 'Camuflagem'],
    weaknesses: ['Terra seca', 'Calor extremo'],
    rewards: {
      xp: 2700,
      gold: 4100,
      items: ['Escama Aquática', 'Pérola do Rio']
    },
    stats: {
      health: 720,
      attack: 95,
      defense: 88,
      speed: 85
    },
    history: 'Cupendipes são guardiões ancestrais das águas doces.',
    lore: 'Protegem os rios da poluição e da ganância.',
    curiosities: [
      'Pode respirar na água e em terra',
      'Suas escamas mudam de cor',
      'Cria redemoinhos para se defender',
      'Vive em grutas subaquáticas',
      'Pode se comunicar com peixes'
    ],
    size: 'Grande (2.5 metros)',
    diet: 'Peixes e plantas aquáticas',
    lifespan: '150-250 anos',
    level: 52
  },
  {
    id: 25,
    name: 'Drosera',
    image: '/src/assets/bestiary/grid-images/drosera.png',
    type: 'Planta Carnívora',
    rarity: 'uncommon',
    danger: 'medium',
    description: 'Uma planta carnívora menor mas igualmente perigosa.',
    habitat: 'Pântanos',
    abilities: ['Digestão', 'Tentáculos Pequenos', 'Camuflagem'],
    weaknesses: ['Fogo', 'Herbicidas'],
    rewards: {
      xp: 700,
      gold: 1000,
      items: ['Seiva', 'Folha Pegajosa']
    },
    stats: {
      health: 320,
      attack: 55,
      defense: 70,
      speed: 5
    },
    history: 'Droseras são plantas carnívoras comuns em pântanos.',
    lore: 'Capturam insetos e pequenos animais.',
    curiosities: [
      'Suas folhas brilham ao sol',
      'Pode capturar múltiplas presas',
      'Digere lentamente',
      'Cresce em grupos',
      'Atrai presas com cores vibrantes'
    ],
    size: 'Pequeno (0.5-1 metro)',
    diet: 'Insetos e pequenos animais',
    lifespan: '50-100 anos',
    level: 24
  },
  {
    id: 26,
    name: 'Drosera Assu',
    image: '/src/assets/bestiary/grid-images/drosera assu.png',
    type: 'Planta Carnívora',
    rarity: 'rare',
    danger: 'high',
    description: 'Uma planta carnívora gigante que devora criaturas inteiras.',
    habitat: 'Pântanos e áreas úmidas',
    abilities: ['Digestão Ácida', 'Tentáculos', 'Atração'],
    weaknesses: ['Fogo', 'Gelo'],
    rewards: {
      xp: 2100,
      gold: 3000,
      items: ['Seiva Ácida', 'Semente Rara']
    },
    stats: {
      health: 800,
      attack: 85,
      defense: 110,
      speed: 10
    },
    history: 'Drosera Assu é uma evolução gigante das plantas carnívoras.',
    lore: 'Atrai presas com seu néctar doce antes de devorá-las.',
    curiosities: [
      'Pode digerir até grandes animais',
      'Suas folhas são pegajosas',
      'Cresce lentamente',
      'Pode viver séculos',
      'Suas sementes são valiosas'
    ],
    size: 'Gigante (4-6 metros)',
    diet: 'Carnívoro (qualquer criatura)',
    lifespan: '300-500 anos',
    level: 46
  },
  {
    id: 27,
    name: 'Gogó de Sola',
    image: '/src/assets/bestiary/grid-images/Gogó de sola.png',
    type: 'Criatura Folclórica',
    rarity: 'uncommon',
    danger: 'low',
    description: 'Uma criatura travessa que rouba objetos e prega peças.',
    habitat: 'Vilarejos e fazendas',
    abilities: ['Invisibilidade', 'Furto', 'Velocidade'],
    weaknesses: ['Sal grosso', 'Ferro'],
    rewards: {
      xp: 400,
      gold: 600,
      items: ['Objeto Roubado', 'Pó de Sumiço']
    },
    stats: {
      health: 180,
      attack: 45,
      defense: 30,
      speed: 95
    },
    history: 'Gogó de Sola é conhecido por suas travessuras em fazendas.',
    lore: 'Dizem que é o espírito de um ladrão que nunca foi pego.',
    curiosities: [
      'Adora objetos brilhantes',
      'Deixa pegadas invertidas',
      'Só age à noite',
      'Tem medo de sal grosso',
      'Pode se tornar invisível'
    ],
    size: 'Pequeno (0.8-1 metro)',
    diet: 'Onívoro',
    lifespan: '50-80 anos',
    level: 15
  },
  {
    id: 28,
    name: 'Homem do Saco',
    image: '/src/assets/bestiary/grid-images/Homem do saco.png',
    type: 'Criatura das Sombras',
    rarity: 'rare',
    danger: 'high',
    description: 'Uma figura sinistra que sequestra crianças desobedientes.',
    habitat: 'Ruas escuras e becos',
    abilities: ['Furtividade', 'Captura', 'Intimidação'],
    weaknesses: ['Luz', 'Coragem'],
    rewards: {
      xp: 2100,
      gold: 3200,
      items: ['Saco Amaldiçoado', 'Sombra Capturada']
    },
    stats: {
      health: 680,
      attack: 95,
      defense: 75,
      speed: 65
    },
    history: 'Uma lenda urbana que se tornou real nas sombras.',
    lore: 'O Homem do Saco é o pesadelo de toda criança desobediente.',
    curiosities: [
      'Seu saco nunca enche',
      'Só aparece à noite',
      'Pode sentir o medo',
      'Evita lugares iluminados',
      'Ninguém sabe o que há dentro do saco'
    ],
    size: 'Grande (2-2.5 metros)',
    diet: 'Desconhecido',
    lifespan: 'Desconhecido',
    level: 42
  },
  {
    id: 29,
    name: 'Gorjala',
    image: '/src/assets/bestiary/grid-images/gorjala.png',
    type: 'Criatura Voadora',
    rarity: 'epic',
    danger: 'high',
    description: 'Uma criatura alada que domina os céus com sua presença imponente.',
    habitat: 'Montanhas altas',
    abilities: ['Voo Ágil', 'Grito Sônico', 'Visão Aguçada'],
    weaknesses: ['Tempestades', 'Armas de longo alcance'],
    rewards: {
      xp: 2900,
      gold: 4500,
      items: ['Pena Rara', 'Garra Afiada']
    },
    stats: {
      health: 680,
      attack: 105,
      defense: 75,
      speed: 115
    },
    history: 'Gorjalas são predadores aéreos temidos por sua agilidade.',
    lore: 'Dominam os céus e caçam com precisão mortal.',
    curiosities: [
      'Pode voar por horas sem descanso',
      'Seu grito atordoa inimigos',
      'Visão aguçada detecta presas a quilômetros',
      'Nidifica em picos inacessíveis',
      'Caça em mergulho veloz'
    ],
    size: 'Grande (3 metros de envergadura)',
    diet: 'Carnívoro',
    lifespan: '80-120 anos',
    level: 54
  },
  {
    id: 30,
    name: 'Guará',
    image: '/src/assets/bestiary/grid-images/guará.png',
    type: 'Criatura Mística',
    rarity: 'epic',
    danger: 'medium',
    description: 'Uma criatura elegante e misteriosa das florestas brasileiras.',
    habitat: 'Florestas tropicais',
    abilities: ['Agilidade', 'Camuflagem', 'Sentidos Aguçados'],
    weaknesses: ['Armadilhas', 'Magia'],
    rewards: {
      xp: 2400,
      gold: 3800,
      items: ['Pelo Vermelho', 'Essência da Floresta']
    },
    stats: {
      health: 520,
      attack: 80,
      defense: 65,
      speed: 100
    },
    history: 'O Guará é um símbolo da fauna brasileira, raro e belo.',
    lore: 'Sua pelagem vermelha brilha sob a luz do sol.',
    curiosities: [
      'Sua cor vem de sua dieta',
      'Extremamente ágil',
      'Vive em pequenos grupos',
      'Caça peixes e pequenos animais',
      'Símbolo de preservação'
    ],
    size: 'Médio (1.5 metros)',
    diet: 'Onívoro',
    lifespan: '15-20 anos',
    level: 40
  },
  {
    id: 31,
    name: 'Isquelé',
    image: '/src/assets/bestiary/grid-images/isquelé.png',
    type: 'Morto-Vivo',
    rarity: 'uncommon',
    danger: 'medium',
    description: 'Um esqueleto animado que guarda tesouros antigos.',
    habitat: 'Ruínas e tumbas',
    abilities: ['Imunidade à Dor', 'Espadachim', 'Visão Noturna'],
    weaknesses: ['Armas contundentes', 'Magia sagrada'],
    rewards: {
      xp: 750,
      gold: 1100,
      items: ['Osso Antigo', 'Espada Enferrujada']
    },
    stats: {
      health: 300,
      attack: 70,
      defense: 45,
      speed: 60
    },
    history: 'Isquelés são guerreiros mortos reanimados para proteger tesouros.',
    lore: 'Continuam sua vigília mesmo após a morte.',
    curiosities: [
      'Não sente dor',
      'Luta com técnica antiga',
      'Guarda tesouros há séculos',
      'Pode ser desfeito com magia',
      'Obedece comandos de necromantes'
    ],
    size: 'Médio (1.70 metros)',
    diet: 'Nenhuma',
    lifespan: 'Indefinido',
    level: 28
  },
  {
    id: 32,
    name: 'Labatut',
    image: '/src/assets/bestiary/grid-images/labatut.png',
    type: 'Criatura Bestial',
    rarity: 'rare',
    danger: 'high',
    description: 'Uma fera poderosa que habita as regiões mais selvagens.',
    habitat: 'Selvas densas',
    abilities: ['Força Brutal', 'Caça Furtiva', 'Rugido Intimidador'],
    weaknesses: ['Fogo', 'Armadilhas'],
    rewards: {
      xp: 2200,
      gold: 3400,
      items: ['Pele Resistente', 'Presa Afiada']
    },
    stats: {
      health: 780,
      attack: 110,
      defense: 85,
      speed: 75
    },
    history: 'Labatuts são predadores de topo nas selvas mais densas.',
    lore: 'Sua presença é sentida antes de ser vista.',
    curiosities: [
      'Caça sozinho',
      'Marca território com arranhões profundos',
      'Seu rugido paralisa presas pequenas',
      'Pele extremamente resistente',
      'Raramente visto por humanos'
    ],
    size: 'Grande (2.8 metros)',
    diet: 'Carnívoro',
    lifespan: '40-60 anos',
    level: 48
  }
];

const Bestiary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedDanger, setSelectedDanger] = useState('');
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [sortBy, setSortBy] = useState('name');
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

  useEffect(() => {
    if (selectedCreature) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCreature]);

  return (
    <div className="bestiary-container">
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
          <div className="logo-container">
            <img 
              src="/src/assets/logo/logo-erinia.png" 
              alt="Erinia Logo" 
              className="erinia-logo"
            />
            <h1 className="bestiary-title">
              <span className="title-main">Bestiário</span>
            </h1>
          </div>
          <p className="bestiary-subtitle">
            Explore as criaturas misteriosas que habitam o mundo de Erinia
          </p>
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
                <motion.svg
                  animate={{ scale: searchTerm ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </motion.svg>
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
