'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/localStorage';
import { Contact, DeviceInfo } from '@/types';
import { generateContacts } from '@/lib/generators';
import { generateId } from '@/lib/utils';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      const mockContacts = generateContacts(250);
      storage.contacts.set(mockContacts);
      setContacts(mockContacts);
    } else {
      setContacts(savedContacts);
    }
    setIsLoading(false);
  }, []);

  const addContact = useCallback((contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    locationId: string;
    locationName: string;
    marketingConsent: boolean;
    city: string;
    region: string;
    device: DeviceInfo;
  }) => {
    const newContact: Contact = {
      id: generateId(),
      ...contactData,
      privacyConsent: true,
      createdAt: new Date().toISOString(),
    };

    setContacts(prev => {
      const updated = [newContact, ...prev];
      storage.contacts.set(updated);
      return updated;
    });

    return newContact;
  }, []);

  const deleteContacts = useCallback((ids: string[]) => {
    setContacts(prev => {
      const updated = prev.filter(c => !ids.includes(c.id));
      storage.contacts.set(updated);
      return updated;
    });
  }, []);

  const getContactById = useCallback((id: string) => {
    return contacts.find(c => c.id === id);
  }, [contacts]);

  const filterContacts = useCallback((filters: {
    search?: string;
    locationId?: string;
    marketingConsent?: boolean | null;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    return contacts.filter(contact => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          contact.firstName.toLowerCase().includes(searchLower) ||
          contact.lastName.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.locationId && filters.locationId !== 'all') {
        if (contact.locationId !== filters.locationId) return false;
      }

      if (filters.marketingConsent !== null && filters.marketingConsent !== undefined) {
        if (contact.marketingConsent !== filters.marketingConsent) return false;
      }

      if (filters.dateFrom) {
        if (new Date(contact.createdAt) < new Date(filters.dateFrom)) return false;
      }

      if (filters.dateTo) {
        if (new Date(contact.createdAt) > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }, [contacts]);

  return {
    contacts,
    isLoading,
    addContact,
    deleteContacts,
    getContactById,
    filterContacts,
  };
}
