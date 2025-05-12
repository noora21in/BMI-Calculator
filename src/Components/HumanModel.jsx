import React, { useRef, useState, Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Loader from "./Loader";

useGLTF.preload("/model.glb"); //preloading to reduce the initial load time

const Human = memo(({ height, weight }) => {
  const ref = useRef();
  const { scene } = useGLTF("/model.glb", true);

  const scaleX = 1 + (weight - 55) / 300; // width
  const scaleY = 1 + (height - 145) / 300; // height
  const scaleZ = scaleX; // depth same as width

  return (
    <primitive
      object={scene}
      ref={ref}
      scale={[scaleX * 2.3, scaleY * 2.3, scaleZ * 2.3]}
      position={[0, -2, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
});

export default function HumanModel() {
  const [height, setHeight] = useState(145);
  const [weight, setWeight] = useState(55);

  return (
    <>
    

      <Canvas
        style={{ height: "100vh", background: "transparent" }}
        camera={{ position: [0, 1.5, 4], fov: 80 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <OrbitControls target={[0, 1, 0]} />
        <Suspense fallback={<Loader />}>
          <Human height={height} weight={weight} />
        </Suspense>
      </Canvas>
    </>
  );
}
