import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { requestLocationPermission } from '../../services/location';
import { useEmergencyStore } from '../../store/useEmergencyStore';
import { colors, fonts, spacing } from '../../theme';

export default function LocationOnboardingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('We use location only to help during emergencies.');
  const setGpsStatus = useEmergencyStore((s) => s.setGpsStatus);

  const handleAllow = async () => {
    setLoading(true);
    const status = await requestLocationPermission();
    setGpsStatus(status === 'granted' ? 'active' : 'unavailable');
    setMessage(
      status === 'granted'
        ? 'Location access granted. You can change this later in system settings.'
        : 'Location was not granted. You can still use the app and enable it later.'
    );
    setLoading(false);
    router.push('/(onboarding)/contacts');
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.copy}>
        <Text style={styles.step}>Step 2 of 4</Text>
        <Text style={styles.title}>Share your location in emergencies</Text>
        <Text style={styles.body}>
          When SOS activates, COD I SII retrieves your GPS position and includes a Google Maps link
          in your alert message.
        </Text>
      </View>
      <Card>
        <Text style={styles.cardTitle}>Why we ask</Text>
        <Text style={styles.cardBody}>
          Trusted contacts and emergency helpers need to know where you are. Your location stays on
          this device until you trigger an alert.
          {Platform.OS === 'web'
            ? ' Your browser will ask for permission. Choose Allow so the alert can include a map link.'
            : ''}
        </Text>
        <Text style={styles.message}>{message}</Text>
      </Card>
      <View style={styles.actions}>
        <Button label="Allow location access" onPress={handleAllow} loading={loading} />
        <Button
          label="Skip for now"
          variant="ghost"
          onPress={() => router.push('/(onboarding)/contacts')}
        />
      </View>
    </Screen>
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
  cardTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
    marginBottom: spacing.sm,
  },
  cardBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  message: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.coral,
  },
  actions: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
