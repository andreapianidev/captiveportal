# WiFi Portal Cloud

**Captive Portal per la Ristorazione** — Trasforma la connessione WiFi dei tuoi clienti in uno strumento di marketing e raccolta contatti.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Cos'e WiFi Portal Cloud?

WiFi Portal Cloud e un **captive portal open source** pensato per ristoranti, bar e attivita di ristorazione. Quando un cliente si connette al WiFi del locale, viene reindirizzato a una pagina personalizzata dove inserisce i propri dati prima di accedere a Internet.

Il risultato? Un **database di contatti profilati**, pronti per campagne di email marketing, analisi dei flussi e fidelizzazione della clientela.

---

## Funzionalita principali

### Portale di accesso WiFi
- Pagina di benvenuto personalizzabile con logo e colori del locale
- Form di registrazione: nome, cognome, email, telefono (opzionale)
- Checkbox privacy e consenso marketing (conforme GDPR)
- Rilevamento automatico dispositivo, sistema operativo e browser
- Pagina di successo con offerta promozionale e countdown
- Link ai canali social del locale

### Dashboard amministrativa
- **Panoramica** — Statistiche in tempo reale, trend giornalieri, contatti recenti
- **Gestione contatti** — Ricerca, filtri avanzati, paginazione, eliminazione massiva
- **Export dati** — Esportazione contatti in formato CSV e Excel (.xlsx)
- **Analytics dispositivi** — Distribuzione per tipo (mobile/desktop/tablet), OS e browser
- **Analisi geografica** — Distribuzione regionale, top citta, rapporto locali vs turisti
- **Log accessi** — Storico completo delle connessioni WiFi con dettagli sessione
- **Email marketing** — Creazione campagne, targeting per consenso/sede/periodo, metriche open e click rate
- **Gestione sedi** — Supporto multi-sede con statistiche per location
- **Impostazioni** — Personalizzazione portale, testi privacy, politica di data retention

### Conformita e sicurezza
- Gestione consenso privacy conforme GDPR
- Consenso marketing separato e opzionale
- Politiche di data retention configurabili (30 / 90 / 365 / 730 giorni)
- Testi dell'informativa privacy personalizzabili

---

## Tech Stack

| Tecnologia | Utilizzo |
|---|---|
| **Next.js 14** | Framework full-stack (App Router) |
| **React 18** | Libreria UI |
| **TypeScript 5** | Type safety |
| **TailwindCSS 3.4** | Styling utility-first |
| **Recharts** | Grafici e visualizzazioni dati |
| **XLSX** | Export Excel |
| **Lucide React** | Libreria icone |
| **date-fns** | Formattazione date |

---

## Quick Start

### Prerequisiti

- **Node.js** >= 18.x
- **npm** >= 9.x (oppure yarn / pnpm)

### Installazione

```bash
# Clona il repository
git clone https://github.com/tuousername/wifi-portal-cloud.git
cd wifi-portal-cloud

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sara disponibile su [http://localhost:3000](http://localhost:3000).

### Build di produzione

```bash
npm run build
npm start
```

---

## Come funziona

### Flusso cliente (utente del ristorante)

```
Connessione alla rete WiFi del locale
        |
        v
Redirect automatico al captive portal  -->  /portal/nome-ristorante
        |
        v
Compilazione form (nome, cognome, email, telefono)
        |
        v
Accettazione privacy + consenso marketing (opzionale)
        |
        v
Accesso a Internet concesso
        |
        v
Pagina di successo con offerta promozionale
```

### Flusso amministratore

```
Login dashboard  -->  /admin/login
        |
        v
Dashboard con statistiche in tempo reale
        |
        v
Gestione contatti / Analytics / Campagne email
        |
        v
Export dati e report
```

### Credenziali demo

| Campo | Valore |
|---|---|
| Email | `demo@esempio.it` |
| Password | `demo123` |

---

## Struttura del progetto

```
src/
├── app/                        # Pages (Next.js App Router)
│   ├── page.tsx               # Landing page
│   ├── portal/[slug]/         # Captive portal pubblico
│   │   ├── page.tsx           # Form di registrazione
│   │   └── success/           # Pagina post-connessione
│   └── admin/                 # Area amministrativa
│       ├── dashboard/         # Panoramica
│       ├── contacts/          # Gestione contatti
│       ├── analytics/         # Analytics dispositivi
│       ├── geography/         # Analisi geografica
│       ├── access-logs/       # Log accessi WiFi
│       ├── email/             # Campagne email
│       ├── locations/         # Gestione sedi
│       └── settings/          # Impostazioni portale
├── components/
│   ├── ui/                    # Componenti UI riutilizzabili
│   ├── charts/                # Grafici (Line, Bar, Pie, Heatmap)
│   ├── admin/                 # Componenti area admin
│   └── portal/                # Componenti captive portal
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts             # Autenticazione
│   ├── useContacts.ts         # CRUD contatti
│   ├── useAccessLogs.ts       # Gestione log accessi
│   ├── useCampaigns.ts        # Gestione campagne
│   ├── useSettings.ts         # Persistenza impostazioni
│   └── useStats.ts            # Calcolo statistiche
├── lib/                       # Utility
│   ├── localStorage.ts        # Wrapper storage browser
│   ├── utils.ts               # Helper vari
│   ├── generators.ts          # Generazione dati demo
│   ├── exportCSV.ts           # Export CSV
│   └── exportExcel.ts         # Export Excel
├── data/                      # Dati statici e mock
│   ├── mockTenants.ts         # Configurazione ristoranti demo
│   ├── italianCities.ts       # Database citta italiane
│   └── italianNames.ts        # Nomi per generazione dati
└── types/
    └── index.ts               # Definizioni TypeScript
```

---

## Mappa delle pagine

| URL | Descrizione |
|---|---|
| `/` | Homepage / landing page |
| `/portal/[slug]` | Captive portal pubblico (personalizzato per locale) |
| `/portal/[slug]/success` | Pagina di successo post-connessione |
| `/admin/login` | Login area amministrativa |
| `/admin/dashboard` | Dashboard principale |
| `/admin/contacts` | Gestione contatti |
| `/admin/analytics` | Analytics dispositivi e browser |
| `/admin/geography` | Provenienza geografica |
| `/admin/access-logs` | Storico accessi WiFi |
| `/admin/email` | Campagne email marketing |
| `/admin/locations` | Gestione multi-sede |
| `/admin/settings` | Impostazioni e personalizzazione |

---

## Personalizzazione

### Branding del portale

Dalla sezione **Impostazioni** della dashboard puoi configurare:

- Logo del locale
- Colore primario del tema
- Testo di benvenuto
- Testo della pagina di successo
- Offerta promozionale visualizzata dopo la connessione
- Link ai canali social media

### Privacy e GDPR

Dalla sezione **Impostazioni > Privacy**:

- Testo informativa privacy personalizzabile
- Campo telefono obbligatorio o opzionale
- Checkbox consenso marketing attiva/disattiva
- Politica di data retention (30, 90, 365 o 730 giorni)

---

## Deployment

### Vercel (consigliato)

```bash
npm i -g vercel
vercel
```

Oppure collega il repository GitHub direttamente dalla [dashboard Vercel](https://vercel.com/new).

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Altre piattaforme

Compatibile con qualsiasi hosting che supporta Node.js: Railway, Render, DigitalOcean App Platform, AWS, ecc.

---

## Roadmap

- [ ] Backend con database persistente (Supabase / PostgreSQL)
- [ ] Integrazione RADIUS per autenticazione WiFi reale
- [ ] Integrazione con access point (UniFi, Mikrotik, OpenWrt)
- [ ] API REST per integrazioni di terze parti
- [ ] Integrazione servizi email transazionali (SendGrid, Mailchimp, Brevo)
- [ ] Dashboard multi-tenant per gestione catene di ristoranti
- [ ] App mobile per gestione rapida
- [ ] Webhook e automazioni
- [ ] Template portale multipli
- [ ] Report PDF automatici

---

## Contributing

I contributi sono benvenuti! Ecco come partecipare:

1. **Fork** del repository
2. Crea un **branch** per la tua feature (`git checkout -b feature/nuova-funzionalita`)
3. **Commit** delle modifiche (`git commit -m 'Aggiunge nuova funzionalita'`)
4. **Push** sul branch (`git push origin feature/nuova-funzionalita`)
5. Apri una **Pull Request**

### Linee guida

- Scrivi codice TypeScript con tipi espliciti
- Segui le convenzioni di naming del progetto
- Testa le modifiche in locale prima di aprire una PR
- Descrivi chiaramente le modifiche nella pull request

---

## Supporto e installazione

Per informazioni sull'installazione professionale, configurazione su access point reali e supporto dedicato:

**[www.andreapiani.com](https://www.andreapiani.com)**

---

## License

Questo progetto e distribuito con licenza **MIT**. Consulta il file [LICENSE](LICENSE) per i dettagli.

Sei libero di usare, modificare e distribuire questo software per qualsiasi scopo, incluso quello commerciale.

---

<p align="center">
  <strong>WiFi Portal Cloud</strong> — Open Source Captive Portal for Restaurants<br/>
  <a href="https://www.andreapiani.com">andreapiani.com</a>
</p>
