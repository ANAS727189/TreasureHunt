"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type SwagContextType = {
  isUnlocked: boolean;
  unlockStore: () => void;
  isPaymentSubmitted: boolean;
  submitPayment: () => void;
};

const SwagContext = createContext<SwagContextType | undefined>(undefined);

export default function SwagStoreLayout({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedUnlocked = localStorage.getItem("swagStoreUnlocked");
    const savedPayment = localStorage.getItem("swagStorePaymentSubmitted");

    if (savedUnlocked === "true") {
      setIsUnlocked(true);
    }
    if (savedPayment === "true") {
      setIsPaymentSubmitted(true);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("swagStoreUnlocked", isUnlocked.toString());
    }
  }, [isUnlocked, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "swagStorePaymentSubmitted",
        isPaymentSubmitted.toString()
      );
    }
  }, [isPaymentSubmitted, isLoaded]);

  const unlockStore = () => {
    setIsUnlocked(true);
  };

  const submitPayment = () => {
    setIsPaymentSubmitted(true);
  };

  return (
    <SwagContext.Provider
      value={{ isUnlocked, unlockStore, isPaymentSubmitted, submitPayment }}
    >
      {children}
    </SwagContext.Provider>
  );
}

export const useSwagStore = () => {
  const context = useContext(SwagContext);
  if (context === undefined) {
    throw new Error("useSwagStore must be used within a SwagStoreLayout");
  }
  return context;
};
