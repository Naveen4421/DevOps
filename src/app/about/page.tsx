import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Terminal,
  Server,
  Cpu,
  Layers,
  HeartHandshake,
  Compass,
  ArrowRight,
  School,
  Building2,
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2023",
      title: "Club Founded",
      desc: "Started by 5 passionate students in a basement lab who wanted to run Docker containers instead of monolithic VMs.",
    },
    {
      year: "2024",
      title: "Campus Homelab Launched",
      desc: "Commissioned our first 6-node Raspberry Pi and x86 rack cluster in collaboration with the CSE Department.",
    },
    {
      year: "2025",
      title: "First Cloud CTF & Hackathon",
      desc: "Hosted 'HackTheCloud' with 400+ participants across 18 universities, sponsored by cloud industry partners.",
    },
    {
      year: "2026",
      title: "DevOps & SRE Placement Wave",
      desc: "Over 45 club members joined top tech firms, unicorns, and open-source foundations in infrastructure roles.",
    },
  ];

  const values = [
    {
      title: "Zero Gatekeeping",
      desc: "DevOps and cloud can feel intimidating. We believe every beginner can understand containers and networks with welcoming mentors.",
      icon: HeartHandshake,
    },
    {
      title: "Learn by Breaking Things",
      desc: "Real learning happens when you inspect kernel panics, broken ingress controllers, and race conditions in safe sandboxes.",
      icon: Terminal,
    },
    {
      title: "Open Source First",
      desc: "Everything we build — from our recruitment portal to our campus cluster tools — is open-source and free for everyone.",
      icon: Server,
    },
    {
      title: "Production Realism",
      desc: "No toy projects. We focus on real problems: high availability, multi-region latency, automated rollbacks, and security scans.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-medium">
          <Terminal className="h-3.5 w-3.5" />
          <span>About {siteConfig.name}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering the digital backbone of the campus.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          We are the student-driven infrastructure community at {siteConfig.college.name},
          dedicated to cultivating world-class talent in Cloud Computing, Computer Networking, and Site Reliability Engineering.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4 relative overflow-hidden">
          <div className="h-2 w-24 bg-emerald-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">Our Mission</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            To empower students with practical, industry-standard systems knowledge.
            We eliminate the gap between theoretical classroom concepts and real-world production engineering
            by providing hands-on cloud labs, live deployment environments, and peer-to-peer mentorship.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4 relative overflow-hidden">
          <div className="h-2 w-24 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">Our Vision</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            To become a premier student hub for systems engineering, recognized nationally for producing
            exceptional cloud architects, SREs, and open-source contributors who build reliable, secure,
            and scalable software for the world.
          </p>
        </div>
      </div>

      {/* Affiliation & Department */}
      <div className="rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-zinc-950 p-8 sm:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Building2 className="h-4 w-4" />
              <span>Institutional Affiliation</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-100">{siteConfig.college.name}</h3>
            <p className="text-sm text-zinc-400">
              {siteConfig.college.department} • {siteConfig.college.campus}
            </p>
            <p className="text-xs text-zinc-400 max-w-xl pt-1">
              Operated under the guidance of CSE faculty coordinators with generous lab access,
              compute resources, and official academic backing.
            </p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition"
          >
            <span>Meet Faculty & Leads</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Our DNA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Principles We Live By
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-3 hover:border-zinc-700 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-100">{val.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline / Milestones */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Our Journey So Far
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3 relative"
            >
              <div className="text-2xl font-extrabold font-mono text-emerald-400">
                {m.year}
              </div>
              <h3 className="text-base font-bold text-zinc-100">{m.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <p className="text-sm text-zinc-400 mb-4">Want to be part of our next chapter?</p>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-sm font-bold text-zinc-950 transition active:scale-95 shadow-md shadow-emerald-500/20"
        >
          <span>Join the Club Community</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

