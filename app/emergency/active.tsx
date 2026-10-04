import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertStatusList } from '../../components/AlertStatusList';
import { Button } from '../../components/Button';
import { MapPreview } from '../../components/MapPreview';
import { QuickExitButton } from '../../components/QuickExitButton';
import { Screen } from '../../components/Screen';
import { confirmAction, notify } from '../../services/dialog';
import { openEmergencySms, openPhoneCall, shareLocationLink } from '../../services/sms';
import { useContactsStore, useSettingsStore } from '../../store/useAppStore';
import { useEmergencyStore } from '../../store/useEmergencyStore';
import { colors, fonts, spacing } from '../../theme';

export default function ActiveEmergencyScreen() {
  const router = useRouter();
  const alert = useEmergencyStore((s) => s.alert);
  const updateLocation = useEmergencyStore((s) => s.updateLocation);
  const endAlert = useEmergencyStore((s) => s.endAlert);
  const contacts = useContactsStore((s) => s.contacts);
  const emergencyPhone = useSettingsStore((s) => s.emergencyPhone);
  const emergencySms = useSettingsStore((s) => s.emergencySms);
  const silentMode = useSettingsStore((s) => s.silentMode);
  const [elapsed, setElapsed] = useState('00:00');

  useEffect(() => {
    if (!alert) {
      router.replace('/(tabs)');
    }
  }, [alert, router]);

  useEffect(() => {
    if (!alert) return;
    const started = new Date(alert.activatedAt).getTime();

    const tick = () => {
      const seconds = Math.max(0, Math.floor((Date.now() - started) / 1000));
      const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
      const ss = String(seconds % 60).padStart(2, '0');
      setElapsed(`${mm}:${ss}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [alert]);

  const smsPhones = useMemo(
    () => contacts.filter((c) => c.smsEnabled && c.phone.trim()).map((c) => c.phone.trim()),
    [contacts]
  );

  if (!alert) {
    return null;
  }

  return (
    <Screen scroll contentStyle={styles.content} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Emergency Active</Text>
          <Text style={styles.timer}>{elapsed}</Text>
          <Text style={styles.meta}>
            Triggered by {alert.trigger === 'shake' ? 'shake' : 'SOS hold'}
            {silentMode ? ' · Silent Mode' : ''}
          </Text>
        </View>
        <QuickExitButton compact />
      </View>

      <MapPreview
        location={alert.location}
        permissionGranted={Boolean(alert.location)}
        height={200}
        interactive
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert status</Text>
        <AlertStatusList recipients={alert.recipients} />
      </View>

      <View style={styles.actions}>
        <Button
          label="Open Emergency SMS"
          variant="danger"
          onPress={() => {
            const phones = smsPhones.length > 0 ? smsPhones : emergencySms ? [emergencySms] : [];
            if (phones.length === 0) {
              notify('No SMS recipients', 'Add a trusted contact or emergency SMS number first.');
              return;
            }
            void openEmergencySms({ phones, message: alert.message }).then((result) => {
              if (result === 'copied') {
                notify(
                  'Alert copied',
                  'This browser cannot open Messages. The emergency text is on your clipboard so you can paste it into a message.'
                );
              } else if (result === 'unavailable') {
                notify('Could not open SMS', alert.message);
              }
            });
          }}
        />
        <Button
          label="Call Emergency Services"
          onPress={() => {
            if (!emergencyPhone.trim()) {
              notify(
                'No emergency number',
                'Add a phone number in Settings → Emergency services.'
              );
              return;
            }
            void openPhoneCall(emergencyPhone).then((result) => {
              if (result === 'unavailable') {
                notify(
                  'Call from a phone',
                  `This browser cannot place a call. Dial ${emergencyPhone.trim()} from a phone.`
                );
              }
            });
          }}
        />
        <Button
          label="Share Location"
          variant="secondary"
          onPress={() => {
            if (!alert.location) {
              notify('Location unavailable', 'Try Update Location first.');
              return;
            }
            void shareLocationLink(alert.location).then((result) => {
              if (result === 'copied') {
                notify(
                  'Location copied',
                  'This browser cannot open Messages. The location link is on your clipboard.'
                );
              } else if (result === 'unavailable') {
                notify('Could not share location', alert.mapsUrl ?? 'Location link is unavailable.');
              }
            });
          }}
        />
        <Button label="Update Location" variant="secondary" onPress={() => void updateLocation()} />
        <Button
          label="I'm Safe"
          variant="gold"
          onPress={() => {
            confirmAction(
              'End emergency?',
              'This will close the active alert on this device.',
              "I'm Safe",
              () => {
                endAlert();
                router.replace('/(tabs)');
              }
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  eyebrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.coral,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  timer: {
    fontFamily: fonts.displayBold,
    fontSize: 40,
    color: colors.charcoal,
    marginTop: 4,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    marginTop: 4,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  actions: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
