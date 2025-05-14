import React, { useState, useEffect } from "react";
import { IoIosMale, IoIosFemale } from "react-icons/io";

function BMIDetailsForm({ setBmiDetails, bmiDetails ,initalValues}) {
  const [genderSelected, setGenderSelected] = useState("left");

  const getRadius = () => {
    return genderSelected === "female" ? "rounded-l-xl" : "rounded-r-xl";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBmiDetails((prev) => ({ ...prev, [name]: parseInt(value) }));
    console.log('bmi details',bmiDetails);
  };

  const handleGender = (e) => {
    const { name } = e.target;
    setGenderSelected(name);
    setBmiDetails((prev) => ({ ...prev, gender: name }));
  };

  useEffect(() => {
    const heightInMeters = bmiDetails.height / 100;
    const calculatedBmi = bmiDetails.weight / (heightInMeters * heightInMeters);
    setBmiDetails((prev) => ({ ...prev, bmi: calculatedBmi.toFixed(1) }));

    if (calculatedBmi < 18.5)
      setBmiDetails((prev) => ({ ...prev, bmiCategory: "underweight" }));
    else if (calculatedBmi < 24.9)
      setBmiDetails((prev) => ({ ...prev, bmiCategory: "normal" }));
    else if (calculatedBmi < 29.9)
      setBmiDetails((prev) => ({ ...prev, bmiCategory: "overweight" }));
    else setBmiDetails((prev) => ({ ...prev, bmiCategory: "obese" }));

    // Body fat % calculation
    if (bmiDetails.gender && bmiDetails.age) {
      const bodyFat =
        bmiDetails.gender === "male"
          ? (1.2 * calculatedBmi + 0.23 * bmiDetails.age - 16.2).toFixed(1)
          : (1.2 * calculatedBmi + 0.23 * bmiDetails.age - 5.4).toFixed(1);

      setBmiDetails((prev) => ({ ...prev, bodyFat }));
    }
  }, [bmiDetails.height, bmiDetails.weight, bmiDetails.age, bmiDetails.gender]);

  return (
    <>
      <main
        className="flex flex-col items-center gap-6 py-9 px-16 w-full max-w-xl mx-auto rounded-2xl shadow-lg"
        style={{ backgroundColor: "#221d31", border: "2px solid #392e49" }}
      >
        {/* Gender Toggle */}
        <section className="w-full">
          <div
            className="relative w-full h-14 flex border overflow-hidden rounded-xl"
            style={{
              borderColor: "#281941",
              backgroundColor: "#282239",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className={`absolute top-0 w-1/2 h-full transition-all duration-300 z-0 bg-[#5b428c] ${getRadius()}`}
              style={{
                left: genderSelected === "female" ? "0%" : "50%",
              }}
            />
            <button
              className="w-1/2 h-full text-lg font-medium flex items-center justify-center gap-2 z-10 text-white"
              name="female"
              onClick={handleGender}
            >
              <IoIosFemale size={28} /> Female
            </button>
            <button
              className="w-1/2 h-full text-lg font-medium flex items-center justify-center gap-2 z-10 text-white"
              name="male"
              onClick={handleGender}
            >
              <IoIosMale size={28} /> Male
            </button>
          </div>
        </section>

        {/* Age */}
        <section className="w-full">
          <label className="block text-md font-medium text-white mb-2">
            Age :<span className="text-purple-300 ml-1"> {bmiDetails.age}</span>{" "}
            years
          </label>
          <div
            className="relative h-14 rounded-lg "
            style={{
              backgroundColor: "#282239",
              boxShadow:
                "inset 0 1px 0 rgba(48,56,64,0.3), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-evenly pointer-events-none">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full border-2 hover:opacity-1"
                  style={{
                    width: `${i * 4 + 12}px`,
                    height: `${i * 4 + 12}px`,
                    opacity: bmiDetails.age > i * 10 + 10 ? 1 : 0.5,
                    borderColor: "#5b428c",
                  }}
                ></div>
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="90"
              value={bmiDetails.age}
              name="age"
              onChange={handleChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </section>

        {/* Height */}
        <section className="w-full space-y-2">
          <div className="flex justify-between items-center text-white text-md">
            <label className="font-medium text-md ">
              Height :
              <span className="text-purple-300 ml-1 text-md">
                {bmiDetails.height} cm{" "}
              </span>
            </label>
            <span className="text-gray-400 text-md">
              {Math.floor(bmiDetails.height / 30.48)} ft{" "}
              {Math.floor((bmiDetails.height % 30.48) / 2.54)} in
            </span>
          </div>
          <div
            className="relative h-12 bg-[#282239] rounded-lg"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(48,56,64,0.3), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-l-lg"
              style={{
                width: `${((bmiDetails.height - 100) / 100) * 100}%`,
                opacity: 0.6,
                backgroundColor: "rgb(80 69 88)",
              }}
            ></div>
            <input
              type="range"
              min="100"
              max="200"
              name="height"
              value={bmiDetails.height}
              onChange={handleChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-y-0 w-full px-2 flex justify-between items-center pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-${i % 2 === 0 ? "8" : "4"} w-1 rounded-full`}
                  style={{ backgroundColor: "rgb(154 151 156)" }}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Weight */}
        <section className="w-full space-y-2">
          <div className="flex justify-between items-center text-white text-md">
            <label className="font-medium text-md ml-1">
              Weight :
              <span className="text-purple-300 text-md">
                {bmiDetails.weight} kg
              </span>
            </label>
            <span className="text-gray-400">
              {Math.round(bmiDetails.weight * 2.20462)} lbs
            </span>
          </div>
          <div
            className="relative h-12 bg-[#282239] rounded-lg overflow-hidden"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(48,56,64,0.3), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 flex items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full flex-1 flex justify-center items-center  border-gray-600 border-${
                    i === 9 ? 0 : "r"
                  }`}
                >
                  <div
                    className={`h-${i % 3 === 0 ? "8" : "4"} w-1 rounded-full`}
                    style={{ backgroundColor: "rgb(154 151 156)" }}
                  ></div>
                </div>
              ))}
            </div>
            <div
              className="absolute inset-y-0 left-0 rounded-l-lg opacity-60"
              style={{
                width: `${((bmiDetails.weight - 30) / 120) * 100}%`,
                backgroundColor: "rgb(81 63 117)",
              }}
            ></div>
            <div
              className="absolute z-10 w-2.5 h-full rounded"
              style={{
                backgroundColor: "rgb(121 121 121)",
                left: `calc(${((bmiDetails.weight - 30) / 120) * 100}% - 8px)`,
              }}
            ></div>
            <input
              type="range"
              min="30"
              max="150"
              name="weight"
              value={bmiDetails.weight}
              onChange={handleChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
            />
          </div>
        </section>
        <section className="flex">
        <button
          className="mt-4 px-6 py-2 rounded-xl text-white font-medium transition-all duration-300"
          style={{
            backgroundColor: "#5b428c",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 #090b0b, 0 1px 2px rgba(0,0,0,0.3)",
          }}
          onClick={()=>setBmiDetails(initalValues)}
        >
          Reset All
        </button>
        </section>
    
      </main>
    </>
  );
}

export default BMIDetailsForm;
