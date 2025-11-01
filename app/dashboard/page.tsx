import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-100 text-gray-900">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6">
          Candidate Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You're in. Good job... hacker. Now the *real* test begins. Choose your
          path.
        </p>

        {/* This is where you will add links to all your different paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Path 1 (You'll create this page next) */}
          <Link
            href="/dashboard/apply" 
            className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm border border-blue-200"
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Apply for 'Urgent Opening: Code Ninja'
            </h2>
            <p className="text-blue-700">The standard application form. Seems simple enough.</p>
          </Link>

          {/* Example Path 2 (You'll create this page next) */}
          <Link
            href="/dashboard/blog"
            className="p-6 bg-green-50 hover:bg-green-100 rounded-lg shadow-sm border border-green-200"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              Company Blog
            </h2>
            <p className="text-green-700">See what the team has been writing about.</p>
          </Link>

          {/* ADD MORE LINKS HERE as you build your paths */}
          
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
          <Link
            href="/dashboard/policy" // Example Path 5
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Company Policy & Boring Legal Stuff
          </Link>
        </footer>
      </div>
    </main>
  );
}