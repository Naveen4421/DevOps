"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  Mail,
  Shield,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  KeyRound,
} from "lucide-react";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  studentId: string;
  year: string;
  branch: string;
  track: string;
  experienceLevel: string;
  githubUrl?: string;
  motivation: string;
  status: string;
  createdAt: string;
}

interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  studentId: string;
  branch: string;
  status: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "rsvps" | "messages">("applications");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalRegistrations: 0,
    totalMessages: 0,
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/overview");
      if (res.ok) {
        const json = await res.json();
        setStats(json.stats);
        setApplications(json.data.applications || []);
        setRegistrations(json.data.registrations || []);
        setMessages(json.data.messages || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-mono text-emerald-400">
            <Shield className="h-3.5 w-3.5" />
            <span>Core Committee Control Plane</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Club Admin & Live Registrations
          </h1>
          <p className="text-xs text-zinc-400">
            Persisted in SQLite database (`dev.db`). Compatible with Supabase & PostgreSQL.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Recruitment Applications</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{stats.totalApplications}</p>
          <p className="text-[11px] text-zinc-500">Live candidate submissions</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Workshop RSVPs</span>
            <CalendarCheck className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{stats.totalRegistrations}</p>
          <p className="text-[11px] text-zinc-500">Confirmed student seats</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Contact Inquiries</span>
            <Mail className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{stats.totalMessages}</p>
          <p className="text-[11px] text-zinc-500">Community & partner messages</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 p-1 rounded-lg bg-zinc-900 border border-zinc-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "applications"
                ? "bg-emerald-500 text-zinc-950 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("rsvps")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "rsvps"
                ? "bg-emerald-500 text-zinc-950 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Event RSVPs ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "messages"
                ? "bg-emerald-500 text-zinc-950 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Inquiries ({messages.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-lg">
        {activeTab === "applications" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-mono">
                <tr>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Roll / ID</th>
                  <th className="p-3">Track</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-zinc-500">
                      No applications recorded in the database yet. Submit one from the /join page to test!
                    </td>
                  </tr>
                ) : (
                  applications
                    .filter(
                      (a) =>
                        a.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        a.email.toLowerCase().includes(search.toLowerCase()) ||
                        a.track.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-zinc-800/40 transition">
                        <td className="p-3">
                          <p className="font-semibold text-zinc-100">{app.fullName}</p>
                          <p className="text-[11px] text-zinc-400">{app.email}</p>
                        </td>
                        <td className="p-3 font-mono">{app.studentId} • {app.branch}</td>
                        <td className="p-3">
                          <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                            {app.track}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-400">{app.experienceLevel}</td>
                        <td className="p-3 font-mono text-[11px] text-zinc-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-300">
                            ● {app.status}
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "rsvps" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-mono">
                <tr>
                  <th className="p-3">Attendee</th>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Event Title</th>
                  <th className="p-3">Date Registered</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-zinc-500">
                      No workshop RSVPs in the database yet. Register for an event on /events to test!
                    </td>
                  </tr>
                ) : (
                  registrations
                    .filter(
                      (r) =>
                        r.fullName.toLowerCase().includes(search.toLowerCase()) ||
                        r.eventTitle.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((r) => (
                      <tr key={r.id} className="hover:bg-zinc-800/40 transition">
                        <td className="p-3">
                          <p className="font-semibold text-zinc-100">{r.fullName}</p>
                          <p className="text-[11px] text-zinc-400">{r.email}</p>
                        </td>
                        <td className="p-3 font-mono">{r.studentId} ({r.branch})</td>
                        <td className="p-3 font-medium text-emerald-400">{r.eventTitle}</td>
                        <td className="p-3 font-mono text-[11px] text-zinc-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-mono">
                            confirmed
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="p-4 space-y-3">
            {messages.length === 0 ? (
              <p className="text-center py-8 text-xs text-zinc-500">
                No inquiries sent yet. Submit the contact form on /contact to see messages appear here!
              </p>
            ) : (
              messages
                .filter(
                  (m) =>
                    m.name.toLowerCase().includes(search.toLowerCase()) ||
                    m.subject.toLowerCase().includes(search.toLowerCase())
                )
                .map((m) => (
                  <div key={m.id} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-200">{m.subject}</span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{m.message}</p>
                    <p className="text-[11px] text-zinc-500">
                      From: <strong className="text-zinc-300">{m.name}</strong> ({m.email})
                    </p>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

