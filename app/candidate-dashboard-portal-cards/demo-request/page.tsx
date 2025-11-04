'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DemoRequest() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 480000));
    router.push('/candidate-dashboard-portal-cards/demo-wait');
  };

  return (
    <main className=" text-slate-800 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Image
            src="/memes/agree-condition.webp"
            alt="Agree to conditions"
            width={300}
            height={200}
            className="mx-auto rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Experience Our AI-Synergy in Action!
          </h1>
          <p className="text-xl text-gray-600">
            Unlock the power of next-gen technology with a personalized demo
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Corporate Email *</label>
                <input type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Must be a valid corporate email address</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input type="tel" required pattern="[0-9]{10}" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Company Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Size *</label>
                <select required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Role *</label>
                <select required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select role</option>
                  <option value="ceo">CEO</option>
                  <option value="intern">Intern</option>
                  <option value="synergy">Synergy Manager</option>
                  <option value="10x">10x Developer</option>
                  <option value="blockchain">Blockchain Evangelist</option>
                  <option value="ai">AI Whisperer</option>
                </select>
              </div>
            </div>

            {/* Technical Assessment */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Technical Assessment</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">What is your biggest operational pain point? *</label>
                <textarea required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Define a 10x developer in your own words *</label>
                <textarea required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">How would you reverse a binary tree while maintaining O(1) space complexity? *</label>
                <textarea required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>

            {/* More Questions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Explain how blockchain can improve your coffee machine *</label>
                <textarea required rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Write a haiku about cloud computing *</label>
                <textarea required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>

            {/* Advanced Requirements */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Advanced Requirements</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Solve this captcha: What is 9 + 10? (Answer in words) *</label>
                <input type="text" required pattern="twenty[ -]?one" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Hint: It's a meme</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">What color is your bugatti? *</label>
                <select required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select color</option>
                  <option value="no">I don't have one</option>
                  <option value="crying">😭</option>
                  <option value="cope">I have a Honda</option>
                  <option value="what">What color is YOUR Bugatti?</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">When does the narwhal bacon? *</label>
                <input type="text" required pattern="midnight" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Only true Redditors know this</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload your most viral LinkedIn post about hustle culture *</label>
                <textarea required rows={3} placeholder="Started my day at 3 AM..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Draw the GitHub contribution graph of a 10x developer *</label>
                <textarea required rows={5} placeholder="Use ASCII art" className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rate your understanding of recursion *</label>
                <select required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">To understand recursion...</option>
                  <option value="recursion">You must first understand recursion</option>
                  <option value="recursion2">To understand recursion...</option>
                  <option value="base">Stack Overflow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Predict the next JavaScript framework name *</label>
                <input type="text" required pattern="[A-Za-z]+[Jj][Ss]" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Must end with 'js' or 'JS'</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">How many tabs vs spaces do you use? *</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" required min="0" placeholder="Tabs" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  <input type="number" required min="0" placeholder="Spaces" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Write "Hello World" in Brainfuck *</label>
                <input type="text" required pattern="[+\-<>.,\[\]]*" className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Only valid Brainfuck characters allowed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">How many Chrome tabs do you have open right now? *</label>
                <input type="number" required min="42" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Be honest (minimum 42)</p>
              </div>
            </div>

            {/* Professional Qualifications */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Professional Qualifications</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of years experience with technologies that were released this year *</label>
                <input type="number" required min="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Minimum 5 years required</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your preferred method of center-aligning a div *</label>
                <select required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select method</option>
                  <option value="table">Table with spacer GIFs</option>
                  <option value="margin">margin: 0 auto;</option>
                  <option value="flex">Flexbox</option>
                  <option value="grid">Grid</option>
                  <option value="prayer">Prayer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Explain quantum computing using only emojis *</label>
                <input type="text" required pattern="[😀-🙏]{10,}" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                <p className="mt-1 text-sm text-gray-500">Minimum 10 emojis required</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-6">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700">
                    I agree to the Terms and Conditions *
                  </label>
                  <p className="text-gray-500">
                    By checking this box, you agree to our lengthy Terms of Service, Privacy Policy, 
                    Cookie Policy, Data Usage Policy, Soul Transfer Agreement, First Born Child Policy,
                    and acknowledge that resistance is futile.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Processing...' : 'Submit Demo Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}