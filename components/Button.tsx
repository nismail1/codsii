import { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'gold';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: ReactNode;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' || variant === 'ghost' ? colors.charcoal : colors.white} />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, labelColors[variant], textStyle]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.charcoal,
    ...shadows.soft,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.coral,
    ...shadows.soft,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  gold: {
    backgroundColor: colors.gold,
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    ...typography.button,
  },
});

const labelColors: Record<Variant, TextStyle> = {
  primary: { color: colors.white },
  secondary: { color: colors.charcoal },
  danger: { color: colors.white },
  ghost: { color: colors.charcoalMuted },
  gold: { color: colors.charcoal },
};
