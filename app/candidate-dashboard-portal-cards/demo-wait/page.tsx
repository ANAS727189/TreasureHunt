'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoWait() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Checking calendars...",
    "Syncing with cloud...",
    "Optimizing synergy levels...",
    "Calculating blockchain potential...",
    "Enhancing AI parameters...",
    "Quantifying digital transformation...",
    "Leveraging agile methodologies...",
    "Disrupting traditional paradigms...",
    "Implementing DevOps culture...",
    "Maximizing ROI metrics...",
    "Finding a Naukri Success Specialist...",
    "Preparing your personalized roadmap...",
    "Aligning corporate values...",
    "Bootstrapping microservices...",
    "Orchestrating kubernetes clusters...",
  ];

  useEffect(() => {
    // Change message every 3 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 3000);

    // After 40 seconds, redirect to the trap page
    const redirectTimer = setTimeout(() => {
      router.push('/tu-nalla-hi-marega');
    }, 40000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Large Spinner */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Please wait...
        </h2>
        
        <p className="mt-2 text-lg text-gray-600">
          Thank you! Your request has been received. We are finding a &apos;Naukri Success Specialist&apos; for you.
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500 animate-pulse">
            {messages[currentMessage]}
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          This may take a few moments... we&apos;re preparing something special for you!
        </div>
      </div>
    </main>
  );
}