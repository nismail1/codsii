import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { SafetyScreenHeader } from '../../components/SafetyScreenHeader';
import { Screen } from '../../components/Screen';
import {
  SAFETY_EXAMPLES,
  SAFETY_LANGUAGE,
  assessOnlineSituation,
} from '../../services/safetyAssistant';
import { colors, fonts, radius, spacing } from '../../theme';
import type { SafetyGuide } from '../../types';

export default function SafetyAssistantScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en'>(SAFETY_LANGUAGE.id);
  const [draft, setDraft] = useState('');
  const [asked, setAsked] = useState('');
  const [guide, setGuide] = useState<SafetyGuide | null>(null);

  const ask = (text: string) => {
    const next = text.trim();
    if (!next) return;
    setDraft(next);
    setAsked(next);
    setGuide(assessOnlineSituation(next));
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <SafetyScreenHeader />

      <View style={styles.header}>
        <Text style={styles.title}>Cod I Sii Safety Assistant</Text>
        <Text style={styles.subtitle}>
          Not sure about something that happened online? Ask Cod I Sii.
        </Text>
      </View>

      <View style={styles.languageBlock}>
        <Text style={styles.sectionLabel}>Language</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: language === 'en' }}
          onPress={() => setLanguage('en')}
          style={[styles.languageChip, language === 'en' && styles.languageChipSelected]}
        >
          <Text style={[styles.languageText, language === 'en' && styles.languageTextSelected]}>
            {SAFETY_LANGUAGE.label}
          </Text>
        </Pressable>
      </View>

      <View style={styles.askBlock}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Describe the message, link, or request"
          placeholderTextColor={colors.charcoalSoft}
          style={styles.input}
          multiline
          textAlignVertical="top"
          accessibilityLabel="Describe what happened online"
        />
        <View style={styles.examples}>
          {SAFETY_EXAMPLES.map((example) => (
            <Pressable
              key={example.id}
              accessibilityRole="button"
              onPress={() => ask(example.text)}
              style={styles.exampleChip}
            >
              <Text style={styles.exampleText}>{example.label}</Text>
            </Pressable>
          ))}
        </View>
        <Button label={guide ? 'Ask again' : 'Ask'} onPress={() => ask(draft)} disabled={!draft.trim()} />
        <Text style={styles.privacy}>
          What you type stays on this device. COD I SII does not send it anywhere.
        </Text>
      </View>

      {guide ? (
        <View style={styles.result}>
          <Text style={styles.checked}>Checked on this device. Nothing was sent.</Text>
          {asked ? <Text style={styles.asked}>“{asked}”</Text> : null}

          <Card>
            <Text style={styles.sectionLabel}>What might be happening</Text>
            <Text style={styles.resultBody}>{guide.happening}</Text>
          </Card>

          <Card>
            <Text style={styles.sectionLabel}>What to do now</Text>
            <Text style={styles.resultBody}>{guide.now}</Text>
          </Card>

          {guide.showSos ? (
            <Button label="Go to Home SOS" variant="danger" onPress={() => router.push('/(tabs)')} />
          ) : null}

          {guide.lessonId && guide.lessonCta && guide.lessonPrompt ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push(`/safety/lesson/${guide.lessonId}`)}
              style={styles.nextStep}
            >
              <Text style={styles.sectionLabel}>{guide.lessonPrompt}</Text>
              <Text style={styles.nextLink}>{guide.lessonCta}</Text>
            </Pressable>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/safety/support', params: { guide: guide.id } })}
            style={styles.nextStep}
          >
            <Text style={styles.sectionLabel}>Need help?</Text>
            <Text style={styles.nextLink}>See verified support options</Text>
          </Pressable>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  languageBlock: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.gold,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  languageChip: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
  },
  languageChipSelected: {
    backgroundColor: colors.charcoal,
    borderColor: colors.charcoal,
  },
  languageText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
  languageTextSelected: {
    color: colors.white,
  },
  askBlock: {
    gap: spacing.md,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoal,
  },
  examples: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  exampleChip: {
    borderRadius: radius.full,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  exampleText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.charcoal,
  },
  privacy: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.charcoalSoft,
  },
  result: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  checked: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.success,
  },
  asked: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.charcoalMuted,
  },
  resultBody: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoal,
  },
  nextStep: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  nextLink: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.coral,
  },
});
