import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Community.css";

// Tipos
type User = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  achievements: string[];
  rank: string;
  joinDate: string;
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
};

type Comment = {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
  parentId?: string;
};

type Post = {
  id: string;
  author: User;
  title: string;
  content: string;
  image?: string;
  video?: string;
  tags: string[];
  votes: number;
  comments: Comment[];
  commentsCount: number;
  group: string;
  isPinned: boolean;
  isFeatured: boolean;
  createdAt: string;
  views: number;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'event' | 'tournament' | 'update';
  participants: number;
  maxParticipants?: number;
};

type Poll = {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  expiresAt: string;
  author: User;
};

// Dados mockados
const mockUser: User = {
  id: "1",
  name: "João",
  avatar: "src/assets/general/0370b5d8e2d498a98f1cd09ffd450d9c.jpg",
  level: 15,
  xp: 2450,
  achievements: ["first_post", "helpful_member", "active_contributor"],
  rank: "Veterano",
  joinDate: "2023-01-15",
  postsCount: 42,
  commentsCount: 156,
  likesReceived: 892
};

const mockAchievements: Achievement[] = [
  { id: "first_post", name: "Primeiro Post", description: "Criou seu primeiro post", icon: "📝", rarity: "common" },
  { id: "helpful_member", name: "Membro Útil", description: "Recebeu 50+ curtidas", icon: "👍", rarity: "rare" },
  { id: "active_contributor", name: "Contribuidor Ativo", description: "50+ posts e comentários", icon: "⭐", rarity: "epic" },
  { id: "community_leader", name: "Líder da Comunidade", description: "1000+ curtidas recebidas", icon: "👑", rarity: "legendary" }
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Torneio de Guildas",
    description: "Competição entre as melhores guildas do servidor",
    date: "2024-02-15",
    type: "tournament",
    participants: 24,
    maxParticipants: 32
  },
  {
    id: "2",
    title: "Atualização 1.2",
    description: "Novos recursos e correções de bugs",
    date: "2024-02-20",
    type: "update",
    participants: 0
  }
];

const mockPolls: Poll[] = [
  {
    id: "1",
    question: "Qual sua classe favorita?",
    options: [
      { id: "1", text: "Guerreiro", votes: 45 },
      { id: "2", text: "Mago", votes: 32 },
      { id: "3", text: "Arqueiro", votes: 28 },
      { id: "4", text: "Assassino", votes: 19 }
    ],
    totalVotes: 124,
    expiresAt: "2024-02-25",
    author: mockUser
  }
];

const mockPosts: Post[] = [
  {
    id: "1",
    author: mockUser,
    title: "Novo evento: Caçada ao Dragão de Gelo",
    content: "Reúna sua equipe e prepare-se para enfrentar o ancião nos Picos Congelados! Este evento promete recompensas incríveis e desafios épicos.",
    image: "src/assets/general/card-image.png",
    tags: ["evento", "dragão", "equipe", "recompensas"],
    votes: 128,
    comments: [],
    commentsCount: 42,
    group: "general",
    isPinned: true,
    isFeatured: true,
    createdAt: "há 2h",
    views: 1250
  },
  {
    id: "2",
    author: {
      ...mockUser,
      id: "2",
      name: "Kael",
      avatar: "src/assets/general/7244ed5ee4640ddc2f2ad71c72cb0228.jpg",
      level: 22,
      rank: "Mestre"
    },
    title: "Guia: Farm eficiente de essência etérea",
    content: "Meu roteiro preferido para iniciantes e intermediários. Atualizado com rotas 1.1. Inclui mapas detalhados e dicas de sobrevivência.",
    tags: ["guia", "farm", "essência", "iniciantes"],
    votes: 94,
    comments: [],
    commentsCount: 18,
    group: "guides",
    isPinned: false,
    isFeatured: false,
    createdAt: "há 5h",
    views: 890
  },
  {
    id: "3",
    author: {
      ...mockUser,
      id: "2",
      name: "Djalma",
      avatar: "src/assets/general/5fd68a93d5b68bfdcf620ca780a3b231.jpg",
      level: 22,
      rank: "Ancião"
    },
    title: "Preciso de ajuda com chefes mundiais",
    content: "Estou tendo dificuldades para derrotar os chefes mundiais. Alguém pode me ajudar?",
    tags: ["ajuda", "chefes", "mundiais"],
    votes: 94,
    comments: [],
    commentsCount: 18,
    group: "guides",
    isPinned: false,
    isFeatured: false,
    createdAt: "há 5h",
    views: 890
  }
];

const groups = [
  { id: "all", name: "Todos", count: 156 },
  { id: "general", name: "Geral", count: 45 },
  { id: "guilds", name: "Guildas", count: 32 },
  { id: "trades", name: "Trocas", count: 28 },
  { id: "guides", name: "Guias", count: 25 },
  { id: "media", name: "Mídia", count: 26 }
];

const popularTags = [
  { name: "evento", count: 45 },
  { name: "guia", count: 32 },
  { name: "guilda", count: 28 },
  { name: "farm", count: 24 },
  { name: "pvp", count: 22 },
  { name: "build", count: 20 }
];

export default function Community() {
  const [filter, setFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent");
  const [openModal, setOpenModal] = useState<null | 'post' | 'poll' | 'group'>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userProfile] = useState<User>(mockUser);

  const filteredPosts = posts
    .filter(p => filter === 'all' || p.group === filter)
    .filter(p => !tagFilter || p.tags.includes(tagFilter))
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.votes - a.votes;
        case "trending":
          return b.views - a.views;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, votes: p.votes + (type === 'up' ? 1 : -1) }
        : p
    ));
  };

  const handleComment = (postId: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(Math.random()).slice(2),
        author: userProfile,
        content: newComment,
        createdAt: "agora",
        likes: 0,
        replies: []
      };
      
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, comments: [...p.comments, comment], commentsCount: p.commentsCount + 1 }
          : p
      ));
      setNewComment("");
    }
  };

  return (
    <div className="community-container">
      <div className="community-layout">
        <main className="feed">
          {/* Composer */}
          <motion.div 
            className="composer glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={userProfile.avatar} className="avatar" alt={userProfile.name} />
            <button 
              className="composer-input" 
              onClick={() => setOpenModal('post')}
            >
              Compartilhe algo com a comunidade...
            </button>
            <div className="composer-actions">
              <button className="btn small" onClick={() => setOpenModal('poll')}>
                📊 Enquete
              </button>
              <button className="btn small" onClick={() => setOpenModal('group')}>
                👥 Grupo
              </button>
            </div>
          </motion.div>

          {/* Filtros */}
          <div className="filters">
            <div className="filter-group">
              <label>Ordenar por:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="filter-select"
              >
                <option value="recent">Mais recentes</option>
                <option value="popular">Mais populares</option>
                <option value="trending">Em alta</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Tags:</label>
              <div className="tag-filters">
                <button 
                  className={`tag-filter ${!tagFilter ? 'active' : ''}`}
                  onClick={() => setTagFilter(null)}
                >
                  Todas
                </button>
                {popularTags.map(tag => (
                  <button
                    key={tag.name}
                    className={`tag-filter ${tagFilter === tag.name ? 'active' : ''}`}
                    onClick={() => setTagFilter(tagFilter === tag.name ? null : tag.name)}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id} 
                className={`post-card ${post.isPinned ? 'pinned' : ''} ${post.isFeatured ? 'featured' : ''}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {post.isPinned && <div className="pin-badge">📌 Fixado</div>}
                {post.isFeatured && <div className="featured-badge">⭐ Destaque</div>}
                
                <div className="post-header">
                  <div className="author-info">
                    <img src={post.author.avatar} className="avatar" alt={post.author.name} />
                    <div className="author-details">
                      <h4 className="author-name">{post.author.name}</h4>
                      <div className="author-meta">
                        <span className="level">Nível {post.author.level}</span>
                        <span className="rank">{post.author.rank}</span>
                        <span className="time">{post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-stats">
                    <span className="views">👁 {post.views}</span>
                  </div>
                </div>

                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                {post.image && (
                  <img className="post-media" src={post.image} alt="" />
                )}

                <div className="post-actions">
                  <button 
                    className="action-btn"
                    onClick={() => handleVote(post.id, 'up')}
                  >
                    👍 {post.votes}
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => {
                      setSelectedPost(post);
                      setShowComments(true);
                    }}
                  >
                    💬 {post.commentsCount}
                  </button>
                  <button className="action-btn">🔖 Salvar</button>
                  <button className="action-btn">📤 Compartilhar</button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </main>

        <aside className="sidebar">
          {/* Perfil do usuário */}
          <div className="panel glass user-profile">
            <div className="profile-header">
              <img src={userProfile.avatar} className="profile-avatar" alt={userProfile.name} />
              <div className="profile-info">
                <h3 className="profile-name">{userProfile.name}</h3>
                <div className="profile-level">
                  <div className="level-bar">
                    <div 
                      className="level-progress" 
                      style={{ width: `${(userProfile.xp % 1000) / 10}%` }}
                    ></div>
                  </div>
                  <span>Nível {userProfile.level}</span>
                </div>
                <div className="profile-rank">{userProfile.rank}</div>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{userProfile.postsCount}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-value">{userProfile.commentsCount}</span>
                <span className="stat-label">Comentários</span>
              </div>
              <div className="stat">
                <span className="stat-value">{userProfile.likesReceived}</span>
                <span className="stat-label">Curtidas</span>
              </div>
            </div>

            <div className="achievements">
              <h4>Conquistas</h4>
              <div className="achievement-list">
                {mockAchievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`achievement ${achievement.rarity} ${
                      userProfile.achievements.includes(achievement.id) ? 'unlocked' : 'locked'
                    }`}
                    title={achievement.description}
                  >
                    <span className="achievement-icon">{achievement.icon}</span>
                    <span className="achievement-name">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grupos */}
          <div className="panel glass">
            <h3 className="panel-title">Grupos</h3>
            <div className="group-list">
              {groups.map(group => (
                <button 
                  key={group.id} 
                  className={`group-item ${filter === group.id ? 'active' : ''}`} 
                  onClick={() => setFilter(group.id)}
                >
                  <span className="group-name">{group.name}</span>
                  <span className="group-count">{group.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Eventos */}
          <div className="panel glass">
            <h3 className="panel-title">Eventos</h3>
            <div className="event-list">
              {mockEvents.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-header">
                    <span className="event-type">{event.type}</span>
                    <span className="event-date">{event.date}</span>
                  </div>
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-description">{event.description}</p>
                  {event.maxParticipants && (
                    <div className="event-participants">
                      {event.participants}/{event.maxParticipants} participantes
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enquetes */}
          <div className="panel glass">
            <h3 className="panel-title">Enquetes Ativas</h3>
            <div className="poll-list">
              {mockPolls.map(poll => (
                <div key={poll.id} className="poll-item">
                  <h4 className="poll-question">{poll.question}</h4>
                  <div className="poll-options">
                    {poll.options.map(option => (
                      <div key={option.id} className="poll-option">
                        <div className="poll-option-text">{option.text}</div>
                        <div className="poll-option-bar">
                          <div 
                            className="poll-option-fill"
                            style={{ width: `${(option.votes / poll.totalVotes) * 100}%` }}
                          ></div>
                        </div>
                        <div className="poll-option-votes">{option.votes}</div>
                      </div>
                    ))}
                  </div>
                  <div className="poll-footer">
                    <span>{poll.totalVotes} votos</span>
                    <span>Expira em {poll.expiresAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Modal de comentários */}
      <AnimatePresence>
        {showComments && selectedPost && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComments(false)}
          >
            <motion.div 
              className="comments-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="comments-header">
                <h3>Comentários</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowComments(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="comments-list">
                {selectedPost.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <img src={comment.author.avatar} className="comment-avatar" alt={comment.author.name} />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author.name}</span>
                        <span className="comment-time">{comment.createdAt}</span>
                      </div>
                      <p className="comment-text">{comment.content}</p>
                      <div className="comment-actions">
                        <button className="comment-action">👍 {comment.likes}</button>
                        <button className="comment-action">Responder</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="comment-form">
                <img src={userProfile.avatar} className="comment-avatar" alt={userProfile.name} />
                <div className="comment-input-group">
                  <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(selectedPost.id)}
                  />
                  <button 
                    className="comment-submit"
                    onClick={() => handleComment(selectedPost.id)}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de criação */}
      <ComposeModal 
        type={openModal} 
        onClose={() => setOpenModal(null)} 
        onSubmit={(post) => setPosts([post, ...posts])} 
      />
    </div>
  );
}

function ComposeModal({ type, onClose, onSubmit }: { 
  type: null | 'post' | 'poll' | 'group', 
  onClose: () => void, 
  onSubmit: (p: Post) => void 
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [group, setGroup] = useState("general");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  if (!type) return null;

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const makePost = (): Post => ({
    id: String(Math.random()).slice(2),
    author: {
      id: "1",
      name: "João",
      avatar: "src/assets/general/0370b5d8e2d498a98f1cd09ffd450d9c.jpg",
      level: 15,
      xp: 2450,
      achievements: ["first_post", "helpful_member", "active_contributor"],
      rank: "Veterano",
      joinDate: "2023-01-15",
      postsCount: 42,
      commentsCount: 156,
      likesReceived: 892
    },
    title: title || (type === 'poll' ? 'Enquete' : type === 'group' ? 'Novo grupo' : 'Post'),
    content,
    tags,
    votes: 0,
    comments: [],
    commentsCount: 0,
    group,
    isPinned: false,
    isFeatured: false,
    createdAt: "agora",
    views: 0
  });

  return (
    <motion.div 
      className="modal-overlay" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal" 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">
          {type === 'post' ? 'Criar postagem' : type === 'poll' ? 'Criar enquete' : 'Criar grupo'}
        </h3>
        
        <div className="form">
          <input 
            className="input" 
            placeholder="Título" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          
          <textarea 
            className="textarea" 
            placeholder="Escreva algo..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          
          <select 
            className="input" 
            value={group} 
            onChange={(e) => setGroup(e.target.value)}
          >
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <div className="tags-input">
            <div className="tags-list">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
            <div className="tag-input-group">
              <input
                type="text"
                placeholder="Adicionar tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="tag-input"
              />
              <button onClick={addTag} className="add-tag-btn">+</button>
            </div>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button 
            className="btn buy" 
            onClick={() => { onSubmit(makePost()); onClose(); }}
          >
            Publicar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}