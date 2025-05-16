import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMICalc from "../Components/BMICalc";
import BMIHome from "../Components/BMIHome";
import BMIResult from "../Components/BMIResult";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<BMIHome />} />
          <Route path="/bmicalc" element={<BMICalc />} />
          <Route path="/bmiresult" element={<BMIResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
