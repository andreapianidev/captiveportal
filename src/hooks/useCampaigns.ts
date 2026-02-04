'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/localStorage';
import { Campaign, CampaignFilter } from '@/types';
import { MOCK_CAMPAIGNS } from '@/lib/generators';
import { generateId, getRandomInt } from '@/lib/utils';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCampaigns = storage.campaigns.get<Campaign[]>([]);
    if (savedCampaigns.length === 0) {
      storage.campaigns.set(MOCK_CAMPAIGNS);
      setCampaigns(MOCK_CAMPAIGNS);
    } else {
      setCampaigns(savedCampaigns);
    }
    setIsLoading(false);
  }, []);

  const createCampaign = useCallback((data: {
    name: string;
    subject: string;
    body: string;
    targetFilter: CampaignFilter;
  }) => {
    const newCampaign: Campaign = {
      id: generateId(),
      ...data,
      sentAt: null,
      recipients: 0,
      opened: 0,
      clicked: 0,
      status: 'draft',
    };

    setCampaigns(prev => {
      const updated = [newCampaign, ...prev];
      storage.campaigns.set(updated);
      return updated;
    });

    return newCampaign;
  }, []);

  const updateCampaign = useCallback((id: string, data: Partial<Campaign>) => {
    setCampaigns(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, ...data } : c);
      storage.campaigns.set(updated);
      return updated;
    });
  }, []);

  const sendCampaign = useCallback(async (id: string, recipientCount: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const opened = Math.floor(recipientCount * (getRandomInt(35, 65) / 100));
    const clicked = Math.floor(opened * (getRandomInt(15, 35) / 100));

    setCampaigns(prev => {
      const updated = prev.map(c => c.id === id ? {
        ...c,
        status: 'sent' as const,
        sentAt: new Date().toISOString(),
        recipients: recipientCount,
        opened,
        clicked,
      } : c);
      storage.campaigns.set(updated);
      return updated;
    });
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => {
      const updated = prev.filter(c => c.id !== id);
      storage.campaigns.set(updated);
      return updated;
    });
  }, []);

  return {
    campaigns,
    isLoading,
    createCampaign,
    updateCampaign,
    sendCampaign,
    deleteCampaign,
  };
}
