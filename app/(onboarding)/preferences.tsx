import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { useSettingsStore } from '../../store/useAppStore';
import { colors, fonts, spacing } from '../../theme';

export default function PreferencesOnboardingScreen() {
  const router = useRouter();
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);
  const setSilentMode = useSettingsStore((s) => s.setSilentMode);
  const setShakeEnabled = useSettingsStore((s) => s.setShakeEnabled);
  const [silent, setSilent] = useState(false);
  const [shake, setShake] = useState(true);
  const [saving, setSaving] = useState(false);

  const finish = async () => {
    setSaving(true);
    await setSilentMode(silent);
    await setShakeEnabled(shake);
    await completeOnboarding();
    setSaving(false);
    router.replace('/(tabs)');
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.copy}>
        <Text style={styles.step}>Step 4 of 4</Text>
        <Text style={styles.title}>Safety preferences</Text>
        <Text style={styles.body}>
          Choose how COD I SII should behave. You can update these anytime in Settings.
        </Text>
      </View>

      <Card>
        <ToggleRow
          title="Silent Mode"
          description="No sounds and minimal haptics for discreet emergencies."
          value={silent}
          onValueChange={setSilent}
        />
        <View style={styles.divider} />
        <ToggleRow
          title="Shake activation"
          description="Shake your phone 3 times to start an emergency alert."
          value={shake}
          onValueChange={setShake}
        />
      </Card>

      <View style={styles.actions}>
        <Button label="Enter COD I SII" onPress={finish} loading={saving} />
      </View>
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

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingTop: spacing.xxxl,
    gap: spacing.xl,
  },
  copy: {
    gap: spacing.md,
  },
  step: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.gold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: colors.charcoal,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
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
  actions: {
    paddingBottom: spacing.xl,
  },
});
