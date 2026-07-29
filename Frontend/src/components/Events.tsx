'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_EVENTS } from '@/data/initialData';
import { EventItem } from '@/types';

export default function Events() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    if (filter === 'all') return true;
    return evt.category === filter;
  });

  return (
    <section id="events" className="py-28 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-widest">
              Flagship Programs & Events
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-950">
              Initiatives That Drive Impact
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-medium">
              Annual summits, business plan hackathons, expert speaker series, and collaborative entrepreneurship workshops at Vignan's Institute Of Information Technology in association with E-Cell IIT Bombay.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1.5 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {(['all', 'upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  filter === tab
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-700/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-white'
                }`}
              >
                {tab === 'all' ? 'All Events' : tab === 'upcoming' ? 'Upcoming' : 'Past Events'}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid - BIGGER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event: EventItem, i) => (
            <div
              key={event.id}
              className="card-tech accent-line-tech rounded-2xl overflow-hidden flex flex-col group shadow-sm stagger-item"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Event Cover Image - BIGGER */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 z-10">
                  {event.category === 'upcoming' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-700 text-white text-xs font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
                      <Clock className="w-3.5 h-3.5" /> Upcoming
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 border border-slate-200 text-xs font-bold backdrop-blur-md shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-slate-500">
                    <span className="flex items-center gap-2 text-blue-700">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">ID: {event.id}</span>
                  {event.link ? (
                    <a
                      href={event.link}
                      className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-blue-700 hover:text-blue-900 transition-all duration-300 group/link"
                    >
                      Register Now 
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400 font-semibold italic">Event Concluded</span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
