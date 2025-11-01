'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle the form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Stop the page from reloading
    setError('');

    // Send the username and password to our API route
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // If the API returns a 200 OK, redirect to the dashboard
      router.push('/dashboard');
    } else {
      // If the API returns an error, show it to the user
      const data = await res.json();
      setError(data.error || 'Login failed. Try again.');
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-gray-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Applicant Portal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* The explicit clue */}
          <p className="text-xs text-gray-400 pt-2">
            <strong>Clue:</strong> HR said the credentials are in a 'source' that
            is 'commented' on by the devs.
          </p>

          {/* Show error message if login fails */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Bypass Gate
          </button>
        </form>
      </div>
    </div>
  );
}