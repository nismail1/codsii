import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';

function shadow(native: ViewStyle, boxShadow: string): ViewStyle {
  return Platform.OS === 'web' ? { boxShadow } : native;
}

export const shadows = {
  soft: shadow(
    {
      shadowColor: colors.charcoal,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 2,
    },
    '0 4px 12px rgba(28, 26, 23, 0.06)'
  ),
  card: shadow(
    {
      shadowColor: colors.charcoal,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 3,
    },
    '0 6px 16px rgba(28, 26, 23, 0.08)'
  ),
  sos: shadow(
    {
      shadowColor: colors.coral,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 8,
    },
    '0 10px 20px rgba(224, 90, 79, 0.35)'
  ),
} as const;
