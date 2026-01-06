"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../lib/firebaseClient";

type AuthContextType = {
  session: any | null; // keep field for compatibility
  user: FirebaseUser | null;
  loading: boolean;
  justLoggedIn: boolean;
  displayName: string;
  authEventNonce: number;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  justLoggedIn: false,
  displayName: "",
  authEventNonce: 0,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [authEventNonce, setAuthEventNonce] = useState(0);

  const displayName = useMemo(() => {
    const email = user?.email || "";
    return (user?.displayName || email.charAt(0).toUpperCase() || "").trim();
  }, [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      setUser((prev) => {
        const wasLoggedOut = !prev?.uid;

        // Equivalent of SIGNED_IN event
        if (u && wasLoggedOut) {
          setJustLoggedIn(true);
          setAuthEventNonce((n) => n + 1);
          setTimeout(() => setJustLoggedIn(false), 3000);
        }

        return u;
      });

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session: null, // keep for compatibility
        user,
        loading,
        justLoggedIn,
        displayName,
        authEventNonce,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
