export type TrustedContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  smsEnabled: boolean;
};

export type Volunteer = {
  id: string;
  name: string;
  distanceKm: number;
  verified: boolean;
};

export type EmergencyServiceConfig = {
  name: string;
  phone: string;
  smsNumber: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
};

export type AlertRecipientStatus =
  | 'pending'
  | 'sms_ready'
  | 'demo_notified'
  | 'call_ready'
  | 'shared'
  | 'sent';

export type AlertRecipient = {
  id: string;
  label: string;
  kind: 'contact' | 'volunteer' | 'emergency_service';
  status: AlertRecipientStatus;
  phone?: string;
  detail?: string;
};

export type EmergencyAlert = {
  id: string;
  activatedAt: string;
  location: Coordinates | null;
  mapsUrl: string | null;
  message: string;
  recipients: AlertRecipient[];
  status: 'activating' | 'active' | 'ended';
  trigger: 'sos' | 'shake';
};

export type LearnTopic = {
  id: string;
  title: string;
  summary: string;
  body: string[];
  category: string;
};

export type SafetyGuideId =
  | 'phishing'
  | 'verification'
  | 'money'
  | 'pressure'
  | 'photos'
  | 'ai'
  | 'unclear'
  | 'english'
  | 'immediate';

export type SafetyGuide = {
  id: SafetyGuideId;
  happening: string;
  now: string;
  /** Learn topic to open. Null when a lesson would not help. */
  lessonId: string | null;
  lessonCta: string | null;
  /** Section label above the lesson link. */
  lessonPrompt: string | null;
  supportIntro: string;
  supportCategories: string[];
  showSos: boolean;
};

export type SafetyPreferences = {
  silentMode: boolean;
  shakeEnabled: boolean;
  holdSeconds: number;
};

export type AppBootstrapState = {
  onboardingComplete: boolean;
  hydrated: boolean;
};
