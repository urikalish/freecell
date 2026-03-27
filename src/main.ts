import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/cards.css';
import './styles/animations.css';

import {
  GameState,
  Location,
  MoveCandidate,
  Card,
  suitColor,
  Color,
  RANK_LABELS,
  Rank,
} from './model/types';
import { createNewGame } from './model/deck';
import {
  findValidMoves,
  executeMove,
  undoLastMove,
  autoMoveToFoundation,
  isGameWon,
} from './model/moves';
import { renderGame, renderVictoryOverlay, renderThemeOverlay, formatTime } from './ui/renderer';
import { THEMES, loadThemeIndex, saveThemeIndex, applyTheme } from './ui/themes';
import {
  createDragState,
  getLocationFromElement,
  findDropTarget,
  canStartDrag,
  DragState,
} from './ui/interactions';
import {
  animateDeal,
  animateButtonPress,
  animateVictory,
  animateLand,
  startSteamPuffs,
} from './ui/animations';
import { suitSvg } from './ui/suits';

const ROMAN: Record<Rank, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
};

let state: GameState;
let themeIndex: number;
let selectedCardId: string | null = null;
const validTargets = new Set<string>();
let tapCycleTargets: MoveCandidate[] = [];
let tapCycleIndex = -1;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let isAnimating = false;
let gameStarted = false;
let dragState: DragState = createDragState();
let themeOverlayOpen = false;

const app = document.getElementById('app')!;

function render(): void {
  const theme = THEMES[themeIndex];
  app.innerHTML = renderGame(state, selectedCardId, validTargets, theme);

  if (themeOverlayOpen) {
    app.insertAdjacentHTML('beforeend', renderThemeOverlay(THEMES, themeIndex));
    bindThemeOverlayEvents();
  }

  if (isGameWon(state)) {
    app.insertAdjacentHTML('beforeend', renderVictoryOverlay());
    setTimeout(() => animateVictory(), 100);
    stopTimer();
  }

  bindEvents();
}

function update(newState: GameState): void {
  state = newState;

  const autoResult = autoMoveToFoundation(state);
  if (autoResult.moved) {
    state = autoResult.state;
  }

  render();
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
  const newState = executeMove(state, move);
  clearSelection();
  update(newState);
  startTimerIfNeeded();

  setTimeout(() => {
    const lastCard = move.cards[move.cards.length - 1];
    const el = document.querySelector(`[data-card-id="${lastCard.id}"]`) as HTMLElement;
    if (el) animateLand(el);
  }, 10);
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
    const move = tapCycleTargets[tapCycleIndex];
    tryMove(move);
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
      cards = canStartDrag(state, location);
    }
    if (cards && cards.length > 0) {
      selectCard(location, cardId);
    }
  }
}

function createGhost(cards: Card[]): HTMLElement {
  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  cards.forEach((card, i) => {
    const colorClass = suitColor(card.suit) === Color.Red ? 'ruby' : 'emerald';
    const rankLabel = RANK_LABELS[card.rank];
    const roman = ROMAN[card.rank];
    const cardHtml = `<div class="card-slot" style="--card-index: ${i}">
      <div class="card ${colorClass}" data-card-id="${card.id}">
        <div class="card-inner">
          <span class="card-value">${rankLabel}</span>
          <span class="card-suit">${suitSvg(card.suit)}</span>
          <span class="card-suit-center">${suitSvg(card.suit)}</span>
          <span class="card-engrave">${roman}</span>
        </div>
      </div>
    </div>`;
    ghost.insertAdjacentHTML('beforeend', cardHtml);
  });
  document.body.appendChild(ghost);
  return ghost;
}

function startDrag(x: number, y: number, location: Location): void {
  const cards = canStartDrag(state, location);
  if (!cards) return;

  dragState = {
    ...createDragState(),
    cards,
    from: location,
    startX: x,
    startY: y,
    isDragging: false,
    ghostEl: null,
    offsetX: 0,
    offsetY: 0,
  };

  const cardId = cards[0].id;
  const cardEl = document.querySelector(`[data-card-id="${cardId}"]`) as HTMLElement;
  if (cardEl) {
    const rect = cardEl.getBoundingClientRect();
    dragState.offsetX = x - rect.left;
    dragState.offsetY = y - rect.top;
  }
}

function moveDrag(x: number, y: number): void {
  if (!dragState.cards.length) return;

  const dx = x - dragState.startX;
  const dy = y - dragState.startY;

  if (!dragState.isDragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
    dragState.isDragging = true;
    dragState.ghostEl = createGhost(dragState.cards);
    clearSelection();

    for (const card of dragState.cards) {
      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
      if (el) el.style.opacity = '0.3';
    }

    const moves = findValidMoves(state, dragState.from);
    validTargets.clear();
    for (const m of moves) {
      validTargets.add(`${m.to.zone}-${m.to.index}`);
    }
    for (const m of moves) {
      const selector =
        m.to.zone === 'tableau'
          ? `.column[data-index="${m.to.index}"]`
          : `.${m.to.zone === 'freecell' ? 'free-cell' : 'foundation-cell'}[data-index="${m.to.index}"]`;
      const el = document.querySelector(selector) as HTMLElement;
      if (el) el.classList.add('valid-target');
    }
  }

  if (dragState.isDragging && dragState.ghostEl) {
    dragState.ghostEl.style.left = `${x - dragState.offsetX}px`;
    dragState.ghostEl.style.top = `${y - dragState.offsetY}px`;
  }
}

function endDrag(x: number, y: number): void {
  if (!dragState.cards.length) return;

  if (dragState.isDragging) {
    const move = findDropTarget(state, dragState, x, y);

    if (dragState.ghostEl) {
      dragState.ghostEl.remove();
      dragState.ghostEl = null;
    }

    for (const card of dragState.cards) {
      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
      if (el) el.style.opacity = '';
    }

    validTargets.clear();

    if (move) {
      tryMove(move);
    } else {
      render();
    }
  }

  dragState = createDragState();
}

function cancelDrag(): void {
  if (dragState.ghostEl) {
    dragState.ghostEl.remove();
    dragState.ghostEl = null;
  }
  for (const card of dragState.cards) {
    const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
    if (el) el.style.opacity = '';
  }
  validTargets.clear();
  dragState = createDragState();
  render();
}

function bindThemeOverlayEvents(): void {
  const overlay = document.getElementById('theme-overlay');
  if (!overlay) return;

  overlay.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const option = target.closest('.theme-option') as HTMLElement;
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
      // click outside options closes overlay
      themeOverlayOpen = false;
      render();
    }
  });
}

function bindEvents(): void {
  const area = app.querySelector('.playing-area') as HTMLElement;
  if (!area) return;

  let touchStartLoc: { location: Location; cardId: string | null } | null = null;

  area.addEventListener(
    'pointerdown',
    (e: PointerEvent) => {
      if (isAnimating) return;
      const target = e.target as HTMLElement;
      const info = getLocationFromElement(target);
      if (!info) return;

      touchStartLoc = info;

      if (info.location.zone === 'freecell' || info.location.zone === 'tableau') {
        startDrag(e.clientX, e.clientY, info.location);
      }
    },
    { passive: true },
  );

  area.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      moveDrag(e.clientX, e.clientY);
    },
    { passive: true },
  );

  area.addEventListener('pointerup', (e: PointerEvent) => {
    if (dragState.isDragging) {
      endDrag(e.clientX, e.clientY);
      return;
    }

    if (touchStartLoc) {
      handleTap(touchStartLoc.location, touchStartLoc.cardId);
    }

    dragState = createDragState();
    touchStartLoc = null;
  });

  area.addEventListener('pointercancel', () => {
    cancelDrag();
    touchStartLoc = null;
  });

  const btnNew = document.getElementById('btn-new');
  const btnUndo = document.getElementById('btn-undo');
  const btnTheme = document.getElementById('btn-theme');
  const btnNewGame = document.getElementById('btn-new-game');

  btnNew?.addEventListener('click', () => {
    animateButtonPress(btnNew);
    newGame();
  });

  btnUndo?.addEventListener('click', () => {
    animateButtonPress(btnUndo);
    undo();
  });

  btnTheme?.addEventListener('click', () => {
    animateButtonPress(btnTheme);
    toggleThemeOverlay();
  });

  btnNewGame?.addEventListener('click', () => {
    newGame();
  });
}

function toggleThemeOverlay(): void {
  themeOverlayOpen = !themeOverlayOpen;
  render();
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
    update(prev);
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
  startSteamPuffs();
  newGame();
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
