import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Human = ({ heightScale, weightScale }) => {
  const ref = useRef();
  const { scene } = useGLTF("/model.gltf");

  return (
    <primitive
    object={scene}
    ref={ref}
    scale={[weightScale * 2.5, heightScale * 2.5, weightScale * 2.5]}
    position={[0, -1.4, 0]}
    rotation={[0.2, 0, 0]}
  />
  );
};

export default function HumanModel() {
  const height = 180; // cm
  const weight = 75;  // kg

  const heightScale = height / 180;
  const weightScale = weight / 75;

  return (
    <Canvas
    style={{ height: "100vh", background: 'transparent' }}
    camera={{ position: [0, 1.5, 4], fov: 80 }} // 👈 this controls zoom and view
  >
    <ambientLight intensity={0.6} />
    <directionalLight position={[2, 2, 5]} intensity={1} />
    <OrbitControls target={[0, 1, 0]} /> {/* 👈 centers around body instead of feet */}
    <Human heightScale={heightScale} weightScale={weightScale} />
  </Canvas>
  
  );
}
