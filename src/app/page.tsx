import Link from 'next/link';
import { Wifi, Users, Shield, BarChart3, Building2, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
            WiFi Portal Cloud
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trasforma il WiFi del tuo locale in uno strumento di marketing potente
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

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perché scegliere WiFi Portal Cloud?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Raccogli Contatti"
              description="Ogni cliente che si connette lascia nome ed email. Costruisci il tuo database clienti automaticamente."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="GDPR Compliant"
              description="Informativa privacy automatica e consenso tracciato. Sempre in regola con la normativa."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Dashboard Potente"
              description="Analytics, statistiche e report dettagliati. Conosci i tuoi clienti come mai prima."
            />
            <FeatureCard
              icon={<Building2 className="w-8 h-8" />}
              title="Multi-Sede"
              description="Gestisci tutti i tuoi locali da un'unica dashboard centralizzata."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Come Funziona
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            In tre semplici passaggi, trasforma ogni connessione WiFi in un&apos;opportunità di business
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Il cliente si connette"
              description="Quando un cliente accede al tuo WiFi, viene accolto da un portale brandizzato con il tuo logo e i tuoi colori."
            />
            <StepCard
              number={2}
              title="Lascia i suoi dati"
              description="Nome, email e consenso marketing in cambio dell'accesso gratuito. Tutto in modo semplice e veloce."
            />
            <StepCard
              number={3}
              title="Tu raccogli contatti"
              description="Costruisci il tuo database clienti e lancia campagne email mirate per fidelizzare i tuoi clienti."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tutto quello che ti serve per crescere
              </h2>
              <ul className="space-y-4">
                <BenefitItem text="Portale WiFi personalizzabile con il tuo brand" />
                <BenefitItem text="Dashboard analytics in tempo reale" />
                <BenefitItem text="Export contatti in CSV e Excel" />
                <BenefitItem text="Campagne email marketing integrate" />
                <BenefitItem text="Statistiche geografiche e demografiche" />
                <BenefitItem text="Supporto multi-sede" />
                <BenefitItem text="Conformità GDPR garantita" />
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
                    <p className="text-sm text-gray-500">Demo Portal</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-gray-100 rounded-lg" />
                  <div className="h-10 bg-gray-100 rounded-lg" />
                  <div className="h-10 bg-gray-100 rounded-lg" />
                  <div className="h-12 bg-primary-500 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a trasformare il tuo WiFi?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Prova la demo gratuita e scopri tutte le funzionalità
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/portal/ristorante-da-mario"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Prova il Portal Demo
            </Link>
            <Link 
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors border border-primary-400"
            >
              Accedi alla Dashboard
            </Link>
          </div>
          <p className="text-primary-200 mt-6 text-sm">
            Credenziali demo: demo@esempio.it / demo123
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">WiFi Portal Cloud</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 WiFi Portal Cloud. Tutti i diritti riservati. Demo dimostrativa.
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

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </li>
  );
}
