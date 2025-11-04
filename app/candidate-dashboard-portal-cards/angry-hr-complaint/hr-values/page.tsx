'use client';
import Image from 'next/image';

export default function HRValues() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64">
            <Image
              src="/memes/nim-chimpsky.png"
              alt="Nim Chimpsky being corporate"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">Our Core Values</h1>
              <p className="text-lg opacity-90">The foundation of our unique corporate culture</p>
            </div>
          </div>


          <div className="p-8">
            <div className="text-center mb-10">
              <p className="text-gray-600 text-lg">
                At our company, we believe in a set of core values that guide everything we do.
                These values are more than just words – they&apos;re the foundation of our internal systems
                and company culture.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Grit</h3>
                  <p className="text-gray-600">
                    We believe in perseverance and passion for long-term goals.
                    Success comes to those who never give up, even when facing 404 errors.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Respect</h3>
                  <p className="text-gray-600">
                    We treat each other with respect, even when dealing with merge conflicts.
                    Every pull request deserves a thoughtful review.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">⚖️</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    We maintain high ethical standards in our codebase and our conduct.
                    No copying from StackOverflow without attribution!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-2xl">🏃</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">Nimbleness</h3>
                  <p className="text-gray-600">
                    We adapt quickly to changing requirements and pivoting business needs.
                    Agile isn&apos;t just a methodology, it&apos;s a way of life.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-2xl">🌈</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">Diversity</h3>
                  <p className="text-gray-600">
                    We embrace different perspectives, programming languages, and IDE color themes.
                    Our differences make our codebase stronger.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm text-gray-600 text-left">
            <p className="text-center font-sans text-xs text-gray-500 mb-3">
              [ A developer&apos;s note found in the page comments ]
            </p>
            <p className="text-green-700">// HR wanted a 'domain that reflects values'. Stupid.</p>
            <p className="text-green-700">// The real internal path is structured like a JIRA ticket.</p>
            <p className="text-green-700">// Key 1: That joke PR's number (you know, #****).</p>
            <p className="text-green-700">// Key 2: The acronym we're all forced to GRIT OR '****' for.</p>
            <p className="text-green-700">// Just connect them. You'll figure it out.</p>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}