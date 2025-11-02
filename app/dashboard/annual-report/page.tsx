'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AnnualReport() {
  const router = useRouter();
  const [preparing, setPreparing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [showError, setShowError] = useState(false);

  const startPreparing = () => {
    setPreparing(true);
    simulateProgress();
  };

  const simulateProgress = async () => {
    const statusMessages: Record<number, string> = {
      10: "Initializing export job... [job_id: 88122]",
      30: "Querying legacy database (Q1-Q3)...",
      50: "Bundling Q4 Appendix... (This is the large one, please wait...)",
      70: "Processing financial statements...",
      90: "Compressing files...",
      99: "Finalizing export..."
    };

    for (let i = 0; i <= 99; i++) {
      setProgress(i);
      
      if (statusMessages[i]) {
        setStatus(statusMessages[i]);
      }
      if (i === 50) {
        await sleep(120000); 
        setStatus("Resuming process... (Legacy system is slow)");
        await sleep(120000);
      }
      await sleep(12000); 
    }
    await sleep(1200000);

    setShowError(true);
    await sleep(10000);
    router.push('/tu-nalla-hi-marega');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Image
            src="/memes/free-real-estate.webp"
            alt="Its free real estate"
            width={300}
            height={200}
            className="mx-auto rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900">Company Reports Portal</h1>
          <p className="mt-2 text-gray-600">Fiscal Year 2025 - Annual Report</p>
        </div>

        {!preparing ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <p className="text-gray-700">
                This file is too large for a direct download. Please select the components 
                you need and prepare your export.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                <span>Q1-Q3 Financials (12MB)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-blue-600" />
                <span className="font-medium">Q4 Appendix (38MB)</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                <span>Legal Disclaimers (1.2MB)</span>
              </label>

              <label className="flex items-center space-x-3 text-gray-500">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-400" />
                <span>Compress file (Makes export 2x slower)</span>
              </label>
            </div>

            <button
              onClick={startPreparing}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Prepare Export
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {!showError ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Preparing your report...
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Please do not close this window. This may take several minutes...
                  </p>
                </div>

                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-1000 ease-linear"
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{progress}% Complete</span>
                    <span className="animate-pulse">{status}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-red-600 text-xl font-bold">
                  EXPORT FAILED
                </div>
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                  <p className="font-medium">Error: 403 (Permission Denied)</p>
                  <p className="mt-2">
                    This resource is flagged for &apos;Confidential Financial Data&apos;. 
                    Access is restricted to C-Suite level employees only.
                  </p>
                  <p className="mt-2 font-bold">
                    Your candidate profile has been flagged for attempting to access 
                    sensitive materials. An HR representative will be in touch.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}