'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PortalForm } from '@/components/portal/PortalForm';
import { getTenant, getDefaultTenant } from '@/data/mockTenants';
import { storage } from '@/lib/localStorage';
import { Contact, DeviceInfo, Tenant } from '@/types';
import { generateId, getRandomElement } from '@/lib/utils';
import { getWeightedRandomCity } from '@/data/italianCities';
import { Wifi } from 'lucide-react';

function getDeviceInfo(): DeviceInfo {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  
  let type: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (/tablet|ipad/i.test(userAgent)) type = 'tablet';
  else if (/mobile|android|iphone/i.test(userAgent)) type = 'mobile';
  
  let os = 'other';
  if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/macintosh|mac os/i.test(userAgent)) os = 'macOS';
  else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/linux/i.test(userAgent)) os = 'Linux';
  
  let browser = 'other';
  if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) browser = 'Chrome';
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';
  else if (/edge/i.test(userAgent)) browser = 'Edge';
  
  return { type, os, browser, userAgent };
}

export default function PortalPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const foundTenant = getTenant(slug) || getDefaultTenant();
    setTenant(foundTenant);
  }, [slug]);

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    privacyConsent: boolean;
    marketingConsent: boolean;
  }) => {
    if (!tenant) return;
    
    setIsConnecting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const deviceInfo = getDeviceInfo();
    const cityData = getWeightedRandomCity();
    const location = getRandomElement(tenant.locations);
    
    const newContact: Contact = {
      id: generateId(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || undefined,
      locationId: location.id,
      locationName: location.name,
      marketingConsent: formData.marketingConsent,
      privacyConsent: formData.privacyConsent,
      device: deviceInfo,
      city: cityData.city,
      region: cityData.region,
      createdAt: new Date().toISOString(),
    };
    
    const existingContacts = storage.contacts.get<Contact[]>([]);
    storage.contacts.set([newContact, ...existingContacts]);
    
    router.push(`/portal/${slug}/success`);
  };

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: tenant.secondaryColor }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-25"
              style={{ backgroundColor: tenant.primaryColor }}
            />
            <div 
              className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tenant.primaryColor }}
            >
              <Wifi className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connessione in corso...</h2>
          <p className="text-gray-500">Stiamo configurando la tua connessione WiFi</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: tenant.secondaryColor }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: tenant.primaryColor }}
          >
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Benvenuto da {tenant.name}!
          </h1>
        </div>

        <PortalForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          primaryColor={tenant.primaryColor}
          welcomeText={tenant.welcomeText}
        />

        <p className="text-xs text-gray-400 text-center mt-6">
          Servizio WiFi gratuito offerto da {tenant.name}
        </p>
      </div>
    </div>
  );
}
