import React, { useMemo } from 'react';
import { Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockSuspects, mockCases } from '../data/mockData';

export default function DashboardStats() {
  const stats = useMemo(() => [
    {
      name: 'Active Cases',
      value: mockCases.filter(c => c.status === 'open').length,
      icon: Clock,
      color: 'bg-blue-500',
      trend: '+5% this week'
    },
    {
      name: 'Wanted Suspects',
      value: mockSuspects.filter(s => s.status === 'wanted').length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: '-2% this week'
    },
    {
      name: 'Persons of Interest',
      value: mockSuspects.filter(s => s.status === 'person of interest').length,
      icon: Users,
      color: 'bg-yellow-500',
      trend: '+3% this week'
    },
    {
      name: 'Resolved Cases',
      value: mockCases.filter(c => c.status === 'closed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+8% this week'
    }
  ], []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}