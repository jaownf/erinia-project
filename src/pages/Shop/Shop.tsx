import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Shop.css';

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  originalPrice: number;
  currentPrice: number;
  discount: number;
  description: string;
  features: string[];
  tags: string[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Espada Flamejante do Dragão',
    image: '/src/assets/bestiary/grid-images/aranha.png',
    category: 'Armas',
    rarity: 'legendary',
    originalPrice: 2500,
    currentPrice: 1999,
    discount: 20,
    description: 'Uma espada forjada com escamas de dragão, capaz de cortar através de qualquer armadura.',
    features: ['+150 Dano de Fogo', 'Resistência ao Fogo', 'Brilha no Escuro'],
    tags: ['Arma', 'Fogo', 'Lendária'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviews: 127
  },
  {
    id: 2,
    name: 'Armadura de Cristal',
    image: '/src/assets/bestiary/grid-images/goblin.png',
    category: 'Armaduras',
    rarity: 'epic',
    originalPrice: 1800,
    currentPrice: 1440,
    discount: 20,
    description: 'Armadura feita de cristais mágicos que absorve dano mágico.',
    features: ['+200 Defesa', 'Resistência Mágica', 'Regeneração'],
    tags: ['Armadura', 'Cristal', 'Épica'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: 'Poção de Cura Superior',
    image: '/src/assets/bestiary/grid-images/kraken.png',
    category: 'Consumíveis',
    rarity: 'rare',
    originalPrice: 150,
    currentPrice: 120,
    discount: 20,
    description: 'Poção que restaura 100% da vida instantaneamente.',
    features: ['Cura Instantânea', 'Remove Venenos', 'Efeito Duradouro'],
    tags: ['Poção', 'Cura', 'Rara'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviews: 203
  },
  {
    id: 4,
    name: 'Anel do Poder',
    image: '/src/assets/bestiary/grid-images/lobisomem.png',
    category: 'Acessórios',
    rarity: 'epic',
    originalPrice: 1200,
    currentPrice: 960,
    discount: 20,
    description: 'Anel que aumenta todos os atributos do portador.',
    features: ['+50 Todos os Atributos', 'Regeneração de Mana', 'Aura de Poder'],
    tags: ['Anel', 'Poder', 'Épico'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 5,
    name: 'Escudo do Guardião',
    image: '/src/assets/bestiary/grid-images/aranha.png',
    category: 'Escudos',
    rarity: 'rare',
    originalPrice: 800,
    currentPrice: 640,
    discount: 20,
    description: 'Escudo que protege contra ataques mágicos e físicos.',
    features: ['+100 Defesa', 'Bloqueio Mágico', 'Reflexo de Dano'],
    tags: ['Escudo', 'Proteção', 'Rara'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviews: 94
  },
  {
    id: 6,
    name: 'Cajado do Arcanista',
    image: '/src/assets/bestiary/grid-images/goblin.png',
    category: 'Armas Mágicas',
    rarity: 'legendary',
    originalPrice: 3000,
    currentPrice: 2400,
    discount: 20,
    description: 'Cajado que amplifica o poder mágico do usuário.',
    features: ['+200 Poder Mágico', 'Redução de Custo de Mana', 'Magia Instantânea'],
    tags: ['Cajado', 'Magia', 'Lendária'],
    inStock: false,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviews: 78
  },
  {
    id: 7,
    name: 'Botas de Velocidade',
    image: '/src/assets/bestiary/grid-images/kraken.png',
    category: 'Calçados',
    rarity: 'uncommon',
    originalPrice: 400,
    currentPrice: 320,
    discount: 20,
    description: 'Botas que aumentam significativamente a velocidade de movimento.',
    features: ['+50 Velocidade', 'Resistência à Fadiga', 'Movimento Silencioso'],
    tags: ['Botas', 'Velocidade', 'Incomum'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    reviews: 167
  },
  {
    id: 8,
    name: 'Amuleto da Sorte',
    image: '/src/assets/bestiary/grid-images/lobisomem.png',
    category: 'Acessórios',
    rarity: 'rare',
    originalPrice: 600,
    currentPrice: 480,
    discount: 20,
    description: 'Amuleto que aumenta a chance de encontrar tesouros raros.',
    features: ['+25% Chance de Loot', 'Proteção contra Maldições', 'Aura de Sorte'],
    tags: ['Amuleto', 'Sorte', 'Rara'],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    reviews: 112
  }
];

const categories = [
  { id: 'all', name: 'Todos os Produtos', icon: '📦' },
  { id: 'Armas', name: 'Armas', icon: '⚔️' },
  { id: 'Armaduras', name: 'Armaduras', icon: '🛡️' },
  { id: 'Acessórios', name: 'Acessórios', icon: '💍' },
  { id: 'Consumíveis', name: 'Consumíveis', icon: '🧪' },
  { id: 'Armas Mágicas', name: 'Armas Mágicas', icon: '🔮' },
  { id: 'Escudos', name: 'Escudos', icon: '🛡️' },
  { id: 'Calçados', name: 'Calçados', icon: '👢' }
];

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = mockProducts.filter(product => product.isFeatured);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesRarity = selectedRarity === 'all' || product.rarity === selectedRarity;
      
      return matchesSearch && matchesCategory && matchesRarity;
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.currentPrice - b.currentPrice;
        case 'price-high':
          return b.currentPrice - a.currentPrice;
        case 'discount':
          return b.discount - a.discount;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedRarity, sortBy]);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const addToWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div className={`shop-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className="floating-particles"></div>
        <div className="ambient-light"></div>
      </div>

      {/* Header */}
      <motion.div 
        className="shop-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <h1 className="shop-title">
            <span className="title-main">Loja</span>
            <span className="title-sub">de Erinia</span>
          </h1>
          <p className="shop-subtitle">
            Equipamentos, itens e tesouros para sua jornada épica
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

      {/* Featured Carousel */}
      <motion.div 
        className="featured-carousel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="carousel-container">
          <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-slide">
                <div className="slide-content">
                  <div className="slide-image">
                    <img src={product.image} alt={product.name} />
                    <div className="slide-badges">
                      {product.isNew && <span className="badge new">Novo</span>}
                      <span className="badge discount">-{product.discount}%</span>
                    </div>
                  </div>
                  <div className="slide-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="slide-price">
                      <span className="current-price">R$ {product.currentPrice.toLocaleString()}</span>
                      <span className="original-price">R$ {product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="slide-actions">
                      <button className="btn-primary">Comprar Agora</button>
                      <button className="btn-secondary">Ver Detalhes</button>
                    </div>
              </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="carousel-prev"
            onClick={() => setCurrentSlide(prev => prev === 0 ? featuredProducts.length - 1 : prev - 1)}
          >
            ‹
          </button>
          <button 
            className="carousel-next"
            onClick={() => setCurrentSlide(prev => (prev + 1) % featuredProducts.length)}
          >
            ›
                </button>
          <div className="carousel-dots">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
            </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="shop-controls"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
          <input 
                type="text"
                className="shop-search"
                placeholder="Buscar produtos, categorias ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-icon">🔍</div>
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
            <label>Categoria</label>
            <select
              className="shop-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Raridade</label>
            <select
              className="shop-filter"
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
            >
              <option value="all">Todas as raridades</option>
              <option value="common">Comum</option>
              <option value="uncommon">Incomum</option>
              <option value="rare">Raro</option>
              <option value="epic">Épico</option>
              <option value="legendary">Lendário</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por</label>
            <select
              className="shop-filter"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nome</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="discount">Maior Desconto</option>
              <option value="rating">Melhor Avaliação</option>
          </select>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div 
        className="products-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className={`products-grid ${viewMode}`}>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="card-badges">
                  {product.isNew && <span className="badge new">Novo</span>}
                  {product.discount > 0 && <span className="badge discount">-{product.discount}%</span>}
                  <span 
                    className="badge rarity"
                    style={{ backgroundColor: getRarityColor(product.rarity) }}
                  >
                    {getRarityLabel(product.rarity)}
                  </span>
                </div>
                <div className="card-actions">
                  <button 
                    className="action-btn wishlist"
                    onClick={() => addToWishlist(product.id)}
                  >
                    {wishlist.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                  <button 
                    className="action-btn quick-view"
                    onClick={() => setSelectedProduct(product)}
                  >
                    👁️
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <div className="stars">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="rating-text">({product.reviews})</span>
                </div>
                
                <div className="product-price">
                  <span className="current-price">R$ {product.currentPrice.toLocaleString()}</span>
                  {product.discount > 0 && (
                    <span className="original-price">R$ {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <div className="product-actions">
          <button
                    className="btn-primary"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
          </button>
                </div>
              </div>
            </motion.div>
        ))}
        </div>
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="product-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
              <motion.div
              className="product-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
              
              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />
    </div>
                
                <div className="modal-info">
                  <h2>{selectedProduct.name}</h2>
                  <p>{selectedProduct.description}</p>
                  
                  <div className="modal-features">
                    <h4>Características:</h4>
                    <ul>
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
        </div>
                  
                  <div className="modal-price">
                    <span className="current-price">R$ {selectedProduct.currentPrice.toLocaleString()}</span>
                    {selectedProduct.discount > 0 && (
                      <span className="original-price">R$ {selectedProduct.originalPrice.toLocaleString()}</span>
                    )}
      </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => addToCart(selectedProduct)}
                      disabled={!selectedProduct.inStock}
                    >
                      {selectedProduct.inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => addToWishlist(selectedProduct.id)}
                    >
                      {wishlist.includes(selectedProduct.id) ? 'Remover da Lista' : 'Adicionar à Lista'}
          </button>
        </div>
      </div>
              </div>
            </motion.div>
    </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;