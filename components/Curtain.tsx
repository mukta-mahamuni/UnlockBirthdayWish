
import React, { useState } from 'react';

interface CurtainProps {
  onOpen: () => void;
}

const Curtain: React.FC<CurtainProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Notify parent immediately to start music, but wait for animation to unmount
    onOpen(); 
  };

  // CSS for the velvet fold texture
  const velvetStyle = {
    backgroundImage: `repeating-linear-gradient(90deg, 
      #7f1d1d 0px, 
      #991b1b 20px, 
      #7f1d1d 40px, 
      #450a0a 50px
    )`
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] flex overflow-hidden cursor-pointer transition-pointer-events ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`} 
      onClick={handleClick}
    >
       {/* --- Top Valance (The decorative top part) --- */}
       <div 
         className={`absolute top-0 left-0 w-full h-24 z-20 shadow-2xl transition-transform duration-[2000ms] ease-in-out delay-200 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
         style={velvetStyle}
       >
          {/* Gold Tassels Effect */}
          <div className="absolute bottom-0 w-full h-4 border-b-8 border-dashed border-yellow-500/80 drop-shadow-md"></div>
          <div className="absolute bottom-0 w-full h-2 bg-yellow-600/30"></div>
          
          {/* Scalloped Edge Effect using radial gradient */}
          <div className="absolute -bottom-4 left-0 w-full h-4 bg-repeat-x"
               style={{
                 backgroundImage: 'radial-gradient(circle at 10px 0, transparent 10px, #450a0a 11px)',
                 backgroundSize: '40px 20px',
                 height: '20px'
               }}
          ></div>
       </div>

       {/* --- Left Curtain --- */}
       <div 
         className={`h-full w-1/2 relative shadow-2xl transition-transform duration-[5000ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-end ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
         style={velvetStyle}
       >
          {/* Gold Trim on Edge */}
          <div className="h-full w-2 bg-gradient-to-r from-yellow-600 to-yellow-300 shadow-lg"></div>
          
          {/* Rope Tie Graphic (Visual only) */}
          <div className={`absolute top-1/2 right-10 w-4 h-32 bg-yellow-500 rounded-full shadow-lg border-2 border-yellow-200 transition-opacity duration-1000 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
       </div>
       
       {/* --- Right Curtain --- */}
       <div 
         className={`h-full w-1/2 relative shadow-2xl transition-transform duration-[5000ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-start ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
         style={velvetStyle}
       >
          {/* Gold Trim on Edge */}
          <div className="h-full w-2 bg-gradient-to-l from-yellow-600 to-yellow-300 shadow-lg"></div>

           {/* Rope Tie Graphic (Visual only) */}
           <div className={`absolute top-1/2 left-10 w-4 h-32 bg-yellow-500 rounded-full shadow-lg border-2 border-yellow-200 transition-opacity duration-1000 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
       </div>
       
       {/* Text Overlay */}
       {!isOpen && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
           <div className="bg-black/60 backdrop-blur-sm text-yellow-100 px-10 py-6 rounded-full border-2 border-yellow-500/50 font-handwriting text-3xl sm:text-4xl animate-pulse shadow-[0_0_30px_rgba(255,215,0,0.3)] tracking-wider">
             Tap to Start the Show!
           </div>
         </div>
       )}
    </div>
  );
};

export default Curtain;
