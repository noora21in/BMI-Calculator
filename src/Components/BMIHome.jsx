import bmi1 from "../assets/Images/bmi1.png";
import { useNavigate } from "react-router-dom";

export default function BMIHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12 gap-10">
        {/* Left Column - Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-[#a996cf] ">Track</span> and
            <span className="text-[#a996cf]">visualize</span> your body metrics
          </h1>

          <p className="text-lg text-gray-300 mt-6">
            Our BMI tool gives you a quick overview of your health based on your
            height and weight. Get personalized results and take the next step
            towards a healthier you.
          </p>

          <div className="mt-8">
           
            <button
              className="bg-[#8771b4] hover:bg-[#a996cf] text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all"
              onClick={() => navigate("/bmicalc")}
            >
              Calculate your BMI
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={bmi1}
            alt="BMI picture having a boy and girl"
            className="object-cover max-w-[700px] w-full mx-auto"
          />
        </div>
      </main>
    </div>
  );
}
