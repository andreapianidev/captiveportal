'use client';

const STORAGE_KEYS = {
  CONTACTS: 'captive_portal_contacts',
  ACCESS_LOGS: 'captive_portal_access_logs',
  CAMPAIGNS: 'captive_portal_campaigns',
  SETTINGS: 'captive_portal_settings',
  AUTH: 'captive_portal_auth',
} as const;

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export const storage = {
  contacts: {
    get: <T>(defaultValue: T) => getItem(STORAGE_KEYS.CONTACTS, defaultValue),
    set: <T>(value: T) => setItem(STORAGE_KEYS.CONTACTS, value),
    clear: () => removeItem(STORAGE_KEYS.CONTACTS),
  },
  accessLogs: {
    get: <T>(defaultValue: T) => getItem(STORAGE_KEYS.ACCESS_LOGS, defaultValue),
    set: <T>(value: T) => setItem(STORAGE_KEYS.ACCESS_LOGS, value),
    clear: () => removeItem(STORAGE_KEYS.ACCESS_LOGS),
  },
  campaigns: {
    get: <T>(defaultValue: T) => getItem(STORAGE_KEYS.CAMPAIGNS, defaultValue),
    set: <T>(value: T) => setItem(STORAGE_KEYS.CAMPAIGNS, value),
    clear: () => removeItem(STORAGE_KEYS.CAMPAIGNS),
  },
  settings: {
    get: <T>(defaultValue: T) => getItem(STORAGE_KEYS.SETTINGS, defaultValue),
    set: <T>(value: T) => setItem(STORAGE_KEYS.SETTINGS, value),
    clear: () => removeItem(STORAGE_KEYS.SETTINGS),
  },
  auth: {
    get: <T>(defaultValue: T) => getItem(STORAGE_KEYS.AUTH, defaultValue),
    set: <T>(value: T) => setItem(STORAGE_KEYS.AUTH, value),
    clear: () => removeItem(STORAGE_KEYS.AUTH),
  },
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(removeItem);
  },
};
