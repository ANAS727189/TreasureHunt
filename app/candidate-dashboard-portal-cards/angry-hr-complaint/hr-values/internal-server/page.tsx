'use client';
import { useEffect } from 'react';

export default function InternalServer() {
  
  useEffect(() => {
  if (typeof window === 'undefined') return;

  const KEY = 'puzzleProgress';
  const EXPIRE_MS = 30 * 60 * 1000; // 30 min

  const now = Date.now();
  const stored = localStorage.getItem(KEY);
  const storedAt = localStorage.getItem(KEY + '_ts');

  if (stored && storedAt && now - Number(storedAt) > EXPIRE_MS) {
    localStorage.removeItem(KEY);
    localStorage.removeItem(KEY + '_ts');
  }

  localStorage.setItem(KEY, 'GRIND_SOLVED');
  localStorage.setItem(KEY + '_ts', String(now));
}, []);


  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-gray-400 text-sm">dev-notes.md</span>
          </div>

          <div className="p-6 space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dev Team Notes</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>Last updated: November 3, 2025</span>
                <span className="mx-2">•</span>
                <span>By: Raj (Dev Lead)</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Notice 📢</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Raj has set a new password for the Dev Portal. Here&apos;s the riddle to find it:
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-lg text-center font-medium text-gray-800 mb-4">🔍 The Riddle</p>
                <div className="space-y-4 text-gray-600">
                  <p className="text-center italic">
                    I have no voice, but I can teach you all languages.<br/>
                    I have no body, but I can show you the world.<br/>
                    I was &apos;read&apos; by all, but now I am deleted.<br/>
                    <br/>
                    What am I?
                  </p>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <p>Remember:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>If you forget the password, think about what got deleted in the Hacktoberfest PR.</li>
                  <li>Keep track of the case sensitivity - it might matter!</li>
                  <li>Once you have the password, head back to the HR portal.</li>
                </ul>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  Debug Notes
                </h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
                  <code>
                    {`$ git log --oneline
a1b2c3d Initial commit
e4f5g6h Add documentation
i7j8k9l Delete README.md // Hacktoberfest PR
m0n1o2p Update security
...`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}