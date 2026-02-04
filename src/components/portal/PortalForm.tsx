'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { PrivacyModal } from './PrivacyModal';
import { Wifi } from 'lucide-react';

interface PortalFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  primaryColor?: string;
  welcomeText?: string;
  requirePhone?: boolean;
  showMarketingCheckbox?: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export function PortalForm({
  onSubmit,
  isLoading = false,
  primaryColor = '#1E3A5F',
  welcomeText = 'Inserisci i tuoi dati per accedere al WiFi gratuito',
  requirePhone = false,
  showMarketingCheckbox = true,
}: PortalFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    privacyConsent: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPrivacy, setShowPrivacy] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Il nome è obbligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Il cognome è obbligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    if (requirePhone && !formData.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'Devi accettare l\'informativa privacy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-600 text-center mb-6">{welcomeText}</p>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nome"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            error={errors.firstName}
            required
            placeholder="Mario"
          />
          <Input
            label="Cognome"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            error={errors.lastName}
            required
            placeholder="Rossi"
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
          placeholder="mario.rossi@email.it"
        />

        <Input
          label="Telefono"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          required={requirePhone}
          placeholder="333 1234567"
          helperText={!requirePhone ? 'Opzionale' : undefined}
        />

        <div className="space-y-3 pt-2">
          <Checkbox
            checked={formData.privacyConsent}
            onChange={(e) => handleChange('privacyConsent', e.target.checked)}
            error={errors.privacyConsent}
            label={
              <span>
                Accetto l&apos;
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-primary-500 hover:underline font-medium"
                  style={{ color: primaryColor }}
                >
                  informativa privacy
                </button>
                <span className="text-red-500 ml-1">*</span>
              </span>
            }
          />

          {showMarketingCheckbox && (
            <Checkbox
              checked={formData.marketingConsent}
              onChange={(e) => handleChange('marketingConsent', e.target.checked)}
              label="Accetto di ricevere promozioni e offerte via email"
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          loading={isLoading}
          style={{ backgroundColor: primaryColor }}
          icon={<Wifi className="w-5 h-5" />}
        >
          Connettiti al WiFi
        </Button>
      </form>

      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
}
