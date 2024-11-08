import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationsPanel from './NotificationsPanel';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <span className="ml-3 text-xl font-semibold text-gray-800">E-Crime ID System</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.badge}</span>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <button 
                onClick={logout}
                className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setShowMenu(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-4">
                <li>
                  <a href="#dashboard" className="block py-2 text-gray-700 hover:text-indigo-600">Dashboard</a>
                </li>
                <li>
                  <a href="#cases" className="block py-2 text-gray-700 hover:text-indigo-600">Cases</a>
                </li>
                <li>
                  <a href="#suspects" className="block py-2 text-gray-700 hover:text-indigo-600">Suspects</a>
                </li>
                <li>
                  <a href="#reports" className="block py-2 text-gray-700 hover:text-indigo-600">Reports</a>
                </li>
                <li>
                  <a href="#settings" className="block py-2 text-gray-700 hover:text-indigo-600">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}

      {/* Notifications Panel */}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
    </nav>
  );
}