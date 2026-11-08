"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { eventsData } from "@/data/events";
import { projectsData } from "@/data/projects";
import { TerminalHero } from "@/components/TerminalHero";
import { EventCard } from "@/components/EventCard";
import { EventRegisterModal } from "@/components/EventRegisterModal";
import { EventItem } from "@/types";
import {
  Cloud,
  Network,
  Cpu,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Server,
  Layers,
  Terminal,
  CheckCircle2,
  Users,
  Compass,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const upcomingEvents = eventsData.filter((e) => e.status === "upcoming").slice(0, 3);
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  const pillars = [
    {
      title: "Cloud Computing",
      desc: "Architect scalable, fault-tolerant infrastructure on AWS, Google Cloud, and Azure with serverless and microservices.",
      icon: Cloud,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Computer Networking",
      desc: "Demystify packets, DNS, routing protocols, BGP, WireGuard VPNs, and reverse proxies from wire to application.",
      icon: Network,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Containers & K8s",
      desc: "Harness Linux namespaces, cgroups, Docker, and production-grade Kubernetes cluster management.",
      icon: Server,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "GitOps & CI/CD",
      desc: "Automate test-and-deploy pipelines with GitHub Actions, Terraform IaC, ArgoCD, and zero-downtime rollouts.",
      icon: GitBranch,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
  ];

  const perks = [
    "Free Cloud Sandbox Credits (AWS & GCP) for lab experiments",
    "Hands-on access to the club's 6-node physical hardware homelab",
    "Weekly peer-mentored coding and cluster debugging circles",
    "Direct referrals & mock interviews with alumni in DevOps & SRE",
  ];

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-zinc-800/80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs text-emerald-400 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Recruitment Active • Fall 2026 Batch</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Bridging code and{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                  cloud infrastructure.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to <strong className="text-zinc-100">{siteConfig.name}</strong> at{" "}
                {siteConfig.college.name}. We build, automate, deploy, and scale real systems.
                From raw Linux kernels to global Kubernetes clusters.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/join"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/25 transition active:scale-95"
                >
                  <span>Apply to Join</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/events"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white px-5 py-3 text-sm font-semibold text-zinc-200 transition"
                >
                  <span>Explore Workshops</span>
                </Link>
                <Link
                  href="/resources"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-transparent hover:border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition"
                >
                  <Compass className="h-4 w-4" />
                  <span>Curated Roadmaps</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-zinc-500">
                <span className="text-zinc-400 font-mono">Tech Stack:</span>
                {["Docker", "Kubernetes", "AWS", "Terraform", "Linux", "Prometheus", "GitOps"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Terminal */}
            <div className="lg:col-span-5 flex justify-center">
              <TerminalHero />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full -mt-10 sm:-mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-xl">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-bold text-zinc-200">{stat.label}</p>
              <p className="text-[11px] text-zinc-400 hidden sm:block">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Technical Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Core Pillars of Engineering
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            We move beyond standard textbook syntax to teach resilient architecture,
            modern tooling, and production workflows used by top tech companies.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 hover:border-zinc-700 transition group hover:bg-zinc-900/60"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border ${pillar.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events Highlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Live & Upcoming
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Workshops, Talks & CTFs
            </h2>
          </div>
          <Link
            href="/events"
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition"
          >
            <span>View all events</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={(ev) => setSelectedEvent(ev)}
            />
          ))}
        </div>
      </section>

      {/* Projects Showcase Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Built by Members
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Production Tools & Labs
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition"
          >
            <span>Explore all projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-mono text-zinc-300">
                  {project.category}
                </span>
                <span className="text-xs text-zinc-400">Lead: {project.lead}</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-100">
                {project.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] font-mono text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-emerald-400 transition flex items-center gap-1 font-mono"
                >
                  <span>Code Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Live Demo &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks & Why Join */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Student Growth & Community
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Why Join the Cloud & DevOps Club?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We believe the best way to understand systems is by breaking and fixing them.
                Our members collaborate on real cloud clusters, run student CTFs, and build tools
                that serve thousands of campus developers.
              </p>
              <div className="pt-2 space-y-2.5">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-5 text-center sm:text-left">
              <h3 className="text-base font-bold text-zinc-100">
                Ready to accelerate your infrastructure career?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Recruitment applications are open for all college students regardless of year or major.
                No prior cloud credentials required — just a willingness to learn.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/join"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-2.5 px-4 text-xs font-bold text-zinc-950 transition"
                >
                  <span>Start Application</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 py-2.5 px-4 text-xs font-semibold text-zinc-200 transition"
                >
                  Our Mission & Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <EventRegisterModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
