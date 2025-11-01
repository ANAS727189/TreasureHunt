'use client';

import { useState } from 'react';
import { LoginModal } from './LoginModal';

export function LoginButton() {
  // State to control if the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* This button's only job is to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Login
      </button>

      {/* Conditionally render the modal based on the state */}
      {isModalOpen && (
        <LoginModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}