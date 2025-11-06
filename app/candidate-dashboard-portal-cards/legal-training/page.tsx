'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const TOTAL_SLIDES = 100;

export default function LegalTraining() {
  const router = useRouter();
  const [slide, setSlide] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState('');

  const handleNext = () => {
    if (slide < TOTAL_SLIDES) {
      setSlide(prev => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(quizAnswers).length < 3) {
      setError('Please answer all questions.');
      return;
    }
    setError('Submitting your answers... please wait...');
    setTimeout(() => {
      router.push('/tu-nalla-hi-marega');
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Mandatory Legal & Compliance Training
        </h1>
        <p className="text-gray-600 mb-6">Status: <span className="text-red-600 font-bold">OVERDUE</span></p>

        {!showQuiz ? (
          <div>
            <Image
              src="/memes/agree-condition.webp"
              alt="Boring legal"
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-xl font-semibold mb-4 text-slate-600">Slide {slide} of {TOTAL_SLIDES}: Our 'GRIND' Values</h2>
            <p className="text-gray-700 mb-6">
              This is slide number {slide}. On this slide, we discuss... (Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet 
              odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra...)
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(slide / TOTAL_SLIDES) * 100}%` }}
              ></div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              {slide === TOTAL_SLIDES ? 'Proceed to Quiz' : 'Next'}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Quiz</h2>
            <form onSubmit={handleQuizSubmit} className="space-y-6">
              <div>
                <p className="font-medium mb-2">1. Can you steal Brenda's yogurt?</p>
                <label className="block"><input type="radio" name="q1" value="a" onChange={() => setQuizAnswers(p => ({...p, 1: 'a'}))} /> No</label>
                <label className="block"><input type="radio" name="q1" value="b" onChange={() => setQuizAnswers(p => ({...p, 1: 'b'}))} /> Absolutely Not</label>
              </div>
              <div>
                <p className="font-medium mb-2">2. What is our core value?</p>
                <label className="block"><input type="radio" name="q2" value="a" onChange={() => setQuizAnswers(p => ({...p, 2: 'a'}))} /> GRIND</label>
                <label className="block"><input type="radio" name="q2" value="b" onChange={() => setQuizAnswers(p => ({...p, 2: 'b'}))} /> All of the above</label>
              </div>
              <div>
                <p className="font-medium mb-2">3. What is the CEO's project?</p>
                <label className="block"><input type="radio" name="q3" value="a" onChange={() => setQuizAnswers(p => ({...p, 3: 'a'}))} /> Project Phoenix</label>
                <label className="block"><input type="radio" name="q3" value="b" onChange={() => setQuizAnswers(p => ({...p, 3: 'b'}))} /> Project Nalla</label>
              </div>
              
              {error && <p className="text-red-600">{error}</p>}
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
              >
                Submit & Complete Training
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}