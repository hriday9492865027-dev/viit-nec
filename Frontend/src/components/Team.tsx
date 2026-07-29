'use client';

import React from 'react';
import { INITIAL_TEAM } from '@/data/initialData';
import { Linkedin, Mail } from 'lucide-react';

export default function Team() {
  return (
    <section id="team" className="py-28 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-widest">
            Faculty Mentors & Advisory Board
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-950">
            The Faculty Mentors Driving E-Cell
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            Distinguished professors and advisors of Vignan's Institute Of Information Technology guiding student innovation, research, and startup excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {INITIAL_TEAM.map((member, i) => (
            <div
              key={member.id}
              className="card-tech accent-line-tech rounded-2xl p-8 flex flex-col items-center text-center space-y-5 group shadow-sm stagger-item"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Profile Image with Ring Accent */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-200 p-1 group-hover:border-blue-500 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:shadow-blue-200/50">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-600"
                />
              </div>

              {/* Name & Role */}
              <div className="space-y-2 w-full">
                <h3 className="text-xl font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors duration-300">
                  {member.name}
                </h3>
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-wider group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700 transition-all duration-300">
                  {member.role}
                </span>
                {member.department && (
                  <p className="text-sm text-slate-500 font-medium mt-1">{member.department}</p>
                )}
              </div>

              {/* Social Pills */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 w-full justify-center">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:text-white hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-blue-700 hover:shadow-md"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:text-white hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-blue-700 hover:shadow-md"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
