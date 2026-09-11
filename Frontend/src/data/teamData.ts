/**
 * Official Team Data for NEC Entrepreneurship Cell
 * Includes Faculty Coordinators, President, Vice Presidents, Secretaries/Leads, and Domain Teams.
 */

export type TeamTier = 'faculty' | 'president' | 'vp' | 'secretary' | 'coordinator' | 'member';
export type DepartmentCategory = 'all' | 'faculty' | 'executive' | 'technical' | 'event' | 'content' | 'social-media';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  departmentCategory: DepartmentCategory;
  subtitle?: string;
  parentLead?: string;
  imageUrl: string;
  bio?: string;
  department?: string;
  year?: string;
  regdNo?: string;
  quote?: string;
  skills?: string[];
  projects?: string[];
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
  achievements?: string[];
  parentId?: string;
}

export type EnhancedTeamMember = TeamMember;

/* ─── 3 Faculty Coordinators ─── */
export const FACULTY_COORDINATORS: TeamMember[] = [
  {
    id: 'fc-1',
    name: 'Dr. Sampath Dakshina Murthy Achanta',
    role: 'Faculty Coordinator',
    tier: 'faculty',
    departmentCategory: 'faculty',
    subtitle: 'Head, VCIS · Mentor & Advisor',
    imageUrl: '/team/faculty1.jpg',
    bio: 'Guiding the NEC Entrepreneurship Cell with institutional mentorship and academic leadership.',
  },
  {
    id: 'fc-2',
    name: 'Dr. B. Omkar Lakshmi Jagan',
    role: 'Faculty Coordinator',
    tier: 'faculty',
    departmentCategory: 'faculty',
    subtitle: 'Head ED-Cell · Mentor & Advisor',
    imageUrl: '/team/faculty2.jpg',
    bio: 'Mentoring student startup ventures and strategic partnerships.',
  },
  {
    id: 'fc-3',
    name: 'M. Aruna Kumari',
    role: 'Faculty Coordinator',
    tier: 'faculty',
    departmentCategory: 'faculty',
    subtitle: 'Head NEC · Mentor & Advisor',
    imageUrl: '/team/faculty3.jpg',
    bio: 'Advising on institutional incubation, innovation grants, and industry links.',
  },
];

/* ─── Student Leadership & Department Teams (20 Members) ─── */
export const STUDENT_TEAM: TeamMember[] = [
  // ── PRESIDENT ──
  {
    id: 'lead-pres',
    name: 'Sunnapu Likitha',
    role: 'President',
    tier: 'president',
    departmentCategory: 'executive',
    subtitle: 'Head of E-Cell',
    imageUrl: '/team/president.JPG',
    department: 'Data Science',
    year: '3rd Year',
    bio: 'Provides strategic direction and oversees end-to-end operations of NEC E-Cell.',
  },

  // ── VICE PRESIDENTS ──
  {
    id: 'lead-vp-1',
    name: 'Md. Khaja Eshaq',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'lead-pres',
    departmentCategory: 'executive',
    subtitle: 'Vice President',
    imageUrl: '/team/vice_president1.JPG',
    department: 'CSE',
    year: '3rd Year',
    bio: 'Co-leading strategic initiatives, external outreach, and student entrepreneurship.',
  },
  {
    id: 'lead-vp-2',
    name: 'Peela Leela',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'lead-pres',
    departmentCategory: 'executive',
    subtitle: 'Vice President',
    imageUrl: '/team/vice_president2.JPG',
    department: 'CSE',
    year: '3rd Year',
    bio: 'Driving operations, team synergy, and project execution across all verticals.',
  },
  {
    id: 'lead-vp-3',
    name: 'CH Manoj',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'lead-pres',
    departmentCategory: 'executive',
    subtitle: 'Vice President',
    imageUrl: '/team/vice_president3.JPG',
    department: 'Cybersecurity',
    year: '2nd Year',
    bio: 'Spearheading event coordination, organizational strategy, and logistics.',
  },

  // ── 4 SECRETARIES / DOMAIN LEADS ──
  {
    id: 'lead-event',
    name: 'Kadagalla Prasad',
    role: 'Event Lead',
    tier: 'secretary',
    parentId: 'lead-pres',
    departmentCategory: 'event',
    subtitle: 'Secretary',
    imageUrl: '/team/prasad.JPG',
    bio: 'Heading flagship entrepreneurship summits, pitch competitions, and hackathons.',
  },
  {
    id: 'lead-tech',
    name: 'Jureddy ManiDeep',
    role: 'Technical Lead',
    tier: 'secretary',
    parentId: 'lead-pres',
    departmentCategory: 'technical',
    subtitle: 'Secretary',
    imageUrl: '/team/manideep.JPG',
    bio: 'Directing the web platform, digital tools, and technical infrastructure.',
  },
  {
    id: 'lead-social',
    name: 'Banala Yaswanth Naidu',
    role: 'Social Media Lead',
    tier: 'secretary',
    parentId: 'lead-pres',
    departmentCategory: 'social-media',
    subtitle: 'Secretary',
    imageUrl: '/team/yaswanth.jpeg',
    bio: 'Managing brand presence, campaigns, and digital audience growth across networks.',
  },
  {
    id: 'lead-content',
    name: 'Metta SaiTeja',
    role: 'Content Lead',
    tier: 'secretary',
    parentId: 'lead-pres',
    departmentCategory: 'content',
    subtitle: 'Secretary',
    imageUrl: '/team/saiteja.jpg',
    bio: 'Overseeing creative writing, editorial narratives, and event documentation.',
  },

  // ── TECHNICAL TEAM (3 Members under Technical Lead) ──
  {
    id: 'tech-1',
    name: 'CHOPPA JAYDEEP',
    role: 'Technical Team',
    tier: 'member',
    parentId: 'lead-tech',
    departmentCategory: 'technical',
    subtitle: 'Technical Team',
    parentLead: 'Jureddy ManiDeep',
    imageUrl: '/team/choppa_jaydeep.jpg',
  },
  {
    id: 'tech-2',
    name: 'MUKKERLA HRIDAY',
    role: 'Technical Team',
    tier: 'member',
    parentId: 'lead-tech',
    departmentCategory: 'technical',
    subtitle: 'Technical Team',
    parentLead: 'Jureddy ManiDeep',
    imageUrl: '/team/mukkerla_hriday.jpg',
  },

  // ── EVENT TEAM (3 Members under Event Lead) ──
  {
    id: 'event-1',
    name: 'SAMSHITHA SAI JYOTHI AMUJURI',
    role: 'Event Team',
    tier: 'member',
    parentId: 'lead-event',
    departmentCategory: 'event',
    subtitle: 'Event Team',
    parentLead: 'Kadagalla Prasad',
    imageUrl: '/team/samshitha.jpg',
  },
  {
    id: 'event-2',
    name: 'HARSHINI TADIPARTHI',
    role: 'Event Team',
    tier: 'member',
    parentId: 'lead-event',
    departmentCategory: 'event',
    subtitle: 'Event Team',
    parentLead: 'Kadagalla Prasad',
    imageUrl: '/team/harshini.jpg',
  },
  {
    id: 'event-3',
    name: 'D. SAI KRISHNA PRASAD',
    role: 'Event Team',
    tier: 'member',
    parentId: 'lead-event',
    departmentCategory: 'event',
    subtitle: 'Event Team',
    parentLead: 'Kadagalla Prasad',
    imageUrl: '/team/sai_krishna.jpg',
  },

  // ── CONTENT TEAM (3 Members under Content Lead) ──
  {
    id: 'content-1',
    name: 'BOLLAM SATHVIKA',
    role: 'Content Team',
    tier: 'member',
    parentId: 'lead-content',
    departmentCategory: 'content',
    subtitle: 'Content Team',
    parentLead: 'Sai Teja',
    imageUrl: '/team/sathvika.jpg',
  },
  {
    id: 'content-2',
    name: 'SANTHOSH',
    role: 'Content Team',
    tier: 'member',
    parentId: 'lead-content',
    departmentCategory: 'content',
    subtitle: 'Content Team',
    parentLead: 'Sai Teja',
    imageUrl: '/team/santhosh.jpg',
  },
  {
    id: 'content-3',
    name: 'M PRAJNA',
    role: 'Content Team',
    tier: 'member',
    parentId: 'lead-content',
    departmentCategory: 'content',
    subtitle: 'Content Team',
    parentLead: 'Sai Teja',
    imageUrl: '/team/prajna.jpg',
  },

  // ── SOCIAL MEDIA TEAM (3 Members under Social Media Lead) ──
  {
    id: 'social-1',
    name: 'VANJARAPU ESWARA VARA PRASAD',
    role: 'Social Media Team',
    tier: 'member',
    parentId: 'lead-social',
    departmentCategory: 'social-media',
    subtitle: 'Social Media Team',
    parentLead: 'Banala Yaswanth Naidu',
    imageUrl: '/team/eswar.jpeg',
  },
  {
    id: 'social-2',
    name: 'ISUKAPALLI SANJAY',
    role: 'Social Media Team',
    tier: 'member',
    parentId: 'lead-social',
    departmentCategory: 'social-media',
    subtitle: 'Social Media Team',
    parentLead: 'Banala Yaswanth Naidu',
    imageUrl: '/team/sanjay.jpg',
  },
  {
    id: 'social-3',
    name: 'MEDAPATI SAI KUMAR',
    role: 'Social Media Team',
    tier: 'member',
    parentId: 'lead-social',
    departmentCategory: 'social-media',
    subtitle: 'Social Media Team',
    parentLead: 'Banala Yaswanth Naidu',
    imageUrl: '/team/sai_kumar.jpg',
  },
];

/* ── Compatibility collection ── */
export const TEAM_MEMBERS: EnhancedTeamMember[] = [
  ...FACULTY_COORDINATORS,
  ...STUDENT_TEAM,
];

export const TEAM_STATS = {
  coreMembers: STUDENT_TEAM.length,
  departments: 4,
  eventsConducted: 12,
  startupsSupported: 5,
};

export const ROLE_COLORS: Record<TeamTier, { bg: string; text: string; border: string; glow: string; gradient: string; badge: string }> = {
  faculty: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-400',
    glow: 'shadow-glow-emerald',
    gradient: 'from-[#163A36] to-[#214741]',
    badge: 'bg-[#163A36]',
  },
  president: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-400',
    glow: 'shadow-glow-gold',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    badge: 'bg-gradient-to-r from-amber-500 to-yellow-600',
  },
  vp: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-400',
    glow: 'shadow-glow-blue',
    gradient: 'from-blue-500 via-indigo-500 to-blue-600',
    badge: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  },
  secretary: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-400',
    glow: 'shadow-glow-purple',
    gradient: 'from-purple-500 via-violet-500 to-purple-600',
    badge: 'bg-gradient-to-r from-purple-600 to-violet-600',
  },
  coordinator: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-400',
    glow: 'shadow-glow-emerald',
    gradient: 'from-emerald-400 via-teal-500 to-emerald-600',
    badge: 'bg-gradient-to-r from-emerald-500 to-teal-600',
  },
  member: {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-300',
    glow: 'shadow-tech-card',
    gradient: 'from-slate-400 via-gray-500 to-slate-500',
    badge: 'bg-gradient-to-r from-slate-500 to-gray-600',
  },
};

export const TIER_LABELS: Record<TeamTier, string> = {
  faculty: 'Faculty Coordinator',
  president: 'President',
  vp: 'Vice President',
  secretary: 'Secretary / Lead',
  coordinator: 'Coordinator',
  member: 'Team Member',
};

export function getChildren(parentId: string): EnhancedTeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.parentId === parentId);
}

export function getMemberById(id: string): EnhancedTeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}

export function getMembersByTier(tier: TeamTier): EnhancedTeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.tier === tier);
}

export function getLineage(memberId: string): string[] {
  const ids: string[] = [];
  let current = getMemberById(memberId);
  while (current) {
    ids.push(current.id);
    current = current.parentId ? getMemberById(current.parentId) : undefined;
  }
  return ids;
}

export function getDescendants(memberId: string): string[] {
  const ids: string[] = [];
  const children = getChildren(memberId);
  for (const child of children) {
    ids.push(child.id);
    ids.push(...getDescendants(child.id));
  }
  return ids;
}

export function getUniqueDepartments(): string[] {
  return [...new Set(TEAM_MEMBERS.map((m) => m.department || 'General'))];
}

export function getUniqueYears(): string[] {
  return [...new Set(TEAM_MEMBERS.map((m) => m.year || 'N/A'))];
}
