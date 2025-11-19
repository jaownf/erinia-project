# Estrutura de Assets - Erinia

Esta pasta contém todos os assets (imagens, ícones, etc.) organizados por seção do site para facilitar a manutenção.

## 📁 Estrutura de Pastas

### 🦅 **bestiary/**
- **grid-images/**: Imagens para os cards do grid
  - `lobisomem.png`
  - `aranha.png`
  - `goblin.png`
  - `kraken.png`
- **detail-images/**: Imagens para a seção de detalhes (em desenvolvimento)
  - *Placeholder temporário ativo*
- **backgrounds/**: Fundos específicos do bestiário
  - `background-bestiary.png`

### 🏠 **hero/**
- **images/**: Imagens da seção hero/landing
  - `scroll-down.png`
- **backgrounds/**: Fundos da seção hero
  - `body-back.png`
  - `first-transition.png`
  - `landing-back.png`

### 🦶 **footer/**
- **social/**: Ícones das redes sociais
  - `facebook-logo.png`
  - `twitter-logo.png`
  - `whatsapp-logo.png`
- **backgrounds/**: Fundos do footer
  - `footer-back.png`

### 🎯 **general/**
- Imagens de uso geral em múltiplas seções
  - `bestiary.png`
  - `card-image.png`
  - `map.png`

### 🏷️ **logo/**
- Logos e identidade visual
  - `logo-erinia.png`

## 📋 Como Adicionar Novas Imagens

1. **Para cards do bestiário**: Adicione em `bestiary/grid-images/`
2. **Para detalhes do bestiário**: Adicione em `bestiary/detail-images/` (quando implementado)
3. **Para fundos específicos**: Adicione na pasta `backgrounds/` da seção correspondente
4. **Para imagens gerais**: Adicione em `general/`
5. **Para logos**: Adicione em `logo/`

## 🖼️ Sistema de Tamanho Padrão

### **Cards do Bestiário:**
- **Altura fixa**: 200px
- **Largura**: 100% do container
- **Object-fit**: cover (mantém proporção)
- **Fallback**: Placeholder com ícone 🦅 se imagem não carregar

### **Imagens de Detalhes:**
- **Altura fixa**: 300px
- **Largura**: 100% do container
- **Object-fit**: cover (mantém proporção)
- **Fallback**: Placeholder maior se imagem não carregar

### **Recomendações para Imagens:**
- **Resolução mínima**: 400x300px
- **Formato**: PNG ou JPG
- **Tamanho do arquivo**: Máximo 500KB
- **Proporção**: 4:3 ou 16:9 funciona melhor

## 🔗 Como Usar nos Componentes

```typescript
// Importar imagem de criatura
import lobisomemImg from "../assets/bestiary/creatures/lobisomem.png";

// Importar fundo
import backgroundImg from "../assets/bestiary/backgrounds/background-bestiary.png";

// Usar no componente
<img src={lobisomemImg} alt="Lobisomem" />
```

## 📝 Convenções de Nomenclatura

- Use nomes descritivos em português
- Use hífen para separar palavras: `background-bestiary.png`
- Mantenha consistência com o tema do jogo
- Use minúsculas para nomes de arquivos
