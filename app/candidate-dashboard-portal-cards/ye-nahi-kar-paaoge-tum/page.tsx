'use client';

import { useState } from 'react';

const Page = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/validate-quiz-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code }),
      });

      const data = await response.json();

      if (data.passed) {
        setMessage('✅ Congratulations! Code verified successfully!');
      } else {
        setMessage('❌ Invalid code. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Error submitting. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-2">
              Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="font-black text-black">
          Go To My github - ShardenduMishra22/ShardenduMishra22
        </div>

        <div className="hidden font-black text-black">
          Go To My github - ShardenduMishra22/ShardenduMishra22.
        </div>
      </div>
    </div>
  );
};

export default Page;