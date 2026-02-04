'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { User } from '@/types';
import { Wifi, ArrowLeft } from 'lucide-react';

const DEMO_USER: User = {
  id: 'user-1',
  email: 'demo@esempio.it',
  name: 'Mario Rossi',
  tenantId: 'demo-1',
};

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('demo@esempio.it');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'demo@esempio.it' && password === 'demo123') {
      storage.auth.set(DEMO_USER);
      showToast('Accesso effettuato con successo!', 'success');
      router.push('/admin/dashboard');
    } else {
      setError('Credenziali non valide. Usa demo@esempio.it / demo123');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showToast('Email di recupero inviata! (simulato)', 'info');
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
            <h1 className="text-2xl font-bold text-gray-900">Accedi alla Dashboard</h1>
            <p className="text-gray-500 mt-2">Inserisci le tue credenziali per accedere</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@esempio.it"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="Ricordami"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary-500 hover:text-primary-600 font-medium"
              >
                Password dimenticata?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
              Accedi
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Credenziali demo:</strong><br />
              Email: demo@esempio.it<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
