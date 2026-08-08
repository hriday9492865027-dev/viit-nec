import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { TEAM_STATS } from '@/data/teamData';
import { Sparkles, Users, Building2, CalendarCheck, Rocket } from 'lucide-react';

function StatCounter({ value, label, icon: Icon, suffix = '' }: {
  value: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 group">
      <div className="w-14 h-14 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-glass transition-all duration-500 group-hover:shadow-glass-hover group-hover:scale-110 group-hover:border-blue-300/50">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-satoshi tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function TeamHero() {
  const { isVisible, ref } = useScrollAnimation(0.1);

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Content */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-glass text-xs font-bold text-blue-700 uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-blue-500" />
          NEC E-Cell Leadership
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] font-satoshi">
          Meet the{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Visionaries
            </span>
            <span
              className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200/50 via-indigo-200/50 to-violet-200/50 rounded-full -z-0"
              style={{ filter: 'blur(4px)' }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The minds driving innovation, entrepreneurship and leadership.
        </p>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 pt-8 max-w-3xl mx-auto">
          <StatCounter value={TEAM_STATS.coreMembers} label="Core Members" icon={Users} suffix="+" />
          <StatCounter value={TEAM_STATS.departments} label="Departments" icon={Building2} />
          <StatCounter value={TEAM_STATS.eventsConducted} label="Events Conducted" icon={CalendarCheck} suffix="+" />
          <StatCounter value={TEAM_STATS.startupsSupported} label="Startups Supported" icon={Rocket} />
        </div>
      </div>
    </section>
  );
}
