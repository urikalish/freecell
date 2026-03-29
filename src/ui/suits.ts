import { Suit, FOUNDATION_SUIT_ORDER } from '../model/types';

export { FOUNDATION_SUIT_ORDER };

const SUIT_PATHS: Record<Suit, string> = {
  [Suit.Spades]:
    'M12 2C12 2 4 10 4 15c0 3 2.5 5 5.5 4.5C8 20.5 7 23 6 24h12c-1-1-2-3.5-3.5-4.5C17.5 20 20 18 20 15 20 10 12 2 12 2z',
  [Suit.Hearts]:
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  [Suit.Diamonds]: 'M12 2L4 12l8 10 8-10z',
  [Suit.Clubs]:
    'M12 2c-2.5 0-4.5 2-4.5 4.5 0 1.5.7 2.8 1.8 3.7C7.2 10.7 5.5 12.5 5.5 14.8 5.5 17.1 7.4 19 9.7 19c1 0 1.8-.3 2.3-.7-.5 2-1.5 3.7-3 4.7h6c-1.5-1-2.5-2.7-3-4.7.5.4 1.3.7 2.3.7 2.3 0 4.2-1.9 4.2-4.2 0-2.3-1.7-4.1-3.8-4.6 1.1-.9 1.8-2.2 1.8-3.7C16.5 4 14.5 2 12 2z',
};


export function suitSvg(suit: Suit, className: string = ''): string {
  const path = SUIT_PATHS[suit];
  return `<svg class="suit-icon ${className}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${path}" fill="currentColor"/></svg>`;
}
