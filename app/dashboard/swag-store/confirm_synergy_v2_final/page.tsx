"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSwagStore } from "../layout";
import Link from "next/link";

export default function CringeBillingPage() {
  const { isUnlocked, submitPayment } = useSwagStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [showGaryCoin, setShowGaryCoin] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash");

  useEffect(() => {
    if (!isUnlocked) {
      alert("HEY! No cutting the line, chief. Solve the puzzle first.");
      router.push("/dashboard/swag-store");
    }
  }, [isUnlocked, router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      "CASH NOT ALLOWED!\n\nSorry, we only accept GARYcoin for this transaction."
    );

    setIsLoading(true);
    setPaymentFailed(false);
    setShowGaryCoin(false);

    setTimeout(() => {
      setIsLoading(false);
      setPaymentFailed(true);

      setTimeout(() => {
        setShowGaryCoin(true);
        submitPayment();
      }, 2000);
    }, 3000);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-lime-200 min-h-screen p-8 font-['Comic_Sans_MS',_cursive] text-black">
        <h1 className="text-4xl text-center">Redirecting...</h1>
      </div>
    );
  }

  return (
    <div className="bg-lime-200 min-h-screen p-8 font-['Comic_Sans_MS',_cursive] text-black">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl border-4 border-dashed border-red-500">
        {showGaryCoin ? (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-600 mb-4">
              PAYMENT FAILED!
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Your bank (and all major financial institutions) have
              <b className="text-red-600"> rejected</b> the transaction.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              The only way to secure the $wag is with Gary's new, decentralized,
              peer-to-peer hustle-token:
            </p>
            <h1 className="text-5xl font-extrabold text-purple-800 mb-6 animate-pulse">
              GARYcoin
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              (You must mine at least 1.0 GARYcoin to complete the purchase.)
            </p>
            <Link
              href="/dashboard/swag-store/confirm_synergy_v2_final/alt"
              className="w-full bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-purple-700 transition-all animate-bounce"
            >
              INITIALIZE GARYCOIN MINER
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4">
            <h1 className="text-4xl font-extrabold text-purple-800 mb-6 text-center">
              SECURE CHECKOUT PAGE
            </h1>
            <p className="text-center text-gray-700 mb-6">
              Almost there! Just fill out a few details to complete your
              purchase.
            </p>

            <fieldset disabled={isLoading} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border-2 border-purple-400 rounded-lg"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  How much do you want to pay?
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 border-2 border-purple-400 rounded-lg"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Payment Mode:
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full p-3 border-2 border-purple-400 rounded-lg"
                  required
                >
                  <option value="cash">Cash Only</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  (Click PAY button to continue)
                </p>
              </div>
            </fieldset>

            <div className="pt-4">
              {isLoading ? (
                // The Loader
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-dashed border-purple-800 rounded-full animate-spin mx-auto"></div>
                  <p className="text-lg text-purple-800 font-bold mt-4">
                    Processing Payment...
                  </p>
                  <p className="text-sm text-gray-500">(Please wait...)</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-2xl hover:bg-green-700 transition-all animate-pulse"
                >
                  PAY NOW!
                </button>
              )}
            </div>

            {paymentFailed && (
              <p className="text-center text-red-600 font-bold text-2xl animate-bounce">
                PAYMENT FAILED!
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
