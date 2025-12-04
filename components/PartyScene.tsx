
import React, { useEffect } from 'react';

interface PartySceneProps {
  onComplete: () => void;
}

const PartyScene: React.FC<PartySceneProps> = ({ onComplete }) => {
  useEffect(() => {
    // Transition to cake after 12 seconds (5s for curtain + 5s of party)
    const timer = setTimeout(() => {
      onComplete();
    }, 8000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black/60 to-purple-900/40">
      
      {/* --- Aesthetic Fairy Lights --- */}
      <div className="absolute top-0 left-0 w-full h-24 z-20 pointer-events-none">
         {/* The Wire (SVG Curve) */}
         <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0,0 Q50,50 100,0 T200,0 T300,0 T400,0 T500,0 T600,0 T700,0 T800,0" 
                  fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
         </svg>
         
         {/* The Lights */}
         <div className="absolute top-0 left-0 w-full flex justify-around px-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="relative mt-2 sm:mt-4">
                 <div 
                   className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#fffec8] shadow-[0_0_15px_4px_rgba(255,253,180,0.6)] animate-twinkle`}
                   style={{ animationDelay: `${i * 0.2}s` }}
                 />
              </div>
            ))}
         </div>
      </div>

      {/* --- Soft Bokeh Fireworks (CSS) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full opacity-0 animate-pop blur-md
                ${i % 3 === 0 ? 'bg-pink-300 shadow-[0_0_20px_rgba(255,192,203,0.8)]' : ''}
                ${i % 3 === 1 ? 'bg-yellow-200 shadow-[0_0_20px_rgba(255,255,224,0.8)]' : ''}
                ${i % 3 === 2 ? 'bg-purple-300 shadow-[0_0_20px_rgba(230,230,250,0.8)]' : ''}
              `}
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80 + 10}%`,
                width: `${Math.random() * 80 + 60}px`,
                height: `${Math.random() * 80 + 60}px`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: '3s'
              }}
            />
         ))}
         {/* Sparkles */}
         {[...Array(20)].map((_, i) => (
           <div 
             key={`star-${i}`}
             className="absolute text-yellow-100 animate-pulse"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               fontSize: `${Math.random() * 20 + 10}px`,
               animationDelay: `${Math.random() * 2}s`,
               opacity: 0.7
             }}
           >
             ✦
           </div>
         ))}
      </div>
      
      {/* Title */}
      <div className="relative z-40 text-center">
        <h2 className="text-6xl sm:text-8xl font-handwriting text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] animate-pulse tracking-widest opacity-90">
          Party Time!
        </h2>
        <p className="text-white/80 font-sans mt-4 text-xl tracking-wider uppercase animate-bounce">
          Let's Celebrate!
        </p>
      </div>

    </div>
  );
};

export default PartyScene;
