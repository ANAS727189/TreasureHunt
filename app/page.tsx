import { LoginButton } from '@/components/LoginButton';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24 bg-gray-900 text-white font-mono">
      <div className="text-center space-y-6 max-w-2xl">
        <Image
          src="/This-Is-Fine-Dog-Fire-Meme-Sticker.webp"
          alt="This is fine dog"
          width={300}
          height={170}
          className="mx-auto rounded-lg shadow-lg"
          priority 
        />

        <h1 className="text-4xl md:text-5xl font-bold text-red-500">
          Welcome to Kya tumhe Naukri Milegi?
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          HR has closed the gate for you.
        </p>
        <p className="text-lg md:text-xl text-yellow-400">
          You have to become a hacker to bypass the gate and get naukri...
        </p>

        <Image 
          src="/Mai-Expert-Hu-popular-indian-meme-templates-300x169.webp" 
          alt="Mai Expert Hu Meme"
          width={300}
          height={169}
          className="mx-auto rounded-lg"
        />
        <div
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html: `
            <p className='hidden'> HR told me to disable this, but they don't check the source code.
            Use this for testing.
            U: haha_tujhko_kya_naukri_milegi
            P: naukri_krun_chahiye_tere_ko_nalla_mar_na
            </p>
              `,
          }}
        />

        <LoginButton />
        <p className="text-sm text-gray-600 pt-8 animate-pulse">
          (Psst... real hackers... check something to get ahead!)
        </p>
      </div>
    </main>
  );
}