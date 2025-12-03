export enum GameState {
  INTRO = 'INTRO',
  MISSION_1 = 'MISSION_1', // Riddle
  MISSION_2 = 'MISSION_2', // Emojis
  MISSION_3 = 'MISSION_3', // Quiz
  UNLOCK = 'UNLOCK',       // Final Password
  REVEAL = 'REVEAL',       // Birthday Wish
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
