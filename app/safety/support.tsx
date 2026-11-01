import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Card } from '../../components/Card';
import { SafetyScreenHeader } from '../../components/SafetyScreenHeader';
import { Screen } from '../../components/Screen';
import { safetyGuideIntro, verifiedSupportFor } from '../../services/safetyAssistant';
import { colors, fonts, radius, spacing } from '../../theme';

export default function SafetySupportScreen() {
  const { guide } = useLocalSearchParams<{ guide?: string }>();
  const guideId = Array.isArray(guide) ? guide[0] : guide;
  const { supportIntro } = safetyGuideIntro(guideId);
  const partners = verifiedSupportFor(guideId);

  return (
    <Screen scroll contentStyle={styles.content}>
      <SafetyScreenHeader />
      <View style={styles.header}>
        <Text style={styles.title}>Verified support options</Text>
        <Text style={styles.intro}>{supportIntro}</Text>
      </View>

      <View style={styles.list}>
        {partners.map((partner) => (
          <Card key={partner.id}>
            <View style={styles.itemHeader}>
              <Text style={styles.name}>{partner.name}</Text>
              <StatusBadge label="Verified" tone="success" />
            </View>
            <Text style={styles.role}>{partner.role}</Text>
            <Text style={styles.meta}>{partner.serviceArea}</Text>
            <Text style={styles.meta}>{partner.categories.join(' · ')}</Text>
            <View style={styles.footer}>
              <StatusBadge
                label={partner.availability}
                tone={
                  partner.availability === 'Available'
                    ? 'success'
                    : partner.availability === 'Busy'
                      ? 'warning'
                      : 'neutral'
                }
              />
              <Text style={styles.demo}>Demo · contact is not turned on</Text>
            </View>
          </Card>
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
    lineHeight: 36,
    color: colors.charcoal,
  },
  intro: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  role: {
    marginTop: spacing.xs,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.gold,
  },
  meta: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.charcoalMuted,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  demo: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    backgroundColor: colors.creamDark,
    borderRadius: radius.full,
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
});