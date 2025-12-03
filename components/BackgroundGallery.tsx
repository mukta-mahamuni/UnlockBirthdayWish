import React, { useState, useEffect } from 'react';

// Using public Unsplash IDs for a cute, pastel aesthetic
const IMAGES = [
  "https://i.pinimg.com/736x/2e/26/50/2e265026ddbb6405e0f11d779f2cb5c4.jpg", // Confetti/Party
  "https://i.pinimg.com/736x/98/8f/3c/988f3ce9887fb7a0fa28e77dd96d82b2.jpg", // Pink Balloons
  "https://i.pinimg.com/736x/67/75/8f/67758f85cc38da4e5c4316f35dd6670a.jpg", // Flowers
  "https://i.pinimg.com/736x/b0/06/c6/b006c6d1d38018971700937918ef7dde.jpg", // Abstract Pastel
  "https://i.pinimg.com/736x/f0/4b/03/f04b030837d5831c16155baf0537ff76.jpg",
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
