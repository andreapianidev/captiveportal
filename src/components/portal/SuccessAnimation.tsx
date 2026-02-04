'use client';

import { useEffect, useState } from 'react';

export function SuccessAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className={`absolute inset-0 rounded-full bg-green-100 pulse-ring ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-2 rounded-full bg-green-200 pulse-ring ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }} />
      <div className={`absolute inset-4 rounded-full bg-green-500 flex items-center justify-center transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            className={isVisible ? 'animate-checkmark' : ''}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: isVisible ? 0 : 100,
              transition: 'stroke-dashoffset 0.5s ease-out 0.3s',
            }}
          />
        </svg>
      </div>
    </div>
  );
}
