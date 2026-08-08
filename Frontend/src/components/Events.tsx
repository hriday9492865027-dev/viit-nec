import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_EVENTS } from '@/data/initialData';
import { EventItem } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const { isVisible, ref } = useScrollAnimation(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`event-card card-tech accent-line-tech rounded-2xl overflow-hidden flex flex-col group shadow-sm transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Event Image */}
      <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="event-img w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to top, rgba(24,58,55,0.2), transparent)' }} />
        <div className="absolute top-4 right-4 z-10">
          {event.category === 'upcoming' ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-md group-hover:scale-105 transition-transform duration-300"
              style={{ background: '#183A37' }}>
              <Clock className="w-3.5 h-3.5" /> Upcoming
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm group-hover:scale-105 transition-transform duration-300"
              style={{ background: '#fffdf8', color: '#183A37', border: '1px solid rgba(24,58,55,0.18)' }}>
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#815355' }} /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-8 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-5 text-sm font-bold" style={{ color: 'rgba(24,58,55,0.5)' }}>
            <span className="flex items-center gap-2" style={{ color: '#183A37' }}>
              <Calendar className="w-4 h-4" />
              {event.date}
            </span>
            <span className="flex items-center gap-2" style={{ color: 'rgba(24,58,55,0.55)' }}>
              <MapPin className="w-4 h-4" style={{ color: 'rgba(24,58,55,0.35)' }} />
              {event.location}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold transition-colors duration-300"
            style={{ color: '#183A37' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#815355'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#183A37'}
          >
            {event.title}
          </h3>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'rgba(24,58,55,0.6)' }}>{event.description}</p>
        </div>

        <div className="pt-5 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(24,58,55,0.1)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(24,58,55,0.35)' }}>ID: {event.id}</span>
          {event.link ? (
            <a
              href={event.link}
              className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider transition-all duration-300 group/link"
              style={{ color: '#815355' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#183A37'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#815355'}
            >
              Register Now
              <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
            </a>
          ) : (
            <span className="text-sm font-semibold italic" style={{ color: 'rgba(24,58,55,0.4)' }}>Event Concluded</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation(0.12);

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    if (filter === 'all') return true;
    return evt.category === filter;
  });

  return (
    <section id="events" className="py-28 text-slate-900 border-b relative"
      style={{ background: '#fffdf8', borderColor: 'rgba(24,58,55,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest"
              style={{ background: 'rgba(24,58,55,0.08)', border: '1px solid rgba(24,58,55,0.18)', color: '#183A37' }}>
              Flagship Programs &amp; Events
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#183A37' }}>
              Initiatives That{' '}
              <span className="gradient-text">Drive Impact</span>
            </h2>
            <p className="text-base sm:text-lg max-w-2xl font-medium" style={{ color: 'rgba(24,58,55,0.6)' }}>
              Annual summits, business plan hackathons, expert speaker series, and collaborative entrepreneurship workshops
              at Vignan's Institute Of Information Technology in association with E-Cell IIT Bombay.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1.5 rounded-xl border self-start md:self-auto"
            style={{ background: 'rgba(24,58,55,0.05)', borderColor: 'rgba(24,58,55,0.15)' }}>
            {(['all', 'upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all duration-300`}
                style={{
                  background: filter === tab ? '#183A37' : 'transparent',
                  color: filter === tab ? '#EFD6AC' : 'rgba(24,58,55,0.6)',
                  boxShadow: filter === tab ? '0 4px 12px rgba(24,58,55,0.25)' : 'none',
                  transform: filter === tab ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {tab === 'all' ? 'All Events' : tab === 'upcoming' ? 'Upcoming' : 'Past Events'}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
