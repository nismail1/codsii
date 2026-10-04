import { Platform } from 'react-native';
import * as Location from 'expo-location';
import type { Coordinates } from '../types';

const WEB_LOCATION_TIMEOUT_MS = 12000;

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return new Promise((resolve) => {
    const id = setTimeout(() => resolve(fallback), ms);
    promise.then(
      (value) => {
        clearTimeout(id);
        resolve(value);
      },
      () => {
        clearTimeout(id);
        resolve(fallback);
      }
    );
  });
}

export type LocationPermissionStatus = 'granted' | 'denied' | 'undetermined';

export async function getLocationPermissionStatus(): Promise<LocationPermissionStatus> {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status === Location.PermissionStatus.GRANTED) return 'granted';
  if (status === Location.PermissionStatus.DENIED) return 'denied';
  return 'undetermined';
}

export async function requestLocationPermission(): Promise<LocationPermissionStatus> {
  const request = (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === Location.PermissionStatus.GRANTED) return 'granted' as const;
    if (status === Location.PermissionStatus.DENIED) return 'denied' as const;
    return 'undetermined' as const;
  })();

  if (Platform.OS !== 'web') return request;
  return withTimeout(request, WEB_LOCATION_TIMEOUT_MS, 'denied');
}

export async function getCurrentCoordinates(): Promise<Coordinates | null> {
  const permission = await getLocationPermissionStatus();
  if (permission !== 'granted') {
    const requested = await requestLocationPermission();
    if (requested !== 'granted') return null;
  }

  try {
    const request = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const position =
      Platform.OS === 'web'
        ? await withTimeout(request, WEB_LOCATION_TIMEOUT_MS, null)
        : await request;
    if (!position) return null;

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    };
  } catch {
    return null;
  }
}

export function buildMapsUrl(coords: Coordinates): string {
  return `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
}

/**
 * Future: replace with Supabase realtime location sync.
 */
export const locationService = {
  getPermissionStatus: getLocationPermissionStatus,
  requestPermission: requestLocationPermission,
  getCurrent: getCurrentCoordinates,
  buildMapsUrl,
};
