import { create } from 'zustand';
import { createEmergencyAlert } from '../services/emergency';
import { getCurrentCoordinates } from '../services/location';
import type { Coordinates, EmergencyAlert } from '../types';
import { useContactsStore } from './useAppStore';
import { useSettingsStore } from './useAppStore';

type ActivationStep = 'idle' | 'activating' | 'retrieving_location' | 'preparing_alert' | 'ready';

type EmergencyState = {
  alert: EmergencyAlert | null;
  activationStep: ActivationStep;
  gpsStatus: 'unknown' | 'active' | 'unavailable';
  lastKnownLocation: Coordinates | null;
  startActivation: (trigger: 'sos' | 'shake') => Promise<EmergencyAlert>;
  updateLocation: () => Promise<void>;
  endAlert: () => void;
  setGpsStatus: (status: EmergencyState['gpsStatus']) => void;
  setLastKnownLocation: (location: Coordinates | null) => void;
};

export const useEmergencyStore = create<EmergencyState>((set, get) => ({
  alert: null,
  activationStep: 'idle',
  gpsStatus: 'unknown',
  lastKnownLocation: null,

  setGpsStatus: (gpsStatus) => set({ gpsStatus }),
  setLastKnownLocation: (lastKnownLocation) => set({ lastKnownLocation }),

  startActivation: async (trigger) => {
    set({ activationStep: 'activating', alert: null });

    await wait(450);
    set({ activationStep: 'retrieving_location' });

    const location = await getCurrentCoordinates();
    if (location) {
      set({ lastKnownLocation: location, gpsStatus: 'active' });
    } else {
      set({ gpsStatus: 'unavailable' });
    }

    await wait(350);
    set({ activationStep: 'preparing_alert' });

    const contacts = useContactsStore.getState().contacts;
    const settings = useSettingsStore.getState();

    const alert = createEmergencyAlert({
      trigger,
      location,
      contacts,
      emergencyService: {
        name: settings.emergencyServiceName,
        phone: settings.emergencyPhone,
        smsNumber: settings.emergencySms,
      },
    });

    await wait(300);
    set({ alert, activationStep: 'ready' });
    return alert;
  },

  updateLocation: async () => {
    const location = await getCurrentCoordinates();
    if (!location) {
      set({ gpsStatus: 'unavailable' });
      return;
    }

    const current = get().alert;
    if (!current) {
      set({ lastKnownLocation: location, gpsStatus: 'active' });
      return;
    }

    const mapsUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
    set({
      lastKnownLocation: location,
      gpsStatus: 'active',
      alert: {
        ...current,
        location,
        mapsUrl,
        message: current.message.replace(
          /My location:.*|My coordinates:.*/,
          `My location: ${mapsUrl}`
        ),
      },
    });
  },

  endAlert: () => {
    const current = get().alert;
    set({
      alert: current ? { ...current, status: 'ended' } : null,
      activationStep: 'idle',
    });
    setTimeout(() => set({ alert: null }), 100);
  },
}));

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
