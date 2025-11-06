'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ITHelpDesk() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 60000));

    setLoading(false);
    setSubmitted(true); 
    setTimeout(() => {
      router.push('/tu-nalla-hi-marega');
    }, 1200000); 
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <Image
          src="/memes/works-on-my-machine.webp"
          alt="IT Help Desk"
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          IT Help Desk - Submit a Ticket
        </h1>
        <p className="text-gray-600 mb-6">
          Found a bug in the treasure hunt? Report it here. (We *definitely* read these.)
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="os" className="block text-sm font-medium text-gray-700 mb-1">Operating System (OS)</label>
              <input type="text" id="os" required className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., Windows 11, macOS Sonoma" />
            </div>
            <div>
              <label htmlFor="browser" className="block text-sm font-medium text-gray-700 mb-1">Browser & Version</label>
              <input type="text" id="browser" required className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="e.g., Chrome 125.0.1" />
            </div>
            <div>
              <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">Steps to Reproduce (min. 50 words)</label>
              <textarea id="steps" rows={5} required minLength={50} className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="1. I clicked on... 2. Then I saw... 3. The page..."></textarea>
            </div>
            <div>
              <label htmlFor="expected" className="block text-sm font-medium text-gray-700 mb-1">Expected Behavior</label>
              <input type="text" id="expected" required className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="It should have given me the winner page!" />
            </div>
            <div>
              <label htmlFor="actual" className="block text-sm font-medium text-gray-700 mb-1">Actual Behavior</label>
              <input type="text" id="actual" required className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="It did nothing / I'm still a nalla." />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Submitting Ticket..." : "Submit Ticket"}
            </button>
          </form>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Ticket Submitted!</h2>
            <p className="text-gray-700 mb-6">
              Thank you! Your ticket `HR-69420` has been received. An IT professional will
              review your issue... eventually.
            </p>
            <p className="text-sm text-gray-500">Redirecting you now...</p>
          </div>
        )}
      </div>
    </main>
  );
}