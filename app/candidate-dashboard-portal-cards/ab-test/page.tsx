'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AbTest() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { typos: { value: string } };
    const typos = target.typos.value;

    if (typos.toLowerCase().includes('synergie') && typos.toLowerCase().includes('compitent') && typos.toLowerCase().includes('agil') && typos.toLowerCase().includes('nimbl') && typos.length > 20) {
      setError('Great job! Your feedback is invaluable. Redirecting...');
      setTimeout(() => {
        router.push('/tu-nalla-hi-marega');
      }, 3000);
    } else {
      setError('We detected you missed some. Please review the text again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Us Redesign!</h1>
        <p className="text-gray-600 mb-6">Your feedback is critical. First, pick a design.</p>

        {/* Step 1: The Fake Choice */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6 text-slate-600">
            <button onClick={() => setStep(2)} className="p-4 border-4 border-blue-500 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Design A</h2>
              <p>(Very corporate and blue)</p>
            </button>
            <button onClick={() => setStep(2)} className="p-4 border-2 border-gray-300 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Design B</h2>
              <p>(Also very corporate and blue, but slightly darker)</p>
            </button>
          </div>
        )}

        {/* Step 2: The "Free Work" Trap */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Find the Typos</h2>
            <p className="text-gray-600 mb-4">
              Great choice! Now, please review our new "Careers" page text and
              list all spelling/grammar mistakes you find.
            </p>
            
            {/* The "Ghut Ghut Ke" text block */}
            <div className="h-64 overflow-y-scroll border p-4 bg-gray-50 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, incidunt quasi! Fugit nesciunt rem voluptatibus minima sequi error officia aliquam quae, nihil saepe reiciendis nemo numquam. Molestias saepe tempore possimus.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?

                Welcome to our compitent team! We are looking for 10x devs with
                strong 'synergie'. Our core valus are GRIND. We expect all
                employees to be 'agil' and 'nimbl'. If you are not a 'nalla',
                you might be a good fit. We offer many 'perks', like free
                coffee and a 'fun' work environment. Your 'compinsation'
                will be based on your experience. Please apply if you are a
                true 'rockstar' dev.
              </p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi quasi illo cum modi non beatae sed sequi reiciendis ea nam, repudiandae nisi blanditiis nihil quos qui maxime perferendis doloribus nobis?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel nesciunt beatae. Deserunt voluptas adipisci impedit dolorum, quam, reprehenderit libero cum quae earum quas molestias numquam omnis cupiditate, quis cumque!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nisi temporibus fugiat adipisci tenetur molestias. Excepturi rerum rem architecto officiis sequi assumenda porro illo non? Quidem iure voluptatibus harum quos!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus nam eum impedit! Explicabo doloribus commodi libero obcaecati? Cupiditate illum dolores voluptatem repellendus, architecto eaque quam. Doloribus optio eos quibusdam neque.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia excepturi magnam est nisi consequatur, impedit maiores mollitia laboriosam libero accusantium esse aliquam, error voluptatum voluptas at animi nesciunt necessitatibus vel?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <textarea
                name="typos"
                rows={5}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="List all mistakes here (e.g., 'compitent')..."
              ></textarea>
              {error && <p className="text-red-600 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}