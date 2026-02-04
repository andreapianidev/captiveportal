'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { User } from '@/types';
import { Wifi, ArrowLeft, User as UserIcon, Shield } from 'lucide-react';

const DEMO_USER: User = {
  id: 'user-1',
  email: 'demo@esempio.it',
  name: 'Mario Rossi',
  tenantId: 'demo-1',
};

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    storage.auth.set(DEMO_USER);
    showToast('Accesso effettuato con successo!', 'success');
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Demo</h1>
            <p className="text-gray-500 mt-2">Accedi per esplorare tutte le funzionalit&agrave;</p>
          </div>

          <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Mario Rossi</p>
                <p className="text-sm text-gray-500">demo@esempio.it</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-600">
              <Shield className="w-3.5 h-3.5" />
              <span>Amministratore &bull; Ristorante Da Mario</span>
            </div>
          </div>

          <Button onClick={handleLogin} className="w-full" size="lg" loading={isLoading}>
            Accedi alla Dashboard
          </Button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Ambiente demo &mdash; nessuna password richiesta
          </p>
        </div>
      </div>
    </div>
  );
}
