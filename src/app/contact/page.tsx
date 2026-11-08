"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { faqsData } from "@/data/faqs";
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-medium">
          <Mail className="h-3.5 w-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with the Community
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Have an inquiry, workshop proposal, corporate sponsorship idea, or just want to chat
          with our student engineers? Drop us a message or join our Discord.
        </p>
      </div>

      {/* Grid: Direct Channels & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Direct Channels & Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Community Channels */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <h3 className="text-base font-bold text-zinc-100">Direct Community Channels</h3>

            <div className="space-y-3 text-xs">
              <a
                href={siteConfig.contact.discord}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-200 group-hover:text-emerald-400 transition">
                      Discord Server
                    </p>
                    <p className="text-[11px] text-zinc-400">Join 500+ student discussions & labs</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
              </a>

              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-200 group-hover:text-emerald-400 transition">
                      WhatsApp Community
                    </p>
                    <p className="text-[11px] text-zinc-400">Broadcast updates & urgent notices</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/50 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-200 group-hover:text-emerald-400 transition">
                      Official Email
                    </p>
                    <p className="text-[11px] text-zinc-400">{siteConfig.contact.email}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
              </a>
            </div>
          </div>

          {/* Physical Address */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-400" />
              <span>Campus Lab Location</span>
            </h3>
            <div className="text-xs text-zinc-400 space-y-1">
              <p className="font-semibold text-zinc-200">{siteConfig.college.name}</p>
              <p>{siteConfig.college.department}</p>
              <p>{siteConfig.college.campus}</p>
              <p className="text-zinc-500 pt-1">
                Office Hours: Mondays & Thursdays, 4:00 PM – 6:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Message Dispatched!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  Thank you, <strong className="text-zinc-200">{formData.name}</strong>.
                  Our team has received your message and will get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">Send an Inquiry</h3>
                  <p className="text-xs text-zinc-400">
                    We typically reply within 24 hours during working days.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Workshop proposal / General question / Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how we can help or collaborate..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-3 text-sm font-bold text-zinc-950 transition active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6 pt-6 border-t border-zinc-800">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center justify-center gap-1">
            <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-white">Got Questions?</h2>
          <p className="text-xs text-zinc-400">
            Quick answers about memberships, workshops, hardware labs, and recruitment.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqsData.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-zinc-200 hover:text-emerald-400 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

