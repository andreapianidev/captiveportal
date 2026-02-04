import { Contact } from '@/types';
import { formatDateTime } from './utils';

export function exportContactsToCSV(contacts: Contact[]): void {
  const headers = [
    'Nome',
    'Cognome',
    'Email',
    'Telefono',
    'Sede',
    'Città',
    'Regione',
    'Consenso Marketing',
    'Dispositivo',
    'Sistema Operativo',
    'Browser',
    'Data Registrazione',
  ];

  const rows = contacts.map(contact => [
    contact.firstName,
    contact.lastName,
    contact.email,
    contact.phone || '',
    contact.locationName,
    contact.city,
    contact.region,
    contact.marketingConsent ? 'Sì' : 'No',
    contact.device.type,
    contact.device.os,
    contact.device.browser,
    formatDateTime(contact.createdAt),
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(';')),
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `contatti_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
