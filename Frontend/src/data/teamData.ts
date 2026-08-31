/**
 * Enhanced Team Data for the Premium Team Page
 * Each member has a tier, parentId for hierarchy links, bio, skills, projects, and social handles.
 */

export type TeamTier = 'president' | 'vp' | 'secretary' | 'coordinator' | 'member';

export interface EnhancedTeamMember {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  parentId?: string;
  department: string;
  year: string;
  regdNo: string;
  imageUrl: string;
  quote?: string;
  bio?: string;
  skills: string[];
  projects: string[];
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
  achievements?: string[];
}

export const ROLE_COLORS: Record<TeamTier, { bg: string; text: string; border: string; glow: string; gradient: string; badge: string }> = {
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

export const TEAM_STATS = {
  coreMembers: 15,
  departments: 6,
  eventsConducted: 12,
  startupsSupported: 5,
};

export const TEAM_MEMBERS: EnhancedTeamMember[] = [
  // ── PRESIDENT ──
  {
    id: 'tm-pres-1',
    name: 'Sunnapu Likitha',
    role: 'President',
    tier: 'president',
    department: 'Data Science (Sec 2)',
    year: '3rd Year',
    regdNo: '24L31A44B1',
    imageUrl: '/team/president.JPG',
    quote: '"Innovation distinguishes between a leader and a follower."',
    bio: 'Leading the E-Cell chapter as President, driving entrepreneurship culture across the campus with innovative programs and industry partnerships.',
    skills: ['Leadership', 'Event Strategy', 'Public Speaking', 'Data Science', 'Community Building'],
    projects: ['E-Summit 2026', 'Startup Mentorship Program', 'Campus Innovation Hub'],
    achievements: ['E-Cell President 2026', 'Best Student Leader Award', 'TEDx Speaker'],
    linkedin: '#',
    github: '#',
    instagram: '#',
    email: 'president@nececell.org',
  },
  // ── VICE PRESIDENTS ──
  {
    id: 'tm-vp-1',
    name: 'Mohamed Khaja Eshaq',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'tm-pres-1',
    department: 'CSE (Sec 4)',
    year: '3rd Year',
    regdNo: '24L31A05O8',
    imageUrl: '/team/vice_president1.JPG',
    quote: '"Build something people want."',
    bio: 'Overseeing technical operations and event execution as Vice President of the E-Cell.',
    skills: ['Full Stack Dev', 'Project Management', 'Team Leadership', 'React', 'Node.js'],
    projects: ['E-Cell Website', 'Hackathon Platform', 'Mentor Connect App'],
    linkedin: '#',
    github: '#',
    instagram: '#',
    email: 'vp1@nececell.org',
  },
  {
    id: 'tm-vp-2',
    name: 'Peela Leela',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'tm-pres-1',
    department: 'CSE (Sec 6)',
    year: '3rd Year',
    regdNo: '24L31A05W2',
    imageUrl: '/team/vice_president2.JPG',
    quote: '"Empower others to create change."',
    bio: 'Managing outreach and partnerships as Vice President, connecting students with industry mentors.',
    skills: ['Marketing', 'Public Relations', 'Event Management', 'Content Strategy', 'Design'],
    projects: ['Industry Connect Series', 'Startup Bootcamp', 'Social Media Campaign'],
    linkedin: '#',
    github: '#',
    instagram: '#',
    email: 'vp2@nececell.org',
  },
  {
    id: 'tm-vp-3',
    name: 'CH Manoj',
    role: 'Vice President',
    tier: 'vp',
    parentId: 'tm-pres-1',
    department: 'Cybersecurity (Sec 1)',
    year: '2nd Year',
    regdNo: '25L31A4626',
    imageUrl: '/team/vice_president3.JPG',
    quote: '"Security is the foundation of trust."',
    bio: 'Spearheading cybersecurity awareness initiatives and technical workshops as Vice President.',
    skills: ['Cybersecurity', 'Ethical Hacking', 'Network Security', 'Python', 'Cloud Security'],
    projects: ['Cyber Awareness Week', 'CTF Competition', 'Security Workshop Series'],
    linkedin: '#',
    github: '#',
    instagram: '#',
    email: 'vp3@nececell.org',
  },
  // ── SECRETARIES ──
  {
    id: 'tm-sec-1',
    name: 'Kadagalla Prasad',
    role: 'Secretary (Event Manager)',
    tier: 'secretary',
    parentId: 'tm-vp-1',
    department: 'CSE (Sec 3)',
    year: '3rd Year',
    regdNo: '24L31A05F2',
    imageUrl: '/team/prasad.JPG',
    bio: 'Planning and executing all E-Cell events with precision and creativity.',
    skills: ['Event Planning', 'Logistics', 'Budgeting', 'Vendor Management', 'Creative Direction'],
    projects: ['E-Summit Logistics', 'Pitch Perfect Competition', 'Ideation Bootcamp'],
    linkedin: '#',
    email: 'prasad@nececell.org',
  },
  {
    id: 'tm-sec-2',
    name: 'Jureddy Manideep',
    role: 'Secretary (Technical Manager)',
    tier: 'secretary',
    parentId: 'tm-vp-1',
    department: 'CSE (Sec 3)',
    year: '3rd Year',
    regdNo: '24L31A05F1',
    imageUrl: '/team/manideep.JPG',
    bio: 'Driving technical infrastructure and web development for the E-Cell platform.',
    skills: ['React', 'TypeScript', 'Next.js', 'API Design', 'DevOps'],
    projects: ['E-Cell Portal', 'Event Registration System', 'Alumni Network Platform'],
    linkedin: '#',
    github: '#',
    email: 'manideep@nececell.org',
  },
  {
    id: 'tm-sec-3',
    name: 'Vanjarapu Eswara Vara Prasad',
    role: 'Secretary (Social Media)',
    tier: 'secretary',
    parentId: 'tm-vp-2',
    department: 'AI & DS (Sec 3)',
    year: '3rd Year',
    regdNo: '24L31A5414',
    imageUrl: '/team/eswar.jpeg',
    bio: 'Managing all social media channels and digital marketing campaigns.',
    skills: ['Social Media', 'Graphic Design', 'Video Editing', 'Analytics', 'Copywriting'],
    projects: ['Instagram Growth Strategy', 'YouTube Channel Launch', 'LinkedIn Page Management'],
    linkedin: '#',
    instagram: '#',
    email: 'eswara@nececell.org',
  },
  {
    id: 'tm-sec-4',
    name: 'Sai Teja',
    role: 'Secretary (Content Creator)',
    tier: 'secretary',
    parentId: 'tm-vp-2',
    department: 'Mechanical (Sec 2)',
    year: '3rd Year',
    regdNo: '24L31A0399',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Crafting compelling content for events, social media, and marketing materials.',
    skills: ['Content Writing', 'Blogging', 'Photography', 'Storytelling', 'Branding'],
    projects: ['E-Cell Blog', 'Event Documentation', 'Brand Guidelines'],
    linkedin: '#',
    instagram: '#',
    email: 'saiteja@nececell.org',
  },
  // ── COORDINATORS ──
  {
    id: 'tm-coord-1',
    name: 'Ravi Kumar',
    role: 'Technical Coordinator',
    tier: 'coordinator',
    parentId: 'tm-sec-2',
    department: 'CSE (Sec 1)',
    year: '2nd Year',
    regdNo: '25L31A0512',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Coordinating technical workshops and hackathon logistics.',
    skills: ['Python', 'Machine Learning', 'Web Dev', 'Git', 'Docker'],
    projects: ['Hackathon Portal', 'Workshop Series'],
    linkedin: '#',
    github: '#',
    email: 'ravi@nececell.org',
  },
  {
    id: 'tm-coord-2',
    name: 'Priya Sharma',
    role: 'Events Coordinator',
    tier: 'coordinator',
    parentId: 'tm-sec-1',
    department: 'ECE (Sec 2)',
    year: '2nd Year',
    regdNo: '25L31A0423',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    bio: 'On-ground event coordination and participant management.',
    skills: ['Event Coordination', 'Communication', 'Problem Solving', 'Team Management'],
    projects: ['E-Summit Coordination', 'Guest Lecture Series'],
    linkedin: '#',
    email: 'priya@nececell.org',
  },
  {
    id: 'tm-coord-3',
    name: 'Arjun Reddy',
    role: 'Marketing Coordinator',
    tier: 'coordinator',
    parentId: 'tm-sec-3',
    department: 'CSE (Sec 5)',
    year: '2nd Year',
    regdNo: '25L31A0567',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    bio: 'Handling digital marketing and promotional campaigns for E-Cell events.',
    skills: ['Digital Marketing', 'SEO', 'Canva', 'Google Analytics', 'Email Marketing'],
    projects: ['Event Promotions', 'Newsletter Campaign'],
    linkedin: '#',
    instagram: '#',
    email: 'arjun@nececell.org',
  },
  {
    id: 'tm-coord-4',
    name: 'Sneha Patel',
    role: 'Design Coordinator',
    tier: 'coordinator',
    parentId: 'tm-sec-4',
    department: 'CSE (Sec 2)',
    year: '2nd Year',
    regdNo: '25L31A0534',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
    bio: 'Leading design efforts for posters, branding, and visual identity.',
    skills: ['Figma', 'Adobe Illustrator', 'UI/UX', 'Branding', 'Motion Graphics'],
    projects: ['Brand Identity Redesign', 'Event Poster Series'],
    linkedin: '#',
    instagram: '#',
    email: 'sneha@nececell.org',
  },
  // ── MEMBERS ──
  {
    id: 'tm-mem-1',
    name: 'Vikram Singh',
    role: 'Executive Member',
    tier: 'member',
    parentId: 'tm-coord-1',
    department: 'CSE (Sec 3)',
    year: '1st Year',
    regdNo: '26L31A0512',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'Contributing to technical projects and event support.',
    skills: ['HTML/CSS', 'JavaScript', 'Python'],
    projects: ['Website Maintenance'],
    email: 'vikram@nececell.org',
  },
  {
    id: 'tm-mem-2',
    name: 'Ananya Das',
    role: 'Executive Member',
    tier: 'member',
    parentId: 'tm-coord-2',
    department: 'ECE (Sec 1)',
    year: '1st Year',
    regdNo: '26L31A0423',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: 'Assisting with event logistics and participant coordination.',
    skills: ['Communication', 'Documentation', 'Organization'],
    projects: ['Event Registration Help'],
    email: 'ananya@nececell.org',
  },
  {
    id: 'tm-mem-3',
    name: 'Rohit Verma',
    role: 'Executive Member',
    tier: 'member',
    parentId: 'tm-coord-3',
    department: 'AI & DS (Sec 1)',
    year: '1st Year',
    regdNo: '26L31A5412',
    imageUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=600&q=80',
    bio: 'Supporting marketing efforts and content distribution.',
    skills: ['Social Media', 'Content Writing', 'Canva'],
    projects: ['Social Media Posts'],
    email: 'rohit@nececell.org',
  },
];

/** Utility: Get children of a given member ID */
export function getChildren(parentId: string): EnhancedTeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.parentId === parentId);
}

/** Utility: Get member by ID */
export function getMemberById(id: string): EnhancedTeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}

/** Utility: Get all members of a given tier */
export function getMembersByTier(tier: TeamTier): EnhancedTeamMember[] {
  return TEAM_MEMBERS.filter((m) => m.tier === tier);
}

/** Utility: Get the lineage (ancestors) of a member */
export function getLineage(memberId: string): string[] {
  const ids: string[] = [];
  let current = getMemberById(memberId);
  while (current) {
    ids.push(current.id);
    current = current.parentId ? getMemberById(current.parentId) : undefined;
  }
  return ids;
}

/** Utility: Get all descendants of a member */
export function getDescendants(memberId: string): string[] {
  const ids: string[] = [];
  const children = getChildren(memberId);
  for (const child of children) {
    ids.push(child.id);
    ids.push(...getDescendants(child.id));
  }
  return ids;
}

/** Unique departments */
export function getUniqueDepartments(): string[] {
  return [...new Set(TEAM_MEMBERS.map((m) => m.department))];
}

/** Unique years */
export function getUniqueYears(): string[] {
  return [...new Set(TEAM_MEMBERS.map((m) => m.year))];
}

/** Unique tiers as labels */
export const TIER_LABELS: Record<TeamTier, string> = {
  president: 'President',
  vp: 'Vice President',
  secretary: 'Secretary',
  coordinator: 'Coordinator',
  member: 'Executive Member',
};
