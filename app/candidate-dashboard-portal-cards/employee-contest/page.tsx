'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EmployeeContest() {
  const router = useRouter();
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isQ1 = answers.q1.trim().toUpperCase() === 'FAGE';
    const isQ2 = answers.q2.trim() === '72';
    const isQ3 = answers.q3.trim() === '6838';

    if (isQ1 && isQ2 && isQ3) {
      setError('Verifying your answers... this is it!');
      setTimeout(() => {
        router.push('/tu-nalla-hi-marega');
      }, 60000);
    } else {
      setError('Wrong answers! Your vote is invalid. Did you even listen to the complaints?');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Vote: Employee of the Month!</h1>
        <p className="text-gray-600 mb-6">
          Vote for your favorite colleague! To validate your vote, you must
          answer 3 security questions to prove you work here.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8 text-center text-slate-600">
          <div className="p-4 border rounded-lg"><Image src="/memes/chillguy.png" alt="Raj" width={100} height={100} className="mx-auto rounded-full w-24 h-24 mb-2"/>Raj (Dev)</div>
          <div className="p-4 border rounded-lg"><Image src="/memes/blanket.png" alt="Brenda" width={100} height={100} className="mx-auto rounded-full w-24 h-24 mb-2"/>Brenda (Accounting)</div>
          <div className="p-4 border rounded-lg"><Image src="/memes/raccoon.png" alt="Tom" width={100} height={100} className="mx-auto rounded-full w-24 h-24 mb-2"/>Tom (Facilities)</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Q1: What brand of yogurt did Brenda have stolen?
            </label>
            <input type="text" onChange={(e) => setAnswers(p => ({...p, q1: e.target.value}))} className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="(Hint: Listen to the Grievance Hotline...)" />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Q2: What is Tom's "optimal" thermostat temperature (in Fahrenheit)?
            </label>
            <input type="text" onChange={(e) => setAnswers(p => ({...p, q2: e.target.value}))} className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="(Hint: He's very... particular.)" />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Q3: What is Raj's "joke" Hacktoberfest PR number?
            </label>
            <input type="text" onChange={(e) => setAnswers(p => ({...p, q3: e.target.value}))} className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="(Hint: This is a 4-digit number.)" />
          </div>
          
          {error && <p className="text-red-600 text-center">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          >
            Submit Vote & Claim Prize
          </button>
        </form>
      </div>
    </main>
  );
}