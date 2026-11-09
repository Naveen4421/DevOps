import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Terminal, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, DiscordIcon } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-bold text-zinc-100 text-sm">{siteConfig.name}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Workshops & Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                  Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-emerald-400 transition-colors">
                  Our Team & Faculty
                </Link>
              </li>
            </ul>
          </div>

          {/* College & Department */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Affiliation
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <p className="font-medium text-zinc-300">{siteConfig.college.name}</p>
              <p>{siteConfig.college.department}</p>
              <p>{siteConfig.college.campus}</p>
              <p className="pt-2 text-[11px] text-zinc-500">
                An officially recognized student technical society.
              </p>
            </div>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Community & Social
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Join 500+ student developers and cloud engineers in our discussion spaces.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.discord}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                aria-label="Discord"
              >
                <DiscordIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <Link
                href="/join"
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Recruitment open for all branches</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Open-source under MIT License.</p>
          <p className="flex items-center gap-1.5">
            <span>Containerized with Docker</span>
            <span>•</span>
            <span>Deployed with GitOps</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
