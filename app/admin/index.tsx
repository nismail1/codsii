import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  CommunityInsights,
  IncidentDetailModal,
  IncidentTable,
  PrivacyNotice,
  StatusBadge,
  SummaryCard,
  SupportDirectory,
} from '../../components/admin';
import { Screen } from '../../components/Screen';
import {
  DEMO_INCIDENTS,
  DEMO_REGIONS,
  DEMO_SUMMARY,
  DEMO_SUPPORT_PARTNERS,
} from '../../data/adminDemo';
import { colors, fonts, radius, spacing } from '../../theme';
import type { DemoIncident, DemoRegion } from '../../types/admin';

/**
 * Institutional safeguarding dashboard prototype.
 * Future: gate this route with role-based auth and load partner-scoped data from Supabase.
 */
export default function AdminDashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isTablet = width >= 700;

  const [region, setRegion] = useState<DemoRegion>('Hargeisa');
  const [selected, setSelected] = useState<DemoIncident | null>(null);

  // Always show the three demo incidents. Future: `incidentsForRegion(region)` + Supabase RLS.
  const incidents = DEMO_INCIDENTS;

  return (
    <Screen scroll contentStyle={styles.content} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backBtn}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <StatusBadge label="Prototype / Demo Data" tone="danger" />
      </View>

      <View style={[styles.header, isTablet && styles.headerWide]}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Safeguarding Dashboard</Text>
          <Text style={styles.subtitle}>
            A future coordination space for approved community partners
          </Text>
        </View>
        <View style={styles.regionWrap}>
          <Text style={styles.regionLabel}>Selected region</Text>
          <View style={styles.regionRow}>
            {DEMO_REGIONS.map((item) => {
              const active = item === region;
              return (
                <Pressable
                  key={item}
                  onPress={() => setRegion(item)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={`Select region ${item}`}
                  style={[styles.regionChip, active && styles.regionChipActive]}
                >
                  <Text style={[styles.regionChipText, active && styles.regionChipTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={[styles.summaryRow, isWide && styles.summaryRowWide]}>
        <SummaryCard label="Open alerts" value={String(DEMO_SUMMARY.openAlerts)} hint="Demo count" />
        <SummaryCard
          label="Awaiting acknowledgment"
          value={String(DEMO_SUMMARY.awaitingAcknowledgment)}
          hint="Demo queue"
        />
        <SummaryCard
          label="Verified support partners"
          value={String(DEMO_SUMMARY.verifiedPartners)}
          hint="Demo network"
        />
        <SummaryCard
          label="Average acknowledgment"
          value={`${DEMO_SUMMARY.averageAckMinutes} min`}
          hint="Demo metric"
        />
      </View>

      <View style={[styles.columns, isWide && styles.columnsWide]}>
        <View style={[styles.column, isWide && styles.columnPrimary]}>
          <IncidentTable incidents={incidents} onSelect={setSelected} />
          <SupportDirectory partners={DEMO_SUPPORT_PARTNERS} />
        </View>
        <View style={[styles.column, isWide && styles.columnSecondary]}>
          <CommunityInsights />
          <PrivacyNotice />
        </View>
      </View>

      <IncidentDetailModal incident={selected} onClose={() => setSelected(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.huge,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  backBtn: {
    minHeight: 44,
    justifyContent: 'center',
    paddingRight: spacing.md,
  },
  backText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
  },
  header: {
    gap: spacing.lg,
  },
  headerWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
    maxWidth: 420,
  },
  regionWrap: {
    gap: spacing.sm,
  },
  regionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.charcoalSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  regionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  regionChip: {
    minHeight: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  regionChipActive: {
    backgroundColor: colors.charcoal,
    borderColor: colors.charcoal,
  },
  regionChipText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.charcoalMuted,
  },
  regionChipTextActive: {
    color: colors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryRowWide: {
    flexWrap: 'nowrap',
  },
  columns: {
    gap: spacing.xl,
  },
  columnsWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    gap: spacing.xl,
  },
  columnPrimary: {
    flex: 1.15,
  },
  columnSecondary: {
    flex: 1,
  },
});
