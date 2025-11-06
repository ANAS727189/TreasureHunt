'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function FinalReview() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = 'lol321';

    if (answer.trim().toLowerCase() === correctAnswer) {
      setError('');
      router.push('/candidate-dashboard-portal-cards/apply/4wkcnaVUR4M8huJ83QVK+vlq2JFzCb7JC3zM6eX7/Xc?path=apply-1');
    } else {
      setError('Cultural fit... not detected. Access Denied.');
      setTimeout(() => {
        router.push('/tu-nalla-hi-marega');
      }, 5000);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <Image
          src="/memes/Wait-A-Minute.webp"
          alt="One More Thing"
          width={400}
          height={200}
          className="mx-auto rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">
          Final 'Cultural Fit' Verification
        </h1>
        <p className="text-lg text-gray-300 mb-6 text-center">
          You've proven you're a technician. But are you a 'fit'?
          <br />
          Solve this riddle based on the clues you *just* found.
        </p>

        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          <p className="font-mono text-gray-200">
            "My <strong>first</strong> part is the *sound* of the 'joke' that holds this company together."
            <br />
            (Hint: The Legacy API Token)
          </p>
          <hr className="my-3 border-gray-600" />
          <p className="font-mono text-gray-200">
            "My <strong>second</strong> part is the simple *count* found in the referral."
            <br />
            (Hint: Raj's code)
          </p>
          <hr className="my-3 border-gray-600" />
          <p className="font-mono text-yellow-300 text-lg">
            "But here we don't count forwards, we pivot!"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-300">
              Enter Your Final Access Key:
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center animate-pulse">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Unlock Offer
          </button>
        </form>
      </div>
    </main>
  );
}