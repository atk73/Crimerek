import React, { useState } from 'react';
import { Search, X, User, Folder, AlertTriangle } from 'lucide-react';
import { mockSuspects, mockCases } from '../data/mockData';

export default function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');

  const filteredSuspects = mockSuspects.filter(suspect =>
    suspect.name.toLowerCase().includes(query.toLowerCase()) ||
    suspect.caseNumber?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCases = mockCases.filter(case_ =>
    case_.title.toLowerCase().includes(query.toLowerCase()) ||
    case_.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
      <div className="relative max-w-2xl mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="p-4">
            <div className="flex items-center border-b pb-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases, suspects, reports..."
                className="ml-3 flex-1 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <button onClick={onClose}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="mt-4 max-h-96 overflow-y-auto">
              {query && (
                <div className="space-y-6">
                  {/* Suspects */}
                  {filteredSuspects.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Suspects</h3>
                      {filteredSuspects.map(suspect => (
                        <div key={suspect.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                          <User className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{suspect.name}</p>
                            <p className="text-xs text-gray-500">Case #{suspect.caseNumber}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cases */}
                  {filteredCases.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Cases</h3>
                      {filteredCases.map(case_ => (
                        <div key={case_.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                          <Folder className="h-5 w-5 text-gray-400" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{case_.title}</p>
                            <p className="text-xs text-gray-500">ID: {case_.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No results */}
                  {filteredSuspects.length === 0 && filteredCases.length === 0 && (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}