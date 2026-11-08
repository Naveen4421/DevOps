"use client";

import { useState } from "react";
import { teamData } from "@/data/team";
import { siteConfig } from "@/config/site";
import { Mail, Shield, Sparkles, Terminal, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Link from "next/link";

export default function TeamPage() {
  const [filter, setFilter] = useState<"all" | "faculty" | "leads" | "core">("all");

  const filteredMembers =
    filter === "all"
      ? teamData
      : teamData.filter((member) => member.category === filter);

  const categories = [
    { label: "Everyone", value: "all" },
    { label: "Faculty Coordinators", value: "faculty" },
    { label: "Student Leads", value: "leads" },
    { label: "Core Committee", value: "core" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The People Behind the Terminals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Leadership & Core Team
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Faculty mentors, student leads, and enthusiastic engineers who organize labs,
          maintain cluster infrastructure, and teach weekly workshops.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value as any)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              filter === cat.value
                ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition group hover:shadow-xl hover:shadow-emerald-950/20"
          >
            {/* Member Photo */}
            <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              {member.track && (
                <span className="absolute top-3 left-3 rounded bg-zinc-900/90 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 backdrop-blur-md">
                  {member.track}
                </span>
              )}
            </div>

            {/* Member Details */}
            <div className="flex flex-1 flex-col p-5 space-y-3">
              <div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-400">{member.role}</p>
                <p className="text-[11px] text-zinc-400">{member.yearOrDesignation}</p>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed flex-1">
                {member.bio}
              </p>

              {/* Badges */}
              {member.badges && member.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {member.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded bg-zinc-800/80 px-2 py-0.5 text-[9px] font-mono text-zinc-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Social Icons */}
              <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    aria-label={`${member.name} GitHub`}
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="rounded p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    aria-label={`${member.name} Email`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recruitment Callout Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-zinc-100">Want to join the Core Team?</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            We are actively looking for student coordinators, workshop instructors, and lab administrators.
            Step up and lead tech sessions in the next semester!
          </p>
        </div>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-zinc-950 transition active:scale-95 shadow-md shadow-emerald-500/20"
        >
          <span>Apply as Core Member</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
