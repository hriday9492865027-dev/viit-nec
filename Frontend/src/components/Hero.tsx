'use client';

import React from 'react';
import { Award, ArrowRight, Rocket, Users, Lightbulb, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white text-slate-900 py-28 lg:py-36 tech-grid-pattern border-b border-slate-200">
      {/* Soft Blue Ambient Lighting Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[160px] pointer-events-none animate-float" />
      <div className="absolute top-1/4 right-5 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
          
          {/* Official IIT Bombay Association Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-iitb-tech text-sm font-bold shadow-sm animate-fade-down animate-pulse-glow">
            <Award className="w-5 h-5 text-blue-700 shrink-0" />
            <span>In association with <strong className="text-blue-950 font-extrabold">E-Cell IIT Bombay</strong></span>
          </div>

          {/* Main Headline & Tagline */}
          <div className="space-y-5 animate-fade-up">
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-blue-600 block">
              Where Founders & Innovators Begin
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-blue-950 leading-[1.05]">
              Ideas That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-sky-500">
                Ignite Tomorrow
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed animate-fade-up delay-200" style={{ animationDelay: '200ms' }}>
            NEC Entrepreneurship Cell empowers student founders, builders, and visionaries with incubation, expert mentorship, and access to India&apos;s premier startup network.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
            <a
              href="#tasks-events"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-blue-700/20 border border-blue-600/30"
            >
              Explore Tasks & Events
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-900 font-bold text-sm uppercase tracking-wider border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              Our Mission
            </a>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-slate-200/80 w-full mt-8">
            {[
              { icon: Rocket, value: '15+', label: 'Startups Incubated', delay: 0 },
              { icon: Users, value: '2,000+', label: 'Student Members', delay: 100 },
              { icon: Lightbulb, value: '25+', label: 'Bootcamps & Talks', delay: 200 },
              { icon: Award, value: 'IIT Bombay', label: 'Network Partner', delay: 300 },
            ].map((item, i) => (
              <div
                key={i}
                className="card-tech p-6 rounded-2xl flex flex-col items-center shadow-sm stagger-item"
                style={{ animationDelay: `${600 + item.delay}ms` }}
              >
                <item.icon className="w-7 h-7 text-blue-600 mb-3" />
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-950">{item.value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1.5">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
