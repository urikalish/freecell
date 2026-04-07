document.addEventListener(
  'touchmove',
  function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  { passive: false, capture: true },
);

import './styles/variables.css';
import './styles/animations.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/cells-row.css';
import './styles/tableau.css';
import './styles/actions.css';
import './styles/difficulty.css';
import './styles/victory.css';
import './styles/cards.css';
import './styles/footer.css';

import {
  GameState,
  Location,
  MoveCandidate,
  Card,
  DifficultyLevel,
  DEFAULT_DIFFICULTY,
} from './model/types';
import { createNewGame } from './model/deck';
import {
  findValidMoves,
  executeMove,
  undoLastMove,
  isGameWon,
  findSafeFoundationMoves,
  getMovableCards,
} from './model/moves';
import {
  renderGame,
  renderVictoryOverlay,
  renderDifficultyOverlay,
  formatTime,
} from './ui/renderer';
import { animateDeal, animateButtonPress, animateVictory, animateCardMove } from './ui/animations';

let state: GameState;
let selectedCardId: string | null = null;
const validTargets = new Set<string>();
let tapCycleTargets: MoveCandidate[] = [];
let tapCycleIndex = -1;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let isAnimating = false;
let gameStarted = false;
let difficultyOpen = false;

const DIFFICULTY_KEY = 'freecell-difficulty';

function getSavedDifficulty(): DifficultyLevel {
  return (localStorage.getItem(DIFFICULTY_KEY) as DifficultyLevel) || DEFAULT_DIFFICULTY;
}

function saveDifficulty(difficulty: DifficultyLevel): void {
  localStorage.setItem(DIFFICULTY_KEY, difficulty);
}

const app = document.getElementById('app')!;

function getLocationFromElement(
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

function autoMoveToFoundations(): void {
  const safeMoves = findSafeFoundationMoves(state);
  for (const safeMove of safeMoves) {
    state = executeMove(state, safeMove, false);
  }
}

function render(): void {
  app.innerHTML = renderGame(state, selectedCardId, validTargets);

  if (difficultyOpen) {
    app.insertAdjacentHTML('beforeend', renderDifficultyOverlay(getSavedDifficulty()));
    bindDifficultyEvents();
  } else if (isGameWon(state)) {
    app.insertAdjacentHTML('beforeend', renderVictoryOverlay());
    setTimeout(() => animateVictory(), 1500);
    stopTimer();
  }

  bindEvents();
}

function clearSelection(): void {
  selectedCardId = null;
  validTargets.clear();
  tapCycleTargets = [];
  tapCycleIndex = -1;
}

function selectCard(location: Location, cardId: string): void {
  if (selectedCardId === cardId) {
    clearSelection();
    render();
    return;
  }

  const moves = findValidMoves(state, location);
  if (moves.length === 0) return;

  selectedCardId = cardId;
  validTargets.clear();
  for (const m of moves) {
    validTargets.add(`${m.to.zone}-${m.to.index}`);
  }
  tapCycleTargets = moves;
  tapCycleIndex = -1;

  render();
}

function tryMove(move: MoveCandidate): void {
  if (isAnimating) return;

  const sourceRects = move.cards
    .map(card => {
      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement | null;
      return { id: card.id, rect: el?.getBoundingClientRect() ?? null };
    })
    .filter((s): s is { id: string; rect: DOMRect } => s.rect !== null);

  clearSelection();
  state = executeMove(state, move);

  // Capture source rects for auto-moves before re-render, then execute them
  const safeMoves = findSafeFoundationMoves(state);
  const autoSourceRects: { id: string; rect: DOMRect }[] = [];
  for (const safeMove of safeMoves) {
    for (const card of safeMove.cards) {
      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement | null;
      const rect = el?.getBoundingClientRect() ?? null;
      if (rect) autoSourceRects.push({ id: card.id, rect });
    }
    state = executeMove(state, safeMove, false);
  }

  render();
  startTimerIfNeeded();

  animateCardMove([...sourceRects, ...autoSourceRects]);
}
function handleTap(location: Location, cardId: string | null): void {
  if (isAnimating) return;

  if (selectedCardId && cardId !== selectedCardId) {
    const move = tapCycleTargets.find(
      m => m.to.zone === location.zone && m.to.index === location.index,
    );
    if (move) {
      tryMove(move);
      return;
    }
  }

  if (selectedCardId && cardId === selectedCardId && tapCycleTargets.length > 0) {
    tapCycleIndex = (tapCycleIndex + 1) % tapCycleTargets.length;
    tryMove(tapCycleTargets[tapCycleIndex]);
    return;
  }

  if (selectedCardId && !cardId) {
    const move = tapCycleTargets.find(
      m => m.to.zone === location.zone && m.to.index === location.index,
    );
    if (move) {
      tryMove(move);
      return;
    }
    clearSelection();
    render();
    return;
  }

  if (cardId) {
    let cards: Card[] | null = null;
    if (location.zone === 'freecell') {
      const card = state.freeCells[location.index];
      if (card) cards = [card];
    } else if (location.zone === 'tableau') {
      cards = getMovableCards(state, location);
    }
    if (cards && cards.length > 0) {
      const moves = findValidMoves(state, location);
      if (moves.length === 1) {
        tryMove(moves[0]);
      } else {
        selectCard(location, cardId);
      }
    }
  }
}

function bindEvents(): void {
  const area = app.querySelector('.playing-area') as HTMLElement;
  if (!area) return;

  let pointerDownLoc: { location: Location; cardId: string | null } | null = null;

  area.addEventListener(
    'pointerdown',
    (e: PointerEvent) => {
      if (isAnimating) return;
      const info = getLocationFromElement(e.target as HTMLElement);
      if (!info) return;
      pointerDownLoc = info;
    },
    { passive: true },
  );

  area.addEventListener('pointerup', (e: PointerEvent) => {
    if (!pointerDownLoc) return;
    const upInfo = getLocationFromElement(e.target as HTMLElement);
    if (
      upInfo &&
      upInfo.location.zone === pointerDownLoc.location.zone &&
      upInfo.location.index === pointerDownLoc.location.index
    ) {
      handleTap(pointerDownLoc.location, pointerDownLoc.cardId);
    }
    pointerDownLoc = null;
  });

  area.addEventListener('pointercancel', () => {
    pointerDownLoc = null;
  });

  document.getElementById('btn-new')?.addEventListener('click', e => {
    animateButtonPress(e.currentTarget as HTMLElement);
    requestNewGame();
  });

  document.getElementById('btn-undo')?.addEventListener('click', e => {
    animateButtonPress(e.currentTarget as HTMLElement);
    undo();
  });

  document.getElementById('btn-new-game')?.addEventListener('click', () => {
    difficultyOpen = true;
    render();
  });
}

function requestNewGame(): void {
  difficultyOpen = true;
  render();
}

function bindDifficultyEvents(): void {
  document.querySelectorAll<HTMLButtonElement>('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const difficulty = btn.dataset.difficulty as DifficultyLevel;
      saveDifficulty(difficulty);
      difficultyOpen = false;
      newGame(difficulty);
    });
  });
  document.getElementById('new-game-cancel')?.addEventListener('click', () => {
    difficultyOpen = false;
    render();
  });
}
function newGame(difficulty: DifficultyLevel): void {
  stopTimer();
  gameStarted = false;
  clearSelection();
  state = createNewGame(difficulty);

  // Auto-move any initially safe cards
  autoMoveToFoundations();

  render();
  isAnimating = true;
  animateDeal(() => {
    isAnimating = false;
  });
}

function undo(): void {
  const prev = undoLastMove(state);
  if (prev) {
    clearSelection();
    state = prev;
    render();
  }
}

function startTimerIfNeeded(): void {
  if (gameStarted) return;
  gameStarted = true;
  state.gameStartTime = Date.now();
  timerInterval = setInterval(() => {
    state.elapsedSeconds = Math.floor((Date.now() - state.gameStartTime) / 1000);
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = formatTime(state.elapsedSeconds);
  }, 250);
}

function stopTimer(): void {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function initApp(): void {
  newGame(getSavedDifficulty());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (screen.orientation as any)?.lock?.('portrait').catch(() => {
    // Not supported or denied (desktop) — CSS fallback handles it
  });
}

document.addEventListener('DOMContentLoaded', initApp);

document.addEventListener(
  'touchstart',
  event => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false },
);

let lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  function (e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
      // Zoom is suppressed, but we still want the tap to register as a click.
      // When preventDefault() is called on touchend, the browser skips the
      // synthetic click event, so we dispatch one manually.
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      target?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
    lastTouchEnd = now;
  },
  { passive: false, capture: true },
);
document.addEventListener('gesturestart', event => {
  event.preventDefault();
});
