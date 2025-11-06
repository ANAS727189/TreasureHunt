'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        setMessage('✅ Congratulations! Code verified successfully! Redirecting...');
        // Redirect to winner page
        setTimeout(() => {
          router.push('/candidate-dashboard-portal-cards/ye-nahi-kar-paaoge-tum/iA1IH13bDvbqqo8qgZ9CB1wPyPTX+y2DqZrsVfaQQng?path=ye-nahi-kar-paaoge-tum');
        }, 1500);
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
            <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-900">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-bold mb-2 text-gray-900">
              Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
              placeholder="Enter the code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
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