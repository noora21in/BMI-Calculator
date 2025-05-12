import { useState, useEffect } from 'react';

export default function BMICalculator() {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg
  const [age, setAge] = useState(30);
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');
  const [characterColor, setCharacterColor] = useState('#f8d5a3');

  // Calculate BMI and set category
  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(1));

    // Set BMI category
    if (calculatedBmi < 18.5) {
      setBmiCategory('Underweight');
      setCharacterColor('#a3d0f8');
    } else if (calculatedBmi < 25) {
      setBmiCategory('Normal');
      setCharacterColor('#a3f8b5');
    } else if (calculatedBmi < 30) {
      setBmiCategory('Overweight');
      setCharacterColor('#f8e4a3');
    } else {
      setBmiCategory('Obese');
      setCharacterColor('#f8a3a3');
    }
  }, [height, weight]);

  // Calculate character proportions based on inputs
  const characterWidth = Math.max(25, Math.min(60, 30 + (bmi - 21) * 2));
  const characterHeight = Math.max(100, Math.min(200, height * 0.8));
  const headSize = Math.max(30, Math.min(50, 35 + age / 10));

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interactive BMI Calculator</h1>
      
      {/* Character Display */}
      <div className="relative w-full h-64 bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full shadow-md">
          BMI: {bmi} - {bmiCategory}
        </div>
        
        {/* Character Body */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* Head */}
          <div 
            style={{
              width: `${headSize}px`,
              height: `${headSize}px`,
              backgroundColor: characterColor,
              borderRadius: '50%'
            }}
            className="relative shadow-md"
          >
            {/* Eyes */}
            <div className="absolute" style={{ top: '40%', left: '30%', width: '10%', height: '10%', backgroundColor: '#333', borderRadius: '50%' }}></div>
            <div className="absolute" style={{ top: '40%', right: '30%', width: '10%', height: '10%', backgroundColor: '#333', borderRadius: '50%' }}></div>
            
            {/* Mouth */}
            <div className="absolute" style={{ bottom: '25%', left: '35%', width: '30%', height: '10%', backgroundColor: '#333', borderRadius: '10px' }}></div>
          </div>
          
          {/* Body */}
          <div 
            style={{
              width: `${characterWidth}px`,
              height: `${characterHeight * 0.4}px`,
              backgroundColor: characterColor,
              borderRadius: '8px',
              marginTop: '5px'
            }}
            className="shadow-md"
          ></div>
          
          {/* Legs */}
          <div className="flex space-x-2 mt-1">
            <div 
              style={{
                width: `${characterWidth / 3}px`,
                height: `${characterHeight * 0.3}px`,
                backgroundColor: characterColor,
                borderRadius: '8px'
              }}
              className="shadow-md"
            ></div>
            <div 
              style={{
                width: `${characterWidth / 3}px`,
                height: `${characterHeight * 0.3}px`,
                backgroundColor: characterColor,
                borderRadius: '8px'
              }}
              className="shadow-md"
            ></div>
          </div>
        </div>
      </div>
      
      {/* Interactive Controls */}
      <div className="w-full space-y-6 p-4 bg-white rounded-lg shadow">
        {/* Height Control - Vertical Ruler */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="font-medium">Height: {height} cm</label>
            <span className="text-sm text-gray-500">{Math.floor(height / 30.48)} ft {Math.floor((height % 30.48) / 2.54)} in</span>
          </div>
          <div className="relative h-12 bg-gray-200 rounded-lg">
            <div 
              className="absolute inset-y-0 left-0 bg-blue-400 rounded-l-lg" 
              style={{ width: `${(height - 100) / 100 * 100}%` }}
            ></div>
            <input 
              type="range" 
              min="100" 
              max="200" 
              value={height} 
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-y-0 w-full px-2 flex justify-between items-center pointer-events-none">
              <div className="h-8 w-1 bg-gray-400"></div>
              <div className="h-4 w-1 bg-gray-400"></div>
              <div className="h-6 w-1 bg-gray-400"></div>
              <div className="h-4 w-1 bg-gray-400"></div>
              <div className="h-8 w-1 bg-gray-400"></div>
            </div>
          </div>
        </div>
        
        {/* Weight Control - Scale Visual */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="font-medium">Weight: {weight} kg</label>
            <span className="text-sm text-gray-500">{Math.round(weight * 2.20462)} lbs</span>
          </div>
          <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-full flex-1 flex justify-center items-center border-r border-gray-300"
                >
                  <div 
                    className={`h-${i % 3 === 0 ? '8' : '4'} w-1 bg-gray-400`}
                  ></div>
                </div>
              ))}
            </div>
            <div 
              className="absolute inset-y-0 left-0 bg-green-400 rounded-l-lg opacity-70" 
              style={{ width: `${(weight - 30) / 120 * 100}%` }}
            ></div>
            <div 
              className="absolute z-10 w-4 h-full bg-red-500 border-2 border-white rounded"
              style={{ left: `calc(${(weight - 30) / 120 * 100}% - 8px)` }}
            ></div>
            <input 
              type="range" 
              min="30" 
              max="150" 
              value={weight} 
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
            />
          </div>
        </div>
        
        {/* Age Control - Growth Rings */}
        <div className="space-y-2">
          <label className="font-medium">Age: {age} years</label>
          <div className="relative h-12 bg-gray-200 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-evenly pointer-events-none">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i} 
                  className="rounded-full border-2 border-gray-400"
                  style={{
                    width: `${i * 4 + 12}px`,
                    height: `${i * 4 + 12}px`,
                    opacity: age > i * 10 + 10 ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>
            <input 
              type="range" 
              min="1" 
              max="90" 
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      {/* Results and Information */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow w-full">
        <h2 className="text-lg font-semibold mb-2">Your Results</h2>
        <div className="flex items-center space-x-2">
          <div 
            className={`w-4 h-4 rounded-full ${
              bmiCategory === 'Underweight' ? 'bg-blue-500' :
              bmiCategory === 'Normal' ? 'bg-green-500' :
              bmiCategory === 'Overweight' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          ></div>
          <p>Your BMI is <strong>{bmi}</strong> which is classified as <strong>{bmiCategory}</strong></p>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          This interactive calculator visualizes how your height, weight, and age affect your BMI.
          The character's appearance changes based on your inputs!
        </p>
      </div>
    </div>
  );
}