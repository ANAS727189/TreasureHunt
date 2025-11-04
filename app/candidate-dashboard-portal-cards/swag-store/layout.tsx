"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
