'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { BarChart } from '@/components/charts/BarChart';
import { storage } from '@/lib/localStorage';
import { Contact } from '@/types';
import { generateContacts } from '@/lib/generators';
import { ITALIAN_REGIONS } from '@/data/italianCities';
import { MapPin, Users, TrendingUp } from 'lucide-react';

export default function GeographyPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);
    setIsLoading(false);
  }, []);

  const regionStats = contacts.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cityStats = contacts.reduce((acc, c) => {
    const key = `${c.city}|${c.region}`;
    if (!acc[key]) {
      acc[key] = { city: c.city, region: c.region, count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { city: string; region: string; count: number }>);

  const topCities = Object.values(cityStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map((c, i) => ({
      ...c,
      id: `city-${i}`,
      percentage: ((c.count / contacts.length) * 100).toFixed(1),
    }));

  const topRegions = Object.entries(regionStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const filteredCities = selectedRegion
    ? topCities.filter(c => c.region === selectedRegion)
    : topCities;

  const localVsTourist = {
    local: Math.round(contacts.length * 0.65),
    tourist: Math.round(contacts.length * 0.35),
  };

  const columns = [
    { key: 'city', header: 'Città' },
    { key: 'region', header: 'Regione' },
    { key: 'count', header: 'Contatti', render: (c: any) => c.count.toLocaleString('it-IT') },
    { key: 'percentage', header: '% Totale', render: (c: any) => `${c.percentage}%` },
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
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Regioni Coperte</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(regionStats).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Clienti Locali</p>
                <p className="text-2xl font-bold text-gray-900">{localVsTourist.local} (65%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Turisti</p>
                <p className="text-2xl font-bold text-gray-900">{localVsTourist.tourist} (35%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map and Regions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Italy Map Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Mappa Italia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {ITALIAN_REGIONS.map((region) => {
                const count = regionStats[region] || 0;
                const maxCount = Math.max(...Object.values(regionStats));
                const intensity = count / maxCount;
                
                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedRegion === region
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: selectedRegion === region 
                        ? undefined 
                        : `rgba(30, 58, 95, ${Math.max(0.1, intensity * 0.8)})`,
                    }}
                  >
                    <p className={`text-xs font-medium truncate ${intensity > 0.5 ? 'text-white' : 'text-gray-700'}`}>
                      {region}
                    </p>
                    <p className={`text-lg font-bold ${intensity > 0.5 ? 'text-white' : 'text-gray-900'}`}>
                      {count}
                    </p>
                  </button>
                );
              })}
            </div>
            {selectedRegion && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  Filtro attivo: <strong>{selectedRegion}</strong>
                  <button 
                    onClick={() => setSelectedRegion(null)}
                    className="ml-2 text-primary-500 hover:underline"
                  >
                    Rimuovi
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Regions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Regioni</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={topRegions} height={350} horizontal />
          </CardContent>
        </Card>
      </div>

      {/* Top Cities Table */}
      <Card padding="none">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Città {selectedRegion && `- ${selectedRegion}`}
          </h3>
        </div>
        <Table
          columns={columns as any}
          data={filteredCities as any}
          getRowId={(c: any) => c.id}
        />
      </Card>

      {/* Local vs Tourist */}
      <Card>
        <CardHeader>
          <CardTitle>Locali vs Turisti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Clienti Locali</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Turisti</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Basato su pattern di accesso: clienti con accessi multipli sono considerati locali.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
