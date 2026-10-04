import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { colors, fonts, spacing } from '../theme';

/**
 * Neutral cover screen for discreet exit from safety content.
 */
export default function QuickExitScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.center}>
        <Text style={styles.title}>Weather</Text>
        <Text style={styles.temp}>28°</Text>
        <Text style={styles.subtitle}>Mostly clear · Hargeisa</Text>
        <Text style={styles.note}>Light breeze this afternoon</Text>
      </View>
      <Button label="Back" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    backgroundColor: colors.creamLight,
    paddingTop: spacing.huge,
  },
  center: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.huge,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoalSoft,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  temp: {
    fontFamily: fonts.displayBold,
    fontSize: 72,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 18,
    color: colors.charcoalMuted,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.charcoalSoft,
    marginTop: spacing.sm,
  },
});
