export interface Theme {
  id: string;
  name: string;
  desc: string;
  dots: [string, string, string];
  vars: Record<string, string>;
}

export const THEMES: Theme[] = [
  {
    id: 'sepia',
    name: 'Daguerreotype',
    desc: 'Photographic sepia tones',
    dots: ['#b0a080', '#a85040', '#607868'],
    vars: {
      '--brass': '#b0a080',
      '--brass-light': '#ccc0a0',
      '--brass-dark': '#706040',
      '--mahogany': '#1a1610',
      '--parchment': '#e0d8c8',
      '--parchment-dim': '#c0b8a4',
      '--ruby': '#984838',
      '--ruby-light': '#b85848',
      '--emerald': '#486858',
      '--emerald-light': '#609878',
      '--ink-dark': '#12100c',
      '--panel-bg': 'rgba(22,18,12,0.93)',
      '--card-bg': 'linear-gradient(145deg, #221e16, #1a1610)',
      '--card-border': 'rgba(112,96,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #2a261e, #221e16)',
      '--bg-gradient':
        'linear-gradient(170deg, #12100c 0%, #1a1610 30%, #14120c 60%, #0a0806 100%)',
      '--bg-accent1': 'rgba(160,140,100,0.06)',
      '--bg-accent2': 'rgba(176,160,128,0.05)',
      '--steam-color': 'rgba(190,180,160,0.05)',
      '--gear-opacity': '0.05',
      '--info-bg': 'rgba(12,10,8,0.94)',
      '--amber-glow': '0 0 12px rgba(176,160,128,0.25), 0 0 30px rgba(176,160,128,0.08)',
    },
  },
  {
    id: 'silver',
    name: 'Antique Silver',
    desc: 'Moonlit pewter & steel',
    dots: ['#9aa0aa', '#b85060', '#4a8ab8'],
    vars: {
      '--brass': '#9aa0aa',
      '--brass-light': '#b8c0cc',
      '--brass-dark': '#5a6070',
      '--mahogany': '#10141c',
      '--parchment': '#dce0e8',
      '--parchment-dim': '#b4b8c4',
      '--ruby': '#904050',
      '--ruby-light': '#b85060',
      '--emerald': '#3a6888',
      '--emerald-light': '#4a8ab8',
      '--ink-dark': '#0a0c12',
      '--panel-bg': 'rgba(12,14,20,0.93)',
      '--card-bg': 'linear-gradient(145deg, #181c26, #12141e)',
      '--card-border': 'rgba(90,96,112,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #202630, #181c26)',
      '--bg-gradient':
        'linear-gradient(170deg, #0a0c14 0%, #10141c 30%, #0c0e16 60%, #060608 100%)',
      '--bg-accent1': 'rgba(120,130,160,0.06)',
      '--bg-accent2': 'rgba(154,160,170,0.04)',
      '--steam-color': 'rgba(180,185,200,0.05)',
      '--gear-opacity': '0.06',
      '--info-bg': 'rgba(8,8,14,0.94)',
      '--amber-glow': '0 0 12px rgba(154,160,170,0.3), 0 0 30px rgba(154,160,170,0.1)',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Brass',
    desc: 'Deep foundry darkness',
    dots: ['#b89838', '#b82840', '#1e8858'],
    vars: {
      '--brass': '#b89838',
      '--brass-light': '#d4b44a',
      '--brass-dark': '#7a5a10',
      '--mahogany': '#180e06',
      '--parchment': '#d8ceb8',
      '--parchment-dim': '#b8aa90',
      '--ruby': '#8a1e30',
      '--ruby-light': '#b82840',
      '--emerald': '#145a3e',
      '--emerald-light': '#1e8858',
      '--ink-dark': '#0e0a04',
      '--panel-bg': 'rgba(16,10,4,0.95)',
      '--card-bg': 'linear-gradient(145deg, #1e1408, #140e06)',
      '--card-border': 'rgba(122,90,16,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #28200c, #1e1408)',
      '--bg-gradient':
        'linear-gradient(170deg, #0e0804 0%, #180e06 30%, #100a04 60%, #060402 100%)',
      '--bg-accent1': 'rgba(160,104,40,0.06)',
      '--bg-accent2': 'rgba(184,152,56,0.04)',
      '--steam-color': 'rgba(160,150,130,0.05)',
      '--gear-opacity': '0.09',
      '--info-bg': 'rgba(8,6,2,0.95)',
      '--amber-glow': '0 0 12px rgba(184,152,56,0.3), 0 0 30px rgba(184,152,56,0.1)',
    },
  },
  {
    id: 'patina',
    name: 'Copper Patina',
    desc: 'Oxidised verdigris & copper',
    dots: ['#8aaa7a', '#d85848', '#38a878'],
    vars: {
      '--brass': '#8aaa7a',
      '--brass-light': '#a0c490',
      '--brass-dark': '#4a6a40',
      '--mahogany': '#141e10',
      '--parchment': '#dce0d4',
      '--parchment-dim': '#b8c0ac',
      '--ruby': '#b84838',
      '--ruby-light': '#d85848',
      '--emerald': '#2a7a5a',
      '--emerald-light': '#38a878',
      '--ink-dark': '#0c1208',
      '--panel-bg': 'rgba(14,20,10,0.93)',
      '--card-bg': 'linear-gradient(145deg, #1a2214, #14180e)',
      '--card-border': 'rgba(74,106,64,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #222c1a, #1a2214)',
      '--bg-gradient':
        'linear-gradient(170deg, #0c1208 0%, #141e10 30%, #101808 60%, #060a04 100%)',
      '--bg-accent1': 'rgba(138,170,122,0.06)',
      '--bg-accent2': 'rgba(184,115,72,0.05)',
      '--steam-color': 'rgba(180,200,170,0.06)',
      '--gear-opacity': '0.07',
      '--info-bg': 'rgba(8,12,6,0.94)',
      '--amber-glow': '0 0 12px rgba(138,170,122,0.3), 0 0 30px rgba(138,170,122,0.1)',
    },
  },
  {
    id: 'emeraldnight',
    name: 'Emerald Night',
    desc: 'Deep green & warm bronze',
    dots: ['#7a9a5a', '#c84848', '#2a8a5a'],
    vars: {
      '--brass': '#7a9a5a',
      '--brass-light': '#98b878',
      '--brass-dark': '#4a6a30',
      '--mahogany': '#0e1a0e',
      '--parchment': '#d4dcc8',
      '--parchment-dim': '#b0bca0',
      '--ruby': '#b04040',
      '--ruby-light': '#d05050',
      '--emerald': '#1a7a48',
      '--emerald-light': '#2aaa68',
      '--ink-dark': '#081008',
      '--panel-bg': 'rgba(10,18,10,0.93)',
      '--card-bg': 'linear-gradient(145deg, #142014, #0e180e)',
      '--card-border': 'rgba(74,106,48,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #1c281c, #142014)',
      '--bg-gradient':
        'linear-gradient(170deg, #081008 0%, #0e1a0e 30%, #0a140a 60%, #040804 100%)',
      '--bg-accent1': 'rgba(100,160,80,0.06)',
      '--bg-accent2': 'rgba(122,154,90,0.04)',
      '--steam-color': 'rgba(170,200,160,0.05)',
      '--gear-opacity': '0.06',
      '--info-bg': 'rgba(6,10,6,0.94)',
      '--amber-glow': '0 0 12px rgba(122,154,90,0.3), 0 0 30px rgba(122,154,90,0.1)',
    },
  },
  {
    id: 'rosegold',
    name: 'Rose Gold',
    desc: 'Belle Epoque elegance',
    dots: ['#c8988a', '#d84858', '#4a9a98'],
    vars: {
      '--brass': '#c8988a',
      '--brass-light': '#e0b0a0',
      '--brass-dark': '#8a5848',
      '--mahogany': '#281410',
      '--parchment': '#f0e4e0',
      '--parchment-dim': '#d4c4be',
      '--ruby': '#b03848',
      '--ruby-light': '#d84858',
      '--emerald': '#3a6a6a',
      '--emerald-light': '#4a9a98',
      '--ink-dark': '#1a100e',
      '--panel-bg': 'rgba(28,16,14,0.92)',
      '--card-bg': 'linear-gradient(145deg, #281a16, #1e1210)',
      '--card-border': 'rgba(138,88,72,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #30221e, #281a16)',
      '--bg-gradient':
        'linear-gradient(170deg, #1e100e 0%, #281410 30%, #1a0e0c 60%, #0e0806 100%)',
      '--bg-accent1': 'rgba(200,128,108,0.08)',
      '--bg-accent2': 'rgba(200,152,138,0.06)',
      '--steam-color': 'rgba(210,190,185,0.06)',
      '--gear-opacity': '0.06',
      '--info-bg': 'rgba(14,8,6,0.94)',
      '--amber-glow': '0 0 12px rgba(200,152,138,0.35), 0 0 30px rgba(200,152,138,0.12)',
    },
  },
  {
    id: 'burgundy',
    name: 'Burgundy Velvet',
    desc: 'Rich wine & antique gold',
    dots: ['#c4a050', '#c43050', '#4a7868'],
    vars: {
      '--brass': '#c4a050',
      '--brass-light': '#dcc068',
      '--brass-dark': '#8a6a1a',
      '--mahogany': '#200e10',
      '--parchment': '#ece0d4',
      '--parchment-dim': '#cec0ae',
      '--ruby': '#a02838',
      '--ruby-light': '#c43050',
      '--emerald': '#2a6858',
      '--emerald-light': '#3a9878',
      '--ink-dark': '#160a0c',
      '--panel-bg': 'rgba(26,12,14,0.93)',
      '--card-bg': 'linear-gradient(145deg, #24161a, #1a1014)',
      '--card-border': 'rgba(138,106,26,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #2e1e22, #24161a)',
      '--bg-gradient':
        'linear-gradient(170deg, #160a0c 0%, #200e10 30%, #180a0e 60%, #0c0406 100%)',
      '--bg-accent1': 'rgba(160,60,60,0.06)',
      '--bg-accent2': 'rgba(196,160,80,0.05)',
      '--steam-color': 'rgba(200,180,170,0.05)',
      '--gear-opacity': '0.05',
      '--info-bg': 'rgba(12,6,8,0.94)',
      '--amber-glow': '0 0 12px rgba(196,160,80,0.3), 0 0 30px rgba(196,160,80,0.1)',
    },
  },
  {
    id: 'twilight',
    name: 'Twilight Amber',
    desc: 'Warm dusk & glowing embers',
    dots: ['#d08030', '#d04040', '#4a7a58'],
    vars: {
      '--brass': '#d08030',
      '--brass-light': '#e8a048',
      '--brass-dark': '#8a5010',
      '--mahogany': '#1e1008',
      '--parchment': '#f0e0c8',
      '--parchment-dim': '#d4c4a0',
      '--ruby': '#c03838',
      '--ruby-light': '#e04848',
      '--emerald': '#2a6a48',
      '--emerald-light': '#3a9a68',
      '--ink-dark': '#140c04',
      '--panel-bg': 'rgba(24,14,6,0.93)',
      '--card-bg': 'linear-gradient(145deg, #281a0c, #1e1408)',
      '--card-border': 'rgba(138,80,16,0.2)',
      '--selected-bg': 'linear-gradient(145deg, #32220e, #281a0c)',
      '--bg-gradient':
        'linear-gradient(170deg, #140c04 0%, #1e1008 30%, #180c06 60%, #0c0604 100%)',
      '--bg-accent1': 'rgba(208,128,48,0.08)',
      '--bg-accent2': 'rgba(232,160,72,0.06)',
      '--steam-color': 'rgba(220,200,170,0.06)',
      '--gear-opacity': '0.07',
      '--info-bg': 'rgba(12,8,2,0.94)',
      '--amber-glow': '0 0 12px rgba(208,128,48,0.35), 0 0 30px rgba(208,128,48,0.12)',
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
  if (meta) meta.setAttribute('content', theme.vars['--mahogany'] || '#2a1a0e');
}
