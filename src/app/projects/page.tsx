"use client";

import { useState } from "react";
import { projectsData } from "@/data/projects";
import {
  Code2,
  ExternalLink,
  Star,
  Search,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Link from "next/link";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Infrastructure",
    "Automation",
    "Monitoring",
    "Developer Tools",
  ];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCat =
      selectedCategory === "All" ? true : p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs text-cyan-400 font-medium">
          <Code2 className="h-3.5 w-3.5" />
          <span>Member Built & Maintained</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projects & Infrastructure Showcase
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Open-source developer tools, Kubernetes management platforms, and telemetry dashboards
          engineered by club members to power campus systems.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20"
                  : "bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-5 hover:border-zinc-700 transition group hover:shadow-xl hover:shadow-cyan-950/20"
          >
            <div className="flex items-center justify-between">
              <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-mono text-cyan-400">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                {project.stars && (
                  <span className="flex items-center gap-1 font-mono">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    {project.stars}
                  </span>
                )}
                <span>•</span>
                <span>Lead: {project.lead}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-zinc-200 hover:text-cyan-400 transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span>View Source Code</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Live Sandbox</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-zinc-100">Have a tool or project idea?</h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          We sponsor cloud hosting credits, domain names, and hardware compute for approved club member initiatives.
        </p>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 px-5 py-2.5 text-xs font-bold text-zinc-950 transition"
        >
          <span>Propose a Project</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
