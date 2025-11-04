import Image from 'next/image';
import Link from 'next/link';

export default function TechStackPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Revolutionary Tech Stack
          </h1>
          <p className="text-gray-600 mb-4">
            Leveraging cutting-edge AI-driven blockchain solutions in a cloud-native environment 
            to maximize synergy and optimize stakeholder value through quantum machine learning algorithms.
          </p>
          <div className="flex gap-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Cloud-Native</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">AI-Powered</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Blockchain-Enabled</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full">Quantum-Ready</span>
          </div>
        </section>

        {/* Award Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Press Release: Innovation Award Winner 2025
              </h2>
              <p className="text-gray-600">
                We are thrilled to announce we&apos;ve won the &apos;Innovator of the Year&apos; 
                award for our new internal platform! This AI-driven tool is a game-changer. 
                To honor our developers, we&apos;ve named the platform with a riddle:
              </p>
              <blockquote className="text-slate-900 border-l-4 border-blue-500 pl-4 italic">
                &quot;I have cities, but no houses. I have mountains, but no trees. 
                I have water, but no fish. What am I?&quot;
              </blockquote>
            </div>
            <Image 
              src="/memes/winner-tfg-ANSWER=1984.jpg" 
              alt="Our team accepting the prestigious award"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Internal Tools Section */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Internal Company Tools
          </h2>
          <div className="space-y-4">
            <Link 
              href="/candidate-dashboard-portal-cards/stack/ai-matrix"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                AI-Synergy Matrix (v3.0)
              </h3>
              <p className="text-gray-600">
                Quantum-blockchain powered employee performance analyzer.
              </p>
            </Link>

            <Link 
              href="/candidate-dashboard-portal-cards/stack/directory"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Cloud-Native Employee Directory
              </h3>
              <p className="text-gray-600">
                Web3-enabled staff lookup system with ML-based search.
              </p>
            </Link>

            <Link 
              href="/candidate-dashboard-portal-cards/stack/map-tool"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                Legacy Mapping Tool
                <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  v1.2 - DEPRECATED
                </span>
              </h3>
              <p className="text-gray-600">
                Old school resource allocation visualizer.
              </p>
            </Link>
          </div>
        </section>

        {/* Fake Architecture Diagram */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            System Architecture
          </h2>
          <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-500">
            [Diagram removed for security reasons. Please file a ticket with IT.]
          </div>
        </section>
      </div>
    </main>
  );
}