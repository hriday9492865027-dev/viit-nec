import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '@/data/initialData';

export default function InstagramFeed() {
  return (
    <div id="instagram" className="pt-16 mt-16 border-t border-slate-200/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              background: 'rgba(23, 37, 84, 0.07)',
              border: '1px solid rgba(23, 37, 84, 0.18)',
              color: '#172554',
              fontFamily: '"Satoshi", sans-serif',
            }}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            Social Media Updates
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{
              fontFamily: '"Satoshi", sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#172554',
            }}
          >
            Connect @{INSTAGRAM_CONFIG.handle}
          </h2>
          <p
            className="text-slate-600 text-sm sm:text-base max-w-xl font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Follow our official Instagram for live event coverage, announcements, and founder stories.
          </p>
        </div>

        <a
          href={INSTAGRAM_CONFIG.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/20 transition-all self-start md:self-auto hover:scale-[1.02]"
          style={{ fontFamily: '"Satoshi", sans-serif' }}
        >
          <Instagram className="w-4 h-4" />
          Follow @{INSTAGRAM_CONFIG.handle}
          <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>

      {/* Glass Frame Instagram Embed */}
      <div
        className="w-full overflow-hidden rounded-3xl p-2 sm:p-4 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(23, 37, 84, 0.12)',
          boxShadow: '0 20px 40px -15px rgba(23, 37, 84, 0.1)',
        }}
      >
        <iframe
          src={`https://www.instagram.com/${INSTAGRAM_CONFIG.handle}/embed/`}
          className="w-full min-h-[540px] border-none rounded-2xl"
          scrolling="no"
          allowFullScreen
        />
      </div>
    </div>
  );
}

