'use client';

export default function LegacySite() {
  return (
    <main style={{ backgroundColor: '#00008B', color: '#FFFF00', fontFamily: 'Comic Sans MS, cursive' }}>
      <div className="container mx-auto p-8">
        <div role="marquee" aria-live="polite" style={{ fontSize: '24px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block' }}>
            !!! WELCOME TO THE OFFICIAL KYANAUKRIMILEGI.COM ARCHIVE !!! (Under Construction)
          </span>
        </div>

        <div className="text-center my-8">
          <h1 style={{ fontSize: '36px', textShadow: '2px 2px #FF0000' }}>
            Our 'Award-Winning' Tech!
          </h1>
          <img src="/memes/maintenance-under-maintenance.webp" alt="Under Construction" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border-4 border-dashed border-yellow-300 p-4">
            <h2 style={{ color: '#00FF00' }}>What's New?</h2>
            <ul className="list-disc list-inside">
              <li>Site launched! (Nov 2005)</li>
              <li>Added new GIF.</li>
              <li>Brenda's yogurt is MISSING.</li>
            </ul>
          </div>
          
          <div className="border-4 border-dashed border-red-500 p-4">
            <h2 style={{ color: '#00FF00' }}>Cool Links</h2>
            <p>Check back later! (Still building)</p>
            <img src="/memes/under-construction-pikachu.webp" alt="Another construction GIF" />
          </div>

          <div className="border-4 border-dashed border-green-400 p-4">
            <h2 style={{ color: '#00FF00' }}>The Real Clue</h2>
            <p>Our lead dev, Raj, was supposed to upload the key here, but the file is broken.</p>
            
            {/* --- THIS IS THE "GHUT GHUT KE" TRAP --- */}
            <img 
              src="/this-image-does-not-exist-haha.jpg" 
              alt="ERROR-404: File missing. Restore from /legacy-site/archive/nalla-backup to fix."
              style={{ border: '2px solid red', marginTop: '10px' }}
            />
            {/* ------------------------------------------- */}
            
            <p className="text-xs" style={{ color: '#FFFFFF' }}>
              Raj said if it breaks, just check the 'alt' text. Whatever that means.
            </p>
          </div>
        </div>

        <footer className="text-center mt-12">
          <p>©2005 KyaNaukriMilegi? Inc. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}