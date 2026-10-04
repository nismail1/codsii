import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { LAUNCH_QUESTIONS } from '../../data/adminDemo';
import { colors, fonts, spacing } from '../../theme';

export function PrivacyNotice() {
  return (
    <View style={styles.wrap}>
      <Card style={styles.privacyCard}>
        <Text style={styles.eyebrow}>Safeguarding & privacy</Text>
        <Text style={styles.title}>This dashboard is a concept, not a live monitoring system</Text>
        <Text style={styles.body}>
          Access would be restricted by role. Only necessary information should be shared.
          Community insights would be anonymized and aggregated. Data-retention and consent
          policies are not yet defined. Any real deployment requires safeguarding, legal, and
          community review.
        </Text>
        {/* Future: load live policy text and partner consent acknowledgements from backend. */}
        <View style={styles.bullets}>
          {[
            'Role-based access would gate every alert and directory action.',
            'Partners would see only the minimum fields needed for response.',
            'Aggregated insights must never re-identify individuals.',
            'Retention windows and consent flows are still undecided.',
          ].map((item) => (
            <Text key={item} style={styles.bullet}>
              • {item}
            </Text>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.questionsTitle}>Questions to resolve before launch</Text>
        {LAUNCH_QUESTIONS.map((question, index) => (
          <View key={question} style={styles.questionRow}>
            <Text style={styles.questionIndex}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.questionText}>{question}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  privacyCard: {
    backgroundColor: colors.coralMuted,
    borderColor: colors.coralSoft,
  },
  eyebrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.coralDark,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.charcoalMuted,
    marginBottom: spacing.lg,
  },
  bullets: {
    gap: spacing.sm,
  },
  bullet: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.charcoal,
  },
  questionsTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
    marginBottom: spacing.lg,
  },
  questionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  questionIndex: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.gold,
    width: 28,
  },
  questionText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.charcoalMuted,
  },
});
