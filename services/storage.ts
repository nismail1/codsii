import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@codisii:';

export const storageKeys = {
  onboardingComplete: `${PREFIX}onboardingComplete`,
  contacts: `${PREFIX}contacts`,
  emergencyService: `${PREFIX}emergencyService`,
  preferences: `${PREFIX}preferences`,
} as const;

export async function getJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getBoolean(key: string): Promise<boolean> {
  const value = await AsyncStorage.getItem(key);
  return value === 'true';
}

export async function setBoolean(key: string, value: boolean): Promise<void> {
  await AsyncStorage.setItem(key, value ? 'true' : 'false');
}

export async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
