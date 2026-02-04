'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { ToastProvider } from '@/components/ui/Toast';
import { storage } from '@/lib/localStorage';
import { User } from '@/types';
import { getDefaultTenant } from '@/data/mockTenants';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('all');

  const tenant = getDefaultTenant();

  useEffect(() => {
    const savedAuth = storage.auth.get<User | null>(null);
    if (!savedAuth && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setUser(savedAuth);
    }
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    storage.auth.clear();
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return (
      <ToastProvider>
        {children}
      </ToastProvider>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar onLogout={handleLogout} />
        <div className="lg:pl-64 transition-all duration-300">
          <Header
            userName={user.name}
            selectedLocation={selectedLocation}
            locations={tenant.locations}
            onLocationChange={setSelectedLocation}
            onLogout={handleLogout}
          />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
