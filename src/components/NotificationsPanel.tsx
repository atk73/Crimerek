import React from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'alert',
    message: 'New suspect match found in Case #CYB-2024-001',
    time: '5 minutes ago',
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    id: 2,
    type: 'success',
    message: 'Case #FRD-2024-003 has been updated with new evidence',
    time: '1 hour ago',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 3,
    type: 'info',
    message: 'Scheduled system maintenance in 2 hours',
    time: '2 hours ago',
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  }
];

export default function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-lg font-semibold">Notifications</span>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${notification.bgColor} border-b last:border-b-0`}
          >
            <div className="flex items-start">
              <notification.icon className={`h-5 w-5 ${notification.color} mt-1`} />
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
          View all notifications
        </button>
      </div>
    </div>
  );
}