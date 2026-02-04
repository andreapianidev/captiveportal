'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { StatsCard } from '@/components/admin/StatsCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { storage } from '@/lib/localStorage';
import { Contact, AccessLog } from '@/types';
import { generateContacts, generateAccessLogs, generateDailyData } from '@/lib/generators';
import { formatDateTime } from '@/lib/utils';
import { Users, Calendar, TrendingUp, Percent, ArrowRight, Smartphone, Monitor, Tablet } from 'lucide-react';

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);

    let savedLogs = storage.accessLogs.get<AccessLog[]>([]);
    if (savedLogs.length === 0) {
      savedLogs = generateAccessLogs(savedContacts, 3);
      storage.accessLogs.set(savedLogs);
    }
    setAccessLogs(savedLogs);

    setIsLoading(false);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const todayContacts = contacts.filter(c => new Date(c.createdAt) >= today).length;
  const weekContacts = contacts.filter(c => new Date(c.createdAt) >= weekAgo).length;

  const locationStats = contacts.reduce((acc, c) => {
    acc[c.locationName] = (acc[c.locationName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationChartData = Object.entries(locationStats).map(([name, value]) => ({ name, value }));

  const recentContacts = contacts.slice(0, 10);

  const recentActivity = [
    ...contacts.slice(0, 5).map(c => ({
      id: c.id,
      type: 'contact' as const,
      message: `Nuovo contatto: ${c.firstName} ${c.lastName}`,
      time: c.createdAt,
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

  const columns = [
    { key: 'name', header: 'Nome', render: (c: Contact) => `${c.firstName} ${c.lastName}` },
    { key: 'email', header: 'Email' },
    { key: 'locationName', header: 'Sede' },
    { 
      key: 'device', 
      header: 'Dispositivo', 
      render: (c: Contact) => (
        <div className="flex items-center gap-2">
          {c.device.type === 'mobile' && <Smartphone className="w-4 h-4 text-gray-400" />}
          {c.device.type === 'desktop' && <Monitor className="w-4 h-4 text-gray-400" />}
          {c.device.type === 'tablet' && <Tablet className="w-4 h-4 text-gray-400" />}
          <span className="capitalize">{c.device.type}</span>
        </div>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Data', 
      render: (c: Contact) => formatDateTime(c.createdAt)
    },
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
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold">Bentornato, Mario!</h2>
        <p className="text-primary-100 mt-1">Ecco cosa succede oggi nel tuo WiFi Portal.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Contatti Totali"
          value={contacts.length}
          icon={<Users className="w-6 h-6" />}
          trend={12}
          trendLabel="vs mese scorso"
        />
        <StatsCard
          title="Contatti Oggi"
          value={todayContacts}
          icon={<Calendar className="w-6 h-6" />}
        />
        <StatsCard
          title="Contatti Settimana"
          value={weekContacts}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatsCard
          title="Tasso Conversione"
          value={68}
          icon={<Percent className="w-6 h-6" />}
          format="percentage"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Andamento Contatti (30 giorni)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={generateDailyData(30)} height={280} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contatti per Sede</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={locationChartData} height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Contacts & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Ultimi 10 Contatti</h3>
              <Link 
                href="/admin/contacts" 
                className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1"
              >
                Vedi tutti <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Table columns={columns as any} data={recentContacts as any} />
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attività Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.message}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
