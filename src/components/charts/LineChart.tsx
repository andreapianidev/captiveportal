'use client';

import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface LineChartProps {
  data: { date: string; contacts: number }[];
  height?: number;
}

export function LineChart({ data, height = 300 }: LineChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    dateLabel: new Date(item.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="dateLabel" 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          labelStyle={{ color: '#111827', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="contacts"
          stroke="#1E3A5F"
          strokeWidth={2}
          dot={{ fill: '#1E3A5F', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#1E3A5F' }}
          name="Contatti"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
