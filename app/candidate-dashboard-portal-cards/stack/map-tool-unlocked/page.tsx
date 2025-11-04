'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MapToolUnlocked() {
  const router = useRouter();
  useEffect(() => {
    const hasAccess = localStorage.getItem('mapToolAccess') === 'granted';
    if (!hasAccess) {
      router.replace('/candidate-dashboard-portal-cards/stack/map-tool');
    }
  }, [router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8 text-center">
      <div className="space-y-4">
        <div
          className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Loading Map Data...
        </h1>
        <p className="text-lg text-gray-600">
          Please wait, this may take a moment...
        </p>
        <p className="pt-4 text-sm text-gray-500">
          (This legacy tool is *really* old. Thanks for your patience.)
        </p>
        <p className="pt-2 text-sm text-gray-400">
          Hint: A good applicant always checks the system logs.
        </p>

      </div>
      <div className="absolute bottom-0 left-0 w-full p-8">
        <pre
          className="
            whitespace-pre-wrap text-left text-sm 
            text-gray-100 
            selection:bg-blue-600 selection:text-white
          "
        >
          System Log:
          ------------------------
          Date: [REDACTED]
          User: [REDACTED]
          Status: ERROR_LOAD_FAILED
          Comments: This tool is a piece of junk. It never loads. 
          HR just uses it as a test. The real company directory 
          isn't a tool, it's just a file.

          DEV_NOTE: The real file is 'sitemap.xml'. To see any 
          website's sitemap, just go to the main homepage URL 
          and add '/sitemap.xml' to the end. (e.g., google.com/sitemap.xml).
          Thank God HR doesn't understand how this works.

          I remember when we set it up. HR made us use their stupid 'priority' 
          system. They said the only link that mattered was the offer letter, 
          so we had to give it a priority of 1.0. All the other junk 
          pages were 0.5.
          ------------------------
        </pre>
      </div>
    </main>
  );
}