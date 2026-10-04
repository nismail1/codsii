import type { Volunteer } from '../types';

export const DEMO_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-hodan',
    name: 'Hodan',
    distanceKm: 0.8,
    verified: true,
  },
  {
    id: 'vol-sahra',
    name: 'Sahra',
    distanceKm: 1.4,
    verified: true,
  },
  {
    id: 'vol-maryan',
    name: 'Maryan',
    distanceKm: 2.1,
    verified: false,
  },
];

export function getNearestVolunteer(volunteers: Volunteer[] = DEMO_VOLUNTEERS): Volunteer | null {
  if (volunteers.length === 0) return null;
  return [...volunteers].sort((a, b) => a.distanceKm - b.distanceKm)[0] ?? null;
}

export function listVolunteers(): Volunteer[] {
  return DEMO_VOLUNTEERS;
}

/**
 * Prototype only. Future: replace with Supabase volunteer matching.
 * Never claim a real volunteer was contacted in this MVP.
 */
export function notifyNearestVolunteerDemo(): {
  volunteer: Volunteer | null;
  statusLabel: 'Demo Notified';
} {
  return {
    volunteer: getNearestVolunteer(),
    statusLabel: 'Demo Notified',
  };
}

export const volunteerService = {
  list: listVolunteers,
  getNearest: getNearestVolunteer,
  notifyNearestDemo: notifyNearestVolunteerDemo,
};
