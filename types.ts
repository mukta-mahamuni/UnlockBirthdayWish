
export enum GameState {
  INTRO = 'INTRO',
  MISSION_1 = 'MISSION_1', // Riddle
  MISSION_2 = 'MISSION_2', // Emojis
  MISSION_3 = 'MISSION_3', // Quiz
  UNLOCK = 'UNLOCK',       // Final Password
  CURTAIN = 'CURTAIN',     // New: Theater curtain
  PARTY = 'PARTY',         // New: Cartoons & Fireworks
  CAKE = 'CAKE',           // Blow candle & cut cake
  GIFT = 'GIFT',           // Open gift box
  REVEAL = 'REVEAL',       // Birthday Wish & Gallery
}

export interface RiddleResponse {
  riddle: string;
  answer: string;
}

export interface EmojiItem {
  id: string;
  emoji: string;
  label: string;
}
