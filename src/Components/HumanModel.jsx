import React, { useRef, useState, Suspense, memo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Spinner from "./Spinner";

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
      scale={[scaleX * 2.4, scaleY * 2.4, scaleZ * 2.4]}
      position={[0, -2, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
});

export default function HumanModel({ bmiDetails }) {
  const [showModel, setShowModel] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowModel(true);
    }, 1500);
  }, []);
  return (
    <>
      <main>
        <Canvas
          style={{ height: "60vh", background: "transparent" }}
          camera={{ position: [0, 1.5, 4], fov: 80 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <OrbitControls target={[0, 1, 0]} />
          {!showModel ? (
            <Spinner />
          ) : (
            <Suspense fallback={<Spinner />}>
              <Human
                key={`${bmiDetails.height}-${bmiDetails.weight}`}
                height={bmiDetails.height}
                weight={bmiDetails.weight}
              />
            </Suspense>
          )}
        </Canvas>
      </main>
    </>
  );
}
