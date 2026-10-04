import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import {
  DEMO_AREA_VOLUME,
  DEMO_CATEGORY_SHARES,
  DEMO_FREQUENT_NEEDS,
  DEMO_WEEKLY_REPORTS,
} from '../../data/adminDemo';
import { colors, fonts, radius, spacing } from '../../theme';

type Props = {
  title: string;
  children: ReactNode;
};

export function InsightCard({ title, children }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </Card>
  );
}

export function CommunityInsights() {
  const maxWeek = Math.max(...DEMO_WEEKLY_REPORTS.map((w) => w.count));

  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>Community insights</Text>
      <Text style={styles.sectionSubtitle}>
        Aggregated demo metrics only. No exact user locations or identifiable reports.
      </Text>

      <View style={styles.grid}>
        <InsightCard title="Reports by category">
          {DEMO_CATEGORY_SHARES.map((item) => (
            <View key={item.label} style={styles.barRow}>
              <Text style={styles.barLabel}>{item.label}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${item.percent}%` }]} />
              </View>
              <Text style={styles.barValue}>{item.percent}%</Text>
            </View>
          ))}
        </InsightCard>

        <InsightCard title="Reports by week (last 6)">
          <View style={styles.weekRow}>
            {DEMO_WEEKLY_REPORTS.map((week) => (
              <View key={week.weekLabel} style={styles.weekCol}>
                <View style={styles.weekBarTrack}>
                  <View
                    style={[
                      styles.weekBar,
                      { height: `${Math.round((week.count / maxWeek) * 100)}%` },
                    ]}
                  />
                </View>
                <Text style={styles.weekLabel}>{week.weekLabel}</Text>
                <Text style={styles.weekCount}>{week.count}</Text>
              </View>
            ))}
          </View>
        </InsightCard>

        <InsightCard title="Most frequently reported needs">
          {DEMO_FREQUENT_NEEDS.map((need, index) => (
            <View key={need} style={styles.needRow}>
              <View style={styles.needIndex}>
                <Text style={styles.needIndexText}>{index + 1}</Text>
              </View>
              <Text style={styles.needText}>{need}</Text>
            </View>
          ))}
        </InsightCard>

        <InsightCard title="Relative report volume by area">
          <Text style={styles.mapNote}>
            Stylized area-level view — not a live map and not pin-accurate.
          </Text>
          {DEMO_AREA_VOLUME.map((area) => (
            <View key={area.area} style={styles.areaRow}>
              <View style={styles.areaCopy}>
                <Text style={styles.areaName}>{area.area}</Text>
                <Text style={styles.areaVolume}>{area.relativeVolume}</Text>
              </View>
              <View style={styles.heatTrack}>
                <View style={[styles.heatFill, { width: `${area.barPercent}%` }]} />
              </View>
            </View>
          ))}
        </InsightCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    color: colors.charcoal,
  },
  sectionSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    flexGrow: 1,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
    marginBottom: spacing.lg,
  },
  barRow: {
    marginBottom: spacing.md,
  },
  barLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalMuted,
    marginBottom: 6,
  },
  barTrack: {
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.creamDark,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.coral,
    borderRadius: radius.full,
  },
  barValue: {
    marginTop: 4,
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.charcoal,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    height: 140,
  },
  weekCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  weekBarTrack: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-end',
    backgroundColor: colors.creamDark,
    borderRadius: radius.sm,
    overflow: 'hidden',
    minHeight: 80,
  },
  weekBar: {
    width: '100%',
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
  },
  weekLabel: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.charcoalMuted,
  },
  weekCount: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.charcoalSoft,
  },
  needRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  needIndex: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.coralMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needIndexText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.coralDark,
  },
  needText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.charcoal,
  },
  mapNote: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  areaRow: {
    marginBottom: spacing.md,
  },
  areaCopy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: spacing.sm,
  },
  areaName: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.charcoal,
  },
  areaVolume: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
  },
  heatTrack: {
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.creamDark,
    overflow: 'hidden',
  },
  heatFill: {
    height: '100%',
    backgroundColor: colors.coralSoft,
    borderRadius: radius.full,
  },
});
