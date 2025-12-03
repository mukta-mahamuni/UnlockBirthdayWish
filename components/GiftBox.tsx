
import React, { useState, useEffect } from 'react';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      // 1. Show sparkles shortly after opening starts
      const sparkleTimer = setTimeout(() => {
        setShowSparkles(true);
      }, 500);

      // 2. Wait 3.5 seconds before moving to the next screen (Reveal)
      // This gives time to see the box open and light shine
      const nextScreenTimer = setTimeout(() => {
        onOpen();
      }, 3500);

      return () => {
        clearTimeout(sparkleTimer);
        clearTimeout(nextScreenTimer);
      };
    }
  }, [isOpen, onOpen]);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-in zoom-in duration-700">
      <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-md font-handwriting tracking-wide">
        {isOpen ? "Here it comes..." : "Tap the Gift!"}
      </h2>

      <div 
        onClick={handleClick}
        className={`relative w-48 h-48 cursor-pointer transition-transform duration-500 ${!isOpen ? 'hover:scale-105 animate-bounce' : ''}`}
      >
        {/* Lid */}
        <div 
          className={`absolute -top-6 -left-3 w-54 h-14 bg-red-500 rounded-md shadow-2xl z-30 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-[2000ms] ${isOpen ? '-translate-y-40 -rotate-[20deg] opacity-0' : ''}`}
          style={{ width: '112%' }} 
        >
           {/* Ribbon horizontal on lid */}
           <div className="absolute left-1/2 -translate-x-1/2 h-full w-10 bg-yellow-400 border-l border-r border-yellow-500/30"></div>
           {/* Bow */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-10 bg-red-600 rounded-full shadow-md flex items-center justify-center">
             <div className="w-4 h-6 bg-red-700 rounded-full"></div>
           </div>
        </div>

        {/* Box Body */}
        <div className="w-full h-full bg-red-600 rounded-lg shadow-2xl relative overflow-hidden z-20 border-t border-red-400">
           {/* Ribbon vertical */}
           <div className="absolute left-1/2 -translate-x-1/2 h-full w-10 bg-yellow-400 border-l border-r border-yellow-500/30"></div>
        </div>

        {/* Magical Light Effect (Behind the box content) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white rounded-full shadow-[0_0_150px_80px_rgba(255,255,200,0.9)] transition-all duration-[2000ms] delay-500 z-10 ${isOpen ? 'opacity-100 scale-150' : 'opacity-0 scale-0'}`}></div>
        
        {/* Sparkles */}
         {showSparkles && (
           <>
            <div className="absolute -top-10 left-0 text-3xl animate-ping delay-700">✨</div>
            <div className="absolute -top-20 right-0 text-4xl animate-ping delay-1000">✨</div>
            <div className="absolute top-0 left-1/2 text-5xl animate-ping delay-500">✨</div>
           </>
         )}
      </div>
    </div>
  );
};

export default GiftBox;
