import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { QuickExitButton } from '../../components/QuickExitButton';
import { Screen } from '../../components/Screen';
import { listVolunteers } from '../../services/volunteers';
import { useSettingsStore } from '../../store/useAppStore';
import { colors, fonts, radius, spacing } from '../../theme';

export default function SettingsScreen() {
  const router = useRouter();
  const silentMode = useSettingsStore((s) => s.silentMode);
  const shakeEnabled = useSettingsStore((s) => s.shakeEnabled);
  const emergencyServiceName = useSettingsStore((s) => s.emergencyServiceName);
  const emergencyPhone = useSettingsStore((s) => s.emergencyPhone);
  const emergencySms = useSettingsStore((s) => s.emergencySms);
  const setSilentMode = useSettingsStore((s) => s.setSilentMode);
  const setShakeEnabled = useSettingsStore((s) => s.setShakeEnabled);
  const setEmergencyService = useSettingsStore((s) => s.setEmergencyService);

  const [name, setName] = useState(emergencyServiceName);
  const [phone, setPhone] = useState(emergencyPhone);
  const [sms, setSms] = useState(emergencySms);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(emergencyServiceName);
    setPhone(emergencyPhone);
    setSms(emergencySms);
  }, [emergencyPhone, emergencyServiceName, emergencySms]);

  const volunteers = listVolunteers();

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure discreet mode and local emergency services.</Text>
      </View>

      <Card>
        <ToggleRow
          title="Silent Mode"
          description="No sounds, minimal haptics, and a Quick Exit button for discreet use."
          value={silentMode}
          onValueChange={(value) => void setSilentMode(value)}
        />
        <View style={styles.divider} />
        <ToggleRow
          title="Shake activation"
          description="Detect three strong shakes while the app is open."
          value={shakeEnabled}
          onValueChange={(value) => void setShakeEnabled(value)}
        />
        {silentMode ? (
          <View style={styles.exitWrap}>
            <QuickExitButton />
          </View>
        ) : null}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Emergency services</Text>
        <Text style={styles.sectionBody}>
          Enter the local numbers you want to use. COD I SII does not hardcode emergency numbers.
        </Text>
        <Field label="Service name" value={name} onChangeText={setName} placeholder="e.g. Local police" />
        <Field
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Call number"
          keyboardType="phone-pad"
        />
        <Field
          label="SMS number"
          value={sms}
          onChangeText={setSms}
          placeholder="Optional SMS number"
          keyboardType="phone-pad"
        />
        <Button
          label={saved ? 'Saved' : 'Save emergency services'}
          variant="gold"
          onPress={async () => {
            await setEmergencyService({ name, phone, smsNumber: sms });
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
          }}
        />
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Community volunteers</Text>
        <Text style={styles.sectionBody}>
          Prototype demo data only. During SOS, the nearest volunteer is marked “Demo Notified”.
        </Text>
        {volunteers.map((volunteer) => (
          <View key={volunteer.id} style={styles.volunteerRow}>
            <View>
              <Text style={styles.volunteerName}>{volunteer.name}</Text>
              <Text style={styles.volunteerMeta}>
                {volunteer.distanceKm.toFixed(1)} km · {volunteer.verified ? 'Verified' : 'Pending'}
              </Text>
            </View>
            <Text style={styles.demoTag}>Demo</Text>
          </View>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Development</Text>
        <Text style={styles.sectionBody}>
          Preview a future institutional dashboard for approved partners. Demo data only — no live
          monitoring.
        </Text>
        <Button
          label="View institutional dashboard demo"
          variant="ghost"
          onPress={() => router.push('/admin')}
          textStyle={styles.demoLink}
        />
      </Card>
    </Screen>
  );
}

function ToggleRow({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.coralSoft }}
        thumbColor={value ? colors.coral : colors.creamDark}
      />
    </View>
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
      <Text style={styles.fieldLabel}>{label}</Text>
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
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  rowDescription: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.charcoalSoft,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  exitWrap: {
    marginTop: spacing.lg,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  sectionBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.charcoalMuted,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
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
  volunteerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  volunteerName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
  },
  volunteerMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.charcoalSoft,
    marginTop: 2,
  },
  demoTag: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    color: colors.gold,
  },
  demoLink: {
    color: colors.coral,
    textAlign: 'left',
  },
});
