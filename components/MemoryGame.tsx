
import React, { useState, useEffect } from 'react';

// --- INSTRUCTIONS ---
// 1. Create a folder named 'public' in your main project folder.
// 2. Inside 'public', create a folder named 'images'.
// 3. Put your FULL, UNCROPPED photos there (e.g. game1.jpg).
//    The code below automatically splits them into Left/Right halves!
// 4. Rename your files to match the list below:

const MEMORY_PHOTOS = [
  "/images/game1.jpg", 
  "/images/game2.jpg",    
  "/images/game3.jpg", 
  "/images/game4.jpg", 
];

// Fallback logic: If local photos aren't found, these won't load, 
// so make sure you upload them!

interface Card {
  id: string;      // Unique ID for the card instance
  imageId: number; // ID of the photo (0, 1, 2...)
  imageUrl: string;
  half: 'left' | 'right'; // Which half of the photo this card shows
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onComplete: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Game
  useEffect(() => {
    const generatedCards: Card[] = [];
    
    // Create Left and Right cards for each photo
    MEMORY_PHOTOS.forEach((url, index) => {
      // Left Half
      generatedCards.push({
        id: `img-${index}-left`,
        imageId: index,
        imageUrl: url,
        half: 'left',
        isFlipped: false,
        isMatched: false,
      });
      // Right Half
      generatedCards.push({
        id: `img-${index}-right`,
        imageId: index,
        imageUrl: url,
        half: 'right',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffled = generatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Handle Card Click
  const handleCardClick = (id: string) => {
    // Prevent clicking if busy, already flipped, or matched
    if (isProcessing || flippedIds.includes(id) || cards.find(c => c.id === id)?.isMatched) return;

    // Flip the card
    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    
    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    // Check for match
    if (newFlippedIds.length === 2) {
      setIsProcessing(true);
      checkForMatch(newFlippedIds, newCards);
    }
  };

  const checkForMatch = (currentFlippedIds: string[], currentCards: Card[]) => {
    const [id1, id2] = currentFlippedIds;
    const card1 = currentCards.find(c => c.id === id1);
    const card2 = currentCards.find(c => c.id === id2);

    // Match Condition: Both cards must come from the same Image ID
    if (card1 && card2 && card1.imageId === card2.imageId) {
      // Match found!
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          currentFlippedIds.includes(card.id) 
            ? { ...card, isMatched: true, isFlipped: true } 
            : card
        ));
        setFlippedIds([]);
        setIsProcessing(false);
      }, 500);
    } else {
      // No match - unflip after delay
      setTimeout(() => {
        setCards(prev => prev.map(card => 
          currentFlippedIds.includes(card.id) 
            ? { ...card, isFlipped: false } 
            : card
        ));
        setFlippedIds([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  // Check Win Condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [cards, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 animate-in fade-in duration-700">
      <h2 className="text-2xl font-bold text-purple-500 text-center mb-2">Mission 2: Complete the Memory</h2>
      <p className="text-sm text-gray-600 text-center mb-4">Find the two halves of our photos to complete the memory!</p>
      
      {/* 
        GRID UPDATE:
        - Increased max-w-4xl on container (above)
        - Reduced gap to gap-2 on mobile (allows cards to be wider)
        - grid-cols-2 (Mobile) / grid-cols-4 (Desktop)
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square cursor-pointer relative perspective-1000`}
          >
             <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front (Hidden state) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg shadow-md flex items-center justify-center backface-hidden border-2 border-white hover:scale-105 transition-transform group">
                   <span className="text-5xl opacity-50 text-white font-bold group-hover:scale-110 transition-transform">?</span>
                </div>

                {/* Back (Revealed state - The Split Photo) */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-white rounded-lg shadow-inner overflow-hidden rotate-y-180 backface-hidden border-2 
                    ${card.isMatched ? 'border-green-400 ring-4 ring-green-200' : 'border-gray-200'}`}
                >
                   {/* 
                      CSS TRICK: 
                      We use the same image for both cards.
                      background-size: 200% 100% -> Makes the image double the width of the card.
                      background-position: left/right -> Shows only the specific half.
                   */}
                   <div 
                     className="w-full h-full bg-cover bg-no-repeat"
                     style={{ 
                       backgroundImage: `url("${card.imageUrl}")`,
                       backgroundSize: '200% 100%', 
                       backgroundPosition: card.half === 'left' ? '0% center' : '100% center' 
                     }}
                   />
                </div>

             </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default MemoryGame;
