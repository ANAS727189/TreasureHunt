'use client';

import { useState } from 'react';
import { LoginModal } from './LoginModal';

export function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Login
      </button>
      {isModalOpen && (
        <LoginModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}