'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, CheckCircle2, ArrowRight, X, Sparkles, Check,
  MapPin, ExternalLink, Flame, Trophy, Award, ZoomIn, Maximize2,
  ChevronLeft, ChevronRight, ZoomOut, RotateCcw, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_TASKS, INITIAL_EVENTS } from '@/data/initialData';
import { TaskItem, EventItem } from '@/types';

type ViewMode = 'events' | 'tasks';
type EventFilter = 'all' | 'upcoming' | 'past';
type TrackType = 'preliminary' | 'ignite-propel' | 'comprehensive';

const STORAGE_KEY = 'ecell_events';

export default function Events() {
  const [viewMode, setViewMode] = useState<ViewMode>('events');
  const [eventFilter, setEventFilter] = useState<EventFilter>('all');
  const [activeTrack, setActiveTrack] = useState<TrackType>('preliminary');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [selectedEventPhoto, setSelectedEventPhoto] = useState<EventItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const lastWheelTime = useRef<number>(0);
  const [eventsList, setEventsList] = useState<EventItem[]>(INITIAL_EVENTS);

  // Load events from backend API (with fallback to localStorage & INITIAL_EVENTS)
  useEffect(() => {
    let currentEvents = INITIAL_EVENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentEvents = parsed;
          setEventsList(parsed);
        }
      }
    } catch {
      // Keep initial events if parsing fails
    }

    // Fetch live events from persistent backend API
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.events)) {
          setEventsList(data.events);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.events));
          } catch {}
        }
      })
      .catch((err) => {
        console.warn('Could not reach /api/events, using cached/initial events:', err);
      });
  }, []);

  // Filter events
  const filteredEvents = eventsList.filter((ev) => {
    if (eventFilter === 'all') return true;
    return ev.category === eventFilter;
  });

  // Find index of currently viewed event in filtered list
  const currentEventIndex = selectedEventPhoto
    ? filteredEvents.findIndex((e) => (e.id || e.title) === (selectedEventPhoto.id || selectedEventPhoto.title))
    : -1;

  const handleNextPhoto = () => {
    if (filteredEvents.length <= 1 || currentEventIndex === -1) return;
    const nextIdx = (currentEventIndex + 1) % filteredEvents.length;
    setSelectedEventPhoto(filteredEvents[nextIdx]);
    setZoomLevel(1);
  };

  const handlePrevPhoto = () => {
    if (filteredEvents.length <= 1 || currentEventIndex === -1) return;
    const prevIdx = (currentEventIndex - 1 + filteredEvents.length) % filteredEvents.length;
    setSelectedEventPhoto(filteredEvents[prevIdx]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleToggleZoom = () => {
    setZoomLevel((prev) => (prev > 1 ? 1 : 1.75));
  };

  // Keyboard navigation & scroll lock for photo lightbox
  useEffect(() => {
    if (!selectedEventPhoto) {
      setZoomLevel(1);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEventPhoto(null);
      else if (e.key === 'ArrowRight') handleNextPhoto();
      else if (e.key === 'ArrowLeft') handlePrevPhoto();
      else if (e.key === '+' || e.key === '=') handleZoomIn();
      else if (e.key === '-') handleZoomOut();
      else if (e.key === '0') setZoomLevel(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEventPhoto, currentEventIndex, filteredEvents]);

  // Wheel scrolling handler for cycling images when not zoomed in
  const handleModalWheel = (e: React.WheelEvent) => {
    // If zoomed in, allow native image panning and scrolling
    if (zoomLevel > 1) return;
    if (filteredEvents.length <= 1) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 350) return;

    if (e.deltaY > 35 || e.deltaX > 35) {
      lastWheelTime.current = now;
      handleNextPhoto();
    } else if (e.deltaY < -35 || e.deltaX < -35) {
      lastWheelTime.current = now;
      handlePrevPhoto();
    }
  };

  // Touch gesture swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    setTouchStartX(null);
  };

  // Filter tasks
  const filteredTasks = INITIAL_TASKS.filter((task) => task.track === activeTrack);

  const tracks: { id: TrackType; label: string; count: number }[] = [
    { id: 'preliminary', label: 'Preliminary', count: INITIAL_TASKS.filter(t => t.track === 'preliminary').length },
    { id: 'ignite-propel', label: 'Ignite Propel', count: INITIAL_TASKS.filter(t => t.track === 'ignite-propel').length },
    { id: 'comprehensive', label: 'Comprehensive', count: INITIAL_TASKS.filter(t => t.track === 'comprehensive').length },
  ];

  const upcomingCount = eventsList.filter(e => e.category === 'upcoming').length;
  const pastCount = eventsList.filter(e => e.category === 'past').length;

  return (
    <section
      id="tasks-events"
      className="py-24 sm:py-32 bg-[#fffdf8] tech-grid-pattern text-[#0f0d0c] border-b border-[rgba(24,58,55,0.12)] relative overflow-hidden"
    >
      {/* Anchor aliases for backward compatibility */}
      <div id="events" className="absolute -top-10" />
      <div id="tasks" className="absolute -top-10" />

      {/* Earthy Elegance Ambient Lighting Orbs matching Hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,214,172,0.45) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(129,83,85,0.14) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(24,58,55,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full badge-iitb-tech text-xs sm:text-sm font-bold shadow-xs">
            <Award className="w-4 h-4 text-[#815355] shrink-0" />
            <span>National Entrepreneurship Challenge · <strong className="text-[#183A37] font-extrabold">E-Cell IIT Bombay</strong></span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#183A37] leading-[1.1]">
            Events &{' '}
            <span className="gradient-text">
              Initiatives
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Discover our flagship startup summits, hackathons, and track our milestones under the National Entrepreneurship Challenge.
          </p>
        </div>

        {/* Primary View Switcher: Flagship Events vs NEC Tasks */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-[#f5ecdc] rounded-full border border-[rgba(129,83,85,0.25)] shadow-sm backdrop-blur-md">
            <button
              onClick={() => setViewMode('events')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${viewMode === 'events'
                  ? 'bg-[#183A37] text-[#EFD6AC] shadow-md shadow-[#183A37]/25 scale-[1.02]'
                  : 'text-[#183A37] hover:text-[#815355] hover:bg-[#EFD6AC]/40'
                }`}
            >
              <Flame className="w-4 h-4 text-[#E6C48A]" />
              Flagship Events
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${viewMode === 'events' ? 'bg-[#EFD6AC]/20 text-[#EFD6AC]' : 'bg-[#EFD6AC]/60 text-[#183A37]'
                }`}>
                {eventsList.length}
              </span>
            </button>
            <button
              onClick={() => setViewMode('tasks')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${viewMode === 'tasks'
                  ? 'bg-[#183A37] text-[#EFD6AC] shadow-md shadow-[#183A37]/25 scale-[1.02]'
                  : 'text-[#183A37] hover:text-[#815355] hover:bg-[#EFD6AC]/40'
                }`}
            >
              <Trophy className="w-4 h-4 text-[#E6C48A]" />
              NEC IITB Tasks
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${viewMode === 'tasks' ? 'bg-[#EFD6AC]/20 text-[#EFD6AC]' : 'bg-[#EFD6AC]/60 text-[#183A37]'
                }`}>
                {INITIAL_TASKS.length}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: FLAGSHIP EVENTS                                    */}
        {/* ========================================================= */}
        {viewMode === 'events' && (
          <div className="space-y-8 animate-fade-in">
            {/* Event Category Filter Pills */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#fbf6ec] rounded-full border border-[rgba(24,58,55,0.12)] text-xs font-bold">
                <button
                  onClick={() => setEventFilter('all')}
                  className={`px-5 py-2 rounded-full transition-all ${eventFilter === 'all'
                      ? 'bg-[#183A37] text-[#EFD6AC] shadow-xs font-extrabold'
                      : 'text-[#183A37] hover:text-[#815355]'
                    }`}
                >
                  All ({eventsList.length})
                </button>
                <button
                  onClick={() => setEventFilter('upcoming')}
                  className={`px-5 py-2 rounded-full transition-all ${eventFilter === 'upcoming'
                      ? 'bg-[#183A37] text-[#EFD6AC] shadow-xs font-extrabold'
                      : 'text-[#183A37] hover:text-[#815355]'
                    }`}
                >
                  Upcoming ({upcomingCount})
                </button>
                <button
                  onClick={() => setEventFilter('past')}
                  className={`px-5 py-2 rounded-full transition-all ${eventFilter === 'past'
                      ? 'bg-[#183A37] text-[#EFD6AC] shadow-xs font-extrabold'
                      : 'text-[#183A37] hover:text-[#815355]'
                    }`}
                >
                  Past Highlights ({pastCount})
                </button>
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-[#fffdf8] rounded-3xl border border-[rgba(24,58,55,0.14)] p-8 max-w-md mx-auto shadow-xs">
                <Calendar className="w-12 h-12 text-[#815355]/40 mx-auto mb-3" />
                <h3 className="text-lg font-extrabold text-[#183A37]">No events found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  There are no {eventFilter !== 'all' ? eventFilter : ''} events listed at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredEvents.map((event, i) => (
                  <div
                    key={event.id || `event-${i}`}
                    className="card-tech bg-[#fffdf8] rounded-3xl overflow-hidden border border-[rgba(24,58,55,0.14)] shadow-sm hover:shadow-xl hover:border-[#815355] transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Top Accent Gradient Line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#183A37] via-[#815355] to-[#EFD6AC]" />

                    {/* Event Banner Image with Click-to-Expand Interaction */}
                    <div
                      onClick={() => setSelectedEventPhoto(event)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedEventPhoto(event);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      title="Click to view full photo"
                      aria-label={`View photo for ${event.title}`}
                      className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#f4ebd9] cursor-pointer group/img focus:outline-none focus:ring-2 focus:ring-[#815355]"
                    >
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#183A37]/80 via-transparent to-transparent group-hover/img:from-[#183A37]/90 transition-colors" />

                      {/* Pop-up Hint Indicator on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 pointer-events-none">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#183A37]/95 text-[#EFD6AC] text-xs font-extrabold shadow-2xl border border-[#EFD6AC]/50 backdrop-blur-md transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                          <ZoomIn className="w-4 h-4 text-[#EFD6AC]" />
                          Click to expand
                        </span>
                      </div>

                      {/* Badges: Category & Event Code */}
                      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 flex-wrap max-w-[80%]">
                        {event.category === 'upcoming' ? (
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#183A37] text-[#EFD6AC] border border-[#EFD6AC]/30 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#E6C48A] animate-pulse" />
                            Upcoming Event
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#815355] text-white border border-white/20 shadow-md">
                            Past Highlight
                          </span>
                        )}
                        {event.eventCode && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-black bg-[#EFD6AC] text-[#183A37] border border-[#183A37]/30 shadow-md">
                            <Sparkles className="w-3 h-3 text-[#815355]" />
                            #{event.eventCode}
                          </span>
                        )}
                      </div>

                      {/* Quick Expand Icon in top-right corner */}
                      <div className="absolute top-4 right-4 pointer-events-none opacity-80 group-hover/img:opacity-100 transition-opacity">
                        <span className="w-8 h-8 rounded-full bg-[#183A37]/80 backdrop-blur-md border border-[#EFD6AC]/40 flex items-center justify-center text-[#EFD6AC] shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#183A37] group-hover:text-[#815355] transition-colors leading-snug">
                          {event.title}
                        </h3>

                        {/* Metadata: Date & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-[#183A37] bg-[#fbf7ee] p-3.5 rounded-2xl border border-[rgba(239,214,172,0.8)]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#815355] shrink-0" />
                            <span className="truncate">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#183A37] shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 space-y-2.5">
                        {/* Direct Gallery Redirect Button if eventCode exists */}
                        {event.eventCode && (
                          <Link
                            to={`/gallery?eventCode=${encodeURIComponent(event.eventCode)}`}
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#815355] to-[#5e383a] hover:from-[#6c4446] hover:to-[#4e2d2f] text-[#EFD6AC] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md border border-[rgba(239,214,172,0.3)] group/galleryBtn"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-[#EFD6AC]" />
                            <span>View Event Gallery & Media</span>
                            <span className="px-1.5 py-0.5 rounded bg-black/25 text-[#EFD6AC] font-mono text-[10px] tracking-normal font-bold">
                              #{event.eventCode}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/galleryBtn:translate-x-1 transition-transform" />
                          </Link>
                        )}

                        {/* Registration / External Link */}
                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full py-3.5 px-4 rounded-xl bg-[#183A37] hover:bg-[#122e2b] text-[#EFD6AC] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#183A37]/25 border border-[rgba(239,214,172,0.3)]"
                          >
                            {event.category === 'upcoming' ? 'Register Now' : 'Event Information'}
                            <ExternalLink className="w-3.5 h-3.5 text-[#E6C48A]" />
                          </a>
                        ) : !event.eventCode && (
                          <div className="w-full py-3.5 px-4 rounded-xl bg-[#f5ecdc] text-slate-500 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[rgba(24,58,55,0.08)]">
                            Registrations Closed / Free Entry
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: NEC CHALLENGE TASKS                                */}
        {/* ========================================================= */}
        {viewMode === 'tasks' && (
          <div className="space-y-10 animate-fade-in">
            {/* Track Switcher Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center p-1.5 bg-[#f5ecdc] rounded-full border border-[rgba(129,83,85,0.25)] shadow-sm backdrop-blur-md">
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setActiveTrack(track.id)}
                    className={`relative px-6 sm:px-8 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide rounded-full transition-all duration-300 ${activeTrack === track.id
                        ? 'bg-[#183A37] text-[#EFD6AC] shadow-md shadow-[#183A37]/25 scale-[1.02]'
                        : 'text-[#183A37] hover:text-[#815355] hover:bg-[#EFD6AC]/40'
                      }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task, i) => (
                <div
                  key={task.id}
                  className="card-tech bg-[#fffdf8] rounded-2xl p-6 border border-[rgba(24,58,55,0.14)] shadow-sm hover:shadow-xl hover:border-[#815355] transition-all duration-300 flex flex-col justify-between group relative"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {/* Top Row: Title & Status Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <h3 className="text-lg font-extrabold text-[#183A37] group-hover:text-[#815355] transition-colors leading-snug">
                        {task.title}
                      </h3>

                      {task.status === 'checked' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#183A37]/10 text-[#183A37] border border-[#183A37]/25 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-[#183A37] animate-pulse" />
                          Checked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#815355]/10 text-[#815355] border border-[#815355]/25 shrink-0">
                          <span className="w-2 h-2 rounded-full bg-[#815355]" />
                          Not submitted
                        </span>
                      )}
                    </div>

                    {/* Metadata: Deadline & Points */}
                    <div className="space-y-2.5 mb-6 text-sm font-semibold text-[#183A37] bg-[#fbf7ee] p-3.5 rounded-xl border border-[rgba(239,214,172,0.8)]">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#815355] shrink-0" />
                        <span>Deadline: <strong className="text-[#0f0d0c] font-bold">{task.deadline}</strong></span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#183A37] shrink-0" />
                        <span>Points: <strong className="text-[#0f0d0c] font-bold">{task.points}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div>
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="w-full py-2.5 px-4 rounded-xl border border-[rgba(24,58,55,0.18)] bg-white group-hover:bg-[#183A37] group-hover:border-[#183A37] text-[#183A37] group-hover:text-[#EFD6AC] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-xs"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5 text-[#815355] group-hover:text-[#E6C48A] transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183A37]/50 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-[#fffdf8] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[rgba(239,214,172,0.8)] relative animate-scale-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-[#183A37] hover:bg-[#f5ecdc] transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#f5ecdc] text-[#183A37] border border-[rgba(129,83,85,0.25)]">
                  {selectedTask.track === 'preliminary' ? 'Preliminary Track' : selectedTask.track === 'ignite-propel' ? 'Ignite Propel Track' : 'Comprehensive Track'}
                </span>
                {selectedTask.status === 'checked' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#183A37]/10 text-[#183A37] border border-[#183A37]/25">
                    <span className="w-2 h-2 rounded-full bg-[#183A37]" /> Checked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#815355]/10 text-[#815355] border border-[#815355]/25">
                    <span className="w-2 h-2 rounded-full bg-[#815355]" /> Not submitted
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-extrabold text-[#183A37]">
                {selectedTask.title}
              </h3>
            </div>

            {/* Modal Stats Box */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#fbf7ee] border border-[rgba(239,214,172,0.8)]">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#815355] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#815355]" /> Deadline
                </div>
                <div className="text-sm font-extrabold text-[#0f0d0c]">{selectedTask.deadline}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#183A37] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#183A37]" /> Points Score
                </div>
                <div className="text-sm font-extrabold text-[#0f0d0c]">{selectedTask.points}</div>
              </div>
            </div>

            {/* Description */}
            {selectedTask.description && (
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#815355]">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedTask.description}
                </p>
              </div>
            )}

            {/* Deliverables Checklist */}
            {selectedTask.deliverables && selectedTask.deliverables.length > 0 && (
              <div className="space-y-2.5 mb-8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#815355]">Key Deliverables</h4>
                <div className="space-y-2">
                  {selectedTask.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#183A37] font-medium bg-[#fbf7ee] p-2.5 rounded-xl border border-[rgba(239,214,172,0.7)]">
                      <Check className="w-4 h-4 text-[#183A37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="w-full py-3.5 px-5 rounded-xl bg-[#183A37] hover:bg-[#122e2b] text-[#EFD6AC] font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#183A37]/25"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* POPPING UP EVENT PHOTO MODAL (LIGHTBOX)                   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedEventPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedEventPhoto(null)}
            onWheel={handleModalWheel}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedEventPhoto.title}
          >
            <div className="min-h-full flex items-center justify-center py-6 w-full">
              {/* Pop-up Animated Card Container */}
              <motion.div
                initial={{ scale: 0.35, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.45, opacity: 0, y: 25 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 24,
                  mass: 0.75,
                }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative max-w-4xl w-full flex flex-col items-center select-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEventPhoto(null)}
                  className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-30 w-11 h-11 rounded-full bg-[#183A37] text-[#EFD6AC] hover:bg-[#815355] hover:text-white flex items-center justify-center shadow-2xl border-2 border-[#EFD6AC]/60 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left/Right Navigation Buttons for Scrolling between Images */}
                {filteredEvents.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#183A37]/90 text-[#EFD6AC] hover:bg-[#815355] hover:text-white border-2 border-[#EFD6AC]/50 flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                      title="Previous event photo (Left Arrow or Scroll Up)"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#183A37]/90 text-[#EFD6AC] hover:bg-[#815355] hover:text-white border-2 border-[#EFD6AC]/50 flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                      title="Next event photo (Right Arrow or Scroll Down)"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Photo Frame Container with Zoom and Pan/Scroll */}
                <div
                  onDoubleClick={handleToggleZoom}
                  className={`relative w-full max-h-[65vh] sm:max-h-[72vh] flex items-center justify-center rounded-3xl border-2 border-[rgba(239,214,172,0.45)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-[#0f0d0c] ${
                    zoomLevel > 1 ? 'overflow-auto cursor-move' : 'overflow-hidden cursor-zoom-in'
                  }`}
                  title={zoomLevel > 1 ? 'Scroll or drag to view image details | Double-click to reset zoom' : 'Double click or use buttons to zoom & scroll'}
                >
                  <img
                    src={selectedEventPhoto.imageUrl}
                    alt={selectedEventPhoto.title}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transition: 'transform 0.22s ease-out',
                      transformOrigin: 'center center',
                    }}
                    className={`w-auto h-auto max-h-[65vh] sm:max-h-[72vh] max-w-full object-contain rounded-2xl select-none ${
                      zoomLevel > 1 ? 'm-auto p-4' : ''
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />

                  {/* Floating Zoom & Scroll Controls */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-[#183A37]/85 backdrop-blur-md border border-[#EFD6AC]/30 shadow-lg text-[#EFD6AC]">
                    <button
                      onClick={handleZoomIn}
                      className="w-8 h-8 rounded-full hover:bg-[#815355] flex items-center justify-center transition-colors cursor-pointer"
                      title="Zoom in (+)"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono font-bold px-1 select-none">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 1}
                      className="w-8 h-8 rounded-full hover:bg-[#815355] disabled:opacity-40 disabled:hover:bg-transparent flex items-center justify-center transition-colors cursor-pointer"
                      title="Zoom out (-)"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    {zoomLevel > 1 && (
                      <button
                        onClick={() => setZoomLevel(1)}
                        className="w-8 h-8 rounded-full hover:bg-[#815355] flex items-center justify-center transition-colors cursor-pointer"
                        title="Reset zoom (0)"
                        aria-label="Reset zoom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Multiple Images Counter */}
                  {filteredEvents.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#EFD6AC]/30 text-[#EFD6AC] text-xs font-extrabold shadow-md">
                      {currentEventIndex + 1} of {filteredEvents.length}
                    </div>
                  )}
                </div>

                {/* Details & Action Bar */}
                <div className="mt-3.5 w-full bg-[#183A37]/95 backdrop-blur-xl rounded-2xl border border-[rgba(239,214,172,0.35)] p-4 sm:p-5 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold ${
                          selectedEventPhoto.category === 'upcoming'
                            ? 'bg-[#EFD6AC] text-[#183A37]'
                            : 'bg-[#815355] text-white'
                        }`}
                      >
                        {selectedEventPhoto.category === 'upcoming' ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#183A37] animate-pulse" />
                            Upcoming Event
                          </>
                        ) : (
                          'Past Highlight'
                        )}
                      </span>

                      {selectedEventPhoto.date && (
                        <span className="text-xs text-[#EFD6AC]/85 font-semibold flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full border border-[rgba(239,214,172,0.2)]">
                          <Calendar className="w-3.5 h-3.5 text-[#EFD6AC]" />
                          {selectedEventPhoto.date}
                        </span>
                      )}

                      {selectedEventPhoto.location && (
                        <span className="text-xs text-[#EFD6AC]/85 font-semibold flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full border border-[rgba(239,214,172,0.2)]">
                          <MapPin className="w-3.5 h-3.5 text-[#EFD6AC]" />
                          {selectedEventPhoto.location}
                        </span>
                      )}

                      {selectedEventPhoto.eventCode && (
                        <span className="text-xs text-[#183A37] font-mono font-black flex items-center gap-1 bg-[#EFD6AC] px-3 py-0.5 rounded-full border border-[#EFD6AC] shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#815355]" />
                          #{selectedEventPhoto.eventCode}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#fffdf8] leading-tight truncate">
                      {selectedEventPhoto.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {selectedEventPhoto.eventCode && (
                      <Link
                        to={`/gallery?eventCode=${encodeURIComponent(selectedEventPhoto.eventCode)}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#815355] hover:bg-[#6c4446] text-[#EFD6AC] text-xs font-extrabold border border-[#EFD6AC]/30 transition-all shadow-md group/modalGal"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-[#EFD6AC]" />
                        <span>View Gallery Photos</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/modalGal:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    <a
                      href={selectedEventPhoto.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#EFD6AC] text-xs font-bold border border-[#EFD6AC]/30 transition-colors"
                      title="Open original image in new tab"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Size</span>
                    </a>
                    {selectedEventPhoto.link && (
                      <a
                        href={selectedEventPhoto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFD6AC] hover:bg-[#e6c48a] text-[#183A37] text-xs font-extrabold transition-colors shadow-md"
                      >
                        <span>{selectedEventPhoto.category === 'upcoming' ? 'Register' : 'Details'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Multi-Photo Thumbnail Bar for Scrolling between Events */}
                {filteredEvents.length > 1 && (
                  <div className="mt-3 w-full flex items-center justify-center gap-2 overflow-x-auto py-1 px-2">
                    {filteredEvents.map((ev, idx) => (
                      <button
                        key={ev.id || idx}
                        onClick={() => {
                          setSelectedEventPhoto(ev);
                          setZoomLevel(1);
                        }}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                          idx === currentEventIndex
                            ? 'border-[#EFD6AC] scale-105 shadow-lg ring-2 ring-[#EFD6AC]/50'
                            : 'border-white/20 opacity-60 hover:opacity-100 hover:border-[#EFD6AC]/70'
                        }`}
                        title={ev.title}
                      >
                        <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
