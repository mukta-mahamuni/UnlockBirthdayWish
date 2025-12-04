import React from 'react';

const BackgroundGallery: React.FC = () => {
  // The specific aesthetic background image requested
  const bgImage = "https://i.pinimg.com/1200x/5f/3a/c6/5f3ac6269430f6033d509f4971f59780.jpg";

  return (
    <div className="fixed inset-0 z-0 bg-[#fbf6f0] overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      
      {/* Very subtle overlay to ensure text is readable against the light background */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none z-20" />
    </div>
  );
};

export default BackgroundGallery;
