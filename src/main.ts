import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/cards.css';
import './styles/animations.css';

import { GameState, Location, MoveCandidate, Card } from './model/types';
import { createNewGame } from './model/deck';
import {
  findValidMoves,
  executeMove,
  undoLastMove,
  autoMoveToFoundation,
  isGameWon,
} from './model/moves';
import {
  renderGame,
  renderVictoryOverlay,
  renderThemeOverlay,
  renderConfirmOverlay,
  formatTime,
} from './ui/renderer';
import { THEMES, loadThemeIndex, saveThemeIndex, applyTheme } from './ui/themes';
import { getLocationFromElement, getMovableCards } from './ui/interactions';
import { animateDeal, animateButtonPress, animateVictory, animateCardMove } from './ui/animations';

let state: GameState;
let themeIndex: number;
let selectedCardId: string | null = null;
const validTargets = new Set<string>();
let tapCycleTargets: MoveCandidate[] = [];
let tapCycleIndex = -1;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let isAnimating = false;
let gameStarted = false;
let themeOverlayOpen = false;
let confirmOpen = false;

const app = document.getElementById('app')!;

function render(): void {
  const theme = THEMES[themeIndex];
  app.innerHTML = renderGame(state, selectedCardId, validTargets, theme);

  if (confirmOpen) {
    app.insertAdjacentHTML('beforeend', renderConfirmOverlay());
    bindConfirmEvents();
  }

  if (themeOverlayOpen) {
    app.insertAdjacentHTML('beforeend', renderThemeOverlay(THEMES, themeIndex));
    bindThemeOverlayEvents();
  }

  if (isGameWon(state)) {
    app.insertAdjacentHTML('beforeend', renderVictoryOverlay());
    setTimeout(() => animateVictory(), 1000);
    stopTimer();
  }

  bindEvents();
}

/*function update(newState: GameState): void {
  state = newState;
  const autoResult = autoMoveToFoundation(state);
  if (autoResult.movedCards.length > 0) {
    state = autoResult.state;
  }
  render();
}*/

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

  selectedCardId = cardId;
  const moves = findValidMoves(state, location);
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

  const newState = executeMove(state, move);

  // Peek at auto-moves and capture their source positions before rendering
  const autoResult = autoMoveToFoundation(newState);
  const autoSourceRects = autoResult.movedCards
    .map(card => {
      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement | null;
      return { id: card.id, rect: el?.getBoundingClientRect() ?? null };
    })
    .filter((s): s is { id: string; rect: DOMRect } => s.rect !== null);

  clearSelection();
  state = autoResult.state;
  render();
  startTimerIfNeeded();

  animateCardMove(sourceRects);
  if (autoSourceRects.length > 0) {
    setTimeout(() => animateCardMove(autoSourceRects), 200);
  }
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
      selectCard(location, cardId);
    }
  }
}

function bindThemeOverlayEvents(): void {
  const overlay = document.getElementById('theme-overlay');
  if (!overlay) return;

  overlay.addEventListener('click', (e: MouseEvent) => {
    const option = (e.target as HTMLElement).closest('.theme-option') as HTMLElement;
    if (option) {
      const idx = parseInt(option.dataset.themeIndex || '0', 10);
      themeIndex = idx;
      saveThemeIndex(themeIndex);
      applyTheme(THEMES[themeIndex]);
      themeOverlayOpen = false;
      app.classList.add('theme-flash');
      setTimeout(() => app.classList.remove('theme-flash'), 300);
      render();
    } else {
      themeOverlayOpen = false;
      render();
    }
  });
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

  document.getElementById('btn-theme')?.addEventListener('click', e => {
    animateButtonPress(e.currentTarget as HTMLElement);
    toggleThemeOverlay();
  });

  document.getElementById('btn-new-game')?.addEventListener('click', () => newGame());
}

function toggleThemeOverlay(): void {
  themeOverlayOpen = !themeOverlayOpen;
  render();
}

function requestNewGame(): void {
  if (!state || state.moveCount === 0) {
    newGame();
    return;
  }
  confirmOpen = true;
  render();
}

function bindConfirmEvents(): void {
  document.getElementById('confirm-yes')?.addEventListener('click', () => {
    confirmOpen = false;
    newGame();
  });
  document.getElementById('confirm-no')?.addEventListener('click', () => {
    confirmOpen = false;
    render();
  });
}
function newGame(): void {
  stopTimer();
  gameStarted = false;
  themeOverlayOpen = false;
  clearSelection();
  state = createNewGame();
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
  timerInterval = setInterval(() => {
    state.elapsedSeconds++;
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = formatTime(state.elapsedSeconds);
  }, 1000);
}

function stopTimer(): void {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function initApp(): void {
  themeIndex = loadThemeIndex();
  applyTheme(THEMES[themeIndex]);
  newGame();
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

document.addEventListener('gesturestart', event => {
  event.preventDefault();
});
