import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { formatRecipientStatus } from '../services/emergency';
import type { AlertRecipient } from '../types';
import { Card } from './Card';

type Props = {
  recipients: AlertRecipient[];
};

export function AlertStatusList({ recipients }: Props) {
  return (
    <Card padded={false}>
      {recipients.map((recipient, index) => (
        <View
          key={recipient.id}
          style={[styles.row, index < recipients.length - 1 && styles.border]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{recipient.label.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.copy}>
            <Text style={styles.label}>{recipient.label}</Text>
            {recipient.detail ? <Text style={styles.detail}>{recipient.detail}</Text> : null}
          </View>
          <View style={[styles.badge, badgeTone(recipient.status)]}>
            <Text style={styles.badgeText}>{formatRecipientStatus(recipient.status)}</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}

function badgeTone(status: AlertRecipient['status']) {
  switch (status) {
    case 'demo_notified':
      return { backgroundColor: colors.goldMuted };
    case 'call_ready':
      return { backgroundColor: colors.coralMuted };
    case 'sms_ready':
    case 'sent':
    case 'shared':
      return { backgroundColor: colors.successSoft };
    default:
      return { backgroundColor: colors.creamDark };
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
  copy: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
  },
  detail: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    marginTop: 2,
  },
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.charcoal,
  },
});
