
import React, { useState } from 'react';
import { verifyEmojiSelection } from '../services/geminiService';

interface EmojiGameProps {
  onComplete: () => void;
}

const EMOJIS = [
  "😂", "❤️", "🤔", "😒", "✨", "💩", "👑", "👻", "🔥", "👀", "🧸", "🦄"
];

const EmojiGame: React.FC<EmojiGameProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [reaction, setReaction] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleEmoji = (emoji: string) => {
    if (selected.includes(emoji)) {
      setSelected(selected.filter(e => e !== emoji));
    } else {
      if (selected.length < 3) {
        setSelected([...selected, emoji]);
      }
    }
  };

  const handleSubmit = async () => {
    if (selected.length !== 3) return;
    setLoading(true);
    const result = await verifyEmojiSelection(selected);
    setReaction(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center animate-in fade-in duration-700">
      <h2 className="text-2xl font-bold text-purple-500 mb-2">Mission 4: The Emoji Spell</h2>
      <p className="text-gray-600 mb-6 font-medium">Pick 3 emojis that you feel represent your sibling the most 💕 (for me - Mukta) </p>

      <div className="grid grid-cols-4 gap-3 mb-6 bg-white/50 p-4 rounded-2xl border border-white">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => toggleEmoji(emoji)}
            className={`text-3xl p-3 sm:p-4 rounded-xl transition-all duration-300 ${
              selected.includes(emoji) 
                ? 'bg-purple-200 scale-110 shadow-md ring-2 ring-purple-400' 
                : 'bg-white hover:bg-purple-50 hover:scale-105 shadow-sm'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {!reaction ? (
        <button
          onClick={handleSubmit}
          disabled={selected.length !== 3 || loading}
          className={`w-full py-3 rounded-full font-bold text-white transition-all shadow-md ${
            selected.length === 3 && !loading
              ? 'bg-purple-500 hover:bg-purple-600 hover:scale-105'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? "Judging you..." : "Submit Analysis"}
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 mb-4 shadow-sm">
             <p className="text-purple-800 italic font-medium">"{reaction}"</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 hover:scale-105 transition-all"
          >
            Okay, Fair Enough. Next!
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiGame;
