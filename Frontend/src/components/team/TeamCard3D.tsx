import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EnhancedTeamMember, ROLE_COLORS, TIER_LABELS } from '@/data/teamData';
import { Linkedin, Mail, Github, Instagram, ExternalLink, ChevronRight } from 'lucide-react';

interface TeamCard3DProps {
  member: EnhancedTeamMember;
  index?: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  onHoverMember?: (id: string | null) => void;
}

export default function TeamCard3D({
  member,
  index = 0,
  isHighlighted = false,
  isDimmed = false,
  onHoverMember,
}: TeamCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const colors = ROLE_COLORS[member.tier];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -12,
      y: (x - 0.5) * 12,
    });
    setSpotlight({
      x: x * 100,
      y: y * 100,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverMember?.(member.id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 50, y: 50 });
    onHoverMember?.(null);
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`transition-all duration-500 ${isDimmed ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative w-full cursor-pointer perspective-1000"
        style={{ height: '420px' }}
      >
        {/* 3D Card Container */}
        <div
          className="relative w-full h-full transition-transform duration-700 transform-style-3d"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${isFlipped ? 180 + tilt.y : tilt.y}deg)`,
          }}
        >
          {/* ─── FRONT SIDE ─── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)'}`,
              boxShadow: isHovered
                ? '0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 0 40px rgba(99, 142, 255, 0.08)'
                : '0 8px 32px -8px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Spotlight overlay */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none z-10"
              style={{
                opacity: isHovered ? 0.6 : 0,
                background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`,
              }}
            />

            {/* Gradient border glow on hover */}
            <div
              className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 -z-10 ${
                isHovered || isHighlighted ? 'opacity-60' : 'opacity-0'
              }`}
              style={{
                background: `conic-gradient(from 0deg, ${
                  member.tier === 'president' ? '#f59e0b, #fbbf24, #f59e0b' :
                  member.tier === 'vp' ? '#3b82f6, #6366f1, #3b82f6' :
                  member.tier === 'secretary' ? '#a855f7, #8b5cf6, #a855f7' :
                  member.tier === 'coordinator' ? '#10b981, #14b8a6, #10b981' :
                  '#64748b, #94a3b8, #64748b'
                })`,
                filter: 'blur(3px)',
              }}
            />

            {/* Role Badge */}
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${colors.badge} text-white text-[10px] font-bold uppercase tracking-wider z-20 shadow-md`}>
              {TIER_LABELS[member.tier]}
            </div>

            {/* Flip hint */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center z-20 border border-white/40">
              <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isHovered ? 'rotate-90' : ''}`} />
            </div>

            {/* Image */}
            <div className="h-[55%] overflow-hidden">
              <img
                src={member.imageUrl}
                alt={member.name}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h4 className="text-lg font-black text-slate-900 tracking-tight leading-tight font-satoshi">
                {member.name}
              </h4>
              <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                {member.role}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                  {member.department}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-100">
                  {member.year}
                </span>
              </div>

              {/* Social icons - slide up on hover */}
              <div
                className={`flex items-center gap-2 pt-2 transition-all duration-500 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all duration-200 hover:scale-110"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all duration-200 hover:scale-110"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:border-pink-300 transition-all duration-200 hover:scale-110"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 transition-all duration-200 hover:scale-110"
                    title="Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ─── BACK SIDE ─── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.12)',
            }}
          >
            <div className="p-5 h-full flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="mb-4">
                <h4 className="text-lg font-black text-slate-900 font-satoshi">{member.name}</h4>
                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{member.role}</p>
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {member.bio}
                </p>
              )}

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${colors.bg} ${colors.text} ${colors.border} border-opacity-30`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {member.projects && member.projects.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Projects</p>
                  <div className="space-y-1">
                    {member.projects.map((project) => (
                      <div key={project} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Department</span>
                  <span className="text-slate-700 font-bold">{member.department}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Year</span>
                  <span className="text-slate-700 font-bold">{member.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-30">
          {/* Ripple will be created via CSS animations on click */}
        </div>
      </div>
    </motion.div>
  );
}
