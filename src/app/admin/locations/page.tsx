'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { BarChart } from '@/components/charts/BarChart';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { Contact, Location } from '@/types';
import { generateContacts } from '@/lib/generators';
import { getDefaultTenant } from '@/data/mockTenants';
import { formatDateTime } from '@/lib/utils';
import { Building2, MapPin, Users, Plus, Settings, Wifi, Clock } from 'lucide-react';

export default function LocationsPage() {
  const { showToast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const tenant = getDefaultTenant();
  const locations = tenant.locations;

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);
    setIsLoading(false);
  }, []);

  const getLocationStats = (locationId: string) => {
    const locationContacts = contacts.filter(c => c.locationId === locationId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayContacts = locationContacts.filter(c => new Date(c.createdAt) >= today);
    const lastContact = locationContacts[0];
    
    return {
      total: locationContacts.length,
      today: todayContacts.length,
      lastAccess: lastContact ? formatDateTime(lastContact.createdAt) : 'N/A',
    };
  };

  const locationChartData = locations.map(loc => ({
    name: loc.name,
    value: contacts.filter(c => c.locationId === loc.id).length,
  }));

  const handleAddLocation = () => {
    showToast('Funzionalità disponibile nella versione completa', 'info');
    setShowAddModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gestione Sedi</h2>
          <p className="text-sm text-gray-500">Gestisci tutte le sedi del tuo locale</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Aggiungi Sede
        </Button>
      </div>

      {/* Location Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {locations.map((location) => {
          const stats = getLocationStats(location.id);
          
          return (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{location.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {location.address}
                      </div>
                    </div>
                  </div>
                  <Badge variant={location.active ? 'success' : 'default'}>
                    {location.active ? 'Attiva' : 'Inattiva'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-500">Contatti Totali</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                    <p className="text-xs text-gray-500">Oggi</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{stats.lastAccess}</p>
                    <p className="text-xs text-gray-500">Ultimo Accesso</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Configura
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => showToast('Apri il portal demo per questa sede', 'info')}
                  >
                    <Wifi className="w-4 h-4 mr-1" />
                    Anteprima Portal
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto Sedi</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={locationChartData} height={300} />
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tabella Comparativa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sede</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Indirizzo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contatti</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">% Totale</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {locations.map((location) => {
                  const stats = getLocationStats(location.id);
                  const percentage = contacts.length > 0 
                    ? ((stats.total / contacts.length) * 100).toFixed(1)
                    : '0';
                  
                  return (
                    <tr key={location.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{location.name}</td>
                      <td className="px-4 py-3 text-gray-600">{location.address}</td>
                      <td className="px-4 py-3 text-gray-900">{stats.total}</td>
                      <td className="px-4 py-3 text-gray-900">{percentage}%</td>
                      <td className="px-4 py-3">
                        <Badge variant={location.active ? 'success' : 'default'}>
                          {location.active ? 'Attiva' : 'Inattiva'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Location Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Aggiungi Nuova Sede"
      >
        <div className="space-y-4">
          <Input label="Nome Sede" placeholder="Es. Sede Nord" required />
          <Input label="Indirizzo" placeholder="Es. Via Milano 10, Torino" required />
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              Nella versione completa potrai configurare il router WiFi e personalizzare il portal per ogni sede.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
              Annulla
            </Button>
            <Button onClick={handleAddLocation} className="flex-1">
              Aggiungi Sede
            </Button>
          </div>
        </div>
      </Modal>

      {/* Location Config Modal */}
      <Modal
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        title={`Configura ${selectedLocation?.name}`}
        size="lg"
      >
        {selectedLocation && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nome Sede" defaultValue={selectedLocation.name} />
              <Input label="Indirizzo" defaultValue={selectedLocation.address} />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Configurazione Router</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">IP Router</p>
                    <p className="font-mono text-gray-900">192.168.1.1</p>
                  </div>
                  <div>
                    <p className="text-gray-500">SSID</p>
                    <p className="font-mono text-gray-900">WiFi-DaMario-{selectedLocation.id.slice(-4)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stato Connessione</p>
                    <Badge variant="success">Connesso</Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Ultimo Sync</p>
                    <p className="text-gray-900">2 minuti fa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Personalizzazione Portal</h4>
              <p className="text-sm text-gray-500 mb-3">
                Puoi personalizzare il portal per questa sede specifica nelle Impostazioni generali.
              </p>
              <Button variant="outline" size="sm">
                Vai alle Impostazioni
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setSelectedLocation(null)} className="flex-1">
                Chiudi
              </Button>
              <Button onClick={() => { showToast('Configurazione salvata', 'success'); setSelectedLocation(null); }} className="flex-1">
                Salva Modifiche
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
