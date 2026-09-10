'use client';

import React, { useState } from 'react';
import {
  FACULTY_COORDINATORS,
  STUDENT_TEAM,
  TeamMember,
  DepartmentCategory,
} from '@/data/teamData';
import { Sparkles, Users, Award, Shield, Code, Calendar, FileText, Share2, ChevronRight } from 'lucide-react';

/* ── Department Tabs Configuration ── */
const TABS: { id: DepartmentCategory; label: string; icon: React.ElementType; count: number }[] = [
  { id: 'all', label: 'All Members', icon: Users, count: STUDENT_TEAM.length },
  { id: 'executive', label: 'Leadership', icon: Shield, count: STUDENT_TEAM.filter(m => m.departmentCategory === 'executive').length },
  { id: 'technical', label: 'Technical', icon: Code, count: STUDENT_TEAM.filter(m => m.departmentCategory === 'technical').length },
  { id: 'event', label: 'Events', icon: Calendar, count: STUDENT_TEAM.filter(m => m.departmentCategory === 'event').length },
  { id: 'content', label: 'Content', icon: FileText, count: STUDENT_TEAM.filter(m => m.departmentCategory === 'content').length },
  { id: 'social-media', label: 'Social Media', icon: Share2, count: STUDENT_TEAM.filter(m => m.departmentCategory === 'social-media').length },
];

/* ── Fallback Gradient Palettes for placeholder cards ── */
const FALLBACK_GRADIENTS: Record<DepartmentCategory, string> = {
  all: 'from-[#163A36] to-[#214741]',
  faculty: 'from-[#1b3a37] via-[#214741] to-[#163A36]',
  executive: 'from-[#163A36] via-[#1f4842] to-[#2c5b54]',
  technical: 'from-[#1b3238] via-[#163A36] to-[#214741]',
  event: 'from-[#42223a] via-[#523249] to-[#815355]',
  content: 'from-[#3b2734] via-[#523249] to-[#6d3e58]',
  'social-media': 'from-[#4a2e38] via-[#815355] to-[#9d6365]',
};

/* ── Helper to extract initials ── */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Individual Team Member Card (Matching Image 2 reference) ── */
function MemberCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  // Gradient for role card
  const bgGrad = FALLBACK_GRADIENTS[member.departmentCategory] || 'from-[#163A36] to-[#214741]';

  return (
    <div
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#163A36]/5 border border-[rgba(24,58,55,0.14)] shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none"
      style={{
        boxShadow: '0 8px 24px -4px rgba(24, 58, 55, 0.08)',
      }}
    >
      {/* ── Background Image or Fallback ── */}
      {!imgError ? (
        <img
          src={member.imageUrl}
          alt={member.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGrad} flex flex-col items-center justify-center p-6 text-center`}>
          {/* Subtle patterned overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
          {/* Circular Monogram Badge */}
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl font-black text-[#EFD6AC] tracking-wider">
              {getInitials(member.name)}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">
            Photo to be added
          </span>
        </div>
      )}

      {/* ── Top Vignette Gradient for Role Visibility (Matching Image 2) ── */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* ── Top-Left Role Tag (Primary requirement from Image 2) ── */}
      <div className="relative z-20 p-4">
        <span className="inline-block text-white font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
          {member.role}
        </span>
      </div>

      {/* ── Bottom Vignette Gradient for Name Readability ── */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

      {/* ── Bottom Details (Name & Subtitle) ── */}
      <div className="relative z-20 p-4 pt-0">
        <h3 className="font-black text-sm sm:text-base text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#EFD6AC] transition-colors">
          {member.name}
        </h3>
        {member.parentLead && (
          <p className="text-[#EFD6AC]/90 text-[11px] font-medium tracking-wide mt-0.5">
            Under {member.parentLead}
          </p>
        )}
      </div>

      {/* ── Hover Glow Top Edge Bar ── */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#EFD6AC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
      />
    </div>
  );
}

/* ── Faculty Coordinator Card (Matching Image 1 reference) ── */
function FacultyCard({ coordinator }: { coordinator: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] max-w-[280px] w-full mx-auto bg-[#4e6b77] border border-[rgba(24,58,55,0.18)] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
      style={{
        boxShadow: '0 12px 32px -4px rgba(24, 58, 55, 0.12)',
      }}
    >
      {/* ── Image or Fallback ── */}
      {!imgError ? (
        <img
          src={coordinator.imageUrl}
          alt={coordinator.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#163A36] to-[#214741] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform">
            <span className="text-2xl font-black text-[#EFD6AC] tracking-wider">
              FC
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">
            Photo to be added
          </span>
        </div>
      )}

      {/* ── Top Vignette Gradient ── */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none z-10" />

      {/* ── Top-Left Role Tag ── */}
      <div className="relative z-20 p-4">
        <span className="inline-block text-white font-black text-xs sm:text-sm tracking-wide drop-shadow-md">
          {coordinator.role}
        </span>
      </div>

      {/* ── Bottom Vignette Gradient ── */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

      {/* ── Bottom Name & Subtitle ── */}
      <div className="relative z-20 p-4 pt-0">
        <h3 className="font-black text-base text-white tracking-tight leading-snug drop-shadow-md group-hover:text-[#EFD6AC] transition-colors">
          {coordinator.name}
        </h3>
        <p className="text-white/80 text-xs font-medium tracking-wide mt-0.5">
          {coordinator.subtitle || 'Faculty Coordinator'}
        </p>
      </div>

      {/* ── Top Highlight Glow Bar ── */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#EFD6AC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
      />
    </div>
  );
}

/* ── Main Team Component ── */
export default function Team() {
  const [activeTab, setActiveTab] = useState<DepartmentCategory>('all');

  // Filtered members for the "Our Team" grid
  const filteredMembers =
    activeTab === 'all'
      ? STUDENT_TEAM
      : STUDENT_TEAM.filter((m) => m.departmentCategory === activeTab);

  return (
    <div className="bg-[#fffdf8] tech-grid-pattern text-[#0f0d0c] min-h-screen relative overflow-hidden">
      {/* ── Background Ambient Glowing Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '750px',
            height: '550px',
            top: '2%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(239,214,172,0.40) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '550px',
            height: '550px',
            top: '25%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(129,83,85,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            bottom: '15%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(24,58,55,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10 space-y-24">

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: FACULTY COORDINATOR (Matching Image 1)
           ══════════════════════════════════════════════════════════ */}
        <section id="faculty-coordinators" className="text-center space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-600/20 text-[#8A5A58]">
              <Award className="w-3.5 h-3.5 text-[#815355]" />
              Institutional Guidance
            </div>
            {/* Title matching Image 1: "Faculty Coordinator" */}
            <h2 className="text-3xl sm:text-5xl font-black text-[#183A37] tracking-tight">
              Faculty <span className="gradient-text">Coordinator</span>
            </h2>
            <p className="text-[#5A6772] text-sm sm:text-base max-w-xl mx-auto font-medium">
              Distinguished faculty mentors providing strategic leadership and continuous guidance to the E-Cell.
            </p>
          </div>

          {/* 3 Faculty Coordinators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FACULTY_COORDINATORS.map((coord) => (
              <FacultyCard key={coord.id} coordinator={coord} />
            ))}
          </div>
        </section>

        {/* ── Subtle Divider ── */}
        <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[rgba(24,58,55,0.15)] to-transparent" />

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: OUR TEAM (Matching Image 2)
           ══════════════════════════════════════════════════════════ */}
        <section id="our-team" className="space-y-12">
          {/* Header matching Image 2: "Our Team" */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-600/20 text-[#8A5A58]">
              <Sparkles className="w-3.5 h-3.5 text-[#815355]" />
              Student Leadership &amp; Teams
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#183A37] tracking-tight">
              Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-[#5A6772] text-sm sm:text-base font-medium">
              Meet the passionate founders, coordinators, and innovators driving NEC Entrepreneurship Cell.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-[#f5ecdc]/80 rounded-2xl border border-[rgba(129,83,85,0.22)] shadow-sm backdrop-blur-md max-w-full">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#183A37] text-[#EFD6AC] shadow-md shadow-[#183A37]/25 scale-[1.02]'
                        : 'text-[#183A37] hover:text-[#815355] hover:bg-[#EFD6AC]/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#EFD6AC]/20 text-[#EFD6AC]'
                          : 'bg-[#EFD6AC]/60 text-[#183A37]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 5-Column Grid (Direct match to Image 2) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Department Structure Breakdown for Clear Hierarchy */}
          {activeTab === 'all' && (
            <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#fffdf8] border border-[rgba(24,58,55,0.12)] shadow-xs space-y-6">
              <div className="flex items-center gap-2.5 text-[#183A37]">
                <Shield className="w-5 h-5 text-[#815355]" />
                <h3 className="text-xl font-black tracking-tight">Organization Structure</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#f5ecdc]/40 border border-[rgba(24,58,55,0.08)] space-y-2">
                  <div className="font-extrabold text-[#183A37] uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-[#163A36]" /> Technical Vertical
                  </div>
                  <p className="text-[#815355] font-bold">Lead: Jureddy ManiDeep</p>
                  <ul className="text-[#5A6772] space-y-1 font-medium pl-2 list-disc list-inside">
                    <li>CHOPPA JAYDEEP</li>
                    <li>MUKKERLA HRIDAY</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5ecdc]/40 border border-[rgba(24,58,55,0.08)] space-y-2">
                  <div className="font-extrabold text-[#183A37] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#815355]" /> Event Vertical
                  </div>
                  <p className="text-[#815355] font-bold">Lead: Kadagalla Prasad</p>
                  <ul className="text-[#5A6772] space-y-1 font-medium pl-2 list-disc list-inside">
                    <li>SAMSHITHA SAI JYOTHI AMUJURI</li>
                    <li>HARSHINI TADIPARTHI</li>
                    <li>D. SAI KRISHNA PRASAD</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5ecdc]/40 border border-[rgba(24,58,55,0.08)] space-y-2">
                  <div className="font-extrabold text-[#183A37] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#523249]" /> Content Vertical
                  </div>
                  <p className="text-[#815355] font-bold">Lead: Sai Teja</p>
                  <ul className="text-[#5A6772] space-y-1 font-medium pl-2 list-disc list-inside">
                    <li>BOLLAM SATHVIKA</li>
                    <li>SANTHOSH</li>
                    <li>M PRAJNA</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5ecdc]/40 border border-[rgba(24,58,55,0.08)] space-y-2">
                  <div className="font-extrabold text-[#183A37] uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-[#815355]" /> Social Media Vertical
                  </div>
                  <p className="text-[#815355] font-bold">Lead: Banala Yaswanth Naidu</p>
                  <ul className="text-[#5A6772] space-y-1 font-medium pl-2 list-disc list-inside">
                    <li>VANJARAPU ESWARA VARA PRASAD</li>
                    <li>ISUKAPALLI SANJAY</li>
                    <li>MEDAPATI SAI KUMAR</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
