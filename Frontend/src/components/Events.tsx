'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, ArrowRight, X, Sparkles, Check, Clock, AlertCircle } from 'lucide-react';
import { INITIAL_TASKS } from '@/data/initialData';
import { TaskItem } from '@/types';

type TrackType = 'preliminary' | 'ignite-propel' | 'comprehensive';

export default function Events() {
  const [activeTrack, setActiveTrack] = useState<TrackType>('preliminary');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const filteredTasks = INITIAL_TASKS.filter((task) => task.track === activeTrack);

  const tracks: { id: TrackType; label: string; count: number }[] = [
    { id: 'preliminary', label: 'Preliminary', count: INITIAL_TASKS.filter(t => t.track === 'preliminary').length },
    { id: 'ignite-propel', label: 'Ignite Propel', count: INITIAL_TASKS.filter(t => t.track === 'ignite-propel').length },
    { id: 'comprehensive', label: 'Comprehensive', count: INITIAL_TASKS.filter(t => t.track === 'comprehensive').length },
  ];

  return (
    <section id="tasks-events" className="py-24 bg-slate-50/60 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      {/* Anchor aliases for backward compatibility */}
      <div id="events" className="absolute -top-10" />
      <div id="tasks" className="absolute -top-10" />

      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-xs font-extrabold text-blue-800 uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            National Entrepreneurship Challenge
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight">
            Tasks
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Milestones, deliverables, and initiatives executed by NEC E-Cell in association with E-Cell IIT Bombay.
          </p>
        </div>

        {/* Track Switcher Tabs (Pill style matching reference) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 bg-white rounded-full border border-slate-200 shadow-sm backdrop-blur-md">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`relative px-6 sm:px-8 py-2.5 text-xs sm:text-sm font-extrabold tracking-wide rounded-full transition-all duration-300 ${
                  activeTrack === track.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-[1.02]'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
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
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* Top Row: Title & Status Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <h3 className="text-lg font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors leading-snug">
                    {task.title}
                  </h3>
                  
                  {task.status === 'checked' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Checked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Not submitted
                    </span>
                  )}
                </div>

                {/* Metadata: Deadline & Points */}
                <div className="space-y-2.5 mb-6 text-sm font-semibold text-slate-700 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Deadline: <strong className="text-slate-900 font-bold">{task.deadline}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Points: <strong className="text-slate-900 font-bold">{task.points}</strong></span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <div>
                <button
                  onClick={() => setSelectedTask(task)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white group-hover:bg-blue-600 group-hover:border-blue-600 text-slate-700 group-hover:text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-xs"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-scale-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
                  {selectedTask.track === 'preliminary' ? 'Preliminary Track' : selectedTask.track === 'ignite-propel' ? 'Ignite Propel Track' : 'Comprehensive Track'}
                </span>
                {selectedTask.status === 'checked' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Checked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Not submitted
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-extrabold text-blue-950">
                {selectedTask.title}
              </h3>
            </div>

            {/* Modal Stats Box */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Deadline
                </div>
                <div className="text-sm font-extrabold text-slate-800">{selectedTask.deadline}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Points Score
                </div>
                <div className="text-sm font-extrabold text-slate-800">{selectedTask.points}</div>
              </div>
            </div>

            {/* Description */}
            {selectedTask.description && (
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedTask.description}
                </p>
              </div>
            )}

            {/* Deliverables Checklist */}
            {selectedTask.deliverables && selectedTask.deliverables.length > 0 && (
              <div className="space-y-2.5 mb-8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Key Deliverables</h4>
                <div className="space-y-2">
                  {selectedTask.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                className="w-full py-3 px-5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-700/20"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
