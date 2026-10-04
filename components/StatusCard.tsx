import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { Card } from './Card';

type Props = {
  icon: string;
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'muted';
};

export function StatusCard({ icon, label, value, tone = 'default' }: Props) {
  return (
    <Card style={styles.card} padded={false}>
      <View style={styles.inner}>
        <View style={[styles.iconWrap, toneStyles[tone]]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '47%',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.goldMuted,
  },
  icon: {
    fontSize: 16,
  },
  copy: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    marginBottom: 2,
  },
  value: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
});

const toneStyles = StyleSheet.create({
  default: { backgroundColor: colors.goldMuted },
  success: { backgroundColor: colors.successSoft },
  warning: { backgroundColor: colors.goldSoft },
  danger: { backgroundColor: colors.coralMuted },
  muted: { backgroundColor: colors.creamDark },
});
