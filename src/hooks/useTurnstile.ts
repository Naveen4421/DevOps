"use client";

import { useState, useCallback } from "react";

export interface TurnstileState {
  token: string | null;
  isEnabled: boolean;
  setToken: (token: string | null) => void;
  reset: () => void;
}

/**
 * Cloudflare Turnstile bot verification hook.
 * Activates automatically when NEXT_PUBLIC_TURNSTILE_SITE_KEY is defined in environment.
 */
export function useTurnstile(): TurnstileState {
  const [token, setToken] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isEnabled = Boolean(siteKey);

  const reset = useCallback(() => {
    setToken(null);
  }, []);

  return {
    token,
    isEnabled,
    setToken,
    reset,
  };
}

