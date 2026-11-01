import { useEffect } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import * as SplashScreen from 'expo-splash-screen';
import { WebAppFrame } from '../components/WebAppFrame';
import { colors } from '../theme';
import { useContactsStore, useSettingsStore } from '../store/useAppStore';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
  });

  const hydrateSettings = useSettingsStore((s) => s.hydrate);
  const hydrateContacts = useContactsStore((s) => s.hydrate);
  const settingsHydrated = useSettingsStore((s) => s.hydrated);
  const contactsHydrated = useContactsStore((s) => s.hydrated);
  const onboardingComplete = useSettingsStore((s) => s.onboardingComplete);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    void hydrateSettings();
    void hydrateContacts();
  }, [hydrateSettings, hydrateContacts]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'COD I SII';
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded && settingsHydrated && contactsHydrated) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, settingsHydrated, contactsHydrated]);

  useEffect(() => {
    if (!settingsHydrated || !contactsHydrated || !fontsLoaded) return;

    const inOnboarding = segments[0] === '(onboarding)';

    if (!onboardingComplete && !inOnboarding) {
      router.replace('/(onboarding)/welcome');
      return;
    }

    if (onboardingComplete && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [
    contactsHydrated,
    fontsLoaded,
    onboardingComplete,
    router,
    segments,
    settingsHydrated,
  ]);

  if (!fontsLoaded || !settingsHydrated || !contactsHydrated) {
    return (
      <WebAppFrame>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream }}>
          <ActivityIndicator color={colors.coral} />
        </View>
      </WebAppFrame>
    );
  }

  return (
    <WebAppFrame>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream } }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="emergency/activating" options={{ gestureEnabled: false }} />
        <Stack.Screen name="emergency/active" options={{ gestureEnabled: false }} />
        <Stack.Screen name="quick-exit" options={{ animation: 'fade' }} />
        <Stack.Screen name="admin/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="safety/index" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="safety/support" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="safety/lesson/[id]" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </WebAppFrame>
  );
}
