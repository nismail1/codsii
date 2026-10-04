import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../Card';
import { colors, fonts, spacing } from '../../theme';

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export function SummaryCard({ label, value, hint }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} accessibilityRole="text">
        {value}
      </Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <View style={styles.accent} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 160,
    minWidth: 150,
    overflow: 'hidden',
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.charcoalSoft,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  value: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    color: colors.charcoal,
  },
  hint: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalMuted,
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.coralSoft,
  },
});
