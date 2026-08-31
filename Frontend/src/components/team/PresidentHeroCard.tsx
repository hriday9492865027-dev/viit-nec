import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedTeamMember, ROLE_COLORS } from '@/data/teamData';
import { Crown, Linkedin, Mail, Github, Instagram, Award, Quote } from 'lucide-react';

interface PresidentHeroCardProps {
  member: EnhancedTeamMember;
  onHover?: (hovering: boolean) => void;
}

export default function PresidentHeroCard({ member, onHover }: PresidentHeroCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const colors = ROLE_COLORS.president;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -8,
      y: (x - 0.5) * 8,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    onHover?.(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-center px-4"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-lg w-full perspective-1000"
      >
        <div
          className="relative rounded-3xl p-8 sm:p-10 text-center transition-all duration-500 transform-style-3d"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: isHovered
              ? '0 30px 80px -20px rgba(234, 179, 8, 0.2), 0 0 60px rgba(234, 179, 8, 0.08)'
              : '0 20px 60px -15px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Animated Gradient Border Glow */}
          <div
            className={`absolute -inset-[2px] rounded-3xl transition-opacity duration-700 -z-10 ${
              isHovered ? 'opacity-100' : 'opacity-40'
            }`}
            style={{
              background: `conic-gradient(from 0deg, #f59e0b, #eab308, #f59e0b, #d97706, #f59e0b)`,
              filter: 'blur(3px)',
              animation: 'gradientSpin 4s linear infinite',
            }}
          />

          {/* Crown Badge */}
          <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full ${colors.badge} text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg z-20`}>
            <Crown className="w-4 h-4 text-amber-200" />
            <span>President</span>
          </div>

          {/* Large Circular Image with Glow */}
          <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mt-4 mb-6 group">
            {/* Floating glow behind image */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-700 ${
                isHovered ? 'opacity-80 scale-110' : 'opacity-40 scale-100'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            {/* Animated gradient border ring */}
            <div
              className="absolute -inset-1 rounded-full animate-gradient-spin"
              style={{
                background: 'conic-gradient(from 0deg, #f59e0b, #fbbf24, #f59e0b, #d97706, #f59e0b)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-white" />
            </div>
            {/* Profile Image */}
            <img
              src={member.imageUrl}
              alt={member.name}
              className={`absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>

          {/* Name & Details */}
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
            {member.name}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 font-bold text-xs uppercase tracking-wider border border-amber-200">
              {member.department}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
              {member.year}
            </span>
          </div>

          {/* Quote */}
          {member.quote && (
            <div className="mt-5 flex items-start gap-2 justify-center max-w-sm mx-auto">
              <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 italic leading-relaxed">
                {member.quote}
              </p>
            </div>
          )}

          {/* Achievement Badges */}
          {member.achievements && member.achievements.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {member.achievements.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-200/60 animate-breathe"
                >
                  <Award className="w-3 h-3" />
                  {badge}
                </div>
              ))}
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:shadow-glow-blue transition-all duration-300 hover:-translate-y-1 group"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:border-pink-300 hover:shadow-glow-purple transition-all duration-300 hover:-translate-y-1"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 hover:shadow-glow-emerald transition-all duration-300 hover:-translate-y-1"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
