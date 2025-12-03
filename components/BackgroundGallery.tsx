import React, { useState, useEffect } from 'react';

// --- INSTRUCTIONS FOR YOUR PHOTOS ---
// 1. Open your Google Drive folder.
// 2. Right-click a photo -> "Share" -> "Copy Link".
// 3. Make sure access is set to "Anyone with the link".
// 4. Paste the link below in the IMAGES list.
//    (My code automatically fixes the link to work on the website!)

const IMAGES = [
  // EXAMPLE: Replace these with your copied Drive links
  "https://drive.google.com/file/d/1IcbDNBO9yxXIJsCt_1abCq_ujcPq_sfD/view?usp=drive_link",
  "https://drive.google.com/file/d/1snINQAEjKt5EM_yYOoKO9vdfEiD1JUaw/view?usp=drive_link",
  "https://drive.google.com/file/d/1bpf2cDQ4FgFjubZlnFvu_BLDXHWH7GIE/view?usp=drive_link",
  "https://drive.google.com/file/d/1deNpGDep7zQ9E5drpDDhMtXP2sVQqyS0/view?usp=drive_link"
  // "https://drive.google.com/file/d/123456789YourIDHere/view?usp=sharing", <--- Paste like this
];

// Helper to convert Drive links to Direct Image links
const getOptimizedUrl = (url: string) => {
  if (url.includes('drive.google.com') && url.includes('/file/d/')) {
    // Extract the ID from the standard share link
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
};

const BackgroundGallery: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000); // Slightly slower slide speed (6s) for better viewing
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Preload images to prevent flickering */}
      <div className="hidden">
        {IMAGES.map((src) => <img key={src} src={getOptimizedUrl(src)} alt="preload" />)}
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
            style={{ backgroundImage: `url(${getOptimizedUrl(src)})` }}
          />
        </div>
      ))}
      
      {/* Optional: Very light vignette to make white text pop slightly more without ruining the photo */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
    </div>
  );
};

export default BackgroundGallery;
