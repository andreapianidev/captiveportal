import { Contact, AccessLog, DeviceInfo, Campaign, DailyData } from '@/types';
import { FIRST_NAMES, LAST_NAMES, EMAIL_PROVIDERS } from '@/data/italianNames';
import { getWeightedRandomCity } from '@/data/italianCities';
import { generateId, getRandomInt, getRandomElement, randomDateInRange, daysAgo, generateFakeIP } from './utils';

const OS_OPTIONS = [
  { name: 'iOS', weight: 38 },
  { name: 'Android', weight: 34 },
  { name: 'Windows', weight: 18 },
  { name: 'macOS', weight: 8 },
  { name: 'Linux', weight: 2 },
];

const BROWSER_OPTIONS = [
  { name: 'Chrome', weight: 45 },
  { name: 'Safari', weight: 35 },
  { name: 'Firefox', weight: 10 },
  { name: 'Edge', weight: 8 },
  { name: 'Opera', weight: 2 },
];

const DEVICE_OPTIONS = [
  { type: 'mobile' as const, weight: 70 },
  { type: 'desktop' as const, weight: 25 },
  { type: 'tablet' as const, weight: 5 },
];

function getWeightedRandom<T>(options: { name?: string; type?: T; weight: number }[]): string | T {
  const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const opt of options) {
    random -= opt.weight;
    if (random <= 0) {
      return opt.name || opt.type!;
    }
  }
  
  return options[0].name || options[0].type!;
}

function generateDeviceInfo(): DeviceInfo {
  const type = getWeightedRandom(DEVICE_OPTIONS) as 'mobile' | 'desktop' | 'tablet';
  const os = getWeightedRandom(OS_OPTIONS) as string;
  const browser = getWeightedRandom(BROWSER_OPTIONS) as string;
  
  return {
    type,
    os,
    browser,
    userAgent: `Mozilla/5.0 (${os}) ${browser}/100.0`,
  };
}

function generateEmail(firstName: string, lastName: string): string {
  const provider = getRandomElement(EMAIL_PROVIDERS);
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${provider}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}@${provider}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1, 99)}@${provider}`,
    `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}@${provider}`,
  ];
  return getRandomElement(formats).replace(/'/g, '').replace(/ /g, '');
}

function generatePhone(): string {
  const prefixes = ['320', '328', '329', '330', '331', '333', '334', '335', '336', '337', '338', '339', '340', '347', '348', '349', '350', '360', '366', '368'];
  const prefix = getRandomElement(prefixes);
  const number = getRandomInt(1000000, 9999999);
  return `${prefix} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`;
}

export function generateContacts(count: number = 250): Contact[] {
  const contacts: Contact[] = [];
  const locations = [
    { id: 'loc-1', name: 'Sede Centro' },
    { id: 'loc-2', name: 'Sede Mare' },
  ];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    const cityData = getWeightedRandomCity();
    const location = Math.random() < 0.6 ? locations[0] : locations[1];
    const createdAt = randomDateInRange(daysAgo(60), new Date());
    
    contacts.push({
      id: generateId(),
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      phone: Math.random() < 0.7 ? generatePhone() : undefined,
      locationId: location.id,
      locationName: location.name,
      marketingConsent: Math.random() < 0.65,
      privacyConsent: true,
      device: generateDeviceInfo(),
      city: cityData.city,
      region: cityData.region,
      createdAt: createdAt.toISOString(),
    });
  }
  
  return contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function generateAccessLogs(contacts: Contact[], logsPerContact: number = 3): AccessLog[] {
  const logs: AccessLog[] = [];
  const events: ('login' | 'logout' | 'renewal')[] = ['login', 'logout', 'renewal'];
  
  for (const contact of contacts) {
    const numLogs = getRandomInt(1, logsPerContact * 2);
    const contactDate = new Date(contact.createdAt);
    
    for (let i = 0; i < numLogs; i++) {
      const timestamp = randomDateInRange(contactDate, new Date());
      const isSuccess = Math.random() < 0.98;
      
      logs.push({
        id: generateId(),
        contactId: contact.id,
        contactEmail: contact.email,
        contactName: `${contact.firstName} ${contact.lastName}`,
        locationId: contact.locationId,
        locationName: contact.locationName,
        event: getRandomElement(events),
        device: contact.device,
        ip: generateFakeIP(),
        duration: isSuccess ? getRandomInt(5, 120) : 0,
        status: isSuccess ? 'success' : 'failed',
        timestamp: timestamp.toISOString(),
      });
    }
  }
  
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function generateDailyData(days: number = 30): DailyData[] {
  const data: DailyData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = daysAgo(i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseContacts = isWeekend ? getRandomInt(15, 35) : getRandomInt(8, 25);
    
    data.push({
      date: date.toISOString().split('T')[0],
      contacts: baseContacts,
    });
  }
  
  return data;
}

export function generateHourlyHeatmap(): number[][] {
  const heatmap: number[][] = [];
  
  for (let day = 0; day < 7; day++) {
    const dayData: number[] = [];
    for (let hour = 0; hour < 24; hour++) {
      let value = 0;
      
      if (hour >= 12 && hour <= 14) value = getRandomInt(5, 15);
      else if (hour >= 19 && hour <= 22) value = getRandomInt(10, 25);
      else if (hour >= 8 && hour <= 23) value = getRandomInt(1, 8);
      
      if (day === 5 || day === 6) value = Math.floor(value * 1.5);
      
      dayData.push(value);
    }
    heatmap.push(dayData);
  }
  
  return heatmap;
}

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Newsletter Gennaio',
    subject: 'Le novità del mese da Mario!',
    body: 'Caro cliente, scopri tutte le novità del nostro menu di gennaio...',
    sentAt: '2026-01-10T10:00:00Z',
    recipients: 450,
    opened: 180,
    clicked: 45,
    status: 'sent',
    targetFilter: { allContacts: true, marketingConsentOnly: true, locationIds: [] },
  },
  {
    id: 'camp-2',
    name: 'Promo San Valentino',
    subject: '❤️ Menu speciale per San Valentino',
    body: 'Festeggia San Valentino con noi! Menu degustazione per due a soli 59€...',
    sentAt: '2026-02-01T09:00:00Z',
    recipients: 520,
    opened: 312,
    clicked: 89,
    status: 'sent',
    targetFilter: { allContacts: true, marketingConsentOnly: true, locationIds: [] },
  },
  {
    id: 'camp-3',
    name: 'Bozza Primavera',
    subject: 'La primavera è arrivata!',
    body: 'Scopri i nuovi piatti di stagione...',
    sentAt: null,
    recipients: 0,
    opened: 0,
    clicked: 0,
    status: 'draft',
    targetFilter: { allContacts: true, marketingConsentOnly: false, locationIds: [] },
  },
];

export function calculateStats(contacts: Contact[], accessLogs: AccessLog[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = daysAgo(7);
  const monthAgo = daysAgo(30);
  
  const todayContacts = contacts.filter(c => new Date(c.createdAt) >= today).length;
  const weekContacts = contacts.filter(c => new Date(c.createdAt) >= weekAgo).length;
  const monthContacts = contacts.filter(c => new Date(c.createdAt) >= monthAgo).length;
  
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  const osCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const cityCounts: Record<string, { city: string; region: string; count: number }> = {};
  const regionCounts: Record<string, number> = {};
  
  contacts.forEach(contact => {
    deviceCounts[contact.device.type]++;
    osCounts[contact.device.os] = (osCounts[contact.device.os] || 0) + 1;
    browserCounts[contact.device.browser] = (browserCounts[contact.device.browser] || 0) + 1;
    
    if (!cityCounts[contact.city]) {
      cityCounts[contact.city] = { city: contact.city, region: contact.region, count: 0 };
    }
    cityCounts[contact.city].count++;
    
    regionCounts[contact.region] = (regionCounts[contact.region] || 0) + 1;
  });
  
  const totalDevices = deviceCounts.mobile + deviceCounts.desktop + deviceCounts.tablet;
  const successfulLogs = accessLogs.filter(l => l.status === 'success');
  const avgSessionTime = successfulLogs.length > 0 
    ? Math.round(successfulLogs.reduce((sum, l) => sum + l.duration, 0) / successfulLogs.length)
    : 45;
  
  const topCities = Object.values(cityCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map(c => ({
      ...c,
      percentage: Math.round((c.count / contacts.length) * 100 * 10) / 10,
    }));
  
  return {
    total: contacts.length,
    today: todayContacts,
    thisWeek: weekContacts,
    thisMonth: monthContacts,
    conversionRate: 68,
    avgSessionTime,
    dailyData: generateDailyData(30),
    hourlyHeatmap: generateHourlyHeatmap(),
    devices: {
      mobile: Math.round((deviceCounts.mobile / totalDevices) * 100),
      desktop: Math.round((deviceCounts.desktop / totalDevices) * 100),
      tablet: Math.round((deviceCounts.tablet / totalDevices) * 100),
    },
    os: {
      iOS: osCounts['iOS'] || 0,
      Android: osCounts['Android'] || 0,
      Windows: osCounts['Windows'] || 0,
      macOS: osCounts['macOS'] || 0,
      other: (osCounts['Linux'] || 0) + (osCounts['other'] || 0),
    },
    browsers: {
      Chrome: browserCounts['Chrome'] || 0,
      Safari: browserCounts['Safari'] || 0,
      Firefox: browserCounts['Firefox'] || 0,
      Edge: browserCounts['Edge'] || 0,
      other: (browserCounts['Opera'] || 0) + (browserCounts['other'] || 0),
    },
    topCities,
    regions: regionCounts,
  };
}
