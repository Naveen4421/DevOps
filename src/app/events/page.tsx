"use client";

import { useState } from "react";
import { eventsData } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { EventRegisterModal } from "@/components/EventRegisterModal";
import { EventItem } from "@/types";
import { Calendar, Search, Filter } from "lucide-react";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [statusTab, setStatusTab] = useState<"all" | "upcoming" | "past">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Workshop", "Bootcamp", "Talk", "CTF"];

  const filteredEvents = eventsData.filter((evt) => {
    const matchesStatus =
      statusTab === "all" ? true : evt.status === statusTab;

    const matchesCategory =
      selectedCategory === "All" ? true : evt.category === selectedCategory;

    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs text-emerald-400 font-medium">
          <Calendar className="h-3.5 w-3.5" />
          <span>Workshops, Talks & Hackathons</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Club Events & Bootcamps
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Level up with hands-on, live-fire sessions on cloud architectures,
          networking protocols, Kubernetes clusters, and DevSecOps CTFs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 space-y-4 shadow-lg backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-zinc-800 w-full md:w-auto">
            {(["all", "upcoming", "past"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`flex-1 md:flex-none capitalize px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  statusTab === tab
                    ? "bg-emerald-500 text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab === "all" ? "All Events" : tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by topic or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500 font-mono flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" /> Type:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                selectedCategory === cat
                  ? "bg-zinc-100 text-zinc-950 font-semibold"
                  : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-zinc-800 p-8 space-y-3">
          <Calendar className="h-10 w-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-zinc-300">No events found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search query or switching filters to see past sessions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={(ev) => setSelectedEvent(ev)}
            />
          ))}
        </div>
      )}

      {/* Registration Modal */}
      <EventRegisterModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

