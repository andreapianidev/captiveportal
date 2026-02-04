# WiFi Portal Cloud - Demo Captive Portal

Demo funzionante di un sistema Captive Portal WiFi per raccolta contatti e marketing.

## Screenshot

### Homepage
Landing page con presentazione del servizio.

### Captive Portal
Pagina che vede il cliente quando si connette al WiFi.

### Dashboard Admin
Pannello di controllo con statistiche e grafici.

## Demo Live

**Credenziali Demo:**
- Email: `demo@esempio.it`
- Password: `demo123`

## Funzionalità

- **Captive Portal personalizzabile** - Logo, colori e testi configurabili
- **Dashboard Analytics** - Statistiche in tempo reale
- **Gestione Contatti** - Filtri, ricerca, export CSV/Excel
- **Analytics Dispositivi** - Grafici dispositivi, OS, browser
- **Mappa Provenienza** - Visualizzazione geografica contatti
- **Storico Accessi** - Log dettagliato di tutti gli accessi
- **Email Marketing** - Creazione e invio campagne
- **Multi-Sede** - Gestione di più locali
- **Impostazioni** - Personalizzazione completa con preview live

## Tecnologie

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Recharts** per grafici
- **Lucide React** per icone
- **LocalStorage** per persistenza dati demo

## Installazione

```bash
# Clona il repository
git clone <repo-url>

# Installa dipendenze
npm install

# Avvia in sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Struttura Pagine

| URL | Descrizione |
|-----|-------------|
| `/` | Homepage landing page |
| `/portal/ristorante-da-mario` | Captive Portal demo |
| `/portal/ristorante-da-mario/success` | Pagina successo connessione |
| `/admin/login` | Login dashboard |
| `/admin/dashboard` | Dashboard principale |
| `/admin/contacts` | Gestione contatti |
| `/admin/analytics` | Analytics dispositivi |
| `/admin/geography` | Provenienza geografica |
| `/admin/access-logs` | Storico accessi |
| `/admin/email` | Email marketing |
| `/admin/locations` | Gestione sedi |
| `/admin/settings` | Impostazioni |

## Deploy su Vercel

Il progetto è pronto per il deploy su Vercel:

```bash
# Build
npm run build

# Deploy (con Vercel CLI)
vercel
```

Oppure collega il repository a Vercel per deploy automatici.

## Note

- Questa è una **demo dimostrativa** con dati simulati
- I dati sono salvati in localStorage del browser
- Non richiede database o backend
- Perfetta per mostrare le funzionalità al cliente

## Licenza

Demo dimostrativa - Tutti i diritti riservati.
