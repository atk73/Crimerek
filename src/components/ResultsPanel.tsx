import React, { useState, useMemo } from 'react';
import { AlertTriangle, User, Filter } from 'lucide-react';
import { mockSuspects } from '../data/mockData';
import type { Suspect } from '../types';

export default function ResultsPanel() {
  const [filter, setFilter] = useState<'all' | 'wanted' | 'person of interest'>('all');
  const [sortBy, setSortBy] = useState<'confidence' | 'date'>('confidence');

  const filteredResults = useMemo(() => {
    let results = [...mockSuspects];
    
    if (filter !== 'all') {
      results = results.filter(suspect => suspect.status === filter);
    }

    return results.sort((a, b) => {
      if (sortBy === 'confidence') {
        return (b.matchConfidence || 0) - (a.matchConfidence || 0);
      }
      return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
    });
  }, [filter, sortBy]);

  const renderSuspectCard = (suspect: Suspect) => (
    <div
      key={suspect.id}
      className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-indigo-200"
    >
      <div className="flex items-start space-x-4">
        <img
          src={suspect.image}
          alt={suspect.name}
          className="w-20 h-20 rounded-lg object-cover"
          loading="lazy"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {suspect.name}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              suspect.status === 'wanted' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {suspect.status === 'wanted' ? (
                <AlertTriangle className="w-3 h-3 mr-1" />
              ) : (
                <User className="w-3 h-3 mr-1" />
              )}
              {suspect.status}
            </span>
          </div>
          
          <p className="mt-1 text-sm text-gray-500">
            Case #{suspect.caseNumber} - {suspect.crimeType}
          </p>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {suspect.description}
          </p>

          {suspect.matchConfidence && (
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-500">
                  Match Confidence:
                </span>
                <div className="ml-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${suspect.matchConfidence}%` }}
                  />
                </div>
                <span className="ml-2 text-xs font-medium text-gray-500">
                  {suspect.matchConfidence}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Search Results</h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="wanted">Wanted</option>
              <option value="person of interest">Person of Interest</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="confidence">Sort by Confidence</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredResults.map(renderSuspectCard)}
      </div>
    </div>
  );
}