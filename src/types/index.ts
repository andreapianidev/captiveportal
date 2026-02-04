export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeText: string;
  successText: string;
  promoText: string;
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  active: boolean;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  locationId: string;
  locationName: string;
  marketingConsent: boolean;
  privacyConsent: boolean;
  device: DeviceInfo;
  city: string;
  region: string;
  createdAt: string;
}

export interface DeviceInfo {
  type: 'mobile' | 'desktop' | 'tablet';
  os: string;
  browser: string;
  userAgent: string;
}

export interface AccessLog {
  id: string;
  contactId: string;
  contactEmail: string;
  contactName: string;
  locationId: string;
  locationName: string;
  event: 'login' | 'logout' | 'renewal';
  device: DeviceInfo;
  ip: string;
  duration: number; // minutes
  status: 'success' | 'failed';
  timestamp: string;
}

export interface Campaign {
  id: string;
  name: string;
  subject: string;
  body: string;
  sentAt: string | null;
  recipients: number;
  opened: number;
  clicked: number;
  status: 'draft' | 'sent' | 'scheduled';
  scheduledFor?: string;
  targetFilter: CampaignFilter;
}

export interface CampaignFilter {
  allContacts: boolean;
  marketingConsentOnly: boolean;
  locationIds: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  conversionRate: number;
  avgSessionTime: number;
  dailyData: DailyData[];
  hourlyHeatmap: number[][];
  devices: DeviceStats;
  os: OSStats;
  browsers: BrowserStats;
  topCities: CityStats[];
  regions: Record<string, number>;
}

export interface DailyData {
  date: string;
  contacts: number;
}

export interface DeviceStats {
  mobile: number;
  desktop: number;
  tablet: number;
}

export interface OSStats {
  iOS: number;
  Android: number;
  Windows: number;
  macOS: number;
  other: number;
}

export interface BrowserStats {
  Chrome: number;
  Safari: number;
  Firefox: number;
  Edge: number;
  other: number;
}

export interface CityStats {
  city: string;
  region: string;
  count: number;
  percentage: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  tenantId: string;
}

export interface Settings {
  profile: ProfileSettings;
  portal: PortalSettings;
  privacy: PrivacySettings;
  notifications: NotificationSettings;
}

export interface ProfileSettings {
  companyName: string;
  email: string;
}

export interface PortalSettings {
  displayName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeText: string;
  successText: string;
  promoText: string;
}

export interface PrivacySettings {
  privacyText: string;
  requirePhone: boolean;
  showMarketingCheckbox: boolean;
  dataRetention: '30' | '90' | '365' | '730';
}

export interface NotificationSettings {
  dailySummary: boolean;
  newContactAlert: boolean;
  anomalyAlert: boolean;
}
