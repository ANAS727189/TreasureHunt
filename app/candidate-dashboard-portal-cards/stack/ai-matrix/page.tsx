import Link from 'next/link';
import Image from 'next/image';

export default function AIMatrixPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <Image 
          src="/memes/Mai-Expert-Hu-popular-indian-meme-templates-300x169.webp"
          alt="Expert meme"
          width={300}
          height={169}
          className="mx-auto mb-6 rounded-lg"
        />
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          You fell for the buzzwords! 🤦‍♂️
        </h1>
        
        <p className="text-gray-600 mb-6">
          This tool doesn&apos;t even exist. It&apos;s just a bunch of fancy words 
          strung together to sound impressive. Did you really think we had a 
          &quot;Quantum-blockchain powered employee performance analyzer&quot;?
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