
import React, { useState, useEffect } from 'react';

interface BirthdayCakeProps {
  onComplete: () => void;
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [isBlown, setIsBlown] = useState(false);
  const [isCut, setIsCut] = useState(false);

  // 1. Countdown Timer
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  // 2. Trigger Blow when count hits 0
  useEffect(() => {
    if (count === 0 && !isBlown) {
      setIsBlown(true);
    }
  }, [count, isBlown]);

  // 3. Trigger Cut 2.5 seconds after Blow
  useEffect(() => {
    if (isBlown && !isCut) {
      const timer = setTimeout(() => {
        setIsCut(true);
      }, 2500); // Wait 2.5s before cutting
      return () => clearTimeout(timer);
    }
  }, [isBlown, isCut]);

  // 4. Trigger Complete 4 seconds after Cut
  useEffect(() => {
    if (isCut) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000); // Wait 4s after cutting to show the inside
      return () => clearTimeout(timer);
    }
  }, [isCut, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-1000">
      <div className="mb-16 text-center z-20">
        {!isBlown ? (
          <h2 className="text-5xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] font-handwriting">
            Make a Wish! <br />
            <span className="text-7xl text-yellow-300 mt-4 block scale-125 transition-transform duration-500">
              {count}
            </span>
          </h2>
        ) : (
          <h2 className="text-5xl font-handwriting text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] animate-bounce">
            Yay! 🎂
          </h2>
        )}
      </div>

      {/* CSS Cake Container */}
      <div className="relative mt-8 transform scale-150 sm:scale-[2.0]">
        {/* Plate */}
        <div className="absolute -bottom-2 -left-16 w-72 h-8 bg-gray-100 rounded-[50%] shadow-2xl border-b-4 border-gray-300"></div>
        
        {/* Cake Body Wrapper */}
        <div className={`relative w-40 h-28 flex items-end justify-center transition-all duration-[2000ms] ease-in-out ${isCut ? 'gap-8 translate-y-4' : ''}`}>
           
           {/* Left Slice */}
           <div className={`relative w-20 h-28 bg-pink-400 rounded-l-xl border-r border-pink-500 shadow-lg overflow-hidden transition-transform duration-[2000ms] ease-in-out ${isCut ? '-translate-x-4 -rotate-6' : ''}`}>
             {/* Cream Layer Middle */}
             <div className="absolute top-1/2 w-full h-3 bg-white/90 shadow-sm"></div>
             {/* Frosting Top */}
             <div className="absolute top-0 w-full h-8 bg-white rounded-tl-xl relative">
                <div className="absolute -bottom-2 left-1 w-3 h-4 bg-white rounded-full"></div>
                <div className="absolute -bottom-3 left-6 w-4 h-6 bg-white rounded-full"></div>
                <div className="absolute -bottom-1 left-12 w-3 h-3 bg-white rounded-full"></div>
             </div>
             {/* Sprinkles */}
             <div className="absolute top-10 left-2 w-2 h-2 bg-yellow-300 rounded-full opacity-80"></div>
             <div className="absolute top-16 left-8 w-2 h-2 bg-blue-300 rounded-full opacity-80"></div>
             <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-300 rounded-full opacity-80"></div>
           </div>
           
           {/* Right Slice */}
           <div className={`relative w-20 h-28 bg-pink-400 rounded-r-xl border-l border-pink-500 shadow-lg overflow-hidden transition-transform duration-[2000ms] ease-in-out ${isCut ? 'translate-x-4 rotate-6' : ''}`}>
             {/* Cream Layer Middle */}
             <div className="absolute top-1/2 w-full h-3 bg-white/90 shadow-sm"></div>
             {/* Frosting Top */}
             <div className="absolute top-0 w-full h-8 bg-white rounded-tr-xl relative">
                <div className="absolute -bottom-3 right-2 w-4 h-5 bg-white rounded-full"></div>
                <div className="absolute -bottom-1 right-10 w-3 h-3 bg-white rounded-full"></div>
             </div>
             {/* Sprinkles */}
             <div className="absolute top-12 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-80"></div>
             <div className="absolute top-20 right-10 w-2 h-2 bg-yellow-300 rounded-full opacity-80"></div>
             <div className="absolute bottom-8 right-2 w-2 h-2 bg-blue-300 rounded-full opacity-80"></div>
           </div>

           {/* Candle (Stays in middle until cut) */}
           <div className={`absolute -top-14 left-1/2 -translate-x-1/2 w-4 h-14 bg-gradient-to-b from-yellow-100 to-yellow-200 border border-yellow-300 rounded-sm shadow-md transition-opacity duration-700 ${isCut ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-full h-1 bg-red-400 mt-2 opacity-50"></div>
              <div className="w-full h-1 bg-red-400 mt-2 opacity-50"></div>
              <div className="w-full h-1 bg-red-400 mt-2 opacity-50"></div>
              
              {/* Flame */}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-orange-500 rounded-[50%] blur-[2px] animate-pulse transition-all duration-500 ${isBlown ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                <div className="absolute top-1 left-1.5 w-3 h-5 bg-yellow-300 rounded-[50%]"></div>
              </div>
              
              {/* Smoke when blown */}
              {isBlown && !isCut && (
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-4xl animate-float opacity-0 animate-fade-out" style={{ animationDuration: '3s' }}>
                   💨
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCake;
