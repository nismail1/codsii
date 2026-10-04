import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LEARN_TOPICS } from '../../data/content';
import { LearnCard } from '../../components/LearnCard';
import { Screen } from '../../components/Screen';
import { colors, fonts, spacing } from '../../theme';

export default function LearnScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(LEARN_TOPICS[0]?.id ?? null);

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn & prepare</Text>
        <Text style={styles.subtitle}>
          Practical digital-safety guidance for women and families — stored on your device.
        </Text>
      </View>

      <View style={styles.list}>
        {LEARN_TOPICS.map((topic) => (
          <LearnCard
            key={topic.id}
            topic={topic}
            expanded={expandedId === topic.id}
            onPress={() => setExpandedId((current) => (current === topic.id ? null : topic.id))}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});
