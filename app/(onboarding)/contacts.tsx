import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { useContactsStore } from '../../store/useAppStore';
import { colors, fonts, spacing } from '../../theme';

export default function ContactsOnboardingScreen() {
  const router = useRouter();
  const contacts = useContactsStore((s) => s.contacts);

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.copy}>
        <Text style={styles.step}>Step 3 of 4</Text>
        <Text style={styles.title}>Add trusted contacts</Text>
        <Text style={styles.body}>
          Demo contacts are ready so you can test immediately. You can edit or replace them anytime.
        </Text>
      </View>

      <View style={styles.list}>
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.meta}>
              {contact.relationship} · {contact.phone}
            </Text>
          </Card>
        ))}
      </View>

      <View style={styles.actions}>
        <Button label="Continue with these contacts" onPress={() => router.push('/(onboarding)/preferences')} />
        <Button
          label="I will customize later"
          variant="ghost"
          onPress={() => router.push('/(onboarding)/preferences')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.xxxl,
    gap: spacing.xl,
  },
  copy: {
    gap: spacing.md,
  },
  step: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: colors.charcoal,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoalMuted,
  },
  list: {
    gap: spacing.md,
  },
  name: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalMuted,
    marginTop: 4,
  },
  actions: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
