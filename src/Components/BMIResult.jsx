import React from "react";
import { useLocation } from "react-router-dom";
import HumanModel from "./HumanModel";

function BMIResult() {
  const location = useLocation();
  console.log(location.state);
  const { bmiDetails } = location.state || {};

  // Calculate ideal weight range based on BMI
  // Normal BMI range is 18.5 to 24.9
  const heightInMeters = bmiDetails.height / 100;
  const lowerIdealWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
  const upperIdealWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);

  // Calculate weight difference
  const currentWeight = bmiDetails.weight;
  let weightDiff = 0;
  let recommendation = "";
  let icon = null;
  let statusColor = "";

  if (bmiDetails.bmiCategory === "underweight") {
    weightDiff = (lowerIdealWeight - currentWeight).toFixed(1);
    recommendation = `gain ${weightDiff} kg`;
    // icon = <TrendingUp size={24} className="text-yellow-400" />;
    statusColor = "bg-yellow-400";
  } else if (bmiDetails.bmiCategory === "normal") {
    recommendation = "maintain your current weight";
    // icon = <CheckCircle size={24} className="text-green-400" />;
    statusColor = "bg-green-400";
  } else {
    // Overweight or obese
    weightDiff = (currentWeight - upperIdealWeight).toFixed(1);
    recommendation = `lose ${weightDiff} kg`;
    // icon = <TrendingDown size={24} className="text-red-400" />;
    statusColor = "bg-red-400";
  }

  return (
    <>
      <HumanModel bmiDetails={bmiDetails} />
      <h1 className="text-white text-4xl"> i am bmi result </h1>
      <h1 className="text-white">BMI Result</h1>
      <p className="text-white">BMI: {bmiDetails?.bmi}</p>

      <p className="text-white"> Category: {bmiDetails?.bmiCategory}</p>
      <p className="text-white">Body Fat: {bmiDetails?.bodyFat}%</p>
      <p className="text-white">Body Weight: {bmiDetails?.weight} </p>
      <div
        className="w-full max-w-xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundColor: "#221d31", border: "2px solid #392e49" }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-medium text-white">
            Your Weight Recommendation
          </h2>
        </div>

        {/* Weight Stats */}
        <div className="p-6">
          {/* Current Stats */}
          <div className="flex flex-col gap-6">
            {/* Current BMI and Category */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">Your BMI</div>
                <div className="text-white text-2xl font-bold">
                  {bmiDetails.bmi}
                </div>
              </div>
              <div
                className="px-4 py-1 rounded-full text-white font-medium capitalize"
                style={{
                  backgroundColor:
                    bmiDetails.bmiCategory === "underweight"
                      ? "#FBBF24"
                      : bmiDetails.bmiCategory === "normal"
                      ? "#34D399"
                      : bmiDetails.bmiCategory === "overweight"
                      ? "#F87171"
                      : "#EF4444",
                }}
              >
                {bmiDetails.bmiCategory}
              </div>
            </div>

            {/* Body Fat */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">Estimated Body Fat</div>
                <div className="text-white text-lg font-medium">
                  {bmiDetails.bodyFat}%
                </div>
              </div>
            </div>

            {/* Weight Range */}
            <div>
              <div className="text-gray-400 text-sm mb-2">
                Ideal Weight Range
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center p-3 rounded-lg bg-gray-800">
                  <div className="text-gray-400 text-xs">Minimum</div>
                  <div className="text-white font-medium">
                    {lowerIdealWeight} kg
                  </div>
                </div>
                <div className="flex-1 text-center p-3 rounded-lg bg-gray-800">
                  <div className="text-gray-400 text-xs">Maximum</div>
                  <div className="text-white font-medium">
                    {upperIdealWeight} kg
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                {icon}
                <h3 className="text-lg font-medium text-white">
                  Recommendation
                </h3>
              </div>
              <p className="text-gray-300">
                Based on your measurements, you should{" "}
                <span className="text-white font-medium">{recommendation}</span>{" "}
                to achieve a healthy BMI.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: "18.5%" }}
                ></div>
                <div
                  className="h-full bg-green-400"
                  style={{ width: "6.4%" }}
                ></div>
                <div
                  className="h-full bg-red-400"
                  style={{ width: "5%" }}
                ></div>
                <div
                  className="h-full bg-red-600"
                  style={{ width: "70.1%" }}
                ></div>
              </div>

              {/* BMI Marker */}
              <div className="relative h-6 w-full">
                <div
                  className="absolute top-0 w-3 h-3 transform -translate-x-1/2"
                  style={{
                    left: `${Math.min(
                      Math.max((bmiDetails.bmi / 40) * 100, 0),
                      100
                    )}%`,
                  }}
                >
                  <div
                    className={`w-3 h-3 ${statusColor} rounded-full animate-pulse shadow-lg`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BMIResult;
