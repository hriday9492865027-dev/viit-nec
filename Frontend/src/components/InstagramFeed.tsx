'use client';

import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';

export default function InstagramFeed() {
  return (
    <section id="instagram" className="py-24 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-extrabold text-pink-700 uppercase tracking-widest">
              <Instagram className="w-3.5 h-3.5" />
              Social Media Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
              Connect @{INSTAGRAM_CONFIG.handle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal">
              Follow our official Instagram for live event coverage, announcements, and founder stories.
            </p>
          </div>

          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            Follow @{INSTAGRAM_CONFIG.handle}
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Live Instagram Widget Feed */}
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <iframe
            src={`https://www.instagram.com/${INSTAGRAM_CONFIG.handle}/embed/`}
            className="w-full min-h-[500px] border-none"
            scrolling="no"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}
