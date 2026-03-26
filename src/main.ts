import './style.css';

function initApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <header class="header">
      <h1>FreeCell</h1>
    </header>
    <main class="playing-area">
      <div class="free-cells">
        ${Array.from({ length: 4 }, (_, i) => `<div class="cell free-cell" data-index="${i}"></div>`).join('')}
      </div>
      <div class="foundation-cells">
        ${Array.from({ length: 4 }, (_, i) => `<div class="cell foundation-cell" data-index="${i}"></div>`).join('')}
      </div>
      <div class="tableau">
        ${Array.from({ length: 8 }, (_, i) => `<div class="column" data-column="${i}"></div>`).join('')}
      </div>
    </main>
    <footer class="footer">
      <div>By Uri Kalish</div>
    </header>
  `;
}

document.addEventListener('DOMContentLoaded', initApp);
