'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const allQuestions = Array.from({ length: 100 }, (_, i) => {
  const buzzwords = ['synergy', 'leverage', 'core competency', 'GRIND', 'pivot', 'bandwidth'];
  return `Q.${i + 1}: On a scale of 1-5, how much do you 'feel' our ${buzzwords[i % buzzwords.length]}?`;
});

export default function MandatorySurvey() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState('');

  const handleSelect = (qIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < 100) {
      setError(`You have only answered ${Object.keys(answers).length} questions. All 100 are mandatory.`);
      return;
    }

    // The punchline
    setError('Thank you. Your submission is... noted.');
    setTimeout(() => {
      router.push('/tu-nalla-hi-marega');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Annual 'Corporate Culture' Survey
        </h1>
        <p className="text-gray-600 mb-6">
          Your feedback is critical to our success! Please answer all 100 questions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8 h-[80vh] overflow-y-scroll border p-4">
            {allQuestions.map((q, i) => (
              <div key={i} className="border-b pb-4">
                <p className="font-medium text-gray-800 mb-2">{q}</p>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map(val => (
                    <label key={val} className="text-sm">
                      <input 
                        type="radio" 
                        name={`q-${i}`} 
                        value={val} 
                        onChange={() => handleSelect(i, `${val}`)}
                        className="mr-1"
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700"
            >
              Submit 100-Question Survey
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}