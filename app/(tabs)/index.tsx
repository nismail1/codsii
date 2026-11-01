import { useCallback } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPreview } from '../../components/MapPreview';
import { QuickExitButton } from '../../components/QuickExitButton';
import { Screen } from '../../components/Screen';
import { SafetyEntryCard } from '../../components/SafetyEntryCard';
import { SOSButton } from '../../components/SOSButton';
import { StatusCard } from '../../components/StatusCard';
import { useLocation } from '../../hooks/useLocation';
import { useShakeDetection } from '../../hooks/useShakeDetection';
import { useContactsStore, useSettingsStore } from '../../store/useAppStore';
import { useEmergencyStore } from '../../store/useEmergencyStore';
import { listVolunteers } from '../../services/volunteers';
import { brand, colors, fonts, spacing } from '../../theme';

export default function HomeScreen() {
  const router = useRouter();
  const contacts = useContactsStore((s) => s.contacts);
  const silentMode = useSettingsStore((s) => s.silentMode);
  const shakeEnabled = useSettingsStore((s) => s.shakeEnabled);
  const emergencyPhone = useSettingsStore((s) => s.emergencyPhone);
  const gpsStatus = useEmergencyStore((s) => s.gpsStatus);
  const activationStep = useEmergencyStore((s) => s.activationStep);
  const { location, permission } = useLocation();

  const volunteers = listVolunteers();
  const busy = activationStep !== 'idle' && activationStep !== 'ready';

  const triggerEmergency = useCallback(
    (trigger: 'sos' | 'shake') => {
      if (busy) return;
      router.push({ pathname: '/emergency/activating', params: { trigger } });
    },
    [busy, router]
  );

  const { motionAccess, enableMotion } = useShakeDetection({
    enabled: shakeEnabled && !busy,
    onActivate: () => triggerEmergency('shake'),
  });

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.brand}>{brand.name}</Text>
          <Text style={styles.tagline}>{brand.tagline}</Text>
        </View>
        <QuickExitButton compact />
      </View>

      <View style={styles.sosBlock}>
        <SOSButton silentMode={silentMode} onActivate={() => triggerEmergency('sos')} />
        {shakeEnabled && Platform.OS === 'web' && motionAccess === 'prompt' ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void enableMotion()}
            style={styles.motionButton}
          >
            <Text style={styles.motionButtonText}>Allow shake on this phone</Text>
          </Pressable>
        ) : (
          <Text style={styles.shakeHint}>{shakeHint(shakeEnabled, motionAccess)}</Text>
        )}
        {silentMode ? <Text style={styles.silentBadge}>Silent Mode on</Text> : null}
      </View>

      <SafetyEntryCard />

      <View style={styles.statusGrid}>
        <StatusCard
          icon="📍"
          label="GPS"
          value={gpsStatus === 'active' ? 'Active' : permission === 'granted' ? 'Ready' : 'Off'}
          tone={gpsStatus === 'active' ? 'success' : 'warning'}
        />
        <StatusCard
          icon="👥"
          label="Trusted contacts"
          value={`${contacts.length} saved`}
          tone="default"
        />
        <StatusCard
          icon="✓"
          label="Volunteer network"
          value={`${volunteers.length} nearby · Demo`}
          tone="default"
        />
        <StatusCard
          icon="📞"
          label="Emergency services"
          value={emergencyPhone.trim() ? 'Configured' : 'Not set'}
          tone={emergencyPhone.trim() ? 'success' : 'muted'}
        />
        <StatusCard
          icon="🔇"
          label="Silent mode"
          value={silentMode ? 'Enabled' : 'Off'}
          tone={silentMode ? 'warning' : 'muted'}
        />
      </View>

      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Your location</Text>
        <MapPreview location={location} permissionGranted={permission === 'granted'} />
      </View>
    </Screen>
  );
}

function shakeHint(
  shakeEnabled: boolean,
  motionAccess: 'unknown' | 'granted' | 'prompt' | 'denied' | 'unavailable'
): string {
  if (!shakeEnabled) return 'Shake activation is turned off';
  if (motionAccess === 'granted' || motionAccess === 'unknown') {
    return 'Shake phone 3 times to activate';
  }
  if (Platform.OS === 'web') {
    return 'Hold SOS to test here. Shake works on a phone.';
  }
  return 'Shake activation is unavailable on this device.';
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.xxl,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  brand: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: colors.charcoal,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    marginTop: 4,
  },
  sosBlock: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  shakeHint: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.charcoalMuted,
    textAlign: 'center',
  },
  motionButton: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  motionButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
  silentBadge: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.gold,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  mapSection: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
});
