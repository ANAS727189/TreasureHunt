"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSwagStore } from "../../layout";
import Link from "next/link";

const WINNING_REGEX = /B055$/;
const GUARANTEED_WIN_TRIES = 42;

export default function GaryCoinMiner() {
  const { isPaymentSubmitted } = useSwagStore();
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  const [isMining, setIsMining] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [tryCount, setTryCount] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaymentSubmitted) {
      alert("HEY! You need to submit the payment form first!");
      router.push("/dashboard/swag-store/confirm_synergy_v2_final");
    }
  }, [isPaymentSubmitted, router]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const generateHashSuffix = () => {
    let result = "";
    const characters = "ABCDEF0123456789";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleMineClick = () => {
    setIsMining(true);

    const newTryCount = tryCount + 1;
    setTryCount(newTryCount);

    const isForcedWin = newTryCount >= GUARANTEED_WIN_TRIES;
    let newSuffix = generateHashSuffix();

    if (isForcedWin && !WINNING_REGEX.test(newSuffix)) {
      newSuffix = "A1B2" + "B055";
    }

    const newHash = `GARY-BLOCK-${newSuffix}`;
    const newLog = `> Probing block... HASH: [${newHash}]`;

    setLogs((prevLogs) => [...prevLogs, newLog]);

    if (WINNING_REGEX.test(newHash)) {
      setTimeout(() => {
        setLogs((prevLogs) => [
          ...prevLogs,
          `> !!! HASH MATCHES PATTERN: /${WINNING_REGEX.source}/ !!!`,
          `> BLOCK FOUND. MINTING 1.0 GARYCOIN...`,
          `> ...`,
          `> ...`,
          `> MINTING SUCCESSFUL.`,
          `> PAYMENT AUTHORIZED.`,
        ]);
        setIsWon(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsMining(false);
        setLogs((prevLogs) => [
          ...prevLogs,
          `> ...Block empty. Keep hustling.`,
        ]);
      }, 300);
    }
  };

  if (!isPaymentSubmitted) {
    return (
      <div className="bg-black text-lime-400 min-h-screen p-4 font-mono flex items-center justify-center">
        <h1 className="text-4xl text-center">Redirecting...</h1>
      </div>
    );
  }

  return (
    <div className="bg-black text-lime-400 min-h-screen p-4 font-mono">
      <div className="border-2 border-lime-400 p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold animate-pulse">
          GARYCOIN MINER v1.0
        </h1>
        <p className="text-yellow-400">
          (c) 1999 Gary Grindset. All Hustle Reserved.
        </p>
        <p className="mt-2">
          [System] Initializing hustle-chain... DONE.
          <br />
          [System] Connecting to peer-to-peer network... DONE.
          <br />
          [System] Target Hash Pattern:{" "}
          <b className="text-red-500">/{WINNING_REGEX.source}/</b>
          <br />
          [System] Status: <b className="text-green-500">READY TO MINE.</b>
        </p>

        <div
          ref={terminalRef}
          className="w-full h-64 bg-gray-900 my-4 p-2 border border-lime-400 overflow-y-scroll"
        >
          {logs.map((log, index) => (
            <p key={index} className="whitespace-pre-wrap">
              {log}
            </p>
          ))}
          {!isWon && (
            <span className="inline-block w-2 h-4 bg-lime-400 animate-pulse"></span>
          )}
        </div>

        {isWon ? (
          <div className="text-center bg-lime-400 text-black p-4 animate-pulse">
            <h2 className="text-4xl font-bold">!!! YOU WON !!!</h2>
            <p className="text-lg font-bold">
              Gary is impressed with your hustle. You've earned the swag.
            </p>
            <Link
              href="/yay-i-got-the-job-in-MTV-haha"
              className="inline-block bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-800 transition-all mt-4"
            >
              CLAIM YOUR PRIZE!
            </Link>
          </div>
        ) : (
          <button
            onClick={handleMineClick}
            disabled={isMining}
            className={`w-full p-4 border-2 border-lime-400 text-2xl font-bold
                        hover:bg-lime-400 hover:text-black transition-all
                        ${isMining ? "bg-gray-700 text-gray-400" : ""}`}
          >
            {isMining ? "MINING..." : `Mine 1 Block (Try: ${tryCount})`}
          </button>
        )}
      </div>
    </div>
  );
}
