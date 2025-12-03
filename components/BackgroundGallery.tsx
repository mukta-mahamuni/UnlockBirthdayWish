import React, { useState, useEffect } from 'react';

// Using high-quality memory-style images. 
// Replace these URLs with actual photos of you and your sister for the best effect!
const IMAGES = [
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1920&auto=format&fit=crop", // Happy sisters/friends
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1920&auto=format&fit=crop", // Party/Fun
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop", // Celebration/Confetti
  "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1920&auto=format&fit=crop", // Success/Joy
  "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=1920&auto=format&fit=crop", // Travel/Memories
];

const BackgroundGallery: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // Slower rotation (6s) to enjoy the photos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-gray-100 overflow-hidden">
      {/* Preload images */}
      <div className="hidden">
        {IMAGES.map((src) => <img key={src} src={src} alt="preload" />)}
      </div>

      {IMAGES.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out will-change-transform ${
            i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Ken Burns Effect Container */}
          <div 
            className={`w-full h-full bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
               i === index ? 'scale-110' : 'scale-100'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}
      
      {/* Removed heavy dark overlays. 
          Only a very faint vignette to help focus on the center card if needed, 
          but keeping the images bright and clear as requested. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none z-20"></div>
    </div>
  );
};

export default BackgroundGallery;