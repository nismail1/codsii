import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import type { TrustedContact } from '../types';
import { Card } from './Card';

type Props = {
  contact: TrustedContact;
  onEdit: (contact: TrustedContact) => void;
  onDelete: (contact: TrustedContact) => void;
};

export function ContactCard({ contact, onEdit, onDelete }: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.copy}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.meta}>
            {contact.relationship} · {contact.phone}
          </Text>
          <Text style={styles.sms}>SMS {contact.smsEnabled ? 'enabled' : 'disabled'}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(contact)} style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(contact)} style={[styles.actionBtn, styles.deleteBtn]}>
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    color: colors.charcoal,
  },
  copy: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  sms: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.gold,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.creamDark,
  },
  deleteBtn: {
    backgroundColor: colors.coralMuted,
  },
  actionText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.charcoal,
  },
  deleteText: {
    color: colors.coralDark,
  },
});
