import { Card, GameState, Rank, RANK_LABELS, suitColor, Color } from '../model/types';
import { getMovableSequenceLength } from '../model/moves';
import { suitSvg, FOUNDATION_SUIT_ORDER, gearSvg } from './suits';
import { Theme } from './themes';

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
  const colorClass = suitColor(card.suit) === Color.Red ? 'ruby' : 'emerald';
  const rankLabel = RANK_LABELS[card.rank];
  const roman = ROMAN[card.rank];
  return `<div class="card ${colorClass} ${extraClasses}" data-card-id="${card.id}" ${dataAttrs}>
    <div class="card-inner">
      <div class="card-value-and-suit">
        <span class="card-value">${rankLabel}</span>
        <span class="card-suit">${suitSvg(card.suit)}</span>
      </div>
      <span class="card-suit-center">${suitSvg(card.suit)}</span>
      <span class="card-engrave">${roman}</span>
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
      const inner = card
        ? renderCard(card, isSelected ? 'selected' : '')
        : `<span class="cell-icon">${gearSvg()}</span>`;
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
      //const colorClass = suitColor(suit) === Color.Red ? 's-ruby' : 's-emerald';
      const inner = topCard
        ? renderCard(topCard)
        : `<span class="foundation-suit-icon">${suitSvg(suit)}</span>`;
      return `<div class="foundation-cell ${filled} ${validClass}" data-zone="foundation" data-index="${i}">${inner}</div>`;
    })
    .join('');

  const tableauHtml = state.tableau
    .map((col, i) => {
      const isValid = validTargets.has(`tableau-${i}`);
      const movableLen = getMovableSequenceLength(col);
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
    <div class="hud-bar">
      <div>
        <div class="hud-title">FreeCell</div>
        <div class="hud-title-sub" id="subtitle">A Dance of Cards Between Chaos and Order</div>
      </div>
      <div class="hud-stats">
        <div class="hud-stat">
          <span class="hud-stat-label">Moves</span>
          <span class="hud-stat-value" id="move-count">${state.moveCount}</span>
        </div>
        <div class="hud-stat">
          <span class="hud-stat-label">Time</span>
          <span class="hud-stat-value" id="timer">${formatTime(state.elapsedSeconds)}</span>
        </div>
      </div>
    </div>
    <div class="playing-area">
      <div class="cells-row">
        <div class="cell-group">${freeCellsHtml}</div>
        <div class="cell-group">${foundationsHtml}</div>
      </div>
      <div class="separator">
        <span class="separator-ornament">${gearSvg()}<svg class="sep-star" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>${gearSvg()}</span>
      </div>
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
      <button class="action-btn" id="btn-theme">
        <span class="btn-icon"><svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></span>
        Theme
      </button>
    </div>
    <div class="info-bar">
      <span>FreeCell</span>
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

export function renderThemeOverlay(themes: Theme[], currentIndex: number): string {
  const options = themes
    .map(
      (t, i) => `
    <div class="theme-option ${i === currentIndex ? 'active' : ''}" data-theme-index="${i}">
      <div class="theme-dots">
        ${t.dots.map(c => `<div class="theme-dot" style="background:${c}"></div>`).join('')}
      </div>
      <div class="theme-name">${t.name}</div>
      <div class="theme-desc">${t.desc}</div>
    </div>`,
    )
    .join('');
  return `<div class="theme-overlay open" id="theme-overlay">
    <div class="theme-overlay-title">Select Theme</div>
    <div class="theme-grid">${options}</div>
  </div>`;
}

export function renderConfirmOverlay(): string {
  return `<div class="confirm-overlay" id="confirm-overlay">
    <div class="confirm-box">
      <div class="confirm-title">New Game</div>
      <div class="confirm-text">Abandon this game?</div>
      <div class="confirm-buttons">
        <button class="confirm-btn confirm-yes" id="confirm-yes">Abandon</button>
        <button class="confirm-btn confirm-no" id="confirm-no">Continue</button>
      </div>
    </div>
  </div>`;
}
