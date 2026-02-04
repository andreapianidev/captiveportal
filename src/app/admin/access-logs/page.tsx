'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { storage } from '@/lib/localStorage';
import { Contact, AccessLog } from '@/types';
import { generateContacts, generateAccessLogs } from '@/lib/generators';
import { formatDateTime } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, AlertTriangle, Smartphone, Monitor, Tablet } from 'lucide-react';

const ITEMS_PER_PAGE = 25;

export default function AccessLogsPage() {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    locationId: 'all',
    event: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }

    let savedLogs = storage.accessLogs.get<AccessLog[]>([]);
    if (savedLogs.length === 0) {
      savedLogs = generateAccessLogs(savedContacts, 3);
      storage.accessLogs.set(savedLogs);
    }
    setAccessLogs(savedLogs);
    setIsLoading(false);
  }, []);

  const filteredLogs = useMemo(() => {
    return accessLogs.filter(log => {
      if (filters.locationId !== 'all' && log.locationId !== filters.locationId) {
        return false;
      }
      if (filters.event !== 'all' && log.event !== filters.event) {
        return false;
      }
      if (filters.status !== 'all' && log.status !== filters.status) {
        return false;
      }
      if (filters.dateFrom && new Date(log.timestamp) < new Date(filters.dateFrom)) {
        return false;
      }
      if (filters.dateTo && new Date(log.timestamp) > new Date(filters.dateTo)) {
        return false;
      }
      return true;
    });
  }, [accessLogs, filters]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLogs = accessLogs.filter(l => new Date(l.timestamp) >= today);
  const failedToday = todayLogs.filter(l => l.status === 'failed').length;
  const successfulLogs = accessLogs.filter(l => l.status === 'success');
  const avgDuration = successfulLogs.length > 0
    ? Math.round(successfulLogs.reduce((sum, l) => sum + l.duration, 0) / successfulLogs.length)
    : 0;

  const columns = [
    {
      key: 'timestamp',
      header: 'Data/Ora',
      sortable: true,
      render: (l: AccessLog) => formatDateTime(l.timestamp),
    },
    {
      key: 'contactName',
      header: 'Utente',
      render: (l: AccessLog) => (
        <div>
          <p className="font-medium text-gray-900">{l.contactName}</p>
          <p className="text-xs text-gray-500">{l.contactEmail}</p>
        </div>
      ),
    },
    { key: 'locationName', header: 'Sede' },
    {
      key: 'event',
      header: 'Evento',
      render: (l: AccessLog) => (
        <Badge variant={l.event === 'login' ? 'info' : l.event === 'logout' ? 'default' : 'warning'}>
          {l.event === 'login' ? 'Login' : l.event === 'logout' ? 'Logout' : 'Rinnovo'}
        </Badge>
      ),
    },
    {
      key: 'device',
      header: 'Dispositivo',
      render: (l: AccessLog) => (
        <div className="flex items-center gap-2">
          {l.device.type === 'mobile' && <Smartphone className="w-4 h-4 text-gray-400" />}
          {l.device.type === 'desktop' && <Monitor className="w-4 h-4 text-gray-400" />}
          {l.device.type === 'tablet' && <Tablet className="w-4 h-4 text-gray-400" />}
          <span className="text-sm">{l.device.os}</span>
        </div>
      ),
    },
    { key: 'ip', header: 'IP' },
    {
      key: 'duration',
      header: 'Durata',
      render: (l: AccessLog) => l.duration > 0 ? `${l.duration} min` : '-',
    },
    {
      key: 'status',
      header: 'Stato',
      render: (l: AccessLog) => (
        <div className="flex items-center gap-1">
          {l.status === 'success' ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className={l.status === 'success' ? 'text-green-600' : 'text-red-600'}>
            {l.status === 'success' ? 'OK' : 'Errore'}
          </span>
        </div>
      ),
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
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Accessi Oggi</p>
                <p className="text-2xl font-bold text-gray-900">{todayLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Accessi Falliti Oggi</p>
                <p className="text-2xl font-bold text-gray-900">{failedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tempo Medio Online</p>
                <p className="text-2xl font-bold text-gray-900">{avgDuration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
            label="Da"
          />
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
            label="A"
          />
          <Dropdown
            label="Sede"
            options={[
              { value: 'all', label: 'Tutte le sedi' },
              { value: 'loc-1', label: 'Sede Centro' },
              { value: 'loc-2', label: 'Sede Mare' },
            ]}
            value={filters.locationId}
            onChange={(v) => setFilters(f => ({ ...f, locationId: v }))}
          />
          <Dropdown
            label="Evento"
            options={[
              { value: 'all', label: 'Tutti' },
              { value: 'login', label: 'Login' },
              { value: 'logout', label: 'Logout' },
              { value: 'renewal', label: 'Rinnovo' },
            ]}
            value={filters.event}
            onChange={(v) => setFilters(f => ({ ...f, event: v }))}
          />
          <Dropdown
            label="Stato"
            options={[
              { value: 'all', label: 'Tutti' },
              { value: 'success', label: 'Successo' },
              { value: 'failed', label: 'Fallito' },
            ]}
            value={filters.status}
            onChange={(v) => setFilters(f => ({ ...f, status: v }))}
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">{filteredLogs.length} log trovati</p>
        </div>
        <Table
          columns={columns as any}
          data={paginatedLogs as any}
          getRowId={(l: any) => l.id}
        />
        
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
