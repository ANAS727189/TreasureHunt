import Image from 'next/image';

export default function StatusPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src="/memes/Mai-Expert-Hu-popular-indian-meme-templates-300x169.webp"
            alt="Raj's profile picture"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Raj Kumar
            </h1>
            <p className="text-gray-600">Lead Developer & Code Reviewer</p>
            <a
              href="https://gist.github.com/ANAS727189/4299de8edb2ed86c801b4790f8e6b3d2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center mt-2"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Visit my GitHub profile
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Application Status Review
            </h2>
            <p className="text-red-600">
              Your application cannot be processed at this time.
              Please ensure you have followed all our internal guidelines for job applications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Internal Note (DO NOT SHARE)
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
              Remember to check our company-internal-tools repo for more details
              about our hiring process. If you need access, ping me on Slack.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}