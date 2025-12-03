
export enum GameState {
  INTRO = 'INTRO',
  MISSION_1 = 'MISSION_1', // Riddle
  MISSION_2 = 'MISSION_2', // Emojis
  MISSION_3 = 'MISSION_3', // Quiz
  UNLOCK = 'UNLOCK',       // Final Password
  CAKE = 'CAKE',           // New: Blow candle & cut cake
  GIFT = 'GIFT',           // New: Open gift box
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
