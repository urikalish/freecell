import { GameState, Location, Card, MoveCandidate } from '../model/types';
import { findValidMoves, getMovableSequenceLength } from '../model/moves';

export interface DragState {
  cards: Card[];
  from: Location;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  ghostEl: HTMLElement | null;
  isDragging: boolean;
}

export function createDragState(): DragState {
  return {
    cards: [],
    from: { zone: 'tableau', index: 0 },
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    ghostEl: null,
    isDragging: false,
  };
}

export function getLocationFromElement(
  el: HTMLElement,
): { location: Location; cardId: string | null } | null {
  const cardEl = el.closest('.card') as HTMLElement | null;
  const freeCellEl = el.closest('.free-cell') as HTMLElement | null;
  const foundationEl = el.closest('.foundation-cell') as HTMLElement | null;
  const colEl = el.closest('.column') as HTMLElement | null;

  if (cardEl) {
    const zone = cardEl.dataset.zone || cardEl.parentElement?.dataset.zone;
    const cardId = cardEl.dataset.cardId || null;

    if (zone === 'freecell') {
      const cell = cardEl.closest('.free-cell') as HTMLElement;
      const index = parseInt(cell?.dataset.index || '0', 10);
      return { location: { zone: 'freecell', index }, cardId };
    }
    if (zone === 'foundation') {
      const cell = cardEl.closest('.foundation-cell') as HTMLElement;
      const index = parseInt(cell?.dataset.index || '0', 10);
      return { location: { zone: 'foundation', index }, cardId };
    }
    if (zone === 'tableau') {
      const col = parseInt(cardEl.dataset.col || cardEl.parentElement?.dataset.col || '0', 10);
      const cardIndex = parseInt(
        cardEl.dataset.cardIndex || cardEl.parentElement?.dataset.cardIndex || '0',
        10,
      );
      return { location: { zone: 'tableau', index: col, cardIndex }, cardId };
    }
  }

  if (freeCellEl) {
    const index = parseInt(freeCellEl.dataset.index || '0', 10);
    return { location: { zone: 'freecell', index }, cardId: null };
  }

  if (foundationEl) {
    const index = parseInt(foundationEl.dataset.index || '0', 10);
    return { location: { zone: 'foundation', index }, cardId: null };
  }

  if (colEl) {
    const index = parseInt(colEl.dataset.index || '0', 10);
    return { location: { zone: 'tableau', index }, cardId: null };
  }

  return null;
}

export function findDropTarget(
  state: GameState,
  dragState: DragState,
  x: number,
  y: number,
): MoveCandidate | null {
  const el = document.elementFromPoint(x, y) as HTMLElement;
  if (!el) return null;

  const target = getLocationFromElement(el);
  if (!target) return null;

  const moves = findValidMoves(state, dragState.from);
  return (
    moves.find(m => m.to.zone === target.location.zone && m.to.index === target.location.index) ||
    null
  );
}

export function canStartDrag(state: GameState, location: Location): Card[] | null {
  if (location.zone === 'freecell') {
    const card = state.freeCells[location.index];
    return card ? [card] : null;
  }
  if (location.zone === 'foundation') return null;
  if (location.zone === 'tableau') {
    const col = state.tableau[location.index];
    if (col.length === 0) return null;
    const cardIndex = location.cardIndex ?? col.length - 1;
    const movableLen = getMovableSequenceLength(col);
    const firstMovable = col.length - movableLen;
    if (cardIndex < firstMovable) return null;
    return col.slice(cardIndex);
  }
  return null;
}
