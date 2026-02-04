'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  userName: string;
  selectedLocation: string;
  locations: { id: string; name: string }[];
  onLocationChange: (locationId: string) => void;
  onLogout: () => void;
}

const pathTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/contacts': 'Contatti',
  '/admin/analytics': 'Analytics',
  '/admin/geography': 'Provenienza',
  '/admin/access-logs': 'Storico Accessi',
  '/admin/email': 'Email Marketing',
  '/admin/locations': 'Sedi',
  '/admin/settings': 'Impostazioni',
};

export function Header({ userName, selectedLocation, locations, onLocationChange, onLogout }: HeaderProps) {
  const pathname = usePathname();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTitle = pathTitles[pathname] || 'Dashboard';
  const selectedLocationName = locations.find(l => l.id === selectedLocation)?.name || 'Tutte le sedi';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-900">{currentTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Location Selector */}
        <div className="relative" ref={locationRef}>
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700">{selectedLocationName}</span>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', showLocationDropdown && 'rotate-180')} />
          </button>
          
          {showLocationDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => {
                  onLocationChange('all');
                  setShowLocationDropdown(false);
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors',
                  selectedLocation === 'all' && 'bg-primary-50 text-primary-600'
                )}
              >
                Tutte le sedi
              </button>
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    onLocationChange(location.id);
                    setShowLocationDropdown(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors',
                    selectedLocation === location.id && 'bg-primary-50 text-primary-600'
                  )}
                >
                  {location.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setHasNotifications(false)}
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', showUserDropdown && 'rotate-180')} />
          </button>
          
          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">Amministratore</p>
              </div>
              <a
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Impostazioni
              </a>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
