import React, { useState, useCallback } from 'react';
import { Upload, Search, Image as ImageIcon } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export default function SearchPanel() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload JPG or PNG files only.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10MB limit.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Search Suspects</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, case number, or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleFileInput}
          />
          
          {selectedFile ? (
            <div className="space-y-2">
              <ImageIcon className="mx-auto h-12 w-12 text-indigo-500" />
              <p className="text-sm text-gray-600">{selectedFile.name}</p>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop suspect photo or{' '}
                <label
                  htmlFor="fileInput"
                  className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  browse files
                </label>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports JPG, PNG - Max file size 10MB
              </p>
            </>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          className={`w-full py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            selectedFile
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedFile}
        >
          Start Search
        </button>
      </div>
    </div>
  );
}