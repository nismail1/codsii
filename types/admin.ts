export type DemoRegion = 'Hargeisa' | 'Mogadishu' | 'Nairobi' | 'Dadaab';

export type IncidentPriority = 'High' | 'Medium' | 'Low';

export type IncidentStatus =
  | 'Responding'
  | 'Awaiting acknowledgment'
  | 'Follow-up'
  | 'Resolved';

export type DemoIncident = {
  id: string;
  referenceId: string;
  generalArea: string;
  region: DemoRegion;
  receivedAt: string;
  alertType: string;
  assignedOrganization: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  supportRequested: string[];
  assignedResponder: string;
  followUpRequired: string;
  timeline: { time: string; label: string }[];
  statusUpdates: string[];
};

export type SupportPartner = {
  id: string;
  name: string;
  role: string;
  serviceArea: string;
  categories: string[];
  verified: boolean;
  availability: 'Available' | 'Busy' | 'Offline';
};

export type CategoryShare = {
  label: string;
  percent: number;
};

export type WeeklyReport = {
  weekLabel: string;
  count: number;
};

export type AreaVolume = {
  area: string;
  relativeVolume: 'Higher' | 'Moderate' | 'Lower';
  barPercent: number;
};

export type DashboardSummary = {
  openAlerts: number;
  awaitingAcknowledgment: number;
  verifiedPartners: number;
  averageAckMinutes: number;
};
