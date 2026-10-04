import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export type MotionAccess = 'unknown' | 'granted' | 'prompt' | 'denied' | 'unavailable';

type Options = {
  enabled?: boolean;
  requiredShakes?: number;
  windowMs?: number;
  threshold?: number;
  onActivate: () => void;
};

/**
 * Detects a burst of strong phone shakes while the app is open.
 */
export function useShakeDetection({
  enabled = true,
  requiredShakes = 3,
  windowMs = 1800,
  threshold = 1.75,
  onActivate,
}: Options) {
  const shakeTimes = useRef<number[]>([]);
  const lastMagnitude = useRef(0);
  const cooldownUntil = useRef(0);
  const onActivateRef = useRef(onActivate);
  const [motionAccess, setMotionAccess] = useState<MotionAccess>(
    Platform.OS === 'web' ? 'unknown' : 'granted'
  );

  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !enabled) return;
    if (!isPhoneBrowser() || typeof DeviceMotionEvent === 'undefined') {
      setMotionAccess('unavailable');
      return;
    }

    let cancelled = false;

    void Accelerometer.getPermissionsAsync().then((current) => {
      if (cancelled) return;
      if (current.granted) {
        setMotionAccess('granted');
        return;
      }
      setMotionAccess(current.status === 'undetermined' ? 'prompt' : 'denied');
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const enableMotion = useCallback(async () => {
    if (!isPhoneBrowser() || typeof DeviceMotionEvent === 'undefined') {
      setMotionAccess('unavailable');
      return;
    }
    const next = await Accelerometer.requestPermissionsAsync();
    setMotionAccess(next.granted ? 'granted' : 'denied');
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const recordSample = (x: number, y: number, z: number) => {
      const now = Date.now();
      if (now < cooldownUntil.current) return;

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitude - lastMagnitude.current);
      lastMagnitude.current = magnitude;

      if (delta < threshold) return;

      shakeTimes.current = shakeTimes.current.filter((time) => now - time < windowMs);
      shakeTimes.current.push(now);

      if (shakeTimes.current.length >= requiredShakes) {
        shakeTimes.current = [];
        cooldownUntil.current = now + 4000;
        onActivateRef.current();
      }
    };

    if (Platform.OS === 'web') {
      if (motionAccess !== 'granted') return;

      const onMotion = (event: DeviceMotionEvent) => {
        const acceleration = event.accelerationIncludingGravity;
        if (
          !acceleration ||
          acceleration.x == null ||
          acceleration.y == null ||
          acceleration.z == null
        ) {
          return;
        }
        recordSample(acceleration.x / 9.81, acceleration.y / 9.81, acceleration.z / 9.81);
      };

      window.addEventListener('devicemotion', onMotion);
      return () => window.removeEventListener('devicemotion', onMotion);
    }

    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      recordSample(x, y, z);
    });

    return () => subscription.remove();
  }, [enabled, motionAccess, requiredShakes, threshold, windowMs]);

  return { motionAccess, enableMotion };
}

function isPhoneBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
