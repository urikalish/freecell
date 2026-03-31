import { Card, Suit, Rank, GameState } from './types';

function createDeck(): Card[] {
  const suits = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];
  const deck: Card[] = [];
  for (const suit of suits) {
    for (let r = 1; r <= 13; r++) {
      const rank = r as Rank;
      deck.push({ suit, rank, id: `${suit}-${rank}` });
    }
  }
  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createNewGame(): GameState {
  const deck = shuffleDeck(createDeck());
  const tableau: Card[][] = Array.from({ length: 8 }, () => []);

  for (let i = 0; i < deck.length; i++) {
    tableau[i % 8].push(deck[i]);
  }

  return {
    freeCells: [null, null, null, null],
    foundations: [[], [], [], []],
    tableau,
    gameStartTime: 0,
    elapsedSeconds: 0,
    moveCount: 0,
    history: [],
  };
}

export function cloneState(state: GameState): GameState {
  return {
    freeCells: [...state.freeCells],
    foundations: state.foundations.map(f => [...f]),
    tableau: state.tableau.map(col => [...col]),
    elapsedSeconds: state.elapsedSeconds,
    gameStartTime: state.gameStartTime,
    moveCount: state.moveCount,
    history: [...state.history],
  };
}
