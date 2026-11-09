"use client";

import { useState } from "react";
import { Copy, Check, Activity } from "lucide-react";

export function TerminalHero() {
  const [copied, setCopied] = useState(false);
  const command = "curl -sSL https://nexops.siet.edu/join | bash";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs text-zinc-400 font-sans font-medium hidden sm:inline">
            bash ~ devops-club-control-plane
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition font-sans bg-zinc-800/60 px-2 py-1 rounded"
          title="Copy command"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 space-y-3 leading-relaxed overflow-x-auto text-zinc-300">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-emerald-400 font-bold">$</span>
          <span className="text-zinc-100">{command}</span>
        </div>

        <div className="text-zinc-500 pl-4 border-l border-zinc-800 space-y-1">
          <p className="text-emerald-400/90">[✓] Authenticating student cluster...</p>
          <p className="text-cyan-400/90">[✓] Pulling image: ghcr.io/cloud-devops-club/onboarding:v2026</p>
          <p className="text-zinc-400">[i] Initializing multi-node lab environment...</p>
        </div>

        <div className="bg-zinc-900/60 rounded p-2.5 border border-zinc-800/60 text-xs">
          <div className="grid grid-cols-4 gap-2 text-zinc-400 pb-1 border-b border-zinc-800 font-semibold">
            <span>NODE</span>
            <span>ROLE</span>
            <span>STATUS</span>
            <span>VERSION</span>
          </div>
          <div className="space-y-1 pt-1.5 font-mono text-[11px]">
            <div className="grid grid-cols-4 gap-2 text-zinc-300">
              <span className="text-emerald-400">node-master-01</span>
              <span>control-plane</span>
              <span className="text-emerald-400 flex items-center gap-1">● Ready</span>
              <span className="text-zinc-400">v1.31.2</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-zinc-300">
              <span className="text-cyan-400">worker-cloud-01</span>
              <span>aws-worker</span>
              <span className="text-emerald-400 flex items-center gap-1">● Ready</span>
              <span className="text-zinc-400">v1.31.2</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-zinc-300">
              <span className="text-cyan-400">worker-edge-02</span>
              <span>homelab-rpi</span>
              <span className="text-emerald-400 flex items-center gap-1">● Ready</span>
              <span className="text-zinc-400">v1.31.2</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-emerald-400">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          <span className="text-xs">Community status: 350+ members active • Next workshop: Nov 22</span>
        </div>
      </div>
    </div>
  );
}

