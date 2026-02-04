'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Dropdown } from '@/components/ui/Dropdown';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { Settings } from '@/types';
import { User, Palette, Shield, Bell, Plug, Wifi, Save } from 'lucide-react';

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

I dati saranno conservati per il periodo strettamente necessario alle finalità sopra indicate.`,
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

export default function SettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedSettings = storage.settings.get<Settings | null>(null);
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      storage.settings.set(DEFAULT_SETTINGS);
    }
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    storage.settings.set(settings);
    setIsSaving(false);
    showToast('Impostazioni salvate con successo!', 'success');
  };

  const tabs = [
    { id: 'profile', label: 'Profilo', icon: <User className="w-4 h-4" /> },
    { id: 'portal', label: 'Personalizzazione Portal', icon: <Palette className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy e GDPR', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifiche', icon: <Bell className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrazioni', icon: <Plug className="w-4 h-4" /> },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} defaultTab="profile">
        {(activeTab) => (
          <>
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profilo Azienda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-xl">
                    <Input
                      label="Nome Azienda"
                      value={settings.profile.companyName}
                      onChange={(e) => setSettings(s => ({
                        ...s,
                        profile: { ...s.profile, companyName: e.target.value }
                      }))}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings(s => ({
                        ...s,
                        profile: { ...s.profile, email: e.target.value }
                      }))}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cambio Password
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input type="password" placeholder="Nuova password" />
                        <Input type="password" placeholder="Conferma password" />
                      </div>
                    </div>
                    <Button onClick={handleSave} loading={isSaving}>
                      <Save className="w-4 h-4 mr-1" />
                      Salva Modifiche
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'portal' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalizzazione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input
                        label="Nome Visualizzato"
                        value={settings.portal.displayName}
                        onChange={(e) => setSettings(s => ({
                          ...s,
                          portal: { ...s.portal, displayName: e.target.value }
                        }))}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Wifi className="w-8 h-8 text-gray-400" />
                          </div>
                          <Button variant="outline" size="sm" onClick={() => showToast('Upload disponibile nella versione completa', 'info')}>
                            Carica Logo
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Colore Primario
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.portal.primaryColor}
                              onChange={(e) => setSettings(s => ({
                                ...s,
                                portal: { ...s.portal, primaryColor: e.target.value }
                              }))}
                              className="w-10 h-10 rounded cursor-pointer"
                            />
                            <Input
                              value={settings.portal.primaryColor}
                              onChange={(e) => setSettings(s => ({
                                ...s,
                                portal: { ...s.portal, primaryColor: e.target.value }
                              }))}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Colore Secondario
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={settings.portal.secondaryColor}
                              onChange={(e) => setSettings(s => ({
                                ...s,
                                portal: { ...s.portal, secondaryColor: e.target.value }
                              }))}
                              className="w-10 h-10 rounded cursor-pointer"
                            />
                            <Input
                              value={settings.portal.secondaryColor}
                              onChange={(e) => setSettings(s => ({
                                ...s,
                                portal: { ...s.portal, secondaryColor: e.target.value }
                              }))}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Testo di Benvenuto
                        </label>
                        <textarea
                          value={settings.portal.welcomeText}
                          onChange={(e) => setSettings(s => ({
                            ...s,
                            portal: { ...s.portal, welcomeText: e.target.value }
                          }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Testo Pagina Successo
                        </label>
                        <textarea
                          value={settings.portal.successText}
                          onChange={(e) => setSettings(s => ({
                            ...s,
                            portal: { ...s.portal, successText: e.target.value }
                          }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Messaggio Promozionale
                        </label>
                        <textarea
                          value={settings.portal.promoText}
                          onChange={(e) => setSettings(s => ({
                            ...s,
                            portal: { ...s.portal, promoText: e.target.value }
                          }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <Button onClick={handleSave} loading={isSaving}>
                        <Save className="w-4 h-4 mr-1" />
                        Salva Modifiche
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Anteprima Live</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="rounded-xl p-6 min-h-[400px]"
                      style={{ backgroundColor: settings.portal.secondaryColor }}
                    >
                      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto">
                        <div className="text-center mb-4">
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                            style={{ backgroundColor: settings.portal.primaryColor }}
                          >
                            <Wifi className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">
                            Benvenuto da {settings.portal.displayName}!
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {settings.portal.welcomeText}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="h-10 bg-gray-100 rounded-lg" />
                          <div className="h-10 bg-gray-100 rounded-lg" />
                          <div className="h-10 bg-gray-100 rounded-lg" />
                          <div 
                            className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                            style={{ backgroundColor: settings.portal.primaryColor }}
                          >
                            Connettiti al WiFi
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'privacy' && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy e GDPR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Testo Informativa Privacy
                      </label>
                      <textarea
                        value={settings.privacy.privacyText}
                        onChange={(e) => setSettings(s => ({
                          ...s,
                          privacy: { ...s.privacy, privacyText: e.target.value }
                        }))}
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <Checkbox
                        checked={settings.privacy.requirePhone}
                        onChange={(e) => setSettings(s => ({
                          ...s,
                          privacy: { ...s.privacy, requirePhone: e.target.checked }
                        }))}
                        label="Richiedi numero di telefono (obbligatorio)"
                      />
                      <Checkbox
                        checked={settings.privacy.showMarketingCheckbox}
                        onChange={(e) => setSettings(s => ({
                          ...s,
                          privacy: { ...s.privacy, showMarketingCheckbox: e.target.checked }
                        }))}
                        label="Mostra checkbox consenso marketing"
                      />
                    </div>

                    <Dropdown
                      label="Conservazione Dati"
                      options={[
                        { value: '30', label: '30 giorni' },
                        { value: '90', label: '90 giorni' },
                        { value: '365', label: '1 anno' },
                        { value: '730', label: '2 anni' },
                      ]}
                      value={settings.privacy.dataRetention}
                      onChange={(v) => setSettings(s => ({
                        ...s,
                        privacy: { ...s.privacy, dataRetention: v as any }
                      }))}
                    />

                    <Button onClick={handleSave} loading={isSaving}>
                      <Save className="w-4 h-4 mr-1" />
                      Salva Modifiche
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifiche</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-w-xl">
                    <Checkbox
                      checked={settings.notifications.dailySummary}
                      onChange={(e) => setSettings(s => ({
                        ...s,
                        notifications: { ...s.notifications, dailySummary: e.target.checked }
                      }))}
                      label="Email giornaliera con riepilogo contatti"
                    />
                    <Checkbox
                      checked={settings.notifications.newContactAlert}
                      onChange={(e) => setSettings(s => ({
                        ...s,
                        notifications: { ...s.notifications, newContactAlert: e.target.checked }
                      }))}
                      label="Notifica per ogni nuovo contatto"
                    />
                    <Checkbox
                      checked={settings.notifications.anomalyAlert}
                      onChange={(e) => setSettings(s => ({
                        ...s,
                        notifications: { ...s.notifications, anomalyAlert: e.target.checked }
                      }))}
                      label="Alert per accessi anomali"
                    />

                    <Button onClick={handleSave} loading={isSaving}>
                      <Save className="w-4 h-4 mr-1" />
                      Salva Modifiche
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle>Integrazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Mailchimp', description: 'Sincronizza i contatti con Mailchimp' },
                      { name: 'Google Sheets', description: 'Esporta automaticamente in Google Sheets' },
                      { name: 'Zapier', description: 'Connetti con oltre 5000 app' },
                    ].map((integration) => (
                      <div 
                        key={integration.name}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">Non connesso</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => showToast('Funzionalità disponibile nella versione completa', 'info')}
                          >
                            Connetti
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
