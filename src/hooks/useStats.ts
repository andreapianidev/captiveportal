'use client';

import { useMemo } from 'react';
import { Contact, AccessLog, Stats } from '@/types';
import { calculateStats } from '@/lib/generators';

export function useStats(contacts: Contact[], accessLogs: AccessLog[]): Stats {
  return useMemo(() => {
    if (contacts.length === 0) {
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        conversionRate: 0,
        avgSessionTime: 0,
        dailyData: [],
        hourlyHeatmap: [],
        devices: { mobile: 0, desktop: 0, tablet: 0 },
        os: { iOS: 0, Android: 0, Windows: 0, macOS: 0, other: 0 },
        browsers: { Chrome: 0, Safari: 0, Firefox: 0, Edge: 0, other: 0 },
        topCities: [],
        regions: {},
      };
    }
    return calculateStats(contacts, accessLogs);
  }, [contacts, accessLogs]);
}
