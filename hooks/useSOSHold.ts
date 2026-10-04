import { useCallback, useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';

type Options = {
  holdMs?: number;
  silentMode?: boolean;
  onComplete: () => void;
};

export function useSOSHold({ holdMs = 3000, silentMode = false, onComplete }: Options) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clear = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    startRef.current = null;
  }, []);

  const cancel = useCallback(() => {
    clear();
    setHolding(false);
    setProgress(0);
    completedRef.current = false;
  }, [clear]);

  const tick = useCallback(() => {
    if (startRef.current == null) return;
    const elapsed = Date.now() - startRef.current;
    const next = Math.min(1, elapsed / holdMs);
    setProgress(next);

    if (next >= 1) {
      clear();
      setHolding(false);
      if (!completedRef.current) {
        completedRef.current = true;
        if (!silentMode) {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          void Haptics.selectionAsync();
        }
        onCompleteRef.current();
      }
      return;
    }

    frameRef.current = requestAnimationFrame(tick);
  }, [clear, holdMs, silentMode]);

  const start = useCallback(() => {
    completedRef.current = false;
    setHolding(true);
    startRef.current = Date.now();
    setProgress(0);
    if (!silentMode) {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      void Haptics.selectionAsync();
    }
    frameRef.current = requestAnimationFrame(tick);
  }, [silentMode, tick]);

  useEffect(() => () => clear(), [clear]);

  return {
    progress,
    holding,
    start,
    cancel,
  };
}
