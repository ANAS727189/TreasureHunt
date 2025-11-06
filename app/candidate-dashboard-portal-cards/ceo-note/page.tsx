'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CeoNote() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === 'PHOENIX') {
      router.push('/candidate-dashboard-portal-cards/phoenix-vault');
    } else {
      setError('Incorrect Vault Key. Did you read the note carefully?');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <Image
          src="/memes/Wait-A-Minute.webp"
          alt="Our Vision"
          width={800}
          height={300}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">A Note From Our CEO</h1>
        <p className="text-gray-600 mb-6">"On Our Bold New Future: Project Phoenix"</p>

        <div className="prose max-w-none text-gray-800 space-y-4">
          <p>
            <strong>P</strong>eople are the cornerstone of our success. We believe in
            investing in our team and fostering a culture of 'GRIND'.
          </p>
          <p>
            <strong>H</strong>owever, culture alone is not enough. We are on the precipice
            of a new technological dawn, a revolution in how we do business.
          </p>
          <p>
            <strong>O</strong>ur new initiative, codenamed 'Project Phoenix', will redefine
            our industry. It is a testament to our commitment to innovation.
          </p>
          <p>
            <strong>E</strong>very single employee must be aligned with this vision. We will
            leverage our synergies and pivot our core competencies.
          </p>
          <p>
            <strong>N</strong>ow, more than ever, we must think outside the box. This project
            is under 'lock and key' for a reason.
          </p>
          <p>
            <strong>I</strong> am confident that 'Project Phoenix' will lead us to unparalleled
            heights. The key to our future is in this project.
          </p>
          <p>
            <strong>X</strong> marks the spot. Our future starts now.
          </p>
        </div>

        <hr className="my-8" />

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access the Project Vault</h2>
          <p className="text-gray-600 mb-4">
            Enter the Vault Key (found in the CEO's note) to access the project roadmap.
          </p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter Vault Key..."
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Unlock
            </button>
          </form>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </main>
  );
}