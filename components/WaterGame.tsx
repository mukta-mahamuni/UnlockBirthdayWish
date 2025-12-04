
import React, { useState } from 'react';

interface WaterGameProps {
  onComplete: () => void;
}

const WaterGame: React.FC<WaterGameProps> = ({ onComplete }) => {
  const [level, setLevel] = useState(0);
  const [startTime] = useState(Date.now());
  const [message, setMessage] = useState("Slide to fill 💧");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Threshold in milliseconds for "fake" water fetching (e.g., 10 seconds)
  const TIME_THRESHOLD = 10000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setLevel(newVal);

    if (newVal === 100) {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < TIME_THRESHOLD) {
        // Too fast = Lie
        setMessage("Error: This meter senses lies. Try again. 😒😂");
        setErrorShake(true);
        // Reset after a delay
        setTimeout(() => {
          setLevel(0);
          setErrorShake(false);
          setMessage("Actually go get water! 💧");
        }, 2000);
      } else {
        // Success
        setMessage("Hydration successful. You may continue. 🥤✨");
        setIsSuccess(true);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h2 className="text-2xl font-bold text-blue-500 mb-2">Mission 3: Operation: Bring Water</h2>
      
      <div className="bg-blue-50/90 p-6 rounded-2xl border-2 border-blue-100 shadow-sm mb-6 backdrop-blur-sm relative overflow-hidden">
        <p className="text-gray-700 mb-6 font-medium leading-relaxed relative z-10">
          Your sibling is tired from making this whole game for you... <br/>
          Bring a little water to recharge them. Also, fun fact: in real life you NEVER bring me water when I ask 😭💧
So today… you have no escape 😂
        </p>

        {/* --- ANIMATED GLASS VISUAL --- */}
        <div className="relative mx-auto w-24 h-32 mb-8">
          {/* Glass Container */}
          <div className="absolute inset-0 border-4 border-t-0 border-white/80 bg-white/20 rounded-b-xl backdrop-blur-sm z-20 shadow-lg"></div>
          
          {/* Water */}
          <div 
            className="absolute bottom-0 left-0 w-full bg-blue-400/80 transition-all duration-200 ease-linear rounded-b-lg z-10 flex items-start justify-center overflow-hidden"
            style={{ height: `${Math.max(5, level)}%` }} // Min 5% so it shows a little bit
          >
             {/* Surface Highlight */}
             <div className="w-full h-1 bg-blue-300/90 absolute top-0"></div>
             
             {/* Bubbles inside water */}
             {level > 20 && (
               <>
                <div className="absolute bottom-2 left-4 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-100"></div>
                <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-4 left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-500"></div>
               </>
             )}
          </div>
          
          {/* Reflection highlight on glass */}
          <div className="absolute top-2 right-2 w-1 h-20 bg-white/30 rounded-full z-30"></div>
        </div>
        {/* ----------------------------- */}

        <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-4">
          Sibling Hydration Meter
        </p>

        {/* Meter Visual */}
        <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden mb-6 border border-gray-300 shadow-inner">
           <div 
             className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-200 ease-out flex items-center justify-end px-2"
             style={{ width: `${level}%` }}
           >
             {level > 20 && <span className="text-white text-xs font-bold drop-shadow-md">{level}%</span>}
           </div>
           {/* Water bubbles effect */}
           {level > 0 && (
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           )}
        </div>

        {/* Slider */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={level} 
          onChange={handleChange}
          disabled={isSuccess}
          className={`w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all ${errorShake ? 'animate-wiggle bg-red-100' : ''}`}
        />
        
        <p className={`mt-4 font-bold transition-colors duration-300 ${isSuccess ? 'text-green-500 text-lg scale-110' : errorShake ? 'text-red-500' : 'text-gray-500'}`}>
          {message}
        </p>
      </div>

      {isSuccess && (
        <button 
          onClick={onComplete}
          className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-600 hover:scale-105 transition-all animate-bounce"
        >
          Brought with love 💕
        </button>
      )}
    </div>
  );
};

export default WaterGame;
