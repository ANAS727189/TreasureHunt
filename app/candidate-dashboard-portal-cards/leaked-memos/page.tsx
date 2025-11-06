'use client';

import { useRouter } from 'next/navigation';

export default function LeakedMemos() {
  const router = useRouter();

  const handleDownload = () => {
    let zipContent = "";
    const totalFiles = 1000000;
    const trapIndex = Math.floor(Math.random() * totalFiles) + 1;
    const nallaMessage = "The key is... are you really wasting your time opening 1000000 text files? Go back to work.\n\n";
    const loremMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...\n\n";

    for (let i = 1; i <= totalFiles; i++) {
      const fileName = `memo_${i.toString().padStart(4, '0')}.txt`;
      zipContent += `File: ${fileName}\n`;

      if (i === trapIndex) {
        zipContent += nallaMessage;
      } else {
        zipContent += loremMessage;
      }
    }

    const blob = new Blob([zipContent], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'competitor_memos_INTERNAL.zip.txt'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(href);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          SECURE SERVER: COMPETITOR FILES
        </h1>
        

        <p className="text-gray-400 mb-8">
          You shouldn't be here. This is... confidential. We've compiled 
          <span className="text-yellow-400 font-bold"> over 1000 'leaked' memos </span> 
          from our top competitor. The 'key' must be in one of them.
        </p>
        
        <button
          onClick={handleDownload}
          className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 text-2xl"
        >
          Download `competitor_memos.zip` (est. 100MB)
        </button>

        <p className="text-gray-600 mt-8">
          After you've found the key, you'll know what to do.
          (Hint: The 'key' is probably not what you think.)
        </p>

        <button
          onClick={() => router.push('/tu-nalla-hi-marega')}
          className="mt-4 text-gray-500 hover:text-red-500 underline"
        >
          (Finished reading? Click here.)
        </button>
      </div>
    </main>
  );
}