import * as XLSX from 'xlsx';
import { Contact } from '@/types';
import { formatDateTime } from './utils';

export function exportContactsToExcel(contacts: Contact[]): void {
  const data = contacts.map(contact => ({
    'Nome': contact.firstName,
    'Cognome': contact.lastName,
    'Email': contact.email,
    'Telefono': contact.phone || '',
    'Sede': contact.locationName,
    'Città': contact.city,
    'Regione': contact.region,
    'Consenso Marketing': contact.marketingConsent ? 'Sì' : 'No',
    'Dispositivo': contact.device.type,
    'Sistema Operativo': contact.device.os,
    'Browser': contact.device.browser,
    'Data Registrazione': formatDateTime(contact.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contatti');

  const colWidths = [
    { wch: 15 }, // Nome
    { wch: 15 }, // Cognome
    { wch: 30 }, // Email
    { wch: 15 }, // Telefono
    { wch: 15 }, // Sede
    { wch: 15 }, // Città
    { wch: 20 }, // Regione
    { wch: 18 }, // Consenso Marketing
    { wch: 12 }, // Dispositivo
    { wch: 15 }, // Sistema Operativo
    { wch: 12 }, // Browser
    { wch: 20 }, // Data Registrazione
  ];
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, `contatti_${new Date().toISOString().split('T')[0]}.xlsx`);
}
