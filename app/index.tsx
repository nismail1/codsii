import { Redirect } from 'expo-router';
import { useSettingsStore } from '../store/useAppStore';

export default function Index() {
  const onboardingComplete = useSettingsStore((s) => s.onboardingComplete);
  if (!onboardingComplete) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  return <Redirect href="/(tabs)" />;
}
