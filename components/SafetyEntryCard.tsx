import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '../theme';
import { Card } from './Card';

export function SafetyEntryCard() {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ask Cod I Sii about something that happened online"
      onPress={() => router.push('/safety')}
    >
      <Card>
        <Text style={styles.kicker}>Digital safety</Text>
        <Text style={styles.title}>Safety Assistant</Text>
        <Text style={styles.body}>Not sure about something that happened online? Ask Cod I Sii.</Text>
        <Text style={styles.cta}>Describe what happened</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kicker: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  cta: {
    marginTop: spacing.md,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.coral,
  },
});
