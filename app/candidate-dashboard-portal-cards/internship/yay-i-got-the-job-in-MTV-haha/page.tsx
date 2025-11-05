'use client';

import { Suspense } from 'react';
import WinnerPage from './WinnerPage';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <WinnerPage />
    </Suspense>
  );
}
