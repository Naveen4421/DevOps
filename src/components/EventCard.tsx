"use client";

import Image from "next/image";
import { EventItem } from "@/types";
import { Calendar, Clock, MapPin, UserCheck, CalendarPlus } from "lucide-react";

interface EventCardProps {
  event: EventItem;
  onRegister: (event: EventItem) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const isUpcoming = event.status === "upcoming";

  const getCalendarUrl = () => {
    const { title, description, location, startTime, endTime } = event.calendarData;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-zinc-700 transition-all duration-300 group shadow-lg">
      {/* Event Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        {event.posterImage ? (
          <Image
            src={event.posterImage}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-tr from-emerald-950 to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-600 font-mono text-sm">[EVENT_POSTER]</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="rounded-md bg-zinc-900/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            {event.category}
          </span>
          {isUpcoming && (
            <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Upcoming
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Date, Time, Venue */}
        <div className="space-y-1.5 text-xs text-zinc-400 pt-1 border-t border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Instructor */}
        {event.instructor && (
          <div className="rounded-lg bg-zinc-950/60 p-2.5 border border-zinc-800/60 flex items-center gap-2.5 text-xs">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs shrink-0">
              {event.instructor.name.charAt(0)}
            </div>
            <div className="truncate">
              <p className="font-semibold text-zinc-200 truncate">{event.instructor.name}</p>
              <p className="text-[11px] text-zinc-400 truncate">{event.instructor.companyOrYear}</p>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-zinc-800/60 px-2 py-0.5 text-[10px] font-mono text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-3 flex items-center gap-2 border-t border-zinc-800/80">
          {isUpcoming && event.registrationOpen ? (
            <button
              onClick={() => onRegister(event)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 py-2 px-3 text-xs font-semibold text-zinc-950 transition active:scale-95"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Register Now</span>
            </button>
          ) : (
            <div className="flex-1 rounded-lg bg-zinc-800/40 py-2 px-3 text-center text-xs font-medium text-zinc-500">
              Event Concluded
            </div>
          )}

          {isUpcoming && (
            <a
              href={getCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              title="Add to Google Calendar"
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
            >
              <CalendarPlus className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

