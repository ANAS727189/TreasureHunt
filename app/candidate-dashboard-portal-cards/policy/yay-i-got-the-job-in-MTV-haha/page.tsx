'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function WinnerContent() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const puzzleCompleted = sessionStorage.getItem("policyPuzzleCompleted");

    if (puzzleCompleted !== "true") {
      router.replace("/candidate-dashboard-portal-cards/policy");
    } else {
      setIsValidated(true);
    }
  }, [router]);

  if (!isValidated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            Verifying access...
          </h1>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setMessage("Please enter a name!");
      return;
    }

    const res = await fetch("/api/submit-winner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), path: "policy" }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Welcome to the club, ${name}!`);
      setSubmitted(true);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <input
          className="border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>
      <p className="mt-3">{message}</p>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <WinnerContent />
    </Suspense>
  );
}
