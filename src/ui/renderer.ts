import {
  Card,
  GameState,
  Rank,
  RANK_LABELS,
  suitColor,
  Color,
  DifficultyLevel,
  DIFFICULTY_LEVELS,
} from '../model/types';
import { getMovableSequenceLength } from '../model/moves';
import { suitSvg, FOUNDATION_SUIT_ORDER } from './suits';

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

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function renderCard(card: Card, extraClasses: string = '', dataAttrs: string = ''): string {
  const colorClass = suitColor(card.suit) === Color.Red ? 'red' : 'black';
  const rankLabel = RANK_LABELS[card.rank];
  const roman = ROMAN[card.rank];
  return `<div class="card ${colorClass} ${extraClasses}" data-card-id="${card.id}" ${dataAttrs}>
    <div class="card-inner">
      <div class="card-value-and-suit">
        <span class="card-value">${rankLabel}</span>
        <span class="card-suit">${suitSvg(card.suit, card.rank, false)}</span>
      </div>
      <span class="card-suit-center">${suitSvg(card.suit, card.rank, true)}</span>
      <span class="card-roman">${roman}</span>
    </div>
  </div>`;
}

export function renderGame(
  state: GameState,
  selectedCardId: string | null,
  validTargets: Set<string>,
): string {
  const freeCellsHtml = state.freeCells
    .map((card, i) => {
      const isSelected = card && card.id === selectedCardId;
      const isValid = validTargets.has(`freecell-${i}`);
      const filled = card ? 'filled' : '';
      const validClass = isValid ? 'valid-target' : '';
      const inner = card ? renderCard(card, isSelected ? 'selected' : '') : '';
      return `<div class="free-cell ${filled} ${validClass}" data-zone="freecell" data-index="${i}">${inner}</div>`;
    })
    .join('');

  const foundationsHtml = state.foundations
    .map((pile, i) => {
      const isValid = validTargets.has(`foundation-${i}`);
      const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
      const filled = topCard ? 'filled' : '';
      const validClass = isValid ? 'valid-target' : '';
      const suit = FOUNDATION_SUIT_ORDER[i];
      const prevCard = pile.length > 1 ? pile[pile.length - 2] : null;
      const prevLayer = prevCard ? renderCard(prevCard, 'foundation-prev', '') : '';
      const inner = topCard
        ? `<span class="foundation-suit-icon foundation-suit-bg">${suitSvg(suit, 1, false)}</span>` +
          prevLayer +
          renderCard(topCard)
        : `<span class="foundation-suit-icon">${suitSvg(suit, 1, false)}</span>`;
      return `<div class="foundation-cell ${filled} ${validClass}" data-zone="foundation" data-index="${i}">${inner}</div>`;
    })
    .join('');

  const tableauHtml = state.tableau
    .map((col, i) => {
      const isValid = validTargets.has(`tableau-${i}`);
      const movableLen = getMovableSequenceLength(col, state);
      const selectedIdx = col.findIndex(c => c.id === selectedCardId);
      const cardsHtml = col
        .map((card, ci) => {
          const isSelected = card.id === selectedCardId;
          const isInSelectedGroup = selectedIdx >= 0 && ci > selectedIdx;
          const isMovable = ci >= col.length - movableLen;
          const classes = [
            isSelected ? 'selected' : '',
            isInSelectedGroup ? 'in-selected-group' : '',
            isMovable ? 'movable' : 'locked',
          ]
            .filter(Boolean)
            .join(' ');
          return `<div class="card-slot" style="--card-index: ${ci}" data-zone="tableau" data-col="${i}" data-card-index="${ci}">${renderCard(card, classes, `data-zone="tableau" data-col="${i}" data-card-index="${ci}"`)}</div>`;
        })
        .join('');
      return `<div class="column ${isValid ? 'valid-target' : ''}" data-zone="tableau" data-index="${i}">${cardsHtml}</div>`;
    })
    .join('');

  return `
    <div class="header-bar">
      <div>
        <div class="header-title">FreeCell</div>
        <div class="header-title-sub" id="subtitle">A Dance of Cards Between Chaos & Order</div>
      </div>
      <div class="header-stats">
        <div class="header-stat">
          <span class="header-stat-label">Moves</span>
          <span class="header-stat-value" id="move-count">${state.moveCount}</span>
        </div>
        <div class="header-stat">
          <span class="header-stat-label">Time</span>
          <span class="header-stat-value" id="timer">${formatTime(state.elapsedSeconds)}</span>
        </div>
      </div>
    </div>
    <div class="playing-area">
      <div class="cells-row">
        <div class="cell-group">${freeCellsHtml}</div>
        <div class="cell-group">${foundationsHtml}</div>
      </div>
      <div class="separator"></div>
      <div class="tableau">${tableauHtml}</div>
    </div>
    <div class="action-bar">
      <button class="action-btn" id="btn-undo">
        <span class="btn-icon"><svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05 1.04-6.83 2.73L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg></span>
        Undo
      </button>
      <button class="action-btn" id="btn-new">
        <span class="btn-icon"><svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg></span>
        New
      </button>
    </div>
    <div class="footer">
    <span>${state.dealId}</span>
    <span>${state.difficulty}</span>
    </div>
  `;
}

export function renderVictoryOverlay(): string {
  return `<div class="victory-overlay" id="victory-overlay">
    <div class="victory-content">
      <h2 class="victory-title">Congratulations!</h2>
      <p class="victory-subtitle">All foundations complete</p>
      <div class="victory-fireworks" id="victory-fireworks"></div>
      <button class="btn-new-game" id="btn-new-game">New Game</button>
    </div>
  </div>`;
}

export function renderDifficultyOverlay(currentDifficulty: DifficultyLevel): string {
  const optionsHtml = DIFFICULTY_LEVELS.map(level => {
    const selected = level === currentDifficulty ? ' selected' : '';
    return `<option value="${level}"${selected}>${level}</option>`;
  }).join('');
  return `<div class="new-game-overlay" id="new-game-overlay">
    <div class="new-game-box">
      <div class="new-game-title">New Game</div>
      <div class="ng-field">
        <label class="ng-label" for="difficulty-select">Difficulty</label>
        <select class="difficulty-select" id="difficulty-select">${optionsHtml}</select>
      </div>
      <div class="or-divider">or</div>
      <div class="ng-field">
        <label class="ng-label" for="deal-number-input">Deal number</label>
        <div class="deal-number-input-row">
          <input type="number" id="deal-number-input" class="deal-number-input" min="1" max="32000" placeholder="1 – 32,000" />
        </div>
      </div>
      <div class="new-game-actions">
        <button class="new-game-action-btn new-game-cancel" id="new-game-cancel"><svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span class="btn-label">Cancel</span></button>
        <button class="new-game-action-btn new-game-play" id="new-game-play"><svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg><span class="btn-label">Play</span></button>
      </div>
    </div>
  </div>`;
}

