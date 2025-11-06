'use client';

import { Suspense } from 'react';
import WinnerPage from './WinnerPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WinnerPage />
    </Suspense>
  );
}
