'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function MapToolPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === '1984') {
      localStorage.setItem('mapToolAccess', 'granted');
      router.push('/candidate-dashboard-portal-cards/stack/map-tool-unlocked');
    } else {
      setError('Invalid override code. Access denied.');
      setCode('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-slate-900">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-6a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            This tool is deprecated and locked. Please enter the 4-digit override code to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="sr-only">Override Code</label>
            <input
              type="text"
              id="code"
              placeholder="Enter 4-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
              pattern="[0-9]*"
              className="w-full text-center text-2xl tracking-widest p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Code
          </button>
        </form>
      </div>
    </main>
  );
}