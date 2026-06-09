"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "bieres-georges:age-verified";

type AgeContextValue = {
  /** True once the visitor has confirmed they are 18+. */
  verified: boolean;
  /** True until we've read localStorage on the client. */
  hydrated: boolean;
  /** Called by the gate when the visitor clicks "Oui". */
  grantAccess: () => void;
};

const AgeContext = createContext<AgeContextValue>({
  verified: false,
  hydrated: false,
  grantAccess: () => {},
});

// Shared across the whole tree so the gate can flip the flag once and any
// on-mount animation (Hero, Header, etc.) can wait for it.
export function AgeVerificationProvider({ children }: { children: ReactNode }) {
  const [verified, setVerified] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(STORAGE_KEY) === "yes") {
        setVerified(true);
      }
    } catch {
      // localStorage blocked — leave verified=false, the gate will ask.
    } finally {
      setHydrated(true);
    }
  }, []);

  const grantAccess = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // ignored — granting still works for this session
    }
    setVerified(true);
  }, []);

  const value = useMemo(
    () => ({ verified, hydrated, grantAccess }),
    [verified, hydrated, grantAccess],
  );

  return <AgeContext.Provider value={value}>{children}</AgeContext.Provider>;
}

export function useAgeVerification() {
  return useContext(AgeContext);
}
