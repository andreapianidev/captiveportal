'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/localStorage';
import { AccessLog, Contact } from '@/types';
import { generateAccessLogs } from '@/lib/generators';

export function useAccessLogs(contacts: Contact[]) {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contacts.length === 0) return;
    
    const savedLogs = storage.accessLogs.get<AccessLog[]>([]);
    if (savedLogs.length === 0) {
      const mockLogs = generateAccessLogs(contacts, 3);
      storage.accessLogs.set(mockLogs);
      setAccessLogs(mockLogs);
    } else {
      setAccessLogs(savedLogs);
    }
    setIsLoading(false);
  }, [contacts]);

  const addAccessLog = useCallback((log: AccessLog) => {
    setAccessLogs(prev => {
      const updated = [log, ...prev];
      storage.accessLogs.set(updated);
      return updated;
    });
  }, []);

  const filterLogs = useCallback((filters: {
    locationId?: string;
    event?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    return accessLogs.filter(log => {
      if (filters.locationId && filters.locationId !== 'all') {
        if (log.locationId !== filters.locationId) return false;
      }

      if (filters.event && filters.event !== 'all') {
        if (log.event !== filters.event) return false;
      }

      if (filters.status && filters.status !== 'all') {
        if (log.status !== filters.status) return false;
      }

      if (filters.dateFrom) {
        if (new Date(log.timestamp) < new Date(filters.dateFrom)) return false;
      }

      if (filters.dateTo) {
        if (new Date(log.timestamp) > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }, [accessLogs]);

  const getLogsByContactId = useCallback((contactId: string) => {
    return accessLogs.filter(log => log.contactId === contactId);
  }, [accessLogs]);

  return {
    accessLogs,
    isLoading,
    addAccessLog,
    filterLogs,
    getLogsByContactId,
  };
}
