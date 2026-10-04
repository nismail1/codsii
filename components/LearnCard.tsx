import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import type { LearnTopic } from '../types';
import { Card } from './Card';

type Props = {
  topic: LearnTopic;
  expanded: boolean;
  onPress: () => void;
};

export function LearnCard({ topic, expanded, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <Text style={styles.category}>{topic.category}</Text>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.summary}>{topic.summary}</Text>
        {expanded ? (
          <View style={styles.body}>
            {topic.body.map((line) => (
              <View key={line} style={styles.bulletRow}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.cta}>Tap to learn more</Text>
        )}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  category: {
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
  summary: {
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
  body: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
});
