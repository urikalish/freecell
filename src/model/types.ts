export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Diamonds = 'diamonds',
  Clubs = 'clubs',
}

export enum Color {
  Black = 'black',
  Red = 'red',
}

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

export interface GameState {
  difficulty: DifficultyLevel;
  freeCells: (Card | null)[];
  foundations: Card[][];
  tableau: Card[][];
  dealId: number;
  gameStartTime: number;
  elapsedSeconds: number;
  moveCount: number;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  from: Location;
  to: Location;
  cards: Card[];
}

export interface Location {
  zone: 'freecell' | 'foundation' | 'tableau';
  index: number;
  cardIndex?: number;
}

export interface MoveCandidate {
  from: Location;
  to: Location;
  cards: Card[];
}

export const FOUNDATION_SUIT_ORDER: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];

export const RANK_LABELS: Record<Rank, string> = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export function suitColor(suit: Suit): Color {
  return suit === Suit.Hearts || suit === Suit.Diamonds ? Color.Red : Color.Black;
}

export type DifficultyLevel = 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  'Beginner',
  'Easy',
  'Medium',
  'Hard',
  'Expert',
];

export const DEFAULT_DIFFICULTY: DifficultyLevel = 'Beginner';
