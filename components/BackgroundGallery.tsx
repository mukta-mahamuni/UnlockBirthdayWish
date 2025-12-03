import React, { useState, useEffect } from 'react';

// Using public Unsplash IDs for a cute, pastel aesthetic
const IMAGES = [
  "https://pin.it/1HZ6XGrJs", // Confetti/Party
  "https://pin.it/72oWhbPjT", // Pink Balloons
  "https://pin.it/79YBT2DgY", // Flowers
  "https://pin.it/5EH0zq9v9", // Abstract Pastel
  "https://pin.it/2nplWqOPP",
];

const BackgroundGallery: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change photo every 5 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Preload images to prevent flickering */}
      <div className="hidden">
        {IMAGES.map((src) => <img key={src} src={src} alt="preload" />)}
      </div>

      {IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out will-change-transform ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* 
            Ken Burns Effect: 
            - scale-110 to scale-100 creates a gentle "zoom out" effect 
            - bg-cover ensures the photo covers the whole screen 
          */}
          <div 
            className={`w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
               i === index ? 'scale-110' : 'scale-100'
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          />
        </div>
      ))}
      
      {/* Optional: Very light vignette to make white text pop slightly more without ruining the photo */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
    </div>
  );
};

export default BackgroundGallery;
