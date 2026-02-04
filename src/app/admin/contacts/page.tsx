'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { Contact } from '@/types';
import { generateContacts } from '@/lib/generators';
import { formatDateTime } from '@/lib/utils';
import { exportContactsToCSV } from '@/lib/exportCSV';
import { exportContactsToExcel } from '@/lib/exportExcel';
import { Search, Download, Trash2, Mail, Smartphone, Monitor, Tablet } from 'lucide-react';

const ITEMS_PER_PAGE = 25;

export default function ContactsPage() {
  const { showToast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    locationId: 'all',
    marketingConsent: 'all',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    let savedContacts = storage.contacts.get<Contact[]>([]);
    if (savedContacts.length === 0) {
      savedContacts = generateContacts(250);
      storage.contacts.set(savedContacts);
    }
    setContacts(savedContacts);
    setIsLoading(false);
  }, []);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          contact.firstName.toLowerCase().includes(searchLower) ||
          contact.lastName.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.locationId !== 'all' && contact.locationId !== filters.locationId) {
        return false;
      }

      if (filters.marketingConsent !== 'all') {
        const hasConsent = filters.marketingConsent === 'yes';
        if (contact.marketingConsent !== hasConsent) return false;
      }

      if (filters.dateFrom && new Date(contact.createdAt) < new Date(filters.dateFrom)) {
        return false;
      }

      if (filters.dateTo && new Date(contact.createdAt) > new Date(filters.dateTo)) {
        return false;
      }

      return true;
    });
  }, [contacts, filters]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    
    const updatedContacts = contacts.filter(c => !selectedIds.includes(c.id));
    setContacts(updatedContacts);
    storage.contacts.set(updatedContacts);
    setSelectedIds([]);
    showToast(`${selectedIds.length} contatti eliminati`, 'success');
  };

  const handleExportCSV = () => {
    const toExport = selectedIds.length > 0 
      ? contacts.filter(c => selectedIds.includes(c.id))
      : filteredContacts;
    exportContactsToCSV(toExport);
    showToast(`Esportati ${toExport.length} contatti in CSV`, 'success');
  };

  const handleExportExcel = () => {
    const toExport = selectedIds.length > 0 
      ? contacts.filter(c => selectedIds.includes(c.id))
      : filteredContacts;
    exportContactsToExcel(toExport);
    showToast(`Esportati ${toExport.length} contatti in Excel`, 'success');
  };

  const columns = [
    { 
      key: 'name', 
      header: 'Nome', 
      sortable: true,
      render: (c: Contact) => `${c.firstName} ${c.lastName}` 
    },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Telefono', render: (c: Contact) => c.phone || '-' },
    { key: 'locationName', header: 'Sede', sortable: true },
    { 
      key: 'marketingConsent', 
      header: 'Marketing', 
      render: (c: Contact) => (
        <Badge variant={c.marketingConsent ? 'success' : 'default'}>
          {c.marketingConsent ? 'Sì' : 'No'}
        </Badge>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Data', 
      sortable: true,
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
      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome o email..."
                value={filters.search}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <Dropdown
            options={[
              { value: 'all', label: 'Tutte le sedi' },
              { value: 'loc-1', label: 'Sede Centro' },
              { value: 'loc-2', label: 'Sede Mare' },
            ]}
            value={filters.locationId}
            onChange={(v) => setFilters(f => ({ ...f, locationId: v }))}
            placeholder="Sede"
          />
          <Dropdown
            options={[
              { value: 'all', label: 'Tutti' },
              { value: 'yes', label: 'Con consenso' },
              { value: 'no', label: 'Senza consenso' },
            ]}
            value={filters.marketingConsent}
            onChange={(v) => setFilters(f => ({ ...f, marketingConsent: v }))}
            placeholder="Consenso marketing"
          />
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
            placeholder="Da data"
          />
        </div>
      </Card>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {filteredContacts.length} contatti trovati
            {selectedIds.length > 0 && ` (${selectedIds.length} selezionati)`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={() => showToast('Funzionalità email disponibile nella versione completa', 'info')}>
                <Mail className="w-4 h-4 mr-1" />
                Invia email
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-1" />
                Elimina
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-1" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="w-4 h-4 mr-1" />
            Excel
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card padding="none">
        <Table
          columns={columns as never}
          data={paginatedContacts as never}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onRowClick={(c) => setSelectedContact(c as unknown as Contact)}
          getRowId={(c) => (c as unknown as Contact).id}
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

      {/* Contact Detail Modal */}
      <Modal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title="Dettaglio Contatto"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Nome</label>
                <p className="text-gray-900">{selectedContact.firstName} {selectedContact.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{selectedContact.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Telefono</label>
                <p className="text-gray-900">{selectedContact.phone || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Sede</label>
                <p className="text-gray-900">{selectedContact.locationName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Città</label>
                <p className="text-gray-900">{selectedContact.city}, {selectedContact.region}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Registrazione</label>
                <p className="text-gray-900">{formatDateTime(selectedContact.createdAt)}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Dispositivo</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {selectedContact.device.type === 'mobile' && <Smartphone className="w-5 h-5 text-gray-400" />}
                  {selectedContact.device.type === 'desktop' && <Monitor className="w-5 h-5 text-gray-400" />}
                  {selectedContact.device.type === 'tablet' && <Tablet className="w-5 h-5 text-gray-400" />}
                  <span className="capitalize">{selectedContact.device.type}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span>{selectedContact.device.os}</span>
                <span className="text-gray-400">|</span>
                <span>{selectedContact.device.browser}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Consensi</h4>
              <div className="flex gap-4">
                <Badge variant="success">Privacy accettata</Badge>
                <Badge variant={selectedContact.marketingConsent ? 'success' : 'default'}>
                  Marketing: {selectedContact.marketingConsent ? 'Sì' : 'No'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
