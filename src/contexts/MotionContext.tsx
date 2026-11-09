"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

interface MotionContextType {
  reduce3D: boolean;
  toggleReduce3D: () => void;
  isLowPower: boolean;
}

const MotionContext = createContext<MotionContextType>({
  reduce3D: false,
  toggleReduce3D: () => {},
  isLowPower: false,
});

function getReduce3DSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("nexops_reduce_3d");
  if (saved !== null) return saved === "true";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowCores = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;
  return prefersReduced || lowCores;
}

function getLowPowerSnapshot(): boolean {
  if (typeof navigator === "undefined") return false;
  return typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function dummySubscribe(): () => void {
  return () => {};
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduce3D = useSyncExternalStore(subscribe, getReduce3DSnapshot, getServerSnapshot);
  const isLowPower = useSyncExternalStore(dummySubscribe, getLowPowerSnapshot, getServerSnapshot);

  const toggleReduce3D = useCallback(() => {
    const current = getReduce3DSnapshot();
    const next = !current;
    localStorage.setItem("nexops_reduce_3d", String(next));
    window.dispatchEvent(new Event("storage"));
  }, []);

  return (
    <MotionContext.Provider value={{ reduce3D, toggleReduce3D, isLowPower }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}
