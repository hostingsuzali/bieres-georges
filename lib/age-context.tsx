"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AgeContextValue = {
  /** True once the visitor has confirmed they are 18+. */
  verified: boolean;
  /** True when the age gate is ready to be displayed. */
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
  const hydrated = true;

  const grantAccess = useCallback(() => {
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
