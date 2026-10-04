import { create } from 'zustand';
import { DEMO_CONTACTS } from '../data/content';
import { getBoolean, getJson, setBoolean, setJson, storageKeys } from '../services/storage';
import type { TrustedContact } from '../types';

type ContactsState = {
  contacts: TrustedContact[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addContact: (contact: Omit<TrustedContact, 'id'>) => Promise<void>;
  updateContact: (id: string, patch: Partial<Omit<TrustedContact, 'id'>>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  replaceAll: (contacts: TrustedContact[]) => Promise<void>;
};

function createContactId(): string {
  return `contact-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

async function persist(contacts: TrustedContact[]) {
  await setJson(storageKeys.contacts, contacts);
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: DEMO_CONTACTS,
  hydrated: false,

  hydrate: async () => {
    const stored = await getJson<TrustedContact[]>(storageKeys.contacts);
    set({
      contacts: stored && stored.length > 0 ? stored : DEMO_CONTACTS,
      hydrated: true,
    });
    if (!stored || stored.length === 0) {
      await persist(DEMO_CONTACTS);
    }
  },

  addContact: async (contact) => {
    const next = [...get().contacts, { ...contact, id: createContactId() }];
    set({ contacts: next });
    await persist(next);
  },

  updateContact: async (id, patch) => {
    const next = get().contacts.map((contact) =>
      contact.id === id ? { ...contact, ...patch } : contact
    );
    set({ contacts: next });
    await persist(next);
  },

  deleteContact: async (id) => {
    const next = get().contacts.filter((contact) => contact.id !== id);
    set({ contacts: next });
    await persist(next);
  },

  replaceAll: async (contacts) => {
    set({ contacts });
    await persist(contacts);
  },
}));

type SettingsState = {
  onboardingComplete: boolean;
  silentMode: boolean;
  shakeEnabled: boolean;
  emergencyServiceName: string;
  emergencyPhone: string;
  emergencySms: string;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  setSilentMode: (value: boolean) => Promise<void>;
  setShakeEnabled: (value: boolean) => Promise<void>;
  setEmergencyService: (params: {
    name: string;
    phone: string;
    smsNumber: string;
  }) => Promise<void>;
};

type PersistedSettings = {
  silentMode: boolean;
  shakeEnabled: boolean;
  emergencyServiceName: string;
  emergencyPhone: string;
  emergencySms: string;
};

const defaultSettings: PersistedSettings = {
  silentMode: false,
  shakeEnabled: true,
  emergencyServiceName: 'Local Emergency Services',
  emergencyPhone: '',
  emergencySms: '',
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  onboardingComplete: false,
  ...defaultSettings,
  hydrated: false,

  hydrate: async () => {
    const [onboardingComplete, settings] = await Promise.all([
      getBoolean(storageKeys.onboardingComplete),
      getJson<PersistedSettings>(storageKeys.preferences),
    ]);

    set({
      onboardingComplete,
      ...(settings ?? defaultSettings),
      hydrated: true,
    });
  },

  completeOnboarding: async () => {
    await setBoolean(storageKeys.onboardingComplete, true);
    set({ onboardingComplete: true });
  },

  setSilentMode: async (value) => {
    const next = { ...getPersisted(get()), silentMode: value };
    set({ silentMode: value });
    await setJson(storageKeys.preferences, next);
  },

  setShakeEnabled: async (value) => {
    const next = { ...getPersisted(get()), shakeEnabled: value };
    set({ shakeEnabled: value });
    await setJson(storageKeys.preferences, next);
  },

  setEmergencyService: async ({ name, phone, smsNumber }) => {
    const next = {
      ...getPersisted(get()),
      emergencyServiceName: name,
      emergencyPhone: phone,
      emergencySms: smsNumber,
    };
    set({
      emergencyServiceName: name,
      emergencyPhone: phone,
      emergencySms: smsNumber,
    });
    await setJson(storageKeys.preferences, next);
  },
}));

function getPersisted(state: SettingsState): PersistedSettings {
  return {
    silentMode: state.silentMode,
    shakeEnabled: state.shakeEnabled,
    emergencyServiceName: state.emergencyServiceName,
    emergencyPhone: state.emergencyPhone,
    emergencySms: state.emergencySms,
  };
}
