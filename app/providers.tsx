"use client";

declare global {
  interface Window {
    wallet: any;
    abstraction: any;
    ethereum: any;
    viction: any;
  }
}

import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";
import { useEffect } from "react";

export const Provider = (props: { children: React.ReactNode }) => {
  // register wallet to window
  useEffect(() => {
    const provider = createAbstractionProvider();
    (window as any).wallet = provider;
    (window as any).abstraction = provider;
    (window as any).ethereum = provider;
    (window as any).viction = provider;
  }, []);

  return <>{props.children}</>;
};
