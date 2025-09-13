import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";


/* ---------- 3D Model component (centraliza e escala automaticamente) ---------- */
function EriniaLogo3D(props: React.JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/erinia.glb", true);
  const group = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!gltf || !group.current) return;

    // calcula bounding box do modelo
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // posiciona o grupo para que o centro do modelo fique na origem
    group.current.position.set(-center.x, -center.y + 1, -center.z);

    // escala para caber bem na câmera (ajusta o divisor se quiser maior/menor)
    const maxDim = Math.max(2,2,1);
    const desired = 2.0; // ajuste de tamanho visual: quanto maior, maior o modelo
    const scale = desired / maxDim;
    group.current.scale.setScalar(scale);
  }, [gltf]);

  return (
    <group ref={group} {...props}>
      <primitive object={gltf.scene} />
    </group>
  );
}
useGLTF.preload("/erinia.glb");

/* -------------------------------- App -------------------------------- */
export default function App() {
  const menu = ["JOGO", "BESTIÁRIO", "COMUNIDADE", "LOJA", ];

  const onScrollDown = () => {
    const el = document.getElementById("next-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-root">
      {/* Header */}
      <header className="site-header">

        <a href="#" className="logo-link"><img src="./src/assets/logo/logo-erinia.png   " alt="Erinia logo" className="logo" /></a>
        <nav className="nav">
          {menu.map((m) => (
            <a key={m} href={`#${m.toLowerCase()}`} className="nav-link">
              {m}
            </a>
          ))}
        </nav>
        <button className="account-btn">CONTA</button>
      </header>

      {/* Fullscreen hero with Canvas */}
      <section className="hero">
        {/* Canvas ocupa toda a área da hero */}
        <div className="hero-canvas">
          <Canvas camera={{ position: [2  , -20, 18], fov: 30 }} shadows>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Suspense fallback={null}>
              <EriniaLogo3D />
              <Environment preset="dawn" />
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.0}
              minPolarAngle={Math.PI / 2.1}
              maxPolarAngle={Math.PI - Math.PI / 0}
            />
          </Canvas>
        </div>

        {/* Title box sobre o Canvas */}
        <div className="title-box"> 
          <p className="subtitle">UMA HISTÓRIA DE SUPERAÇÃO, ERINIA.</p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={onScrollDown}
          className="scroll-indicator"
          aria-label="Scroll down"
        >
          <img src="/src/assets/components/scroll-down.png" alt="scroll" />
        </button>
      </section>
      <div className="first-background-transition"></div>
      
      {/* seção principal de conteúdo */}
      <section id="next-section" className="next-section">
        {/* Botão de Download */}
        <div className="download-section">
          <button className="download-btn">
            <span className="download-text">BAIXAR AGORA</span>
            <span className="download-free">GRÁTIS</span>
          </button>
        </div>

        {/* Seção Novidades/Patch Notes */}
        <div className="news-section">
          <h2 className="section-title">NOVIDADES / PATCH NOTES</h2>
          <div className="carousel-container">
            <button className="carousel-arrow left">‹</button>
            <div className="carousel">
              <div className="carousel-item">
                <div className="card-image"></div>
                <hr className="card-div-row"></hr>
                <h3>PATCH 2.1 LANÇADO</h3>
                <p>26 DE JUNHO DE 2025</p>
              </div>
              <div className="carousel-item">
                <div className="card-image"></div>
                <hr className="card-div-row"></hr>
                <h3>PRÓXIMO EVENTO: "A QUEDA"</h3>
                <p>30 DE JUNHO DE 2025</p>
              </div>
              <div className="carousel-item">
                <div className="card-image"></div>
                <hr className="card-div-row"></hr>
                <h3>ENTRE NO GRUPO  DO WHATSAPP</h3>
                <p>26 DE JUNHO DE 2025</p>
              </div>
            </div>
            <button className="carousel-arrow right">›</button>
          </div>
        </div>

        {/* Seção Sobre o Jogo */}
        <div className="about-section">
          <h2 className="section-title">SOBRE O JOGO</h2>
          <p className="about-description">
            ERINIA TUORHENCE É UM MMORPG ÉPICO DE FANTASIA SOMBRIA AMBIENTADO EM UM MUNDO MEDIEVAL.
          </p>
          <button className="learn-more-btn">SAIBA MAIS</button>
        </div>

        {/* Cards em sequência */}
        <div className="cards-section">
          <div className="card">
            <h3 className="card-title">EXPLORE O MAPA EM 3D</h3>
            <div className="map-image"></div>
            <button className="learn-more-btn">SAIBA MAIS</button>
          </div>
          
          <div className="card">
            <h3 className="card-title">BESTIÁRIO EM DESTAQUE</h3>
            <div className="bestiary-image"></div>
            <button className="learn-more-btn">SAIBA MAIS</button>
          </div>
        </div>
      </section>
      
      {/* footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© Copyright 2025 - Erinia Team</p>
        </div>
      </footer>
    </div>
  );
}
