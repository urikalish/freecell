# FreeCell

A steampunk-themed FreeCell card game built as a mobile-first PWA.

- **Stack:** TypeScript · Vite · Vanilla CSS (no frameworks)
- **Author:** Uri Kalish
- **License:** MIT
- **Repo:** https://github.com/urikalish/freecell

---

## Getting Started

```bash
yarn          # install dependencies
yarn dev      # start Vite dev server (opens browser automatically)
yarn build    # typecheck + production build → dist/
yarn preview  # serve the dist/ build locally
yarn full     # format + lint + build (run before committing)
```

---

## Project Structure

```
src/
  main.ts               # App entry — state, event loop, game lifecycle
  model/
    types.ts            # Core types: Card, GameState, Location, MoveCandidate
    deck.ts             # Deck creation, shuffle, state cloning
    moves.ts            # Move validation, execution, undo
  ui/
    renderer.ts         # renderGame, overlay renderers (victory/confirm), formatTime
    interactions.ts     # DOM hit-testing → Location / Card resolution
    animations.ts       # Deal, card-move FLIP, land, victory, button press
    suits.ts            # SVG helpers for suit icons; foundation suit order
    themes.ts           # Theme definitions + localStorage persistence
  styles/
    variables.css       # All CSS custom properties (colours, sizes, spacing)
    base.css            # Reset, body, background layers
    layout.css          # HUD bar, cells row, tableau, action bar, overlays
    cards.css           # Card, card-inner, suit colours, selected/locked states
    animations.css      # Keyframes: deal reveal, card-land bounce, sparks, flash
public/
  favicon.svg
  manifest.webmanifest  # PWA manifest (standalone, portrait, 192/512 icons)
index.html              # Shell — Google Fonts, #app mount point
```

---

## Architecture

### State

`GameState` (defined in `types.ts`) is the single source of truth:

| Field | Type | Description |
|---|---|---|
| `freeCells` | `(Card \| null)[]` | 4 free-cell slots |
| `foundations` | `Card[][]` | 4 foundation piles, ordered by `FOUNDATION_SUIT_ORDER` |
| `tableau` | `Card[][]` | 8 tableau columns |
| `moveCount` | `number` | Incremented on every `executeMove` call |
| `elapsedSeconds` | `number` | Mutated in place by the timer interval |
| `history` | `HistoryEntry[]` | Full move history enabling unbounded undo |

State is **immutable across moves** — `executeMove` and `undoLastMove` both call `cloneState` and return a new object. `elapsedSeconds` is the only field mutated in-place (timer tick).

### Rendering

`renderer.ts` exports pure render functions. `main.ts` calls `app.innerHTML = renderGame(state, selectedCardId, validTargets)` on every state change — a full synchronous re-render. There is no virtual DOM or diffing. Two additional exports render overlays on demand: `renderVictoryOverlay()` and `renderConfirmOverlay()`.

After re-render, animation hooks run in `setTimeout(..., 0)` / `requestAnimationFrame` callbacks so they operate on the freshly painted DOM.

### Move Flow

```
pointerup → handleTap → tryMove
  1. Capture source DOMRects for all moving cards
  2. `state = executeMove(state, move)` → newState applied in-place
  3. `clearSelection()` + `render()` — full re-render
  4. animateCardMove(sourceRects) — FLIP animation
```

**FLIP animation** (`animateCardMove`): captures source positions before render, reads destination positions after render, then clones each card at its destination offset by `translate(dx, dy)` and transitions it to `translate(0, 0)`. The real cards are hidden during flight and revealed on completion.

### Tap Cycle

Tapping a card once selects it and computes `tapCycleTargets` (all valid `MoveCandidate`s). Tapping the same card again cycles through those targets automatically, executing each move in turn. Tapping a valid target directly moves there immediately.

---

## Theming

Themes live in `ui/themes.ts` as objects implementing `Theme`:

```ts
interface Theme {
  id: string;
  name: string;
  desc: string;
  vars: Record<string, string>;   // CSS custom property overrides
}
```

`applyTheme(theme)` writes each `vars` entry onto `document.documentElement.style`, overriding the base values from `variables.css`. The selected theme index is persisted to `localStorage`.

| Theme name | Description |
|---|---|
| Ashes of the Colosseum | Moonlit pewter & steel |
| Sunfall Over Babylon | Rich wine & antique gold |
| The Alchemist's Last Night | Oxidised verdigris & copper |
| The Forest Oracle | Photographic sepia tones |
| Patina of Lost Empires | Aged manuscript & foxed paper |
| The Ice Meridian | Dim workshop & cool ash |
| Dusk Over the Iron Sea | Belle Epoque elegance |
| Nightfall Over the Last City | Warm charcoal & amber smoke |
| The Hour the Orchids Burned | Warm dusk & glowing embers |
| The Velvet Apocalypse | Dark jade & antique brass |

To add a theme, append an entry to the `THEMES` array in `themes.ts` — no other changes needed.

---

## CSS Custom Properties

All sizing and colour tokens are declared in `variables.css`. Key groups:

| Prefix | Purpose |
|---|---|
| `--brass*` | Primary accent colour family |
| `--ruby` | Red card |
| `--emerald` | Black card |
| `--surface-bg` | Table surface background |
| `--parchment*` | Text / UI element colours |
| `--card-*` | Card dimensions (`--card-height`, `--card-radius`, `--card-overlap`) |
| `--font-*` | Responsive font sizes (all in `vw`) |
| `--cell-gap`, `--card-gap` | Spacing between cells and columns |

Two Google Fonts are loaded in `index.html`:
- **Libre Bodoni** (italic, wght 400–700) — titles, subtitles, card values, engraved rank; base body font
- **Federo** — stat labels, stat values, buttons, overlays

---

## Animations

| Function | Trigger | Mechanism |
|---|---|---|
| `animateDeal` | New game | CSS `steam-reveal` keyframe with JS-computed per-card delays; `isAnimating` blocks input |
| `animateCardMove` | Every move | FLIP: fixed-position clones fly from source to destination via CSS `transition` |
| `animateLand` | Card land (internal) | `.card-land` scale bounce keyframe |
| `animateButtonPress` | Action button tap | `.btn-pressed` CSS class, 200 ms |
| `animateVictory` | Game won | Spark particles burst from random positions in `#victory-fireworks` |

---

## Key Invariants

- **No test suite** — correctness is enforced by TypeScript strict mode and ESLint.
- `isAnimating` flag gates all input during the deal animation only; card-move animations do not block input.
- Foundation suit order is fixed (defined in `types.ts` as `FOUNDATION_SUIT_ORDER`, re-exported from `suits.ts`) and must match the order foundations are stored in `GameState.foundations`.
- Card IDs are derived as `${suit}-${rank}` and are stable across clones — safe to use as DOM `data-card-id` keys.

---

## Tooling

| Tool | Config |
|---|---|
| TypeScript 5.9 | `tsconfig.json` — strict, `noUnusedLocals`, `noUnusedParameters` |
| Vite 8 | `vite.config.ts` — root `.`, output `dist/` |
| ESLint 10 + typescript-eslint | `eslint.config.js` |
| Prettier 3.8 | `.prettierrc` |
