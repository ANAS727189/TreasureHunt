'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HRComplaints() {
  const [playingFile, setPlayingFile] = useState<number | null>(null);
  const [puzzleProgress, setPuzzleProgress] = useState<string | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const progress = localStorage.getItem('puzzleProgress');
      setPuzzleProgress(progress);
    }
  }, []);

  const audioFiles = [
    { id: 1, title: "Complaint about Brenda's yogurt in the fridge", duration: "3:00" },
    { id: 2, title: "Thermostat wars escalate to HR", duration: "3:00" },
    { id: 3, title: "Someone keeps stealing lunch", duration: "3:00" },
    { id: 4, title: "Coffee machine politics", duration: "3:00" },
    { id: 5, title: "The great printer paper debate", duration: "3:00" },
    { id: 6, title: "Who keeps booking all meeting rooms?", duration: "3:00" },
    { id: 7, title: "Slack emoji reactions drama", duration: "3:00" },
    { id: 8, title: "The infamous birthday cake incident", duration: "3:00" },
    { id: 9, title: "Parking spot territorial dispute", duration: "3:00" },
    { id: 10, title: "Kitchen sink passive-aggressive notes", duration: "3:00" },
    { id: 11, title: "Important security breach details", duration: "3:00" },
  ];

  const getAudioFileName = (fileId: number) => {
    if (fileId === 11) return 'Audio-11.txt.m4a';
    return `Audio-${fileId}.m4a`;
  };

  const handlePlay = (fileId: number) => {
    setPlayingFile(fileId);
  };

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: '/candidate-dashboard-portal-cards/angry-hr-complaint/hr-values', text: 'Employee Value Framework' },
      { href: '/tu-nalla-hi-marega', text: 'HR Action Items' },
      { href: '/tu-nalla-hi-marega', text: 'Exit Interview Policy' },
    ];
    if (puzzleProgress === 'GRIND_SOLVED') {
      baseLinks.push(
        { href: '/candidate-dashboard-portal-cards/angry-hr-complaint/hr-portal', text: 'HR Internal Portal' }
      );
    }

    return baseLinks;
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong className="font-bold">Restricted Access!</strong>
          <span className="block sm:inline"> These files are for HR review only.</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            HR Exit Interview Recordings - 2025
          </h1>
          
          <div className="space-y-4">
            {audioFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Audio-{file.id}: {file.title}
                    </h3>
                    <p className="text-sm text-gray-500">Duration: {file.duration}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <audio
                      onPlay={() => handlePlay(file.id)}
                      controls
                      preload="none"
                      className="w-64"
                    >
                      <source src={`/audio/${getAudioFileName(file.id)}`} type="audio/mp4" />
                      Your browser does not support the audio element.
                    </audio>
                    <a
                      href={`/audio/${getAudioFileName(file.id)}`}
                      download={getAudioFileName(file.id)}
                      className="text-blue-600 hover:text-blue-800 flex-shrink-0"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Links Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Related HR Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getNavigationLinks().map((link: { href: string, text: string }, index: number) => (
              <Link
                key={index}
                href={link.href}
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}