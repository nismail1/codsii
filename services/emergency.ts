import type {
  AlertRecipient,
  Coordinates,
  EmergencyAlert,
  EmergencyServiceConfig,
  TrustedContact,
} from '../types';
import { buildMapsUrl } from './location';
import { buildEmergencyMessage } from './sms';
import { notifyNearestVolunteerDemo } from './volunteers';

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmergencyAlert(params: {
  trigger: 'sos' | 'shake';
  location: Coordinates | null;
  contacts: TrustedContact[];
  emergencyService: EmergencyServiceConfig;
}): EmergencyAlert {
  const mapsUrl = params.location ? buildMapsUrl(params.location) : null;
  const message = buildEmergencyMessage({
    mapsUrl,
    location: params.location,
  });

  const volunteerResult = notifyNearestVolunteerDemo();

  const recipients: AlertRecipient[] = [
    ...params.contacts.map((contact) => ({
      id: contact.id,
      label: contact.name,
      kind: 'contact' as const,
      status: contact.smsEnabled ? ('sms_ready' as const) : ('pending' as const),
      phone: contact.phone,
      detail: contact.relationship,
    })),
  ];

  if (volunteerResult.volunteer) {
    recipients.push({
      id: volunteerResult.volunteer.id,
      label: `Volunteer — ${volunteerResult.volunteer.name}`,
      kind: 'volunteer',
      status: 'demo_notified',
      detail: `${volunteerResult.volunteer.distanceKm.toFixed(1)} km away · Demo only`,
    });
  }

  if (params.emergencyService.phone.trim()) {
    recipients.push({
      id: 'emergency-service',
      label: params.emergencyService.name || 'Emergency Services',
      kind: 'emergency_service',
      status: 'call_ready',
      phone: params.emergencyService.phone,
      detail: params.emergencyService.smsNumber
        ? `SMS: ${params.emergencyService.smsNumber}`
        : undefined,
    });
  }

  return {
    id: createId('alert'),
    activatedAt: new Date().toISOString(),
    location: params.location,
    mapsUrl,
    message,
    recipients,
    status: 'active',
    trigger: params.trigger,
  };
}

export function formatRecipientStatus(status: AlertRecipient['status']): string {
  switch (status) {
    case 'sms_ready':
      return 'SMS Ready';
    case 'demo_notified':
      return 'Demo Notified';
    case 'call_ready':
      return 'Call Ready';
    case 'shared':
      return 'Shared';
    case 'sent':
      return 'Sent';
    default:
      return 'Pending';
  }
}

/**
 * Future: replace with Supabase edge function / realtime alert pipeline.
 */
export const emergencyService = {
  createAlert: createEmergencyAlert,
  formatRecipientStatus,
};
