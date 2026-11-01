import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { SafetyScreenHeader } from '../../../components/SafetyScreenHeader';
import { Screen } from '../../../components/Screen';
import { LEARN_TOPICS } from '../../../data/content';
import { colors, fonts, radius, spacing } from '../../../theme';

export default function SafetyLessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const topic = LEARN_TOPICS.find((item) => item.id === id);

  return (
    <Screen scroll contentStyle={styles.content}>
      <SafetyScreenHeader />
      {topic ? (
        <View style={styles.lesson}>
          <Text style={styles.category}>{topic.category}</Text>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.meta}>About 2 minutes · from Learn</Text>
          <Card>
            <View style={styles.body}>
              {topic.body.map((line) => (
                <View key={line} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          </Card>
          <Button
            label="All lessons"
            variant="secondary"
            onPress={() => router.push('/(tabs)/learn')}
          />
        </View>
      ) : (
        <View style={styles.lesson}>
          <Text style={styles.title}>That lesson is not available</Text>
          <Text style={styles.meta}>It may have moved. You can still browse Learn.</Text>
          <Button label="All lessons" variant="secondary" onPress={() => router.push('/(tabs)/learn')} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  lesson: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  category: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
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
  meta: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.charcoalMuted,
  },
  body: {
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
    fontSize: 16,
    lineHeight: 24,
    color: colors.charcoalMuted,
  },
});
