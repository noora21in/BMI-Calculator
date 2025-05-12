import React, { useState } from "react";
import { IoIosMale, IoIosFemale } from "react-icons/io";

function BMIDetailsForm() {
  const [genderSelected, setGenderSelected] = useState("left");

  const getRadius = () => {
    return genderSelected === "left"
      ? "rounded-l-xl"
      : "rounded-r-xl";
  };

  return (
    <>
    <section className="flex items-center justify-center mt-8" style={{backgroundColor:'#221d31'}}>
      <div className="relative w-[320px] h-[60px] flex border  overflow-hidden rounded-xl" style={{borderColor:'rgb(58 55 62)'}}>
        {/* Sliding background */}
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-300 z-0 ${getRadius()}`}
          style={{
            left: genderSelected === "left" ? "0%" : "50%",
            backgroundColor: "#5b428c",
          }}
        />

        {/* Female Button */}
        <button
          className={'w-1/2 h-full text-xl font-medium flex items-center justify-center gap-2 z-10 transition-all duration-200 text-white'}
          onClick={() => setGenderSelected("left")}
        >
          <IoIosFemale size={30} /> Female
        </button>

        {/* Male Button */}
        <button
          className={'w-1/2 h-full text-xl font-medium flex items-center justify-center gap-2 z-10 transition-all duration-200 text-white'}
          onClick={() => setGenderSelected("right")}
        >
          <IoIosMale size={30} /> Male
        </button>
      </div>
      
    </section>
    {/* Age Control - Growth Rings */}
    <div className="space-y-2">
    <label className="font-medium">Age: {56} years</label>
    <div className="relative h-12 bg-gray-200 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-evenly pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div 
            key={i} 
            className="rounded-full border-2 border-gray-400"
            style={{
              width: `${i * 4 + 12}px`,
              height: `${i * 4 + 12}px`,
              opacity: 56 > i * 10 + 10 ? 1 : 0.3
            }}
          ></div>
        ))}
      </div>
      <input 
        type="range" 
        min="1" 
        max="90" 
        value={56} 
        onChange={(e) => setAge(parseInt(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  </div>

</>
  );
}

export default BMIDetailsForm;
