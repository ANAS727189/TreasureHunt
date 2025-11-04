'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ApplyCard() {
  return (
    <Link
      href="/candidate-dashboard-portal-cards/apply"
      className="flex flex-col h-full bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm border border-blue-200 transform hover:-translate-y-1 transition-all overflow-hidden"
    >
      <Image src="/memes/works-on-my-machine.webp" alt="It works on my machine meme" width={400} height={200} className="w-full h-48 object-cover"/>
      <div className="p-6 grow">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          Apply: &apos;Urgent Code Ninja&apos;
        </h2>
        <p className="text-blue-700">
          The standard application form. Seems simple enough...
        </p>
      </div>
      <footer className="p-6 pt-2 text-sm text-gray-500 border-t border-blue-100">
        <strong>Priority:</strong> <span className="text-red-600 font-bold">HIGH</span><br/>
        <strong>Status:</strong> <Link href="/candidate-dashboard-portal-cards/status" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>Pending Review</Link><br/>
        <strong>Owner:</strong> <Link href="/candidate-dashboard-portal-cards/owner" className="text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>HR Department</Link>
      </footer>
    </Link>
  );
}
