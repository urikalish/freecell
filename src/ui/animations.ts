export function animateDeal(callback: () => void): void {
  const app = document.getElementById('app');
  if (!app) {
    callback();
    return;
  }

  app.classList.add('dealing');

  // Stagger card delays via JS
  const cards = app.querySelectorAll('.tableau .card');
  cards.forEach(card => {
    const el = card as HTMLElement;
    // Column-based stagger: col * 0.02s + row * 0.05s
    const slot = el.closest('.card-slot') as HTMLElement;
    const col = slot?.closest('.column') as HTMLElement;
    if (slot && col) {
      const colIdx = parseInt(col.dataset.index || '0', 10);
      const cardIdx = parseInt(slot.dataset.cardIndex || '0', 10);
      const delay = colIdx * 0.02 + cardIdx * 0.05;
      el.style.animationDelay = `${delay}s`;
    }
  });

  const maxDelay = 8 * 0.02 + 7 * 0.05 + 0.4;
  setTimeout(
    () => {
      app.classList.remove('dealing');
      cards.forEach(card => {
        (card as HTMLElement).style.animationDelay = '';
      });
      callback();
    },
    maxDelay * 1000 + 100,
  );
}

export function animateLand(el: HTMLElement): void {
  el.classList.add('card-land');
  setTimeout(() => el.classList.remove('card-land'), 300);
}

export function animateButtonPress(btn: HTMLElement): void {
  btn.classList.add('btn-pressed');
  setTimeout(() => btn.classList.remove('btn-pressed'), 200);
}

export function animateCardMove(moves: { id: string; rect: DOMRect }[]): void {
  const pending: Array<{ clone: HTMLElement; el: HTMLElement; index: number }> = [];

  moves.forEach(({ id, rect: sourceRect }, i) => {
    const el = document.querySelector(`[data-card-id="${id}"]`) as HTMLElement | null;
    if (!el) return;
    const destRect = el.getBoundingClientRect();
    const dx = sourceRect.left - destRect.left;
    const dy = sourceRect.top - destRect.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.cssText = [
      'position: fixed',
      `left: ${destRect.left}px`,
      `top: ${destRect.top}px`,
      `width: ${destRect.width}px`,
      `height: ${destRect.height}px`,
      'z-index: 9999',
      'pointer-events: none',
      'margin: 0',
      'animation: none',
      'transition: none',
      `transform: translate(${dx}px, ${dy}px)`,
    ].join('; ');
    document.body.appendChild(clone);
    el.style.visibility = 'hidden';
    pending.push({ clone, el, index: i });
  });

  if (pending.length === 0) return;

  requestAnimationFrame(() => {
    pending.forEach(({ clone, el, index }) => {
      const delay = index * 30;
      setTimeout(() => {
        clone.style.transition = 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        clone.style.transform = 'translate(0, 0)';
        setTimeout(() => {
          document.body.removeChild(clone);
          el.style.visibility = '';
        }, 300);
      }, delay);
    });
  });
}

export function animateVictory(): void {
  const overlay = document.getElementById('victory-overlay');
  if (!overlay) return;
  overlay.classList.add('visible');

  const container = document.getElementById('victory-fireworks');
  if (!container) return;

  const colors = [
    'var(--brass)',
    'var(--ruby-light)',
    'var(--emerald-light)',
    'var(--brass-light)',
    'var(--parchment)',
  ];

  for (let burst = 0; burst < 6; burst++) {
    setTimeout(() => {
      for (let i = 0; i < 24; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        const angle = (Math.PI * 2 * i) / 24;
        const distance = 60 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.left = `${20 + Math.random() * 60}%`;
        spark.style.top = `${20 + Math.random() * 60}%`;
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 1200);
      }
    }, burst * 500);
  }
}
