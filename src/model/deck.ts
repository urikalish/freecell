import { Card, Suit, Rank, GameState, DifficultyLevel } from './types';
import msDeals from '../data/ms-deals.json';

// Suit order used by Microsoft FreeCell LCG: Clubs=0, Diamonds=1, Hearts=2, Spades=3
const MS_SUITS: Suit[] = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];

type DealEntry = { difficulty_level: string; ms_deal_ids: number[] };

const DIFFICULTY_DEAL_IDS: Record<DifficultyLevel, number[]> = (() => {
  const find = (level: string) =>
    (msDeals as DealEntry[]).find(d => d.difficulty_level === level)!.ms_deal_ids;
  return {
    Beginner: find('Beginner'),
    Easy: find('Easy'),
    Medium: find('Medium'),
    Hard: find('Hard'),
    Expert: find('Expert'),
  };
})();

function msFreeCellTableau(dealId: number): Card[][] {
  let seed = dealId;
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

export function createNewGame(difficulty: DifficultyLevel = 'Easy'): GameState {
  const ids = DIFFICULTY_DEAL_IDS[difficulty];
  const dealId = ids[Math.floor(Math.random() * ids.length)];
  const tableau = msFreeCellTableau(dealId);

  return {
    difficulty,
    dealId,
    freeCells: [null, null, null, null],
    foundations: [[], [], [], []],
    tableau,
    gameStartTime: 0,
    elapsedSeconds: 0,
    moveCount: 0,
    history: [],
  };
}

function getDifficultyForDealId(dealId: number): DifficultyLevel {
  for (const [difficulty, ids] of Object.entries(DIFFICULTY_DEAL_IDS) as [
    DifficultyLevel,
    number[],
  ][]) {
    if (ids.includes(dealId)) return difficulty;
  }
  return 'Medium';
}

export function createNewGameWithDealId(dealId: number): GameState {
  const difficulty = getDifficultyForDealId(dealId);
  const tableau = msFreeCellTableau(dealId);

  return {
    difficulty,
    dealId,
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
    difficulty: state.difficulty,
    dealId: state.dealId,
    freeCells: [...state.freeCells],
    foundations: state.foundations.map(f => [...f]),
    tableau: state.tableau.map(col => [...col]),
    elapsedSeconds: state.elapsedSeconds,
    gameStartTime: state.gameStartTime,
    moveCount: state.moveCount,
    history: [...state.history],
  };
}
