'use client';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  privacyText?: string;
}

const DEFAULT_PRIVACY_TEXT = `Informativa sulla Privacy

Ai sensi del Regolamento UE 2016/679 (GDPR), La informiamo che i dati personali da Lei forniti saranno trattati per le seguenti finalità:

1. Erogazione del servizio WiFi gratuito
2. Comunicazioni di servizio relative all'utilizzo del WiFi
3. Previo Suo consenso, invio di comunicazioni promozionali e marketing

I dati saranno conservati per il periodo strettamente necessario alle finalità sopra indicate e comunque non oltre 24 mesi dalla raccolta.

Lei ha diritto di accedere ai Suoi dati, richiederne la rettifica, la cancellazione, la limitazione del trattamento, nonché di opporsi al trattamento e di esercitare il diritto alla portabilità dei dati.

Titolare del trattamento: Ristorante Da Mario S.r.l.
Email: privacy@ristorantedamario.it

Per esercitare i Suoi diritti può contattarci all'indirizzo email sopra indicato.`;

export function PrivacyModal({ isOpen, onClose, privacyText = DEFAULT_PRIVACY_TEXT }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Informativa Privacy" size="lg">
      <div className="max-h-[60vh] overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
            {privacyText}
          </pre>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose}>Ho capito</Button>
      </div>
    </Modal>
  );
}
