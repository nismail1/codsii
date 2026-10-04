import { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { useEmergencyStore } from '../../store/useEmergencyStore';
import { colors, fonts, spacing } from '../../theme';

const STEPS = [
  { key: 'activating', label: 'Activating...' },
  { key: 'retrieving_location', label: 'Retrieving location...' },
  { key: 'preparing_alert', label: 'Preparing alert...' },
] as const;

export default function ActivatingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ trigger?: string }>();
  const startActivation = useEmergencyStore((s) => s.startActivation);
  const activationStep = useEmergencyStore((s) => s.activationStep);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const trigger = params.trigger === 'shake' ? 'shake' : 'sos';
    void startActivation(trigger).then(() => {
      router.replace('/emergency/active');
    });
  }, [params.trigger, router, startActivation]);

  return (
    <Screen contentStyle={styles.content} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.center}>
        <View style={styles.pulse}>
          <ActivityIndicator size="large" color={colors.coral} />
        </View>
        <Text style={styles.title}>Activating emergency</Text>
        <Text style={styles.subtitle}>Stay as safe as you can. Help is being prepared.</Text>

        <View style={styles.steps}>
          {STEPS.map((step) => {
            const active =
              activationStep === step.key ||
              (activationStep === 'ready' && step.key === 'preparing_alert');
            const done =
              (step.key === 'activating' &&
                ['retrieving_location', 'preparing_alert', 'ready'].includes(activationStep)) ||
              (step.key === 'retrieving_location' &&
                ['preparing_alert', 'ready'].includes(activationStep)) ||
              (step.key === 'preparing_alert' && activationStep === 'ready');

            return (
              <View key={step.key} style={styles.stepRow}>
                <View style={[styles.dot, (active || done) && styles.dotActive]} />
                <Text style={[styles.stepText, (active || done) && styles.stepTextActive]}>
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  pulse: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.coralMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.charcoal,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
    textAlign: 'center',
    maxWidth: 300,
  },
  steps: {
    marginTop: spacing.xl,
    gap: spacing.md,
    alignSelf: 'stretch',
    paddingHorizontal: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.coral,
  },
  stepText: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.charcoalSoft,
  },
  stepTextActive: {
    color: colors.charcoal,
    fontFamily: fonts.bodySemiBold,
  },
});
