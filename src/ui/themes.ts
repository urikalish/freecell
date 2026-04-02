export interface Theme {
  id: string;
  name?: string;
  desc?: string;
  vars: Record<string, string>;
}

export const THEMES: Theme[] = [
  {
    id: '108',
    vars: {
      '--surface-bg': 'hsl(108, 22%, 13.99%)',
    },
  },
  {
    id: '144',
    vars: {
      '--surface-bg': 'hsl(144, 22%, 14.04%)',
    },
  },
  {
    id: '180',
    vars: {
      '--surface-bg': 'hsl(180, 22%, 13.81%)',
    },
  },
  {
    id: '216',
    vars: {
      '--surface-bg': 'hsl(216, 22%, 16.70%)',
    },
  },
  {
    id: '252',
    vars: {
      '--surface-bg': 'hsl(252, 22%, 18.79%)',
    },
  },
  {
    id: '288',
    vars: {
      '--surface-bg': 'hsl(288, 22%, 17.44%)',
    },
  },
  {
    id: '324',
    vars: {
      '--surface-bg': 'hsl(324, 22%, 17.28%)',
    },
  },
  {
    id: '0',
    vars: {
      '--surface-bg': 'hsl(0, 22%, 17.65%)',
    },
  },
  {
    id: '36',
    vars: {
      '--surface-bg': 'hsl(36, 22%, 14.76%)',
    },
  },
  {
    id: '72',
    vars: {
      '--surface-bg': 'hsl(72, 22%, 13.41%)',
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
