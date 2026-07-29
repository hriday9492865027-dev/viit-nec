'use client';

import React from 'react';
import { Target, Compass, Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-widest">
            About VIIT E-Cell
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
            Where Passion Meets Entrepreneurial Execution
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal">
            VIIT Entrepreneurship Cell is the student-driven catalyst transforming innovative sparks into market-ready ventures.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Affiliation & Campus Role */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="card-tech accent-line-tech p-8 rounded-2xl space-y-5 flex-1 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700 block">Institutional Network</span>
                  <h3 className="text-xl font-extrabold text-blue-950">IIT Bombay E-Cell Affiliation</h3>
                </div>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                VIIT E-Cell operates in association with <strong className="text-blue-800 font-extrabold">E-Cell IIT Bombay</strong>, granting our student members direct access to national startup challenges, investor panels, pitch competitions, and leadership bootcamps.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold pt-2 border-t border-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Access to IIT Bombay’s nationwide mentor & venture pool</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>National Entrepreneurship Challenge (NEC) participation privileges</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Specialized bootcamps, masterclasses, and E-Summit entry</span>
                </li>
              </ul>
            </div>

            <div className="card-tech p-6 rounded-2xl space-y-3 shadow-sm">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Representing VIIT
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Serving as the central innovation engine of Vignan's Institute Of Information Technology, we bridge academic research with commercial viability, empowering students to build job-creating enterprises.
              </p>
            </div>
          </div>
          {/* Right Column: Mission & Vision Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Vision Card */}
            <div className="card-tech accent-line-tech p-8 rounded-2xl space-y-4 flex-1 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold border border-blue-200">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-blue-950">Our Vision</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                To emerge as a nationally recognized Centre of Excellence that empowers innovators, entrepreneurs, researchers, and future leaders by fostering a culture of creativity, deep technology, sustainability and startup excellence, contributing towards Viksit Bharat 2047 through impactful innovation-led development.
              </p>
            </div>

            {/* Mission Card */}
            <div className="card-tech accent-line-tech p-8 rounded-2xl space-y-4 flex-1 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold border border-blue-200">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-blue-950">Our Mission</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-normal">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Develop a vibrant innovation ecosystem that inspires students, faculty, researchers and staff to transform creative ideas into impactful technologies, startups and scalable enterprises.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Equip students with Design Thinking, Lean Startup, Business Model Innovation, Product Development, Leadership and Entrepreneurial Mindset to become globally competitive innovators.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Create strategic collaborations with academia, industry, government organizations, startups, investors, incubators, research laboratories and international institutions to enhance technology commercialization and entrepreneurship.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Facilitate patenting, copyrights, trademarks, technology transfer, licensing and startup creation by establishing an effective Intellectual Property Management ecosystem.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
