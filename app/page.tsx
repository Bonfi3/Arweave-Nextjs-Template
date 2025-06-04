'use client'

import React, { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [arweaveUrl, setArweaveUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setArweaveUrl(result.arweaveUrl);
      } else {
        alert(result.error || 'Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <main className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Upload File to Arweave
        </h1>
        
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Choose file
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <button 
          onClick={handleUpload} 
          disabled={uploading || !file}
          className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {uploading ? 'Uploading...' : 'Upload to Arweave'}
        </button>

        {arweaveUrl && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              File uploaded successfully! Access it here:
            </p>
            <a 
              href={arweaveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {arweaveUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
