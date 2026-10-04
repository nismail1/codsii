export const colors = {
  cream: '#F4F1EA',
  creamDark: '#EBE6DC',
  creamLight: '#FAF8F4',
  charcoal: '#1C1A17',
  charcoalMuted: '#5C574F',
  charcoalSoft: '#8A847A',
  coral: '#E05A4F',
  coralDark: '#C4473D',
  coralSoft: '#F2C4BF',
  coralMuted: '#F8E4E1',
  gold: '#C4A265',
  goldSoft: '#E8D9B8',
  goldMuted: '#F3ECDC',
  white: '#FFFFFF',
  success: '#3D7A5A',
  successSoft: '#D8EBE2',
  warning: '#B8860B',
  border: '#E2DCD0',
  overlay: 'rgba(28, 26, 23, 0.55)',
  mapPin: '#E05A4F',
} as const;

export type ColorName = keyof typeof colors;
