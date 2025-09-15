import { Suspense } from "react";
import "./Hero.css";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import EriniaLogo3D from "./EriniaLogo3D";
import scrollDown from "../assets/components/scroll-down.png";

// Seção hero em tela cheia com Canvas 3D e CTA de scroll
export default function Hero() {
  const onScrollDown = () => {
    const el = document.getElementById("next-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [2, -20, 18], fov: 30 }} shadows>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <EriniaLogo3D />
            <Environment preset="dawn" />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI - Math.PI / 0}
          />
        </Canvas>
      </div>

      <div className="title-box">
        <p className="subtitle">UMA HISTÓRIA DE SUPERAÇÃO, ERINIA.</p>
      </div>

      <button onClick={onScrollDown} className="scroll-indicator" aria-label="Scroll down">
        <img src={scrollDown} alt="scroll" />
      </button>
    </section>
  );
}


