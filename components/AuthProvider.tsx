"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  justLoggedIn: boolean;
  displayName: string;
  authEventNonce: number; // ✅ new: increments each SIGNED_IN
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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [authEventNonce, setAuthEventNonce] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setDisplayName(
        data.session?.user?.user_metadata?.name ||
          data.session?.user?.email?.charAt(0).toUpperCase() ||
          ""
      );
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setDisplayName(
            session.user.user_metadata?.name ||
              session.user.email?.charAt(0).toUpperCase() ||
              ""
          );
        }

        if (event === "SIGNED_IN") {
          setJustLoggedIn(true);
          setAuthEventNonce((n) => n + 1); // ✅ trigger login-based effects

          setTimeout(() => setJustLoggedIn(false), 3000);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
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
