import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import SearchPanel from './components/SearchPanel';
import ResultsPanel from './components/ResultsPanel';
import DashboardStats from './components/DashboardStats';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <DashboardStats />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <SearchPanel />
          </div>
          <div>
            <ResultsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;