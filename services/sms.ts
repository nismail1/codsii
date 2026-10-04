import { Platform } from 'react-native';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import type { Coordinates } from '../types';
import { buildMapsUrl } from './location';

export type MessageOpenResult = 'sent' | 'cancelled' | 'copied' | 'unavailable';

export function buildEmergencyMessage(params: {
  mapsUrl: string | null;
  location: Coordinates | null;
}): string {
  const locationLine = params.mapsUrl
    ? `My location: ${params.mapsUrl}`
    : params.location
      ? `My coordinates: ${params.location.latitude.toFixed(5)}, ${params.location.longitude.toFixed(5)}`
      : 'My location could not be retrieved. Please call me.';

  return [
    'EMERGENCY ALERT from COD I SII',
    'I need help right now.',
    locationLine,
    'Please check on me immediately.',
  ].join('\n');
}

export async function isSmsAvailable(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  return SMS.isAvailableAsync();
}

function isLikelyPhoneBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openAnchor(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the older copy path.
  }

  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', 'true');
    area.style.position = 'fixed';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

function smsUrl(phone: string, message: string): string {
  const body = encodeURIComponent(message);
  if (!phone) return `sms:?body=${body}`;
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return ios ? `sms:${phone}&body=${body}` : `sms:${phone}?body=${body}`;
}

async function openMessageOnWeb(phones: string[], message: string): Promise<MessageOpenResult> {
  if (isLikelyPhoneBrowser()) {
    const phone = phones[0]?.replace(/\s/g, '') ?? '';
    openAnchor(smsUrl(phone, message));
    return 'sent';
  }

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: 'COD I SII', text: message });
      return 'sent';
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return 'cancelled';
    }
  }

  const copied = await copyText(message);
  return copied ? 'copied' : 'unavailable';
}

export async function openEmergencySms(params: {
  phones: string[];
  message: string;
}): Promise<MessageOpenResult> {
  if (Platform.OS === 'web') {
    return openMessageOnWeb(params.phones, params.message);
  }

  const available = await isSmsAvailable();
  if (!available) {
    if (params.phones[0]) {
      const url = `sms:${params.phones[0]}?body=${encodeURIComponent(params.message)}`;
      await Linking.openURL(url);
      return 'sent';
    }
    return 'unavailable';
  }

  const result = await SMS.sendSMSAsync(params.phones, params.message);
  if (result.result === 'sent') return 'sent';
  if (result.result === 'cancelled') return 'cancelled';
  return 'unavailable';
}

export async function openPhoneCall(phone: string): Promise<'opened' | 'unavailable'> {
  const cleaned = phone.replace(/\s/g, '');
  if (Platform.OS === 'web') {
    if (!isLikelyPhoneBrowser()) return 'unavailable';
    openAnchor(`tel:${cleaned}`);
    return 'opened';
  }

  try {
    await Linking.openURL(`tel:${cleaned}`);
    return 'opened';
  } catch {
    return 'unavailable';
  }
}

export async function shareLocationLink(coords: Coordinates): Promise<MessageOpenResult> {
  const url = buildMapsUrl(coords);
  const message = `My live location from COD I SII: ${url}`;
  if (Platform.OS === 'web') {
    return openMessageOnWeb([], message);
  }
  await Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  return 'sent';
}

/**
 * Future: replace with Supabase-backed alert delivery.
 */
export const smsService = {
  buildEmergencyMessage,
  isAvailable: isSmsAvailable,
  openEmergencySms,
  openPhoneCall,
  shareLocationLink,
};
