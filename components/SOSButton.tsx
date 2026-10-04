import { Platform, StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';
import { colors, fonts, shadows, spacing } from '../theme';
import { useSOSHold } from '../hooks/useSOSHold';

type Props = {
  onActivate: () => void;
  silentMode?: boolean;
};

const SIZE = 196;

export function SOSButton({ onActivate, silentMode = false }: Props) {
  const { progress, holding, start, cancel } = useSOSHold({
    holdMs: 3000,
    silentMode,
    onComplete: onActivate,
  });

  return (
    <View style={styles.wrap}>
      <Pressable
        onPressIn={start}
        onPressOut={cancel}
        accessibilityRole="button"
        accessibilityLabel="Hold for three seconds to activate SOS"
        {...(Platform.OS === 'web'
          ? {
              onContextMenu: (event: { preventDefault?: () => void }) => {
                event.preventDefault?.();
              },
            }
          : {})}
        style={({ pressed }) => [styles.button, webHoldStyle, (pressed || holding) && styles.pressed]}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { height: Math.max(progress * SIZE, 0) }]} />
        </View>
        <View style={styles.inner}>
          <Text style={styles.sos}>SOS</Text>
          <Text style={styles.hold}>{holding ? 'Hold…' : 'HOLD'}</Text>
        </View>
      </Pressable>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: Math.max(progress * SIZE, 0) }]} />
      </View>
      <Text style={styles.hint}>
        {holding ? `${Math.ceil((1 - progress) * 3)}s remaining` : 'Press and hold for 3 seconds'}
      </Text>
    </View>
  );
}

const webHoldStyle: ViewStyle | null =
  Platform.OS === 'web'
    ? ({
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'none',
      } as ViewStyle)
    : null;

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: colors.coralSoft,
    ...shadows.sos,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    backgroundColor: colors.coralDark,
  },
  inner: {
    alignItems: 'center',
    zIndex: 1,
  },
  sos: {
    fontFamily: fonts.displayBold,
    fontSize: 42,
    color: colors.white,
    letterSpacing: 1,
  },
  hold: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
    letterSpacing: 2,
    marginTop: 2,
  },
  progressBar: {
    width: SIZE,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.coralSoft,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.coral,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.charcoalSoft,
  },
});
