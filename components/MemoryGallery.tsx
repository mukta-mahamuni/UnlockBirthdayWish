
import React from 'react';

// --- INSTRUCTIONS ---
// 1. On GitHub, go to 'public/images/' folder.
// 2. Upload your photos there.
// 3. Rename them EXACTLY to: gallery1.jpg, gallery2.jpg, gallery3.jpg

const MEMORIES = [
  {
    src: "/images/gallery1.jpeg",
    caption: "Remember this?"
  },
  {
    src: "/images/image3.jpeg",
    caption: "Besties Forever"
  },
  {
    src: "/images/image4.jpeg",
    caption: "Chaos Duo"
  },
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
