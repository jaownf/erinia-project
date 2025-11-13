import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

// Componente do modelo 3D (centraliza e escala automaticamente)
export default function EriniaLogo3D(props: React.JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/erinia.glb", true);
  const group = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!gltf || !group.current) return;

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    group.current.position.set(-center.x, -center.y + 1, -center.z);

    const maxDim = Math.max(2, 2, 2);
    const desired = 2.0;
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


