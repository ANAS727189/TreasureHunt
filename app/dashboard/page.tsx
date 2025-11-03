import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-100 text-gray-900 font-sans">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-4xl font-bold mb-4 md:mb-0">
            Candidate Dashboard
          </h1>
          <div className="flex items-center space-x-2 p-2 bg-red-100 border border-red-300 rounded-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-700 font-semibold">
              8 'Urgent' Tasks Pending
            </span>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-10">
          You're in. Good job... hacker. Now the *real* test begins. HR has
          flagged the following items for your immediate attention. Choose your
          first task wisely.
        </p>

        {/* Footer Links - The Traps */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-6">
            <div>
              <span className="text-gray-400">Company Value:</span>
              <span className="ml-2 text-green-400">$4.20B</span>
            </div>
            <div>
              <span className="text-gray-400">Growth:</span>
              <span className="ml-2 text-green-400">+69%</span>
            </div>
          </div>
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <Link 
              href="/dashboard/demo-request"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Request a Demo
            </Link>
            <Link 
              href="/dashboard/annual-report"
              className="text-blue-400 hover:text-blue-300 underline flex items-center"
            >
              Download Annual Report (PDF, 50MB)
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </Link>
          </div>
        </div>

        {/* --- THE 8 PATHS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Path 1: The "Obvious" Path */}
          <Link
            href="/dashboard/apply"
            className="flex flex-col h-full bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm border border-blue-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/works-on-my-machine.webp" alt="It works on my machine meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                Apply: 'Urgent Code Ninja'
              </h2>
              <p className="text-blue-700">
                The standard application form. Seems simple enough...
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-blue-100">
              <strong>Priority:</strong> <span className="text-red-600 font-bold">HIGH</span><br/>
              <strong>Status:</strong> <Link href="/dashboard/status" className="text-blue-600 hover:underline">Pending Review</Link><br/>
              <strong>Owner:</strong> <Link href="/dashboard/owner" className="text-blue-600 hover:underline">HR Department</Link>
            </footer>
          </Link>

          {/* Path 2: The "Safe" Path */}
          <Link
            href="/dashboard/blog"
            className="flex flex-col h-full bg-green-50 hover:bg-green-100 rounded-lg shadow-sm border border-green-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/This-Is-Fine-Dog-Fire-Meme-Sticker.webp" alt="This is fine meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Company Blog
              </h2>
              <p className="text-green-700">
                See what our "happy" team has been writing about.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-green-100">
              <strong>Last Updated:</strong> 3 hours ago<br/>
              <strong>Author:</strong> Marketing Intern<br/>
              <strong>Views:</strong> 12
            </footer>
          </Link>

          {/* Path 3: The "Networking" Path */}
          <Link
            href="/dashboard/team"
            className="flex flex-col h-full bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-sm border border-indigo-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/240px-Distracted_Boyfriend_meme_4.webp" alt="Distracted boyfriend meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-indigo-800 mb-2">
                Meet the Team
              </h2>
              <p className="text-indigo-700">
                Find out who your future (or former) colleagues are.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-indigo-100">
              <strong>Contains:</strong> Directory, Org Chart<br/>
              <strong>Action:</strong> <span className="text-blue-600">Connect</span><br/>
              <strong>Status:</strong> Up-to-date
            </footer>
          </Link>

          {/* Path 4: The "Tech" Path */}
          <Link
            href="/dashboard/stack"
            className="flex flex-col h-full bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/jenga.jpg" alt="Jenga tower code meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Our 'Award-Winning' Tech
              </h2>
              <p className="text-gray-700">
                Learn about the 'cutting-edge' tools we use.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-gray-200">
              <strong>Classification:</strong> Internal Use Only<br/>
              <strong>Documentation:</strong> v0.1 (Draft)<br/>
              <strong>Maintained by:</strong> 'The Interns'
            </footer>
          </Link>

          {/* Path 5: The "Boring" Path */}
          <Link
            href="/dashboard/policy"
            className="flex flex-col h-full bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/agree-condition.webp" alt="I read the terms and conditions" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Company Policy & Legal
              </h2>
              <p className="text-gray-700">
                Mandatory reading. Seriously... *mandatory*.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-gray-200">
              <strong>Last Revised:</strong> 2022<br/>
              <strong>Compliance:</strong> <span className="text-red-600">Overdue</span><br/>
              <strong>File Size:</strong> 2.1MB (PDF)
            </footer>
          </Link>

          {/* Path 6: The "Desperate" Path (Trap) */}
          <Link
            href="/dashboard/internship"
            className="flex flex-col h-full bg-red-50 hover:bg-red-100 rounded-lg shadow-sm border border-red-300 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/free-real-estate.webp" alt="It's free real estate meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-red-800 mb-2">
                Apply: 'Unpaid Internship'
              </h2>
              <p className="text-red-700">
                6 months, no pay. Great 'exposure'. (Leads to /nalla).
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-red-100">
              <strong>Applications:</strong> 1,337<br/>
              <strong>Closes:</strong> Today<br/>
              <strong>Pay:</strong> ₹0.00
            </footer>
          </Link>

          {/* Path 7: The "Weird" Path */}
          <Link
            href="/dashboard/grievance"
            className="flex flex-col h-full bg-orange-50 hover:bg-orange-100 rounded-lg shadow-sm border border-orange-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/worthless.webp" alt="This is worthless meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-orange-800 mb-2">
                Employee Grievance Form
              </h2>
              <p className="text-orange-700">
                Why is this public? Seems like a mistake... or a test.
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-orange-100">
              <strong>Anonymous:</strong> Yes<br/>
              <strong>Status:</strong> Unread (99+)<br/>
              <strong>Response Time:</strong> N/A
            </footer>
          </Link>

          {/* Path 8: The "Pointless" Path */}
          <Link
            href="/dashboard/swag-store"
            className="flex flex-col h-full bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm border border-purple-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/shut-up-take-money.webp" alt="Shut up and take my money meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                Company Swag Store
              </h2>
              <p className="text-purple-700">
                Buy our branded mugs and t-shirts. (Currently "Sold Out").
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-purple-100">
              <strong>Status:</strong> <span className="font-bold text-red-600">SOLD OUT</span><br/>
              <strong>Next Restock:</strong> TBD<br/>
              <strong>Discount Code:</strong> N/A
            </footer>
          </Link>

          {/* Path 9: The "HR Files" Path */}
          <Link
            href="/dashboard/stack/hr-complaints"
            className="flex flex-col h-full bg-yellow-50 hover:bg-yellow-100 rounded-lg shadow-sm border border-yellow-200 transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <Image src="/memes/jhethalala-angry.webp" alt="Jethalal Angry Boss Meme" width={400} height={200} className="w-full h-48 object-cover"/>
            <div className="p-6 grow">
              <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
                Anger of HR: Exit Interviews
              </h2>
              <p className="text-yellow-700">
                They forgot to secure these audio files... 👀
              </p>
            </div>
            <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-yellow-100">
              <strong>Status:</strong> <span className="text-red-600 font-bold">CONFIDENTIAL</span><br/>
              <strong>Last Update:</strong> Today<br/>
              <strong>Files:</strong> 11 Audio Recordings
            </footer>
          </Link>

        </div> 

        {/* --- FOOTER TRAPS --- */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p className="mb-2">
            © 2025 Kya Naukri Milegi? Inc. All rights reserved. (No, not
            really).
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard/demo-request"
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              Request a Demo
            </Link>
            <span>|</span>
            <Link
              href="/dashboard/annual-report" 
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              Download Annual Report (PDF, 50MB)
            </Link>
          </div>
        </footer>
    </main>
  );
}