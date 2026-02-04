'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { SuccessAnimation } from '@/components/portal/SuccessAnimation';
import { getTenant, getDefaultTenant } from '@/data/mockTenants';
import { Tenant } from '@/types';
import { Gift, Facebook, Instagram, Globe } from 'lucide-react';

export default function SuccessPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const foundTenant = getTenant(slug) || getDefaultTenant();
    setTenant(foundTenant);
  }, [slug]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: tenant.secondaryColor }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <SuccessAnimation />
        
        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
          Connessione riuscita!
        </h1>
        <p className="text-gray-600 mb-6">
          {tenant.successText || 'Ora puoi navigare liberamente'}
        </p>

        <div 
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: tenant.secondaryColor }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Offerta speciale!</span>
          </div>
          <p className="text-sm text-gray-700 text-left">
            {tenant.promoText}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 mb-4">Seguici sui social</p>
          <div className="flex justify-center gap-4">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <Facebook className="w-5 h-5 text-white" />
            </button>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <Instagram className="w-5 h-5 text-white" />
            </button>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <Globe className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Questa pagina si chiuderà automaticamente tra {countdown} secondi...
        </p>
      </div>
    </div>
  );
}
