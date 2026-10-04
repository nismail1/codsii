import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import type { TrustedContact } from '../types';
import { Button } from './Button';
import { Card } from './Card';

type Draft = {
  name: string;
  relationship: string;
  phone: string;
  smsEnabled: boolean;
};

type Props = {
  initial?: TrustedContact | null;
  submitLabel?: string;
  onSubmit: (draft: Draft) => void;
  onCancel?: () => void;
};

export function ContactForm({
  initial = null,
  submitLabel = 'Save contact',
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [relationship, setRelationship] = useState(initial?.relationship ?? '');
  const [phone, setPhone] = useState(initial?.phone ?? '');
  const [smsEnabled, setSmsEnabled] = useState(initial?.smsEnabled ?? true);

  const valid = name.trim().length > 0 && phone.trim().length > 0;

  return (
    <Card>
      <Field label="Name" value={name} onChangeText={setName} placeholder="e.g. Mum" />
      <Field
        label="Relationship"
        value={relationship}
        onChangeText={setRelationship}
        placeholder="e.g. Mother"
      />
      <Field
        label="Phone number"
        value={phone}
        onChangeText={setPhone}
        placeholder="+252 ..."
        keyboardType="phone-pad"
      />
      <View style={styles.toggleRow}>
        <View style={styles.toggleCopy}>
          <Text style={styles.toggleLabel}>SMS enabled</Text>
          <Text style={styles.toggleHint}>Include this contact in emergency SMS</Text>
        </View>
        <Switch
          value={smsEnabled}
          onValueChange={setSmsEnabled}
          trackColor={{ false: colors.border, true: colors.coralSoft }}
          thumbColor={smsEnabled ? colors.coral : colors.creamDark}
        />
      </View>
      <View style={styles.actions}>
        {onCancel ? <Button label="Cancel" variant="secondary" onPress={onCancel} style={styles.flex} /> : null}
        <Button
          label={submitLabel}
          onPress={() =>
            onSubmit({
              name: name.trim(),
              relationship: relationship.trim() || 'Trusted contact',
              phone: phone.trim(),
              smsEnabled,
            })
          }
          disabled={!valid}
          style={styles.flex}
        />
      </View>
    </Card>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'phone-pad';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.charcoalSoft}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.charcoalMuted,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.charcoal,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  toggleCopy: {
    flex: 1,
  },
  toggleLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
  },
  toggleHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flex: {
    flex: 1,
  },
});
