"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Send,
  Loader2,
  Users,
  Compass,
} from "lucide-react";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    year: "1st Year",
    branch: "CSE",
    track: "DevOps & CI/CD",
    experienceLevel: "Curious Beginner",
    githubUrl: "",
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Online Application",
      desc: "Fill out the registration form detailing your background and which tech track interests you.",
    },
    {
      step: "02",
      title: "Guided Mini-Task",
      desc: "Complete a fun, 3-day beginner-friendly mini-challenge (e.g. running a Dockerized web server or writing a shell script).",
    },
    {
      step: "03",
      title: "Informal Peer Chat",
      desc: "A 10-minute casual conversation with club leads to discuss your interests, goals, and team fit.",
    },
    {
      step: "04",
      title: "Cluster Onboarding",
      desc: "Get invited to our private Discord tracks, receive cloud sandbox access, and join weekly lab cohorts.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      // Fallback optimistic success
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Membership Recruitment 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Join the Cloud & DevOps Club
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Open to all branches and skill levels. Whether you have never opened a Linux terminal
          or already run a homelab cluster, there is a place for you.
        </p>
      </div>

      {/* Recruitment Process Steps */}
      <div className="space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            How It Works
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Recruitment Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3 relative hover:border-zinc-700 transition"
            >
              <div className="text-xs font-mono font-bold text-emerald-400">
                STEP {st.step}
              </div>
              <h3 className="text-base font-bold text-zinc-100">{st.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Criteria & Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Criteria & Expectations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Eligibility & Requirements</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>All Disciplines Welcome:</strong> CSE, IT, ECE, Mechanical,
                  Data Science — enthusiasm matters far more than major.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Curiosity over Credentials:</strong> We don&apos;t expect you to know
                  Kubernetes on day one. We teach from scratch.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Weekly Commitment:</strong> ~3 to 4 hours per week for lab sessions,
                  workshops, and group projects.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Team Mindset:</strong> Collaborative, helpful, and eager to give back
                  to fellow students.
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 space-y-2">
              <p className="font-semibold text-zinc-200">Got questions before applying?</p>
              <p>
                Reach out anytime on our Discord server or email us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-emerald-400 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right: Application Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-100">Application Submitted!</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-zinc-200">{formData.fullName}</strong>.
                  We have received your recruitment form for the{" "}
                  <strong className="text-emerald-400">{formData.track}</strong> track.
                </p>
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 max-w-sm mx-auto text-left space-y-1">
                  <p className="font-medium text-zinc-300">Next Step:</p>
                  <p>Check your email ({formData.email}) for the Discord onboarding invitation and mini-task briefing!</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        studentId: "",
                        year: "1st Year",
                        branch: "CSE",
                        track: "DevOps & CI/CD",
                        experienceLevel: "Curious Beginner",
                        githubUrl: "",
                        motivation: "",
                      });
                    }}
                    className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200 transition"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">Member Sign-Up Form</h3>
                  <p className="text-xs text-zinc-400">
                    Takes less than 3 minutes. All fields marked with * are required.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      College / Personal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Phone & Student ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Student ID / Roll No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="23CSE401"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Year & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Academic Year *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                      <option value="Postgraduate">Postgraduate (M.Tech/MCA/MS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Branch / Department *
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="CSE">Computer Science & Engineering</option>
                      <option value="IT">Information Technology</option>
                      <option value="CyberSec">Cyber Security</option>
                      <option value="DataScience">Data Science / AI</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="Other">Other Engineering Major</option>
                    </select>
                  </div>
                </div>

                {/* Track Interest & Skill Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Primary Track Interest *
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="DevOps & CI/CD">DevOps & CI/CD Pipelines</option>
                      <option value="Cloud Computing">Cloud Computing (AWS/GCP)</option>
                      <option value="Networking & SysAdmin">Computer Networking & SysAdmin</option>
                      <option value="DevSecOps">DevSecOps & Cloud Security</option>
                      <option value="Outreach & Design">Events, Outreach & Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Current Familiarity Level *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, experienceLevel: e.target.value })
                      }
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Curious Beginner">Curious Beginner (Zero CLI experience)</option>
                      <option value="Basic Git & Linux">Basic Git & Linux commands</option>
                      <option value="Used Docker/Cloud">Have built Docker containers / used AWS</option>
                      <option value="Experienced">Experienced (Homelabs, K8s, CI/CD)</option>
                    </select>
                  </div>
                </div>

                {/* GitHub / Portfolio */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    GitHub / LinkedIn / Portfolio URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Why do you want to join? What do you hope to learn or build? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what excites you about systems, cloud, or automation..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-3 text-sm font-bold text-zinc-950 transition active:scale-[0.99] disabled:opacity-50 shadow-md shadow-emerald-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Club Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

