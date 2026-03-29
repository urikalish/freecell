import {
  Card,
  GameState,
  Location,
  MoveCandidate,
  suitColor,
  HistoryEntry,
  FOUNDATION_SUIT_ORDER,
} from './types';
import { cloneState } from './deck';

function getCardsAt(state: GameState, loc: Location): Card[] {
  if (loc.zone === 'freecell') {
    const card = state.freeCells[loc.index];
    return card ? [card] : [];
  }
  if (loc.zone === 'foundation') {
    const pile = state.foundations[loc.index];
    return pile.length > 0 ? [pile[pile.length - 1]] : [];
  }
  const col = state.tableau[loc.index];
  const ci = loc.cardIndex ?? col.length - 1;
  return col.slice(ci);
}

function isDescendingAlternating(cards: Card[]): boolean {
  for (let i = 1; i < cards.length; i++) {
    if (cards[i].rank !== cards[i - 1].rank - 1) return false;
    if (suitColor(cards[i].suit) === suitColor(cards[i - 1].suit)) return false;
  }
  return true;
}

export function getMovableSequenceLength(col: Card[]): number {
  if (col.length === 0) return 0;
  let len = 1;
  for (let i = col.length - 2; i >= 0; i--) {
    if (col[i].rank !== col[i + 1].rank + 1) break;
    if (suitColor(col[i].suit) === suitColor(col[i + 1].suit)) break;
    len++;
  }
  return len;
}

function emptyFreeCellCount(state: GameState): number {
  return state.freeCells.filter(c => c === null).length;
}

function emptyTableauCount(state: GameState): number {
  return state.tableau.filter(col => col.length === 0).length;
}

export function maxMovableCards(state: GameState, toEmpty: boolean): number {
  const freeCells = emptyFreeCellCount(state);
  const emptyCols = emptyTableauCount(state) - (toEmpty ? 1 : 0);
  return (1 + freeCells) * Math.pow(2, emptyCols);
}

function canPlaceOnFoundation(card: Card, foundation: Card[], foundationIndex: number): boolean {
  if (foundation.length === 0)
    return card.rank === 1 && card.suit === FOUNDATION_SUIT_ORDER[foundationIndex];
  const top = foundation[foundation.length - 1];
  return top.suit === card.suit && card.rank === top.rank + 1;
}

function canPlaceOnTableau(cards: Card[], col: Card[]): boolean {
  if (col.length === 0) return true;
  const top = col[col.length - 1];
  return cards[0].rank === top.rank - 1 && suitColor(cards[0].suit) !== suitColor(top.suit);
}

export function findValidMoves(state: GameState, from: Location): MoveCandidate[] {
  const candidates: MoveCandidate[] = [];
  const cards = getCardsAt(state, from);
  if (cards.length === 0) return candidates;

  if (from.zone === 'tableau') {
    if (!isDescendingAlternating(cards)) return candidates;
  }

  // Single card moves
  if (cards.length === 1) {
    // To foundations
    for (let i = 0; i < 4; i++) {
      if (canPlaceOnFoundation(cards[0], state.foundations[i], i)) {
        candidates.push({ from, to: { zone: 'foundation', index: i }, cards: [...cards] });
      }
    }
  }

  // To tableau columns
  const max = maxMovableCards(state, false);
  if (cards.length <= max) {
    for (let i = 0; i < 8; i++) {
      if (from.zone === 'tableau' && from.index === i) continue;
      const col = state.tableau[i];
      if (col.length === 0) {
        if (cards.length <= maxMovableCards(state, true)) {
          candidates.push({ from, to: { zone: 'tableau', index: i }, cards: [...cards] });
        }
      } else if (canPlaceOnTableau(cards, col)) {
        candidates.push({ from, to: { zone: 'tableau', index: i }, cards: [...cards] });
      }
    }
  }

  // To free cells (not allowed from another free cell, and only single cards)
  if (from.zone !== 'freecell' && cards.length === 1)
    for (let i = 0; i < 4; i++) {
      if (state.freeCells[i] === null) {
        candidates.push({ from, to: { zone: 'freecell', index: i }, cards: [...cards] });
        break; // Only need one free cell option
      }
    }

  return candidates;
}

export function executeMove(state: GameState, move: MoveCandidate): GameState {
  const newState = cloneState(state);

  // Remove cards from source
  if (move.from.zone === 'freecell') {
    newState.freeCells[move.from.index] = null;
  } else if (move.from.zone === 'foundation') {
    newState.foundations[move.from.index].pop();
  } else {
    const ci = move.from.cardIndex ?? newState.tableau[move.from.index].length - move.cards.length;
    newState.tableau[move.from.index].splice(ci, move.cards.length);
  }

  // Place cards at destination
  if (move.to.zone === 'freecell') {
    newState.freeCells[move.to.index] = move.cards[0];
  } else if (move.to.zone === 'foundation') {
    newState.foundations[move.to.index].push(move.cards[0]);
  } else {
    newState.tableau[move.to.index].push(...move.cards);
  }

  newState.moveCount++;
  const historyEntry: HistoryEntry = {
    from: move.from,
    to: move.to,
    cards: [...move.cards],
  };
  newState.history = [...state.history, historyEntry];

  return newState;
}

export function undoLastMove(state: GameState): GameState | null {
  if (state.history.length === 0) return null;
  const newState = cloneState(state);
  const last = newState.history.pop()!;

  // Remove cards from destination
  if (last.to.zone === 'freecell') {
    newState.freeCells[last.to.index] = null;
  } else if (last.to.zone === 'foundation') {
    newState.foundations[last.to.index].pop();
  } else {
    newState.tableau[last.to.index].splice(
      newState.tableau[last.to.index].length - last.cards.length,
      last.cards.length,
    );
  }

  // Place cards back at source
  if (last.from.zone === 'freecell') {
    newState.freeCells[last.from.index] = last.cards[0];
  } else if (last.from.zone === 'foundation') {
    newState.foundations[last.from.index].push(last.cards[0]);
  } else {
    const ci = last.from.cardIndex ?? newState.tableau[last.from.index].length;
    newState.tableau[last.from.index].splice(ci, 0, ...last.cards);
  }

  newState.moveCount = Math.max(0, newState.moveCount - 1);
  return newState;
}

export function isGameWon(state: GameState): boolean {
  return state.foundations.every(f => f.length === 13);
}

export function findAllValidMovesFrom(state: GameState, from: Location): MoveCandidate[] {
  return findValidMoves(state, from);
}
