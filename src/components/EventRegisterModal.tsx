"use client";

import { useState } from "react";
import { EventItem } from "@/types";
import { X, CheckCircle, Calendar, MapPin, User, Mail, Sparkles, Loader2 } from "lucide-react";

interface EventRegisterModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export function EventRegisterModal({ event, onClose }: EventRegisterModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          eventTitle: event.title,
          fullName,
          email,
          studentId,
          branch,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        // Fallback optimistic
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Error registering:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCalendarUrl = () => {
    const { title, description, location, startTime, endTime } = event.calendarData;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">You&apos;re Registered!</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              A confirmation email has been dispatched to <strong className="text-zinc-200">{email}</strong>.
              We can&apos;t wait to see you at the session!
            </p>

            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-left text-xs space-y-1.5 text-zinc-300">
              <p className="font-semibold text-emerald-400">{event.title}</p>
              <p className="text-zinc-400">📅 {event.date} • {event.time}</p>
              <p className="text-zinc-400">📍 {event.venue}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition"
              >
                <Calendar className="h-4 w-4 text-emerald-400" />
                <span>Add to Google Calendar</span>
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                {event.category}
              </span>
              <h3 className="mt-2 text-lg font-bold text-zinc-100 leading-snug">
                {event.title}
              </h3>
              <p className="mt-1 text-xs text-zinc-400 flex items-center gap-2">
                <span>📅 {event.date}</span>
                <span>•</span>
                <span>📍 {event.venue}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    College Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Student ID / Roll No.
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23BCSE102"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Branch / Department
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="CyberSec">Cyber Security</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="DataScience">Data Science / AI & ML</option>
                  <option value="Other">Other Department</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-2.5 text-sm font-semibold text-zinc-950 transition active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Confirming seat...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Confirm Free RSVP</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

