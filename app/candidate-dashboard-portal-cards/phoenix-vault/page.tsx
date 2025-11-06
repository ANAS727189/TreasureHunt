'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PhoenixVault() {
  const router = useRouter();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Project Phoenix Roadmap (CONFIDENTIAL)</h1>
        <p className="text-gray-300 mb-6">
          This is the future of our company. Watch the mandatory 30-minute roadmap video
          to find the final access key.
        </p>
        
        {/* The 10-Minute Boring Video Trap */}
        <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/LNYm40RmRzs?controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&fs=0"
            title="Project Phoenix Roadmap"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
          />


        </div>

        <p className="text-gray-500 text-sm mt-6 animate-pulse">
          Scrubbing the video for a 1-second clue{dots}
        </p>

        <p className="text-gray-400 mt-12">
          (Did you find the 'secret' URL that flashes at 23m 30s?)
        </p>
        <a 
          href="/candidate-dashboard-portal-cards/phoenix-final-step" 
          className="text-blue-400 hover:text-blue-200 text-lg underline"
        >
          Click here once you have it.
        </a>
      </div>
    </main>
  );
}