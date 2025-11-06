'use client';

import { useState, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { extractValidPath } from '@/lib/path-utils';

function WinnerPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = extractValidPath(searchParams.get('path'));

  useEffect(() => {
  if (typeof window === 'undefined') return;

  const puzzleProgress = localStorage.getItem('puzzleProgress');
  if (puzzleProgress !== 'GRIND_SOLVED') {
    router.push('/candidate-dashboard-portal-cards/stack');
  }
}, [router]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      setMessage('Please enter a name!');
      return;
    }

    const res = await fetch('/api/submit-winner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name.trim(),
        path: path
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Welcome to the club, ${name}!`);
      setSubmitted(true);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {!submitted ? (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <Image
              src="/memes/winner-tfg.jpg"
              alt="Free real estate meme"
              width={400}
              height={300}
              className="mx-auto mb-8 rounded-lg"
            />
            
            <h1 className="text-3xl font-bold mb-6 text-center">
              You are a real Winner, You actually made it!
            </h1>
             <h4 className="text-2xl font-semibold mb-6 text-center">
              Winner Winner Paneer Dinner...
            </h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xl font-medium mb-2">
                  Sign the Wall of Fame:
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>

              {message && (
                <p className="text-center text-red-600">{message}</p>
              )}
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Achievement Unlocked: Master Hacker</h2>
              <p className="text-gray-700 mb-4">
                {message}
              </p>
              <Image
                src="/memes/agree-condition.webp"
                alt="Agreement meme"
                width={400}
                height={300}
                className="mx-auto rounded-lg mb-6"
              />
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Your Victory Dance:</h2>
              <video
                autoPlay
                loop
                controls
                className="w-full rounded-lg mb-6"
                src="/memes/happy-diwali-jethalal-video-meme-download.mp4"
              />
              <Image
                src="/memes/shut-up-take-money.webp"
                alt="Shut up and take my money meme"
                width={400}
                height={300}
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


export default WinnerPage;