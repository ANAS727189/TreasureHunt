'use client';

import Image from 'next/image';

export default function LoserPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Achaaaaaaaa 🤦‍♂️
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Image
            src="/memes/doraemon-acha-laude.gif"
            alt="Acha Laude Meme"
            width={400}
            height={300}
            className="mx-auto mb-6 rounded-lg"
          />
          
          <div className="space-y-4 text-lg">
            <p className="text-gray-700">
              Did you really think it would be that easy? 
              This is what happens when you try random URLs! 🤣
            </p>
            
            <p className="text-gray-600 italic">
              "Backtrack your way to victory"
            </p>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Pro tip: Maybe try following the actual clues instead of random guessing? 
                Just saying... 😉
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
