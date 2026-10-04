import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
} as const;

export const typography = {
  hero: {
    fontFamily: fonts.displayBold,
    fontSize: 34,
    lineHeight: 40,
    color: colors.charcoal,
    letterSpacing: -0.5,
  } satisfies TextStyle,
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: colors.charcoal,
    letterSpacing: -0.3,
  } satisfies TextStyle,
  heading: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.charcoal,
  } satisfies TextStyle,
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoalMuted,
  } satisfies TextStyle,
  bodyStrong: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoal,
  } satisfies TextStyle,
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.charcoalSoft,
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.charcoalMuted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  button: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  } satisfies TextStyle,
} as const;
