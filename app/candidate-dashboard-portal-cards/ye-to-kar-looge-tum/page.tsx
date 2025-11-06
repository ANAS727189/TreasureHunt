'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [winnerSubmitted, setWinnerSubmitted] = useState(false);
  const router = useRouter();

  const handleToggle = (id: string) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setResult('Please enter your name first!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/validate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected, name: name.trim() }),
      });

      const data = await response.json();
      
      if (data.passed) {
        setResult('PASSED! 🎉 Redirecting to winner page...');
        setWinnerSubmitted(true);
        // Redirect to winner page
        setTimeout(() => {
          router.push('/candidate-dashboard-portal-cards/ye-to-kar-looge-tum/duRmg1oRmGn7Wtzwlmo4sMBKY8Qh2wSgm+MkbkPD/7M?path=ye-to-kar-looge-tum');
        }, 1500);
      } else {
        setResult('FAILED! Try again.');
      }
    } catch {
      setResult('Error submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Naam kya h tumhara?
        <br />
        Byah ho gaya ??
      </h1>
      <Image
        src="/memes/married.png"
        alt="Married meme"
        width={600}
        height={400}
        className="mb-6"
      />

      <div className="mb-8">
        <label htmlFor="name" className="block text-lg font-semibold text-black mb-2">
          Enter Your Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={winnerSubmitted}
        />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-black">Ye to kar looge tum</h1>
      <div className="space-y-6">
        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">If GitHub hosted weddings, what would they call the event?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q1-a')}>
              <span className="text-2xl">{selected['q1-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. git push origin master</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q1-b')}>
              <span className="text-2xl">{selected['q1-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. git merge spouse</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q1-c')}>
              <span className="text-2xl">{selected['q1-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. git commit -m &quot;Forever&quot;</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q1-d')}>
              <span className="text-2xl">{selected['q1-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. git status --single</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">Choose the correct spelling:</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q2-a')}>
              <span className="text-2xl">{selected['q2-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. Die</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q2-b')}>
              <span className="text-2xl">{selected['q2-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. Ied</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q2-c')}>
              <span className="text-2xl">{selected['q2-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. Eid</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q2-d')}>
              <span className="text-2xl">{selected['q2-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Dei</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">Kya lagta hai theme ke hisab se kya option sahi hoonge ?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q3-a')}>
              <span className="text-2xl">{selected['q3-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. Flyoff</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q3-b')}>
              <span className="text-2xl">{selected['q3-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. Layoff</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q3-c')}>
              <span className="text-2xl">{selected['q3-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. Falloff</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q3-d')}>
              <span className="text-2xl">{selected['q3-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Flow</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">What is the opposite of &quot;happy&quot; ?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q4-a')}>
              <span className="text-2xl">{selected['q4-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. Sad</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q4-b')}>
              <span className="text-2xl">{selected['q4-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. Dsa</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q4-c')}>
              <span className="text-2xl">{selected['q4-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. Very happy</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q4-d')}>
              <span className="text-2xl">{selected['q4-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Extremely happy</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">Which websites are most important for an engineer?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-a')}>
              <span className="text-2xl">{selected['q5-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. LinkedIn</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-b')}>
              <span className="text-2xl">{selected['q5-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. LeetCode</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-c')}>
              <span className="text-2xl">{selected['q5-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. GitHub</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-d')}>
              <span className="text-2xl">{selected['q5-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Calendar</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-e')}>
              <span className="text-2xl">{selected['q5-e'] ? '❌' : '⬜'}</span>
              <span className="text-black">E. Skill</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q5-f')}>
              <span className="text-2xl">{selected['q5-f'] ? '❌' : '⬜'}</span>
              <span className="text-black">F. Engine</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">What is the full form of AI?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q6-a')}>
              <span className="text-2xl">{selected['q6-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. Artificial Intelligence</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q6-b')}>
              <span className="text-2xl">{selected['q6-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. All India (is a good dev)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q6-c')}>
              <span className="text-2xl">{selected['q6-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. Air India</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q6-d')}>
              <span className="text-2xl">{selected['q6-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Almighty Indian</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-black text-lg">Which is the best college?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q7-a')}>
              <span className="text-2xl">{selected['q7-a'] ? '❌' : '⬜'}</span>
              <span className="text-black">A. Apna College lol</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q7-b')}>
              <span className="text-2xl">{selected['q7-b'] ? '❌' : '⬜'}</span>
              <span className="text-black">B. Apna College LOL</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q7-c')}>
              <span className="text-2xl">{selected['q7-c'] ? '❌' : '⬜'}</span>
              <span className="text-black">C. ICICI - Indian College of International Collegeing Institutes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q7-d')}>
              <span className="text-2xl">{selected['q7-d'] ? '❌' : '⬜'}</span>
              <span className="text-black">D. Mother Gandhi Super College</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <h3 className="font-semibold mb-3 text-lg" style={{ color: 'white', userSelect: 'text' }}>How to make an open source contribution?</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q8-a')}>
              <span className="text-2xl">{selected['q8-a'] ? '❌' : '⬜'}</span>
              <span style={{ color: 'white', userSelect: 'text' }}>A. Don&apos;t do it</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q8-b')}>
              <span className="text-2xl">{selected['q8-b'] ? '❌' : '⬜'}</span>
              <span style={{ color: 'white', userSelect: 'text' }}>B. Create README PR at Node.js</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q8-c')}>
              <span className="text-2xl">{selected['q8-c'] ? '❌' : '⬜'}</span>
              <span style={{ color: 'white', userSelect: 'text' }}>C. Create README PR at Express.js</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer" onClick={() => handleToggle('q8-d')}>
              <span className="text-2xl">{selected['q8-d'] ? '❌' : '⬜'}</span>
              <span style={{ color: 'white', userSelect: 'text' }}>D. Create README PR at React.js</span>
            </label>
          </div>
        </div>
      </div>
      
      {result && (
        <div className={`mt-6 p-4 rounded-lg text-center text-2xl font-bold ${
          result.includes('PASSED') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {result}
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        disabled={loading || winnerSubmitted || !name.trim()}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : winnerSubmitted ? 'Already Submitted!' : 'Submit'}
      </button>
    </div>
  )
}

export default Page
