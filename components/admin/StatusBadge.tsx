import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../../theme';
import type { IncidentPriority, IncidentStatus } from '../../types/admin';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'gold';

type Props = {
  label: string;
  tone?: Tone;
};

export function StatusBadge({ label, tone = 'neutral' }: Props) {
  return (
    <View
      style={[styles.badge, toneStyles[tone]]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
    >
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

export function priorityTone(priority: IncidentPriority): Tone {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'neutral';
}

export function statusTone(status: IncidentStatus): Tone {
  switch (status) {
    case 'Responding':
      return 'success';
    case 'Awaiting acknowledgment':
      return 'warning';
    case 'Follow-up':
      return 'gold';
    default:
      return 'neutral';
  }
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  text: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.charcoal,
  },
});

const toneStyles = StyleSheet.create({
  neutral: { backgroundColor: colors.creamDark },
  success: { backgroundColor: colors.successSoft },
  warning: { backgroundColor: colors.goldSoft },
  danger: { backgroundColor: colors.coralMuted },
  gold: { backgroundColor: colors.goldMuted },
});
