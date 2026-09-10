import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  EnhancedTeamMember,
  TEAM_MEMBERS,
  ROLE_COLORS,
  TIER_LABELS,
  TeamTier,
} from '@/data/teamData';
import { Crown, Shield, Award, Star, User, Quote } from 'lucide-react';

const TIER_ORDER: TeamTier[] = ['faculty', 'president', 'vp', 'secretary', 'coordinator', 'member'];

const TIER_ICONS: Record<TeamTier, React.ElementType> = {
  faculty: Award,
  president: Crown,
  vp: Shield,
  secretary: Award,
  coordinator: Star,
  member: User,
};

interface TeamTimelineViewProps {
  filteredMembers?: EnhancedTeamMember[];
}

export default function TeamTimelineView({ filteredMembers }: TeamTimelineViewProps) {
  const members = filteredMembers || TEAM_MEMBERS;

  const groupedByTier = useMemo(() => {
    const groups: Record<TeamTier, EnhancedTeamMember[]> = {
      faculty: [],
      president: [],
      vp: [],
      secretary: [],
      coordinator: [],
      member: [],
    };
    for (const m of members) {
      groups[m.tier].push(m);
    }
    return groups;
  }, [members]);

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, #f59e0b, #3b82f6, #a855f7, #10b981, #94a3b8)',
          }}
        />
        {/* Traveling dot */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <circle r="4" fill="white" style={{ filter: 'drop-shadow(0 0 6px rgba(99, 142, 255, 0.5))' }}>
            <animateMotion dur="6s" repeatCount="indefinite" path={`M 1,0 L 1,${100}`} />
          </circle>
        </svg>
      </div>

      {/* Timeline Sections */}
      {TIER_ORDER.map((tier, tierIndex) => {
        const tierMembers = groupedByTier[tier];
        if (tierMembers.length === 0) return null;
        const colors = ROLE_COLORS[tier];
        const Icon = TIER_ICONS[tier];
        const isLeft = tierIndex % 2 === 0;

        return (
          <div key={tier} className="relative mb-16 last:mb-0">
            {/* Tier label dot on timeline */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: tierIndex * 0.1 }}
              className="absolute left-1/2 -translate-x-1/2 z-20"
            >
              <div className={`w-12 h-12 rounded-full ${colors.badge} flex items-center justify-center shadow-lg border-4 border-white`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Members for this tier */}
            <div className="pt-16 space-y-6">
              {tierMembers.map((member, mIndex) => {
                const side = (mIndex % 2 === 0) ? isLeft : !isLeft;
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: side ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: mIndex * 0.1 }}
                    className={`flex items-center gap-4 ${
                      side ? 'flex-row pr-[52%]' : 'flex-row-reverse pl-[52%]'
                    }`}
                  >
                    {/* Connection line to center */}
                    <div
                      className="hidden sm:block w-8 h-0.5 flex-shrink-0"
                      style={{
                        background: `linear-gradient(${side ? 'to right' : 'to left'}, transparent, ${
                          tier === 'president' ? '#f59e0b' :
                          tier === 'vp' ? '#3b82f6' :
                          tier === 'secretary' ? '#a855f7' :
                          tier === 'coordinator' ? '#10b981' : '#94a3b8'
                        })`,
                      }}
                    />

                    {/* Member Card */}
                    <div
                      className="flex-1 p-4 rounded-2xl transition-all duration-500 hover:shadow-glass-hover hover:-translate-y-1 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.65)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-black text-slate-900 truncate font-satoshi">
                            {member.name}
                          </h4>
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                            {member.role}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] text-slate-400 font-bold">{member.department}</span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[9px] text-slate-400 font-bold">{member.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quote / Bio on hover */}
                      {member.bio && (
                        <div className="mt-3 flex items-start gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                          <Quote className="w-3 h-3 text-slate-300 flex-shrink-0 mt-0.5" />
                          <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                            {member.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
