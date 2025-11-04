  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import Image from 'next/image';

  export default function HRPortal() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const validPasswords = ['README', 'readme', 'Readme'];
      if (validPasswords.includes(password)) {
        router.push('/candidate-dashboard-portal-cards/angry-hr-complaint/onboarding');
      } else {
        setError('Incorrect password. Think about what developers always read first...');
      }
    };

    return (
      <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/memes/raccoon.png"
                alt="Raccoon hacker"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold">HR Internal Portal</h1>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-yellow-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Security Check Required</span>
                </div>
                <p className="text-gray-600 text-sm">
                  This internal portal requires authentication. If you found this through our Hacktoberfest challenge, 
                  you might remember what was removed...
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Portal Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the password..."
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Access Portal
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Forgot password? Check the Hacktoberfest PR history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }