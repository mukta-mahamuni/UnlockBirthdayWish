import React, { useState, useEffect } from 'react';

// --- INSTRUCTIONS ---
// 1. Create a folder named 'public' in your main project directory.
// 2. Inside 'public', create a folder named 'images'.
// 3. Put your photos there and name them 1.jpg, 2.jpg, 3.jpg, etc.
// 4. If you add more, just add "/images/4.jpg" to the list below!

const IMAGES = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  // "/images/4.jpg", // Uncomment and add more lines if you have more photos!
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
          key={i}
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
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}
      
      {/* Optional: Very light vignette to make white text pop slightly more without ruining the photo */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
    </div>
  );
};

export default BackgroundGallery;
