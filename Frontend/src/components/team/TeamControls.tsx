import React from 'react';
import { motion } from 'framer-motion';
import { Search, GitBranch, LayoutGrid, Clock, X } from 'lucide-react';
import {
  TeamTier,
  TIER_LABELS,
  ROLE_COLORS,
  getUniqueDepartments,
  getUniqueYears,
} from '@/data/teamData';

export type ViewMode = 'tree' | 'grid' | 'timeline';

interface TeamControlsProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (d: string) => void;
  yearFilter: string;
  setYearFilter: (y: string) => void;
  tierFilter: string;
  setTierFilter: (t: string) => void;
}

const VIEW_OPTIONS: { mode: ViewMode; label: string; icon: React.ElementType }[] = [
  { mode: 'tree', label: 'Tree', icon: GitBranch },
  { mode: 'grid', label: 'Grid', icon: LayoutGrid },
  { mode: 'timeline', label: 'Timeline', icon: Clock },
];

const TIERS: TeamTier[] = ['president', 'vp', 'secretary', 'coordinator', 'member'];

export default function TeamControls({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  yearFilter,
  setYearFilter,
  tierFilter,
  setTierFilter,
}: TeamControlsProps) {
  const departments = getUniqueDepartments();
  const years = getUniqueYears();
  const hasActiveFilters = searchQuery || departmentFilter || yearFilter || tierFilter;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-20 z-40 mb-12"
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl p-4 sm:p-5 space-y-4"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Top row: Search + View Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search members by name, role, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/60 border border-white/40 text-sm text-slate-900 placeholder-slate-400 font-medium outline-none focus:border-blue-300 focus:shadow-glow-blue transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
              >
                <X className="w-3 h-3 text-slate-600" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center rounded-xl bg-white/50 border border-white/30 p-1 flex-shrink-0">
            {VIEW_OPTIONS.map(({ mode, label, icon: ViewIcon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-white shadow-glass text-blue-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'
                }`}
              >
                <ViewIcon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Filters:</span>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/60 border border-white/40 text-xs font-bold text-slate-600 outline-none cursor-pointer hover:border-blue-300 transition-all"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white/60 border border-white/40 text-xs font-bold text-slate-600 outline-none cursor-pointer hover:border-blue-300 transition-all"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Tier Filter Pills */}
          {TIERS.map((tier) => {
            const c = ROLE_COLORS[tier];
            const active = tierFilter === tier;
            return (
              <button
                key={tier}
                onClick={() => setTierFilter(active ? '' : tier)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  active
                    ? `${c.badge} text-white border-transparent shadow-md`
                    : `bg-white/50 ${c.text} border-white/40 hover:bg-white/80`
                }`}
              >
                {TIER_LABELS[tier]}
              </button>
            );
          })}

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('');
                setYearFilter('');
                setTierFilter('');
              }}
              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-200 hover:bg-red-100 transition-all"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
