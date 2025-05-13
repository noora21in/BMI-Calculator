import React, { useState } from "react";
import HumanModel from "./HumanModel";
import BMIDetailsForm from "./BMIDetailsForm";

const initalValues = {
  height: 173,
  weight: 70,
  age: 22,
  bmi: 0,
  bmiCategory: "",
  gender: "female",
  bodyFat: 0,
};

export default function Home() {
  const [bmiDetails, setBmiDetails] = useState(initalValues);
  return (
    <main>
      <h1 className="text-2xl text-white font-medium py-6 px-8">
        Calculate your BMI and Visualize your Body Shape
      </h1>
      <section className="w-full grid grid-cols-2 justify-center border-spacing-1 px-9">
        <BMIDetailsForm setBmiDetails={setBmiDetails} bmiDetails={bmiDetails} initalValues={initalValues}/>
        <HumanModel bmiDetails={bmiDetails} />
      </section>
    </main>
  );
}
