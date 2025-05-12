import React from "react";
import { Html } from "@react-three/drei";
import "./Styles/loader.css";

function Loader() {
  return (
    <Html center>
      <span className="loader"></span>
    </Html>
  );
}

export default Loader;


//because plain html is not allowed inside the canvas, so used HTML helper from @react-three/drei library that allows to embed html inside the canvas
