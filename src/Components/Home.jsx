import React, { useState } from "react";
import HumanModel from "./HumanModel";
import BMIDetailsForm from "./BMIDetailsForm";

export default function Home() {
  const [bmiDetails, setBmiDetails] = useState({
    height: 130,
    weight: 60,
    age: 22,
    bmi: 0,
    bmiCategory:'',
    gender:'female',
    bodyFat:0
  });
  return (
    <main>
      <h1 className="text-3xl text-white font-medium py-6 px-8">
        Calculate your BMI and Visualize your Body Shape
      </h1>
      <section className="w-full grid grid-cols-2 justify-center border-spacing-1 px-9">
        <BMIDetailsForm setBmiDetails={setBmiDetails} bmiDetails={bmiDetails}/>
        <HumanModel bmiDetails={bmiDetails} />
      </section>
    </main>
  );
}
