import bmi1 from "../assets/Images/bmi1.png";
import { useState } from "react";

export default function BMIHomepage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12 gap-10">
        {/* Left Column - Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-[#a996cf] ">Track</span> and
            <span className="text-[#a996cf]">visualize</span> your body metrics
          </h1>

          <p className="text-lg text-gray-300 mt-6">
            Our BMI calculator helps you understand your body composition and
            track your fitness journey. Get personalized insights about your
            health based on your body mass index.
          </p>

          <div className="mt-8">
            <button
              className={`bg-[#a996cf] text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all ${
                isHovered ? "pl-8" : ""
              }`}
            >
              Calculate your BMI
            </button>
          </div>

       
        </div>

        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="rounded-xl overflow-hidden relative">
              <img
                src={bmi1}
                alt="Body visualization"
                className="rounded-xl object-cover z-10 relative"
              />
              <div className="absolute inset-0 opacity-20 rounded-xl z-0"></div>
            </div>
</div>
        </div>
      </main>
   
    </div>
  );
}
