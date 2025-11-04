import Link from 'next/link';
import Image from 'next/image';

export default function DirectoryPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <Image 
          src="/memes/doraemon-acha-laude.gif"
          alt="Doraemon meme"
          width={300}
          height={169}
          className="mx-auto mb-6 rounded-lg"
        />
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Nice try! But no...
        </h1>
        
        <p className="text-gray-600 mb-6">
          &quot;Web3-enabled staff lookup&quot;? &quot;ML-based search&quot;? 
          Come on, we just use a spreadsheet like everyone else. 
          Stop getting distracted by buzzwords!
        </p>

        <Link 
          href="/candidate-dashboard-portal-cards"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}