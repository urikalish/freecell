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

export function startSteamPuffs(): void {
  const container = document.getElementById('steam-container');
  if (!container) return;

  function createPuff(): void {
    const puff = document.createElement('div');
    puff.className = 'steam-puff';
    const size = 30 + Math.random() * 60;
    puff.style.width = size + 'px';
    puff.style.height = size + 'px';
    puff.style.left = Math.random() * 100 + '%';
    puff.style.bottom = '0';
    puff.style.animationDuration = 6 + Math.random() * 8 + 's';
    container!.appendChild(puff);
    setTimeout(() => puff.remove(), 14000);
  }

  setInterval(createPuff, 1200);
  for (let i = 0; i < 5; i++) setTimeout(createPuff, i * 300);
}
