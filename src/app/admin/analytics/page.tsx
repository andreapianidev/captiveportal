'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PieChart } from '@/components/charts/PieChart';
import { BarChart } from '@/components/charts/BarChart';
import { Heatmap } from '@/components/charts/Heatmap';
import { storage } from '@/lib/localStorage';
import { Contact } from '@/types';
import { generateContacts, generateHourlyHeatmap } from '@/lib/generators';
import { Smartphone, Monitor, Tablet, Clock, TrendingUp, Lightbulb } from 'lucide-react';

export default function AnalyticsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);
    setIsLoading(false);
  }, []);

  const deviceStats = contacts.reduce((acc, c) => {
    acc[c.device.type] = (acc[c.device.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const osStats = contacts.reduce((acc, c) => {
    acc[c.device.os] = (acc[c.device.os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserStats = contacts.reduce((acc, c) => {
    acc[c.device.browser] = (acc[c.device.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = contacts.length || 1;

  const deviceData = [
    { name: 'Mobile', value: Math.round((deviceStats.mobile || 0) / total * 100) },
    { name: 'Desktop', value: Math.round((deviceStats.desktop || 0) / total * 100) },
    { name: 'Tablet', value: Math.round((deviceStats.tablet || 0) / total * 100) },
  ];

  const osData = Object.entries(osStats)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const browserData = Object.entries(browserStats)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const heatmapData = generateHourlyHeatmap();

  const hourlyDistribution = Array.from({ length: 24 }, (_, hour) => {
    const count = heatmapData.reduce((sum, day) => sum + day[hour], 0);
    return { name: `${hour}:00`, value: count };
  });

  const peakHour = hourlyDistribution.reduce((max, curr) => curr.value > max.value ? curr : max, hourlyDistribution[0]);
  const peakDay = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'][
    heatmapData.reduce((maxIdx, day, idx, arr) => {
      const daySum = day.reduce((a, b) => a + b, 0);
      const maxSum = arr[maxIdx].reduce((a, b) => a + b, 0);
      return daySum > maxSum ? idx : maxIdx;
    }, 0)
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
      {/* Device Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dispositivi</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={deviceData} height={250} showLegend={false} />
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary-500" />
                <span className="text-sm text-gray-600">Mobile {deviceData[0].value}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Desktop {deviceData[1].value}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Tablet className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Tablet {deviceData[2].value}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistemi Operativi</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={osData} height={280} horizontal />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={browserData} height={280} horizontal colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']} />
          </CardContent>
        </Card>
      </div>

      {/* Time Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orari di Punta</CardTitle>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg">
              <Lightbulb className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-primary-700">
                Il tuo orario di punta è <strong>{peakDay}</strong> alle <strong>{peakHour.name}</strong>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Heatmap data={heatmapData} />
        </CardContent>
      </Card>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuzione Accessi per Ora</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={hourlyDistribution} height={300} />
        </CardContent>
      </Card>

      {/* Session Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tempo Medio Sessione</p>
                <p className="text-2xl font-bold text-gray-900">45 min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sessioni per Utente</p>
                <p className="text-2xl font-bold text-gray-900">2.3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dispositivi Unici</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto con Periodo Precedente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Contatti</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              <p className="text-sm text-green-600">+12% vs mese scorso</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Sessioni</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(contacts.length * 2.3)}</p>
              <p className="text-sm text-green-600">+8% vs mese scorso</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Tempo Medio</p>
              <p className="text-2xl font-bold text-gray-900">45 min</p>
              <p className="text-sm text-green-600">+5% vs mese scorso</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Conversione</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <p className="text-sm text-green-600">+3% vs mese scorso</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
