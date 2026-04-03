import { Card, Suit, Rank, GameState } from './types';

// Suit order used by Microsoft FreeCell LCG: Clubs=0, Diamonds=1, Hearts=2, Spades=3
const MS_SUITS: Suit[] = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

function msFreeCellTableau(dealNumber: number): Card[][] {
  let seed = dealNumber;
  function msRandom(): number {
    seed = (seed * 214013 + 2531011) & 0x7fffffff;
    return (seed >> 16) & 0x7fff;
  }

  const deck: Card[] = [];
  for (let rank = 0; rank < 13; rank++) {
    for (let suit = 0; suit < 4; suit++) {
      const r = (rank + 1) as Rank;
      deck.push({ suit: MS_SUITS[suit], rank: r, id: `${MS_SUITS[suit]}-${r}` });
    }
  }

  for (let i = 51; i > 0; i--) {
    const j = msRandom() % (i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  const tableau: Card[][] = Array.from({ length: 8 }, () => []);
  for (let i = 0; i < 52; i++) {
    tableau[i % 8].push(deck[51 - i]);
  }

  return tableau;
}

export function createNewGame(): GameState {
  const dealNumber = Math.floor(Math.random() * 32000) + 1;
  const tableau = msFreeCellTableau(dealNumber);

  return {
    dealNumber,
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
    dealNumber: state.dealNumber,
    freeCells: [...state.freeCells],
    foundations: state.foundations.map(f => [...f]),
    tableau: state.tableau.map(col => [...col]),
    elapsedSeconds: state.elapsedSeconds,
    gameStartTime: state.gameStartTime,
    moveCount: state.moveCount,
    history: [...state.history],
  };
}
