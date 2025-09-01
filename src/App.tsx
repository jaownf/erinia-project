import React, { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";


/* ---------- 3D Model component (centraliza e escala automaticamente) ---------- */
function EriniaLogo3D(props: JSX.IntrinsicElements["group"]) {
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
    group.current.position.set(-center.x, -center.y, -center.z);

    // escala para caber bem na câmera (ajusta o divisor se quiser maior/menor)
    const maxDim = Math.max(size.x, size.y, size.z);
    const desired = 3.0; // ajuste de tamanho visual: quanto maior, maior o modelo
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
  const menu = ["Home", "History", "Bestiary", "Store", "Download"];

  const onScrollDown = () => {
    const el = document.getElementById("next-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app-root">
      {/* Header */}
      <header className="site-header">
        <img src="/logo-erinia.png" alt="Erinia logo" className="logo" />
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
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} shadows>
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
              autoRotateSpeed={0.6}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI - Math.PI / 2.5}
            />
          </Canvas>
        </div>

        {/* Title box sobre o Canvas */}
        <div className="title-box">
          <h1>ERINIA</h1>
          <p className="subtitle">UMA HISTÓRIA DE SUPERAÇÃO, ERINIA.</p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={onScrollDown}
          className="scroll-indicator"
          aria-label="Scroll down"
        >
          <img src="/scroll-down.png" alt="scroll" />
        </button>
      </section>

      {/* black placeholder section */}
      <section id="next-section" className="next-section">
        <h2>Coming next</h2>
        <p>
          This section is a placeholder template. We'll add content as you share
          the rest.
        </p>
      </section>
    </div>
  );
}
