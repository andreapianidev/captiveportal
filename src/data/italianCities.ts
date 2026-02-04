export interface ItalianCity {
  city: string;
  region: string;
  weight: number; // Higher weight = more likely to be selected
}

export const ITALIAN_CITIES: ItalianCity[] = [
  { city: 'Milano', region: 'Lombardia', weight: 15 },
  { city: 'Roma', region: 'Lazio', weight: 14 },
  { city: 'Napoli', region: 'Campania', weight: 10 },
  { city: 'Torino', region: 'Piemonte', weight: 8 },
  { city: 'Palermo', region: 'Sicilia', weight: 6 },
  { city: 'Genova', region: 'Liguria', weight: 5 },
  { city: 'Bologna', region: 'Emilia-Romagna', weight: 7 },
  { city: 'Firenze', region: 'Toscana', weight: 6 },
  { city: 'Bari', region: 'Puglia', weight: 5 },
  { city: 'Catania', region: 'Sicilia', weight: 4 },
  { city: 'Venezia', region: 'Veneto', weight: 5 },
  { city: 'Verona', region: 'Veneto', weight: 4 },
  { city: 'Messina', region: 'Sicilia', weight: 3 },
  { city: 'Padova', region: 'Veneto', weight: 4 },
  { city: 'Trieste', region: 'Friuli-Venezia Giulia', weight: 3 },
  { city: 'Brescia', region: 'Lombardia', weight: 4 },
  { city: 'Parma', region: 'Emilia-Romagna', weight: 3 },
  { city: 'Taranto', region: 'Puglia', weight: 2 },
  { city: 'Prato', region: 'Toscana', weight: 2 },
  { city: 'Modena', region: 'Emilia-Romagna', weight: 3 },
  { city: 'Reggio Calabria', region: 'Calabria', weight: 2 },
  { city: 'Reggio Emilia', region: 'Emilia-Romagna', weight: 3 },
  { city: 'Perugia', region: 'Umbria', weight: 2 },
  { city: 'Livorno', region: 'Toscana', weight: 2 },
  { city: 'Ravenna', region: 'Emilia-Romagna', weight: 2 },
  { city: 'Cagliari', region: 'Sardegna', weight: 3 },
  { city: 'Foggia', region: 'Puglia', weight: 2 },
  { city: 'Rimini', region: 'Emilia-Romagna', weight: 8 },
  { city: 'Salerno', region: 'Campania', weight: 2 },
  { city: 'Ferrara', region: 'Emilia-Romagna', weight: 2 },
  { city: 'Sassari', region: 'Sardegna', weight: 2 },
  { city: 'Latina', region: 'Lazio', weight: 2 },
  { city: 'Monza', region: 'Lombardia', weight: 3 },
  { city: 'Bergamo', region: 'Lombardia', weight: 3 },
  { city: 'Siracusa', region: 'Sicilia', weight: 2 },
  { city: 'Pescara', region: 'Abruzzo', weight: 2 },
  { city: 'Trento', region: 'Trentino-Alto Adige', weight: 2 },
  { city: 'Forlì', region: 'Emilia-Romagna', weight: 2 },
  { city: 'Vicenza', region: 'Veneto', weight: 2 },
  { city: 'Terni', region: 'Umbria', weight: 1 },
  { city: 'Bolzano', region: 'Trentino-Alto Adige', weight: 2 },
  { city: 'Novara', region: 'Piemonte', weight: 2 },
  { city: 'Piacenza', region: 'Emilia-Romagna', weight: 2 },
  { city: 'Ancona', region: 'Marche', weight: 2 },
  { city: 'Andria', region: 'Puglia', weight: 1 },
  { city: 'Arezzo', region: 'Toscana', weight: 1 },
  { city: 'Udine', region: 'Friuli-Venezia Giulia', weight: 2 },
  { city: 'Cesena', region: 'Emilia-Romagna', weight: 2 },
  { city: 'Lecce', region: 'Puglia', weight: 2 },
  { city: 'Pesaro', region: 'Marche', weight: 1 },
];

export const ITALIAN_REGIONS = [
  'Lombardia',
  'Lazio',
  'Campania',
  'Sicilia',
  'Veneto',
  'Emilia-Romagna',
  'Piemonte',
  'Puglia',
  'Toscana',
  'Calabria',
  'Sardegna',
  'Liguria',
  'Marche',
  'Abruzzo',
  'Friuli-Venezia Giulia',
  'Trentino-Alto Adige',
  'Umbria',
  'Basilicata',
  'Molise',
  'Valle d\'Aosta',
];

export function getWeightedRandomCity(): ItalianCity {
  const totalWeight = ITALIAN_CITIES.reduce((sum, city) => sum + city.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const city of ITALIAN_CITIES) {
    random -= city.weight;
    if (random <= 0) {
      return city;
    }
  }
  
  return ITALIAN_CITIES[0];
}
