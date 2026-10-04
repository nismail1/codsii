import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../Card';
import { colors, fonts, radius, spacing } from '../../theme';
import type { SupportPartner } from '../../types/admin';
import { StatusBadge } from './StatusBadge';

type Props = {
  partners: SupportPartner[];
};

export function SupportDirectory({ partners }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(q) ||
        partner.role.toLowerCase().includes(q) ||
        partner.serviceArea.toLowerCase().includes(q) ||
        partner.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [partners, query]);

  return (
    <Card>
      <Text style={styles.title}>Trusted support network</Text>
      <Text style={styles.subtitle}>
        Demo directory of roles and organizations. Contact actions are disabled.
      </Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name, role, or area"
        placeholderTextColor={colors.charcoalSoft}
        style={styles.search}
        accessibilityLabel="Search support network"
      />
      <View style={styles.list}>
        {filtered.map((partner) => (
          <View key={partner.id} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.name}>{partner.name}</Text>
              <StatusBadge
                label={partner.verified ? 'Verified' : 'Unverified'}
                tone={partner.verified ? 'success' : 'warning'}
              />
            </View>
            <Text style={styles.role}>{partner.role}</Text>
            <Text style={styles.meta}>Service area: {partner.serviceArea}</Text>
            <Text style={styles.meta}>Support: {partner.categories.join(' · ')}</Text>
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
              <View style={styles.demoContact}>
                <Text style={styles.demoContactText}>Contact · Demo</Text>
              </View>
            </View>
          </View>
        ))}
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No demo partners match that search.</Text>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    lineHeight: 18,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal,
    minHeight: 48,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  item: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.creamLight,
    gap: 4,
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
    fontSize: 15,
    color: colors.charcoal,
  },
  role: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.gold,
    marginTop: 2,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalMuted,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  demoContact: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.creamDark,
  },
  demoContactText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.charcoalSoft,
  },
  empty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.charcoalSoft,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
