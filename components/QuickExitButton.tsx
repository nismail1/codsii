import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, radius, spacing } from '../theme';

type Props = {
  compact?: boolean;
};

export function QuickExitButton({ compact = false }: Props) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Quick exit to a neutral screen"
      onPress={() => router.push('/quick-exit')}
      style={[styles.button, compact && styles.compact]}
    >
      <Text style={styles.label}>Quick Exit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.charcoal,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  compact: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
    letterSpacing: 0.3,
  },
});
