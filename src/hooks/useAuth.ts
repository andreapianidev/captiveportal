'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/localStorage';
import { User } from '@/types';

const DEMO_USER: User = {
  id: 'user-1',
  email: 'demo@esempio.it',
  name: 'Mario Rossi',
  tenantId: 'demo-1',
};

const DEMO_CREDENTIALS = {
  email: 'demo@esempio.it',
  password: 'demo123',
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = storage.auth.get<User | null>(null);
    setUser(savedAuth);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setUser(DEMO_USER);
      storage.auth.set(DEMO_USER);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    storage.auth.clear();
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
}
