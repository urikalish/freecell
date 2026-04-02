import { GameState, Location, Card } from '../model/types';
import { getMovableSequenceLength } from '../model/moves';

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

export function getMovableCards(state: GameState, location: Location): Card[] | null {
  if (location.zone === 'freecell') {
    const card = state.freeCells[location.index];
    return card ? [card] : null;
  }
  if (location.zone === 'foundation') return null;
  if (location.zone === 'tableau') {
    const col = state.tableau[location.index];
    if (col.length === 0) return null;
    const cardIndex = location.cardIndex ?? col.length - 1;
    const movableLen = getMovableSequenceLength(col, state);
    const firstMovable = col.length - movableLen;
    if (cardIndex < firstMovable) return null;
    return col.slice(cardIndex);
  }
  return null;
}
