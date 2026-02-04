'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/localStorage';
import { Settings, PortalSettings, PrivacySettings, NotificationSettings, ProfileSettings } from '@/types';

const DEFAULT_SETTINGS: Settings = {
  profile: {
    companyName: 'Ristorante Da Mario',
    email: 'demo@esempio.it',
  },
  portal: {
    displayName: 'Ristorante Da Mario',
    logo: '/images/logo-mario.png',
    primaryColor: '#1E3A5F',
    secondaryColor: '#E8F0F7',
    welcomeText: 'Benvenuto da Mario! Inserisci i tuoi dati per navigare gratis.',
    successText: 'Buona navigazione!',
    promoText: 'Scopri il menu del giorno! Mostra questa schermata per un caffè omaggio.',
  },
  privacy: {
    privacyText: `Informativa sulla Privacy

Ai sensi del Regolamento UE 2016/679 (GDPR), La informiamo che i dati personali da Lei forniti saranno trattati per le seguenti finalità:

1. Erogazione del servizio WiFi gratuito
2. Comunicazioni di servizio relative all'utilizzo del WiFi
3. Previo Suo consenso, invio di comunicazioni promozionali e marketing

I dati saranno conservati per il periodo strettamente necessario alle finalità sopra indicate e comunque non oltre 24 mesi dalla raccolta.

Lei ha diritto di accedere ai Suoi dati, richiederne la rettifica, la cancellazione, la limitazione del trattamento, nonché di opporsi al trattamento e di esercitare il diritto alla portabilità dei dati.

Per esercitare i Suoi diritti può contattarci all'indirizzo email: privacy@esempio.it`,
    requirePhone: false,
    showMarketingCheckbox: true,
    dataRetention: '365',
  },
  notifications: {
    dailySummary: true,
    newContactAlert: true,
    anomalyAlert: false,
  },
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSettings = storage.settings.get<Settings | null>(null);
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      storage.settings.set(DEFAULT_SETTINGS);
    }
    setIsLoading(false);
  }, []);

  const updateProfile = useCallback((data: Partial<ProfileSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, profile: { ...prev.profile, ...data } };
      storage.settings.set(updated);
      return updated;
    });
  }, []);

  const updatePortal = useCallback((data: Partial<PortalSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, portal: { ...prev.portal, ...data } };
      storage.settings.set(updated);
      return updated;
    });
  }, []);

  const updatePrivacy = useCallback((data: Partial<PrivacySettings>) => {
    setSettings(prev => {
      const updated = { ...prev, privacy: { ...prev.privacy, ...data } };
      storage.settings.set(updated);
      return updated;
    });
  }, []);

  const updateNotifications = useCallback((data: Partial<NotificationSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, notifications: { ...prev.notifications, ...data } };
      storage.settings.set(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    storage.settings.set(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isLoading,
    updateProfile,
    updatePortal,
    updatePrivacy,
    updateNotifications,
    resetSettings,
  };
}
