export interface Theme {
  id: string;
  name: string;
  desc: string;
  vars: Record<string, string>;
}

export const THEMES: Theme[] = [
  {
    id: 'silver',
    name: 'Ashes of the Colosseum',
    desc: 'Moonlit pewter & steel',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(0, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(0, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(0, 22%, 12%), hsl(0, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(0, 22%, 15%), hsl(0, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(0, 22%, 6%) 0%, hsl(0, 22%, 10%) 30%, hsl(0, 22%, 7%) 60%, hsl(0, 22%, 4%) 100%)',
      '--info-bg': 'hsla(0, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'burgundy',
    name: 'Sunfall Over Babylon',
    desc: 'Rich wine & antique gold',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(36, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(36, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(36, 22%, 12%), hsl(36, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(36, 22%, 15%), hsl(36, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(36, 22%, 6%) 0%, hsl(36, 22%, 10%) 30%, hsl(36, 22%, 7%) 60%, hsl(36, 22%, 4%) 100%)',
      '--info-bg': 'hsla(36, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'patina',
    name: "The Alchemist's Last Night",
    desc: 'Oxidised verdigris & copper',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(72, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(72, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(72, 22%, 12%), hsl(72, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(72, 22%, 15%), hsl(72, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(72, 22%, 6%) 0%, hsl(72, 22%, 10%) 30%, hsl(72, 22%, 7%) 60%, hsl(72, 22%, 4%) 100%)',
      '--info-bg': 'hsla(72, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'sepia',
    name: 'The Forest Oracle',
    desc: 'Photographic sepia tones',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(108, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(108, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(108, 22%, 12%), hsl(108, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(108, 22%, 15%), hsl(108, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(108, 22%, 6%) 0%, hsl(108, 22%, 10%) 30%, hsl(108, 22%, 7%) 60%, hsl(108, 22%, 4%) 100%)',
      '--info-bg': 'hsla(108, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'foxed',
    name: 'Patina of Lost Empires',
    desc: 'Aged manuscript & foxed paper',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(144, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(144, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(144, 22%, 12%), hsl(144, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(144, 22%, 15%), hsl(144, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(144, 22%, 6%) 0%, hsl(144, 22%, 10%) 30%, hsl(144, 22%, 7%) 60%, hsl(144, 22%, 4%) 100%)',
      '--info-bg': 'hsla(144, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'pewter',
    name: 'The Ice Meridian',
    desc: 'Dim workshop & cool ash',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(180, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(180, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(180, 22%, 12%), hsl(180, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(180, 22%, 15%), hsl(180, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(180, 22%, 6%) 0%, hsl(180, 22%, 10%) 30%, hsl(180, 22%, 7%) 60%, hsl(180, 22%, 4%) 100%)',
      '--info-bg': 'hsla(180, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'rosegold',
    name: 'Dusk Over the Iron Sea',
    desc: 'Belle Epoque elegance',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(216, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(216, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(216, 22%, 12%), hsl(216, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(216, 22%, 15%), hsl(216, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(216, 22%, 6%) 0%, hsl(216, 22%, 10%) 30%, hsl(216, 22%, 7%) 60%, hsl(216, 22%, 4%) 100%)',
      '--info-bg': 'hsla(216, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'oak',
    name: 'Nightfall Over the Last City',
    desc: 'Warm charcoal & amber smoke',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(252, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(252, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(252, 22%, 12%), hsl(252, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(252, 22%, 15%), hsl(252, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(252, 22%, 6%) 0%, hsl(252, 22%, 10%) 30%, hsl(252, 22%, 7%) 60%, hsl(252, 22%, 4%) 100%)',
      '--info-bg': 'hsla(252, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'twilight',
    name: 'The Hour the Orchids Burned',
    desc: 'Warm dusk & glowing embers',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(288, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(288, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(288, 22%, 12%), hsl(288, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(288, 22%, 15%), hsl(288, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(288, 22%, 6%) 0%, hsl(288, 22%, 10%) 30%, hsl(288, 22%, 7%) 60%, hsl(288, 22%, 4%) 100%)',
      '--info-bg': 'hsla(288, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'jade',
    name: 'The Velvet Apocalypse',
    desc: 'Dark jade & antique brass',
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--surface-bg': 'hsl(324, 22%, 10%)',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#b85848',
      '--emerald': '#609878',
      '--panel-bg': 'hsla(324, 22%, 8%, 0.93)',
      '--card-bg': 'linear-gradient(145deg, hsl(324, 22%, 12%), hsl(324, 22%, 10%))',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, hsl(324, 22%, 15%), hsl(324, 22%, 12%))',
      '--bg-gradient':
        'linear-gradient(170deg, hsl(324, 22%, 6%) 0%, hsl(324, 22%, 10%) 30%, hsl(324, 22%, 7%) 60%, hsl(324, 22%, 4%) 100%)',
      '--info-bg': 'hsla(324, 22%, 5%, 0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
];

const THEME_STORAGE_KEY = 'freecell-theme-index';

export function loadThemeIndex(): number {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored !== null) {
    const idx = parseInt(stored, 10);
    if (idx >= 0 && idx < THEMES.length) return idx;
  }
  return 0;
}

export function saveThemeIndex(index: number): void {
  localStorage.setItem(THEME_STORAGE_KEY, String(index));
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme.vars['--surface-bg'] || '#2a1a0e');
}
