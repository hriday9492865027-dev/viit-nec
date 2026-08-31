import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EnhancedTeamMember,
  TEAM_MEMBERS,
  ROLE_COLORS,
  TIER_LABELS,
  getChildren,
  getLineage,
  getDescendants,
  TeamTier,
} from '@/data/teamData';
import { ChevronDown, Crown, Shield, Award, Star, User } from 'lucide-react';

const TIER_ICONS: Record<TeamTier, React.ElementType> = {
  president: Crown,
  vp: Shield,
  secretary: Award,
  coordinator: Star,
  member: User,
};

/* ─── Single Tree Node ─── */
interface TreeNodeProps {
  member: EnhancedTeamMember;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
  hoveredMember: string | null;
  setHoveredMember: (id: string | null) => void;
  highlightedIds: Set<string>;
  depth: number;
}

function TreeNode({
  member,
  expandedNodes,
  toggleNode,
  hoveredMember,
  setHoveredMember,
  highlightedIds,
  depth,
}: TreeNodeProps) {
  const children = getChildren(member.id);
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(member.id);
  const isHighlighted = highlightedIds.size === 0 || highlightedIds.has(member.id);
  const colors = ROLE_COLORS[member.tier];
  const Icon = TIER_ICONS[member.tier];
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div
        ref={nodeRef}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: depth * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`relative cursor-pointer transition-all duration-500 ${
          isHighlighted ? 'opacity-100' : 'opacity-25'
        }`}
        onMouseEnter={() => setHoveredMember(member.id)}
        onMouseLeave={() => setHoveredMember(null)}
        onClick={() => hasChildren && toggleNode(member.id)}
      >
        <div
          className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-400 group ${
            hoveredMember === member.id
              ? `${colors.glow} border-2 ${colors.border}`
              : 'border border-white/40 shadow-glass'
          }`}
          style={{
            background: hoveredMember === member.id
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Gradient glow behind on hover */}
          <div
            className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 -z-10 ${
              hoveredMember === member.id ? 'opacity-50' : 'opacity-0'
            }`}
            style={{
              background: `linear-gradient(135deg, ${
                member.tier === 'president' ? '#f59e0b, #fbbf24' :
                member.tier === 'vp' ? '#3b82f6, #6366f1' :
                member.tier === 'secretary' ? '#a855f7, #8b5cf6' :
                member.tier === 'coordinator' ? '#10b981, #14b8a6' :
                '#64748b, #94a3b8'
              })`,
              filter: 'blur(4px)',
            }}
          />

          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 ${colors.text} flex-shrink-0`} />
              <h4 className="text-sm font-black text-slate-900 truncate font-satoshi">
                {member.name}
              </h4>
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
              {TIER_LABELS[member.tier]}
            </p>
          </div>

          {/* Expand Icon */}
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-400 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </motion.div>

      {/* SVG Connector + Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center overflow-hidden"
          >
            {/* Vertical connector stem */}
            <svg width="4" height="40" className="overflow-visible">
              <defs>
                <linearGradient id={`grad-stem-${member.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={
                    member.tier === 'president' ? '#f59e0b' :
                    member.tier === 'vp' ? '#3b82f6' :
                    member.tier === 'secretary' ? '#a855f7' :
                    member.tier === 'coordinator' ? '#10b981' : '#94a3b8'
                  } />
                  <stop offset="100%" stopColor={
                    member.tier === 'president' ? '#3b82f6' :
                    member.tier === 'vp' ? '#a855f7' :
                    member.tier === 'secretary' ? '#10b981' :
                    member.tier === 'coordinator' ? '#94a3b8' : '#64748b'
                  } />
                </linearGradient>
                <filter id={`glow-${member.id}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <line
                x1="2" y1="0" x2="2" y2="40"
                stroke={`url(#grad-stem-${member.id})`}
                strokeWidth="2"
                filter={`url(#glow-${member.id})`}
                className={`transition-opacity duration-500 ${
                  isHighlighted ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="40"
                  to="0"
                  dur="0.6s"
                  fill="freeze"
                />
              </line>
              {/* Traveling dot */}
              <circle r="3" fill="white" filter={`url(#glow-${member.id})`}>
                <animateMotion dur="2s" repeatCount="indefinite" path="M 2,0 L 2,40" />
              </circle>
            </svg>

            {/* Children row */}
            <div className={`flex flex-wrap items-start justify-center gap-6 ${
              children.length > 3 ? 'max-w-4xl' : ''
            }`}>
              {children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <TreeNode
                    member={child}
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                    hoveredMember={hoveredMember}
                    setHoveredMember={setHoveredMember}
                    highlightedIds={highlightedIds}
                    depth={depth + 1}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Interactive Org Tree ─── */
interface InteractiveOrgTreeProps {
  searchQuery?: string;
  departmentFilter?: string;
  yearFilter?: string;
  tierFilter?: string;
}

export default function InteractiveOrgTree({
  searchQuery = '',
  departmentFilter = '',
  yearFilter = '',
  tierFilter = '',
}: InteractiveOrgTreeProps) {
  const president = TEAM_MEMBERS.find((m) => m.tier === 'president');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['tm-pres-1']));
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Collapse: remove this node and all descendants
        next.delete(id);
        const desc = getDescendants(id);
        desc.forEach((d) => next.delete(d));
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const all = new Set(TEAM_MEMBERS.map((m) => m.id));
    setExpandedNodes(all);
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set(['tm-pres-1']));
  }, []);

  // Compute highlighted IDs based on hover
  const highlightedIds = useMemo(() => {
    if (!hoveredMember) return new Set<string>();
    const lineage = getLineage(hoveredMember);
    const descendants = getDescendants(hoveredMember);
    return new Set([...lineage, ...descendants]);
  }, [hoveredMember]);

  if (!president) return null;

  return (
    <div className="relative">
      {/* Expand/Collapse controls */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={expandAll}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white/60 backdrop-blur-md border border-white/40 shadow-glass hover:shadow-glass-hover hover:bg-white/80 transition-all duration-300 hover:-translate-y-0.5"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white/60 backdrop-blur-md border border-white/40 shadow-glass hover:shadow-glass-hover hover:bg-white/80 transition-all duration-300 hover:-translate-y-0.5"
        >
          Collapse All
        </button>
      </div>

      {/* Tree */}
      <div className="flex justify-center overflow-x-auto py-4">
        <TreeNode
          member={president}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
          hoveredMember={hoveredMember}
          setHoveredMember={setHoveredMember}
          highlightedIds={highlightedIds}
          depth={0}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        {(['president', 'vp', 'secretary', 'coordinator', 'member'] as TeamTier[]).map((tier) => {
          const c = ROLE_COLORS[tier];
          const Icon = TIER_ICONS[tier];
          return (
            <div key={tier} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${c.gradient}`} />
              <Icon className="w-3 h-3" />
              <span>{TIER_LABELS[tier]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
