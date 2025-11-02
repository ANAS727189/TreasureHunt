import Image from 'next/image';

export default function OwnerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          HR Department Portal
        </h1>

        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Our Legacy
            </h2>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/memes/worthless.webp"
                alt="Legacy API Token (DO NOT USE, FOR TEST ONLY): this-company-is-a-joke-lol"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-gray-600 italic">
              Our first-ever server (2010). We keep it for 'legacy' reasons.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              HR Department Notice
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <p className="text-gray-700 mb-4">
                Please note that all job applications must follow our standard operating procedures.
                Any attempts to bypass our carefully designed recruitment process will result in
                automatic disqualification.
              </p>
              <p className="text-gray-700">
                For technical issues, please use our new support portal. Do not attempt to use
                deprecated systems or legacy endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}