import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearishBackground } from '../../features/onboarding/LinearishBackground';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { brand, colors, fonts, spacing } from '../../theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen contentStyle={styles.content}>
      <LinearishBackground />
      <View style={styles.hero}>
        <Text style={styles.brand}>{brand.name}</Text>
        <Text style={styles.tagline}>{brand.tagline}</Text>
        <Text style={styles.body}>
          A calm, community-focused safety companion for women in Somalia and Somaliland.
          Shake your phone or hold SOS to alert trusted contacts and prepare emergency help.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button label="Get started" onPress={() => router.push('/(onboarding)/location')} />
        <Text style={styles.note}>Setup takes under three minutes. Your data stays on this device.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingTop: spacing.huge,
  },
  hero: {
    gap: spacing.lg,
    paddingTop: spacing.huge,
  },
  brand: {
    fontFamily: fonts.displayBold,
    fontSize: 42,
    color: colors.charcoal,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    color: colors.coral,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoalMuted,
    maxWidth: 340,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  note: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    textAlign: 'center',
  },
});
