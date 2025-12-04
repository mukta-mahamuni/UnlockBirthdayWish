
export enum GameState {
  INTRO = 'INTRO',
  MISSION_1 = 'MISSION_1', // Riddle
  MISSION_2 = 'MISSION_2', // Memory
  MISSION_3 = 'MISSION_3', // Water Meter (New)
  MISSION_4 = 'MISSION_4', // Emojis (Restored)
  MISSION_5 = 'MISSION_5', // Quiz (Previously Mission 3)
  UNLOCK = 'UNLOCK',       // Final Password
  CURTAIN = 'CURTAIN',     // Theater curtain
  PARTY = 'PARTY',         // Cartoons & Fireworks
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
