import React, { useState } from "react";
import HumanModel from "./HumanModel";
import BMIDetailsForm from "./BMIDetailsForm";
import { FiActivity } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const initalValues = {
  height: 173,
  weight: 70,
  age: 22,
  bmi: 0,
  bmiCategory: "",
  gender: "female",
  bodyFat: 0,
};

export default function BMICalc() {
  const navigate = useNavigate();
  const [bmiDetails, setBmiDetails] = useState(initalValues);
  return (
    <main>
      <div className="flex items-center gap-3 py-6 px-8">
        <FiActivity size={28} className="text-white" />
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Body Metrics Calculator
        </h1>
      </div>

      <section className="w-full grid lg:grid-cols-2 sm:grid-cols-1 justify-center border-spacing-1 px-9">
        <BMIDetailsForm
          setBmiDetails={setBmiDetails}
          bmiDetails={bmiDetails}
          initalValues={initalValues}
        />
        <section>
          <HumanModel bmiDetails={bmiDetails} />
          <h1 className="text-white text-lg font-medium">
            BMI : {bmiDetails.bmi} You are
            <span className="capitalize"> {bmiDetails.bmiCategory}</span> and
            your body fat is {bmiDetails.bodyFat} %
            <button
              className="mt-4 px-6 py-2 rounded-xl text-white font-medium  capitalize transition-all duration-300"
              style={{
                backgroundColor: "#5b428c",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.3)",
              }}
              onClick={() => navigate("/bmiresult", { state: { bmiDetails } })}
            >
              See detailed result
            </button>
          </h1>
        </section>
      </section>
    </main>
  );
}
