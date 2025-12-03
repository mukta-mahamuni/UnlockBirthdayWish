
import React from 'react';

// --- INSTRUCTIONS FOR USER ---
// Add your own photo URLs here!
// You can use the format: { src: "URL", caption: "Caption" }
const MEMORIES = [
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80",
    caption: "Remember this?"
  },
  {
    src: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=500&q=80",
    caption: "Besties Forever"
  },
  {
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&q=80",
    caption: "Chaos Duo"
  },
  // Add more photos here:
  // { src: "/images/1.jpg", caption: "Local Photo" },
];

const MemoryGallery: React.FC = () => {
  return (
    <div className="mt-6 w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex gap-4 px-2">
        {MEMORIES.map((mem, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-40 bg-white p-2 rounded shadow-md transform hover:scale-105 transition-transform duration-300 rotate-1 odd:-rotate-1"
          >
            <div className="w-full h-40 bg-gray-200 overflow-hidden rounded-sm">
              <img 
                src={mem.src} 
                alt={mem.caption} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-handwriting text-gray-600 mt-2 text-sm">{mem.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGallery;
