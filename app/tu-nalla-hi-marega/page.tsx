'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoserPage() {
  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReferrer(document.referrer);
    }
  }, []);

  // Different messages based on how they got here
  const getMessage = () => {
    if (referrer.includes('/demo-wait')) {
      return {
        title: "Wait... tum demo request kar rahe ho? Tumhe khareedna hai??",
        message: "Bhai, tum job lene aaye the ya product bechne? Tumne 10 minute ek fake form bharne mein laga diye. Tum hacker nahi, tum 'potential lead' ho marketing ke liye.",
        meme: "doraemon-acha-laude.gif"
      };
    } else if (referrer.includes('/annual-report')) {
      return {
        title: "Aapko kya laga? Company ka 'Annual Report' download kar loge?",
        message: "Bhai, hum yahaan 15,000/- ki job ke liye lad rahe hain, tum company ke 'financials' check kar rahe ho? Tumhe job chahiye ya company khareedni hai?",
        meme: "worthless.webp"
      };
    } else {
      return {
        title: "Achaaaaaa 🤦‍♂️",
        message: "Did you really think it would be that easy? This is what happens when you try random URLs!",
        meme: "doraemon-acha-laude.gif"
      };
    }
  };

  const content = getMessage();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          {content.title}
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Image
            src={`/memes/${content.meme}`}
            alt="Reaction Meme"
            width={400}
            height={300}
            className="mx-auto mb-6 rounded-lg"
            priority
          />
          
          <div className="space-y-4 text-lg">
            <p className="text-gray-700">
              {content.message}
            </p>

            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-2xl text-red-600 font-bold">
                tu nalla hi marega
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
