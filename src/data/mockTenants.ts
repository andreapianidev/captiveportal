import { Tenant } from '@/types';

export const DEMO_TENANTS: Record<string, Tenant> = {
  'ristorante-da-mario': {
    id: 'demo-1',
    name: 'Ristorante Da Mario',
    slug: 'ristorante-da-mario',
    logo: '/images/logo-mario.png',
    primaryColor: '#1E3A5F',
    secondaryColor: '#E8F0F7',
    welcomeText: 'Benvenuto da Mario! Inserisci i tuoi dati per navigare gratis.',
    successText: 'Buona navigazione!',
    promoText: 'Scopri il menu del giorno! Mostra questa schermata per un caffè omaggio.',
    locations: [
      { id: 'loc-1', name: 'Sede Centro', address: 'Via Roma 15, Milano', active: true },
      { id: 'loc-2', name: 'Sede Mare', address: 'Lungomare 42, Rimini', active: true },
    ],
  },
};

export function getTenant(slug: string): Tenant | null {
  return DEMO_TENANTS[slug] || null;
}

export function getDefaultTenant(): Tenant {
  return DEMO_TENANTS['ristorante-da-mario'];
}
