import { LoginButton } from '@/components/LoginButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">
          Welcome to Kya Naukri Milegi?
        </h1>
        <p className="text-2xl text-gray-300">
          HR has closed the gate for you.
        </p>
        <p className="text-xl text-yellow-400">
          You have to become a hacker to bypass the gate and get naukri...
        </p>

        <p className='hidden'> HR told me to disable this, but they don't check the source code. 
          Use this for testing.
          U: haha_tujhko_kya_naukri_milegi
          P: naukri_krun_chahiye_tere_ko_nalla_mar_na
        </p>
        <LoginButton />
      </div>
    </main>
  );
}