/**
 * Static institutional dashboard demo data.
 * Future: replace with authenticated Supabase queries scoped by partner role and region.
 * Never treat these records as live incidents or real organizations.
 */
import type {
  AreaVolume,
  CategoryShare,
  DashboardSummary,
  DemoIncident,
  DemoRegion,
  SupportPartner,
  WeeklyReport,
} from '../types/admin';

export const DEMO_REGIONS: DemoRegion[] = ['Hargeisa', 'Mogadishu', 'Nairobi', 'Dadaab'];

export const DEMO_SUMMARY: DashboardSummary = {
  openAlerts: 3,
  awaitingAcknowledgment: 1,
  verifiedPartners: 12,
  averageAckMinutes: 6,
};

export const DEMO_INCIDENTS: DemoIncident[] = [
  {
    id: 'inc-1042',
    referenceId: 'CI-1042',
    generalArea: 'Hargeisa Central',
    region: 'Hargeisa',
    receivedAt: 'Today · 14:22',
    alertType: 'Personal safety',
    assignedOrganization: 'Women’s support organization',
    status: 'Responding',
    priority: 'High',
    supportRequested: ['Trusted-person contact', 'Safety guidance'],
    assignedResponder: 'On-call safeguarding coordinator (demo)',
    followUpRequired: 'Confirm safe arrival at preferred support space.',
    timeline: [
      { time: '14:22', label: 'Alert received (anonymized)' },
      { time: '14:24', label: 'Routed to partner queue' },
      { time: '14:28', label: 'Partner acknowledged' },
      { time: '14:31', label: 'Support in progress' },
    ],
    statusUpdates: [
      'Responder assigned — demo only',
      'No exact location shared beyond general area',
      'Follow-up check scheduled',
    ],
  },
  {
    id: 'inc-1041',
    referenceId: 'CI-1041',
    generalArea: 'Dadaab Area 2',
    region: 'Dadaab',
    receivedAt: 'Today · 13:05',
    alertType: 'Online coercion',
    assignedOrganization: 'Safeguarding officer',
    status: 'Awaiting acknowledgment',
    priority: 'High',
    supportRequested: ['Counseling referral', 'Digital-safety guidance'],
    assignedResponder: 'Pending acknowledgment (demo)',
    followUpRequired: 'Escalate if unacknowledged after policy threshold.',
    timeline: [
      { time: '13:05', label: 'Alert received (anonymized)' },
      { time: '13:07', label: 'Queued for safeguarding officer' },
      { time: '13:18', label: 'Awaiting acknowledgment' },
    ],
    statusUpdates: [
      'High priority queue — demo only',
      'No personal identifiers shown',
    ],
  },
  {
    id: 'inc-1039',
    referenceId: 'CI-1039',
    generalArea: 'Mogadishu District',
    region: 'Mogadishu',
    receivedAt: 'Yesterday · 19:40',
    alertType: 'Scam / impersonation',
    assignedOrganization: 'Digital-safety team',
    status: 'Follow-up',
    priority: 'Medium',
    supportRequested: ['Safety guidance', 'Trusted-person contact'],
    assignedResponder: 'Digital-safety advisor (demo)',
    followUpRequired: 'Share scam-prevention tip sheet and close when ready.',
    timeline: [
      { time: 'Yesterday 19:40', label: 'Alert received (anonymized)' },
      { time: 'Yesterday 19:55', label: 'Partner acknowledged' },
      { time: 'Yesterday 20:20', label: 'Initial guidance provided' },
      { time: 'Today 09:10', label: 'Follow-up pending' },
    ],
    statusUpdates: [
      'Initial response completed — demo only',
      'Case held for soft follow-up',
    ],
  },
];

export const DEMO_SUPPORT_PARTNERS: SupportPartner[] = [
  {
    id: 'sp-1',
    name: 'Hargeisa Women’s Rights Collective',
    role: 'Women’s rights organization',
    serviceArea: 'Hargeisa',
    categories: ['Advocacy', 'Safe referral'],
    verified: true,
    availability: 'Available',
  },
  {
    id: 'sp-2',
    name: 'Psychosocial Support Desk',
    role: 'Psychosocial counselor',
    serviceArea: 'Hargeisa · Mogadishu',
    categories: ['Counseling', 'Trauma-informed care'],
    verified: true,
    availability: 'Busy',
  },
  {
    id: 'sp-3',
    name: 'District Safeguarding Office',
    role: 'Safeguarding officer',
    serviceArea: 'Dadaab Area 2',
    categories: ['Case coordination', 'Escalation'],
    verified: true,
    availability: 'Available',
  },
  {
    id: 'sp-4',
    name: 'Community Health Clinic',
    role: 'Clinic',
    serviceArea: 'Mogadishu District',
    categories: ['Medical referral', 'Confidential care'],
    verified: true,
    availability: 'Available',
  },
  {
    id: 'sp-5',
    name: 'School Safeguarding Lead Network',
    role: 'School safeguarding lead',
    serviceArea: 'Nairobi · Hargeisa',
    categories: ['Youth safety', 'Parent liaison'],
    verified: true,
    availability: 'Offline',
  },
  {
    id: 'sp-6',
    name: 'Neighborhood Community Responders',
    role: 'Community responder',
    serviceArea: 'Hargeisa Central',
    categories: ['Rapid accompaniment', 'Local knowledge'],
    verified: false,
    availability: 'Available',
  },
  {
    id: 'sp-7',
    name: 'Quiet Corner Safe Space',
    role: 'Safe space',
    serviceArea: 'Nairobi',
    categories: ['Temporary shelter referral', 'Peer support'],
    verified: true,
    availability: 'Available',
  },
];

export const DEMO_CATEGORY_SHARES: CategoryShare[] = [
  { label: 'Online harassment', percent: 34 },
  { label: 'Scams and impersonation', percent: 27 },
  { label: 'Coercion or blackmail', percent: 18 },
  { label: 'Physical safety concern', percent: 13 },
  { label: 'Other', percent: 8 },
];

export const DEMO_WEEKLY_REPORTS: WeeklyReport[] = [
  { weekLabel: 'W1', count: 12 },
  { weekLabel: 'W2', count: 18 },
  { weekLabel: 'W3', count: 15 },
  { weekLabel: 'W4', count: 22 },
  { weekLabel: 'W5', count: 19 },
  { weekLabel: 'W6', count: 24 },
];

export const DEMO_FREQUENT_NEEDS = [
  'Safety guidance',
  'Trusted-person contact',
  'Counseling referral',
  'Safe-space referral',
];

export const DEMO_AREA_VOLUME: AreaVolume[] = [
  { area: 'Hargeisa Central', relativeVolume: 'Higher', barPercent: 88 },
  { area: 'Mogadishu District', relativeVolume: 'Moderate', barPercent: 62 },
  { area: 'Dadaab Area 2', relativeVolume: 'Moderate', barPercent: 55 },
  { area: 'Nairobi East', relativeVolume: 'Lower', barPercent: 34 },
];

export const LAUNCH_QUESTIONS = [
  'Who is authorized to receive an alert?',
  'What consent is required?',
  'How are organizations and responders verified?',
  'How are false, malicious, or unsafe reports handled?',
  'How long is incident data retained?',
  'What is the escalation process when emergency services are unavailable?',
];

export function incidentsForRegion(region: DemoRegion): DemoIncident[] {
  // Future: server-side filter by partner authorization + region scope.
  const filtered = DEMO_INCIDENTS.filter((incident) => incident.region === region);
  return filtered.length > 0 ? filtered : DEMO_INCIDENTS;
}
