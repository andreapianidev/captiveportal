'use client';

import { cn } from '@/lib/utils';

interface HeatmapProps {
  data: number[][];
  height?: number;
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function Heatmap({ data }: HeatmapProps) {
  const maxValue = Math.max(...data.flat());

  const getColor = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    const intensity = value / maxValue;
    if (intensity < 0.25) return 'bg-primary-100';
    if (intensity < 0.5) return 'bg-primary-200';
    if (intensity < 0.75) return 'bg-primary-300';
    return 'bg-primary-500';
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Hours header */}
        <div className="flex mb-1">
          <div className="w-12" />
          {HOURS.filter((_, i) => i % 2 === 0).map((hour) => (
            <div key={hour} className="flex-1 text-center text-xs text-gray-500">
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
        </div>

        {/* Grid */}
        {data.map((dayData, dayIndex) => (
          <div key={dayIndex} className="flex items-center mb-1">
            <div className="w-12 text-xs text-gray-500 font-medium">
              {DAYS[dayIndex]}
            </div>
            <div className="flex-1 flex gap-0.5">
              {dayData.map((value, hourIndex) => (
                <div
                  key={hourIndex}
                  className={cn(
                    'flex-1 h-6 rounded-sm transition-colors cursor-pointer hover:ring-2 hover:ring-primary-400',
                    getColor(value)
                  )}
                  title={`${DAYS[dayIndex]} ${hourIndex}:00 - ${value} accessi`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-gray-500">Meno</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 bg-gray-100 rounded-sm" />
            <div className="w-4 h-4 bg-primary-100 rounded-sm" />
            <div className="w-4 h-4 bg-primary-200 rounded-sm" />
            <div className="w-4 h-4 bg-primary-300 rounded-sm" />
            <div className="w-4 h-4 bg-primary-500 rounded-sm" />
          </div>
          <span className="text-xs text-gray-500">Più</span>
        </div>
      </div>
    </div>
  );
}
