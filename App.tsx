
import React, { useState, useEffect, useRef } from 'react';
import { GameState, EmojiItem } from './types';
import BackgroundGallery from './components/BackgroundGallery';
import Confetti from './components/Confetti';
import BirthdayCake from './components/BirthdayCake';
import GiftBox from './components/GiftBox';
import MemoryGallery from './components/MemoryGallery';
import Curtain from './components/Curtain';
import PartyScene from './components/PartyScene';
import { generateRiddle, generateBirthdayWish, verifyEmojiSelection } from './services/geminiService';

// --- Icons ---
const LockIcon = ({ unlocked }: { unlocked: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${unlocked ? 'text-green-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {unlocked ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    )}
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const MusicIcon = ({ playing }: { playing: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {playing ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
    )}
  </svg>
);

// --- Constants ---
const EMOJIS: EmojiItem[] = [
  { id: '1', emoji: '👑', label: 'Bossy' },
  { id: '2', emoji: '🤡', label: 'Clown' },
  { id: '3', emoji: '🥰', label: 'Sweet' },
  { id: '4', emoji: '👹', label: 'Monster' },
  { id: '5', emoji: '🤓', label: 'Nerd' },
  { id: '6', emoji: '🦄', label: 'Unique' },
  { id: '7', emoji: '💤', label: 'Sleepy' },
  { id: '8', emoji: '🍕', label: 'Hungry' },
];

const SONG_URL = "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d3/Happy_Birthday_to_You_Piano.ogg/Happy_Birthday_to_You_Piano.ogg.mp3";

// --- Components ---

const ProgressBar = ({ stage }: { stage: number }) => {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center gap-4 pointer-events-none">
      {[1, 2, 3].map((num) => (
        <div key={num} className={`w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-lg transition-colors duration-500 ${stage > num ? 'bg-green-100 border-green-400' : stage === num ? 'bg-white border-pink-400 scale-110' : 'bg-white/80 border-gray-300'}`}>
          <LockIcon unlocked={stage > num} />
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [currentMission, setCurrentMission] = useState(0); 
  
  // Audio State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Curtain State
  const [isCurtainOpening, setIsCurtainOpening] = useState(false);

  // Mission 1 State
  const [riddle, setRiddle] = useState<{question: string, hint: string} | null>(null);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [riddleLoading, setRiddleLoading] = useState(false);
  const [riddleError, setRiddleError] = useState("");

  // Mission 2 State
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [emojiFeedback, setEmojiFeedback] = useState("");
  const [emojiLoading, setEmojiLoading] = useState(false);

  // Mission 3 State
  const [quizAttempt, setQuizAttempt] = useState(0);
  const moveButtonRef = useRef<HTMLButtonElement>(null);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  // Final Reveal
  const [wish, setWish] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // --- Effects ---

  useEffect(() => {
    // Preload riddle
    if (gameState === GameState.INTRO) {
      setRiddleLoading(true);
      generateRiddle().then(data => {
        setRiddle({ question: data.riddle, hint: data.hint });
        setRiddleLoading(false);
      });
    }
  }, [gameState]);

  // --- Handlers ---

  const handleStartGame = () => {
    setGameState(GameState.MISSION_1);
    setCurrentMission(1);
  };

  const handleRiddleSubmit = () => {
    const validAnswers = ['cake', 'sister', 'birthday', 'sibling', 'love', 'gift', 'candle', 'party', 'me'];
    if (validAnswers.some(ans => riddleAnswer.toLowerCase().includes(ans))) {
      setGameState(GameState.MISSION_2);
      setCurrentMission(2);
    } else {
      setRiddleError(`Nope! Here's a hint: ${riddle?.hint}`);
    }
  };

  const handleEmojiToggle = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(prev => prev.filter(e => e !== emoji));
    } else {
      if (selectedEmojis.length < 3) {
        setSelectedEmojis(prev => [...prev, emoji]);
      }
    }
  };

  const handleEmojiSubmit = async () => {
    setEmojiLoading(true);
    const feedback = await verifyEmojiSelection(selectedEmojis);
    setEmojiFeedback(feedback);
    setEmojiLoading(false);
    
    setTimeout(() => {
      setGameState(GameState.MISSION_3);
      setCurrentMission(3);
    }, 3000);
  };

  const moveButton = () => {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    setNoBtnPos({ x, y });
    setQuizAttempt(prev => prev + 1);
  };

  const handleQuizSuccess = () => {
    setGameState(GameState.UNLOCK);
    setCurrentMission(4);
  };

  const handleUnlock = async () => {
    if (passwordInput.toUpperCase().trim() === 'SISTER') {
      const generatedWish = await generateBirthdayWish();
      setWish(generatedWish);
      // Move to CURTAIN first (Grand Opening)
      setGameState(GameState.CURTAIN);
    } else {
      alert("Wrong password! Hint: What are you to me?");
    }
  };

  const handleCurtainOpen = () => {
    setIsCurtainOpening(true);
    
    // 🎵 START MUSIC ON INTERACTION 🎵
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => console.log("Audio autoplay prevented"));
    }
    
    // Wait for the slow curtain animation (5s) before technically switching state to PARTY
    setTimeout(() => {
        setGameState(GameState.PARTY);
        setIsCurtainOpening(false);
    }, 5000); 
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const MusicButton = () => (
    <button 
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 bg-white/50 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/80 transition-all text-gray-800"
      title={isMusicPlaying ? "Pause Music" : "Play Music"}
    >
      <MusicIcon playing={isMusicPlaying} />
    </button>
  );

  // --- Renders ---

  const isPartyMode = [GameState.CURTAIN, GameState.PARTY, GameState.CAKE, GameState.GIFT, GameState.REVEAL].includes(gameState);

  return (
    <div className="relative w-full h-[100dvh] font-sans text-gray-800 overflow-hidden">
      <BackgroundGallery />
      
      {/* Permanent Audio Element */}
      <audio 
        ref={audioRef} 
        src={SONG_URL} 
        loop 
        onError={() => console.log("Audio load failed")} 
      />
      
      {/* Music Toggle - Visible during the party sequence */}
      {isPartyMode && <MusicButton />}

      {/* --- SCENE: CURTAIN & PARTY --- */}
      {/* We render PartyScene behind curtain when it starts opening */}
      {(gameState === GameState.PARTY || (gameState === GameState.CURTAIN && isCurtainOpening)) && (
         <div className="absolute inset-0 z-10">
            <PartyScene onComplete={() => setGameState(GameState.CAKE)} />
         </div>
      )}

      {/* Curtain Overlay (z-60 > z-10) */}
      {gameState === GameState.CURTAIN && (
         <Curtain onOpen={handleCurtainOpen} />
      )}

      {/* --- SCENE: CAKE --- */}
      {gameState === GameState.CAKE && (
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-black/60">
          <BirthdayCake onComplete={() => setGameState(GameState.GIFT)} />
        </div>
      )}

      {/* --- SCENE: GIFT --- */}
      {gameState === GameState.GIFT && (
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-black/60">
           <Confetti />
           <GiftBox onOpen={() => setGameState(GameState.REVEAL)} />
        </div>
      )}

      {/* --- SCENE: REVEAL --- */}
      {gameState === GameState.REVEAL && (
        <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden p-4 py-20 bg-black/40">
           <Confetti />
           <div className="max-w-md mx-auto animate-in fade-in duration-1000">
             <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/60">
                <div className="flex justify-center mb-4">
                  <HeartIcon />
                  <HeartIcon />
                  <HeartIcon />
                </div>
                
                <h1 className="text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 pb-2 text-center">
                  Happy Birthday!
                </h1>
                
                <div className="bg-white/60 p-6 rounded-2xl shadow-inner max-h-60 overflow-y-auto custom-scrollbar mt-4">
                  <p className="text-lg leading-loose italic text-gray-800 whitespace-pre-line font-medium text-center">
                    {wish || "Loading your poem..."}
                  </p>
                </div>

                <div className="text-left mt-6">
                  <p className="text-sm font-bold text-gray-600 ml-1 mb-2">📸 Our Memories:</p>
                  <MemoryGallery />
                </div>

                <div className="pt-4 border-t border-gray-200 mt-6">
                  <p className="text-sm text-gray-600 uppercase tracking-widest mb-2 text-center">Gift Coupon</p>
                  <div className="bg-gradient-to-r from-pink-100/90 to-blue-100/90 p-4 rounded-lg border border-dashed border-gray-400 text-center">
                     <p className="font-bold text-gray-800">Redeem for: 1 Free Lunch & 30 mins of no annoying jokes.</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">Love you! ❤️</p>
             </div>
           </div>
        </div>
      )}

      {/* --- MISSIONS & UNLOCK (Standard UI) --- */}
      {!isPartyMode && (
        <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden">
          
          {(gameState === GameState.MISSION_1 || gameState === GameState.MISSION_2 || gameState === GameState.MISSION_3) && (
            <ProgressBar stage={currentMission} />
          )}

          <div className="flex min-h-full flex-col items-center justify-center p-4 py-20">
            
            <div className="bg-white/85 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-md w-full border border-white/60 animate-float transition-all duration-500">
              
              {/* INTRO */}
              {gameState === GameState.INTRO && (
                <div className="text-center space-y-6">
                  <h1 className="text-4xl font-handwriting text-purple-600 mb-2">Uh oh...</h1>
                  <p className="text-lg">You've been digitally kidnapped!</p>
                  <div className="bg-purple-100/90 p-4 rounded-xl text-purple-800 text-sm">
                    <p>To unlock your birthday surprise, you must prove you are my true sister by passing 3 challenges.</p>
                  </div>
                  <button 
                    onClick={handleStartGame}
                    className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                  >
                    I Accept the Challenge!
                  </button>
                </div>
              )}

              {/* MISSION 1: RIDDLE */}
              {gameState === GameState.MISSION_1 && (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-pink-500">Mission 1: The Riddle</h2>
                  <div className="bg-yellow-50/90 p-6 rounded-xl border-2 border-yellow-100 border-dashed">
                    {riddleLoading ? (
                      <p className="animate-pulse">Consulting the oracle...</p>
                    ) : (
                      <p className="text-lg font-handwriting leading-relaxed">{riddle?.question}</p>
                    )}
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Type your answer..." 
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none text-center bg-white/90"
                    value={riddleAnswer}
                    onChange={(e) => {
                      setRiddleAnswer(e.target.value);
                      setRiddleError('');
                    }}
                  />
                  
                  {riddleError && <p className="text-red-500 font-bold text-sm animate-bounce">{riddleError}</p>}

                  <button 
                    onClick={handleRiddleSubmit}
                    className="w-full py-3 bg-pink-400 text-white rounded-full font-bold shadow-md hover:bg-pink-500 transition-colors"
                  >
                    Unlock
                  </button>
                </div>
              )}

              {/* MISSION 2: EMOJIS */}
              {gameState === GameState.MISSION_2 && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-purple-500">Mission 2: Describe Me</h2>
                  <p className="text-sm text-gray-700 font-medium">Pick exactly 3 emojis that describe your favorite sibling.</p>
                  
                  {!emojiFeedback ? (
                    <>
                      <div className="grid grid-cols-4 gap-3 my-4">
                        {EMOJIS.map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => handleEmojiToggle(item.emoji)}
                            className={`text-3xl p-2 rounded-lg transition-all ${selectedEmojis.includes(item.emoji) ? 'bg-purple-200 scale-110 ring-2 ring-purple-400' : 'bg-gray-50/80 hover:bg-gray-100'}`}
                          >
                            {item.emoji}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={handleEmojiSubmit}
                        disabled={selectedEmojis.length !== 3 || emojiLoading}
                        className="w-full py-3 bg-purple-400 disabled:bg-gray-300 text-white rounded-full font-bold shadow-md hover:bg-purple-500 transition-colors"
                      >
                        {emojiLoading ? 'Analyzing...' : 'Analyze My Choices'}
                      </button>
                    </>
                  ) : (
                    <div className="bg-purple-50/90 p-6 rounded-xl animate-in fade-in zoom-in duration-500">
                      <p className="text-xl mb-2">{selectedEmojis.join(' ')}</p>
                      <p className="font-handwriting text-lg text-purple-800">"{emojiFeedback}"</p>
                      <p className="text-xs text-gray-500 mt-4">(Moving to next level...)</p>
                    </div>
                  )}
                </div>
              )}

              {/* MISSION 3: RIGGED QUIZ */}
              {gameState === GameState.MISSION_3 && (
                <div className="text-center space-y-8">
                   <h2 className="text-2xl font-bold text-blue-500">Mission 3: The Truth</h2>
                   <p className="text-xl font-medium">Who is the favorite child?</p>
                   
                   <div className="relative h-40 w-full flex items-center justify-center select-none">
                     <button 
                       onClick={handleQuizSuccess}
                       className="absolute left-4 sm:left-10 bg-green-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-green-500 z-10"
                     >
                       You (User)
                     </button>

                     <button 
                       ref={moveButtonRef}
                       onMouseEnter={moveButton}
                       onClick={moveButton}
                       style={{ 
                         transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                         transition: 'transform 0.1s ease-out'
                       }}
                       className="absolute right-4 sm:right-10 bg-red-300 text-white px-8 py-3 rounded-full font-bold shadow-lg z-20"
                     >
                       Me (Sister)
                     </button>
                   </div>
                   
                   {quizAttempt > 2 && (
                     <p className="text-sm text-gray-600 font-bold italic">Stop trying to click "Me". It's physically impossible.</p>
                   )}
                </div>
              )}

              {/* UNLOCK SCREEN */}
              {gameState === GameState.UNLOCK && (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-gray-700">The Final Door</h2>
                  <div className="flex justify-center gap-2 mb-4">
                     <LockIcon unlocked={true} />
                     <LockIcon unlocked={true} />
                     <LockIcon unlocked={true} />
                  </div>
                  <p>Password Hint: What are you to me?</p>
                  
                  <input 
                    type="password" 
                    placeholder="Enter Password" 
                    className="w-full p-4 rounded-lg border-2 border-pink-200 focus:border-pink-400 outline-none text-center text-xl tracking-widest bg-white/90"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />

                  <button 
                    onClick={handleUnlock}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform"
                  >
                    UNLOCK SURPRISE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
