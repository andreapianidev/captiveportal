import Link from 'next/link';
import { Wifi, Users, Shield, BarChart3, Building2, ArrowRight, Mail, Palette, Store, UtensilsCrossed, Hotel, Dumbbell, Briefcase, ShoppingBag, TrendingUp, Target, Database } from 'lucide-react';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'WiFi Portal Cloud',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Captive portal WiFi per ristoranti e aziende. Raccogli contatti, invia campagne email e fidelizza i clienti tramite il WiFi del tuo locale.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Prova gratuita disponibile',
  },
  provider: {
    '@type': 'Organization',
    name: 'WiFi Portal Cloud',
  },
  featureList: [
    'Raccolta contatti automatica',
    'GDPR compliant',
    'Dashboard analytics',
    'Campagne email marketing',
    'Supporto multi-sede',
    'Portale personalizzabile',
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">WiFi Portal Cloud</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/portal/ristorante-da-mario"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Demo Portal
              </Link>
              <Link
                href="/admin/login"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Accedi
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Captive Portal WiFi per Ristoranti e Aziende
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Trasforma ogni connessione WiFi in un&apos;opportunità di business.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Raccogli contatti in automatico, invia campagne email mirate e fidelizza i tuoi clienti
            — il tutto dal WiFi che offri già nel tuo locale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portal/ristorante-da-mario"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Prova la Demo Gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-colors"
            >
              Accedi alla Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Come Funziona il Captive Portal WiFi
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            In tre semplici passaggi, trasforma ogni connessione WiFi in un contatto qualificato per il tuo business
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Il cliente si connette al WiFi"
              description="Quando un cliente accede alla tua rete WiFi, viene accolto da un portale personalizzato con il tuo logo, i tuoi colori e il messaggio di benvenuto del tuo brand."
            />
            <StepCard
              number={2}
              title="Lascia i suoi dati"
              description="Il cliente inserisce nome, email e accetta la privacy policy in cambio dell'accesso gratuito a Internet. Il consenso marketing viene tracciato automaticamente."
            />
            <StepCard
              number={3}
              title="Tu fai crescere il tuo business"
              description="I contatti finiscono nel tuo database. Da lì puoi lanciare campagne email mirate, analizzare i dati e fidelizzare i clienti nel tempo."
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tutto quello che serve al tuo locale
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Una piattaforma completa per trasformare il WiFi gratuito in uno strumento di marketing e fidelizzazione
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Raccolta Contatti Automatica"
              description="Ogni cliente che si connette al WiFi lascia nome, email e telefono. Il tuo database clienti cresce ad ogni connessione, senza sforzo."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="GDPR Compliant al 100%"
              description="Informativa privacy automatica, consensi tracciati e dati protetti. Sei sempre in regola con il GDPR e la normativa italiana sulla privacy."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Dashboard Analytics in Tempo Reale"
              description="Monitora accessi, dispositivi, orari di punta e provenienza geografica dei clienti. Report dettagliati esportabili in CSV e Excel."
            />
            <FeatureCard
              icon={<Mail className="w-8 h-8" />}
              title="Campagne Email Marketing"
              description="Crea e invia newsletter e promozioni direttamente dalla dashboard. Segmenta il pubblico per sede, data o consenso marketing."
            />
            <FeatureCard
              icon={<Building2 className="w-8 h-8" />}
              title="Multi-Sede e Multi-Brand"
              description="Gestisci più locali da un'unica dashboard centralizzata. Ogni sede ha il proprio portale personalizzato e le proprie statistiche."
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8" />}
              title="Portale Completamente Personalizzabile"
              description="Logo, colori, testi di benvenuto e messaggi promozionali: il captive portal rispecchia in tutto e per tutto il tuo brand."
            />
          </div>
        </div>
      </section>

      {/* Per Chi è */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ideale per ogni tipo di attività
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Qualsiasi attività che offre WiFi ai propri clienti può trasformarlo in uno strumento di crescita
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <AudienceCard icon={<UtensilsCrossed className="w-6 h-6" />} label="Ristoranti e Pizzerie" />
            <AudienceCard icon={<Store className="w-6 h-6" />} label="Bar e Caffetterie" />
            <AudienceCard icon={<Hotel className="w-6 h-6" />} label="Hotel e B&B" />
            <AudienceCard icon={<Dumbbell className="w-6 h-6" />} label="Palestre e Centri Sportivi" />
            <AudienceCard icon={<Briefcase className="w-6 h-6" />} label="Coworking e Uffici" />
            <AudienceCard icon={<ShoppingBag className="w-6 h-6" />} label="Negozi e Centri Commerciali" />
          </div>
        </div>
      </section>

      {/* Vantaggi per le Aziende */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                I vantaggi concreti per la tua azienda
              </h2>
              <p className="text-gray-600 mb-8">
                Il WiFi che offri già ai clienti diventa il tuo canale di acquisizione più efficace. Nessun costo per contatto, nessun intermediario.
              </p>
              <ul className="space-y-4">
                <BenefitItem icon={<Database className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Database clienti proprietario — i contatti sono tuoi, per sempre" />
                <BenefitItem icon={<TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0" />} text="ROI misurabile su ogni campagna email inviata" />
                <BenefitItem icon={<Target className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Marketing diretto senza dipendere da social o piattaforme terze" />
                <BenefitItem icon={<Users className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Fidelizzazione clienti con promozioni personalizzate" />
                <BenefitItem icon={<Shield className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Conformità GDPR garantita — nessun rischio legale" />
                <BenefitItem icon={<BarChart3 className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Analytics dettagliati per conoscere abitudini e preferenze dei clienti" />
                <BenefitItem icon={<Building2 className="w-5 h-5 text-green-500 flex-shrink-0" />} text="Scalabile da una singola sede a catene con decine di locali" />
              </ul>
            </div>
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ristorante Da Mario</h3>
                    <p className="text-sm text-gray-500">Esempio di Captive Portal</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                    <span className="text-sm text-gray-400">Nome e Cognome</span>
                  </div>
                  <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                    <span className="text-sm text-gray-400">Email</span>
                  </div>
                  <div className="h-10 bg-gray-100 rounded-lg flex items-center px-3">
                    <span className="text-sm text-gray-400">Telefono (opzionale)</span>
                  </div>
                  <div className="h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Connettiti al WiFi Gratis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numeri / Social Proof */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatCard value="68%" label="Tasso medio di registrazione" />
            <StatCard value="10x" label="ROI sulle campagne email" />
            <StatCard value="100%" label="Conforme al GDPR" />
            <StatCard value="0€" label="Costo per contatto acquisito" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto a trasformare il WiFi del tuo locale?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Prova la demo gratuita e scopri come raccogliere contatti, inviare campagne email e far crescere il tuo business con il WiFi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portal/ristorante-da-mario"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Prova il Captive Portal Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-colors"
            >
              Accedi alla Dashboard
            </Link>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Credenziali demo: demo@esempio.it / demo123
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Wifi className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold">WiFi Portal Cloud</span>
              </div>
              <p className="text-gray-400 text-sm">
                Il captive portal WiFi per ristoranti, hotel e aziende che vogliono trasformare il WiFi gratuito in uno strumento di marketing e fidelizzazione clienti.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Funzionalità</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Raccolta contatti automatica</li>
                <li>Dashboard analytics</li>
                <li>Campagne email marketing</li>
                <li>Gestione multi-sede</li>
                <li>Portale personalizzabile</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Per le aziende</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Ristoranti e Pizzerie</li>
                <li>Hotel e B&B</li>
                <li>Bar e Caffetterie</li>
                <li>Palestre e Coworking</li>
                <li>Negozi e Centri Commerciali</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 WiFi Portal Cloud. Tutti i diritti riservati.
            </p>
            <p className="text-gray-500 text-xs">
              Captive Portal WiFi — Marketing tramite WiFi per ristoranti e aziende in Italia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3">
      {icon}
      <span className="text-gray-700">{text}</span>
    </li>
  );
}

function AudienceCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 mx-auto mb-3">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</p>
      <p className="text-primary-100 text-sm">{label}</p>
    </div>
  );
}
