import { EventItem, TaskItem, GalleryImage, InstagramPost, TeamMember } from '@/types';

/**
 * CONFIGURATION & INSTAGRAM HANDLE
 */
export const INSTAGRAM_CONFIG = {
  handle: "viitnec",
  profileUrl: "https://www.instagram.com/viitnec?igsh=MTF5OHY3MjBoaGhpMA==",
};

/**
 * INITIAL EVENTS DATA
 * You can add more events manually here or manage them via the /admin panel.
 */
export const INITIAL_EVENTS: EventItem[] = [];

/**
 * NEC / IIT BOMBAY E-CELL TASKS DATA
 */
export const INITIAL_TASKS: TaskItem[] = [
  // Preliminary Track
  {
    id: "task-1",
    title: "Brand Your E-Cell",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "110/100",
    status: "checked",
    description: "Create and establish the brand identity, official logos, design kits, and active social media presence for the NEC E-Cell chapter.",
    deliverables: [
      "Official brand design kit & logo guidelines",
      "Social media banner templates & typography styles",
      "Public launch post & engagement proof"
    ]
  },
  {
    id: "task-2",
    title: "Draft A Work Report",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "130/120",
    status: "checked",
    description: "Compile and submit a structured annual roadmap, organizational hierarchy, team responsibilities, and key quarterly milestones.",
    deliverables: [
      "Executive summary and organizational structure",
      "Event calendar and tentative budgetary outline",
      "Key performance indicators (KPIs) and goals"
    ]
  },
  {
    id: "task-3",
    title: "Idea Box",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "150/140",
    status: "checked",
    description: "Set up and manage a physical and digital ideation portal to crowdsource innovative student startup concepts and problem statements.",
    deliverables: [
      "Physical and online idea submission forms",
      "Curation and categorization of student ideas",
      "Review panel feedback and shortlist documentation"
    ]
  },
  {
    id: "task-4",
    title: "Headstart Task",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "160/150",
    status: "checked",
    description: "Conduct high-impact orientation drives and introductory workshops to inspire campus students to pursue entrepreneurship.",
    deliverables: [
      "Interactive orientation session with 200+ attendees",
      "Presentation deck on startup incubation opportunities",
      "Attendee registration data and feedback summary"
    ]
  },
  {
    id: "task-5",
    title: "Know Your Surroundings",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "130/120",
    status: "checked",
    description: "Map and document the regional startup ecosystem, local angel networks, incubators, alumni founders, and academic research labs.",
    deliverables: [
      "Comprehensive directory of local incubators & funds",
      "Interviews and contact catalog of 10+ alumni entrepreneurs",
      "Regional innovation ecosystem report"
    ]
  },
  {
    id: "task-6",
    title: "Gather Insights",
    track: "preliminary",
    deadline: "9 Aug 2026",
    points: "110/100",
    status: "checked",
    description: "Run comprehensive campus surveys and focus groups to identify student interests, pain points, and skill gaps in startup building.",
    deliverables: [
      "Survey response analytics across multiple engineering branches",
      "Key insights report on student startup readiness",
      "Actionable recommendations for upcoming workshops"
    ]
  },

  // Ignite Propel Track
  {
    id: "task-7",
    title: "Social Media Challenge",
    track: "ignite-propel",
    deadline: "14 Sep 2026",
    points: "-/50",
    status: "not-submitted",
    description: "Design and execute a viral social media campaign promoting startup literacy, myth-busting, and case studies across platforms.",
    deliverables: [
      "Carousel series on startup fundamentals",
      "Short-form video reels featuring campus founders",
      "Analytics report on reach, impressions, and engagement"
    ]
  },
  {
    id: "task-8",
    title: "LinkedIn Presentation",
    track: "ignite-propel",
    deadline: "14 Sep 2026",
    points: "-/50",
    status: "not-submitted",
    description: "Prepare and publish a high-quality LinkedIn slide presentation showcasing campus innovation achievements and corporate partnerships.",
    deliverables: [
      "10-slide professional PDF presentation",
      "Tags and mentions of industry partners & E-Cell IIT Bombay",
      "Engagement and endorsement metrics"
    ]
  },
  {
    id: "task-9",
    title: "LinkedIn Blog",
    track: "ignite-propel",
    deadline: "14 Sep 2026",
    points: "-/100",
    status: "not-submitted",
    description: "Write and publish an authoritative thought leadership blog discussing recent technology breakthroughs, venture funding, and founder journeys.",
    deliverables: [
      "800+ word long-form LinkedIn article",
      "SEO & keyword optimized copy with visual graphics",
      "Author byline and chapter link credits"
    ]
  },
  {
    id: "task-10",
    title: "Freshie Intro",
    track: "ignite-propel",
    deadline: "14 Sep 2026",
    points: "-/90",
    status: "not-submitted",
    description: "Organize dedicated freshman outreach activities, quizzes, problem-solving games, and mentorship signups to onboard first-year talent.",
    deliverables: [
      "On-ground interactive recruitment booth",
      "Gamified entrepreneurship quiz & swag giveaways",
      "Cohort onboarding list for junior cell members"
    ]
  },

  // Comprehensive Track
  {
    id: "task-11",
    title: "Eureka! Pitching",
    track: "comprehensive",
    deadline: "29 Aug 2026",
    points: "-/200",
    status: "not-submitted",
    description: "Host preliminary pitching and screening rounds for Eureka! — Asia's largest business model competition in association with E-Cell IIT Bombay.",
    deliverables: [
      "Pitching stage arrangement and judging rubric",
      "Participation of 15+ student teams and pitch decks",
      "Scorecards and nomination of top teams for zonal rounds"
    ]
  },
  {
    id: "task-12",
    title: "illuminate Task",
    track: "comprehensive",
    deadline: "16 Oct 2026",
    points: "-/400",
    status: "not-submitted",
    description: "Conduct Illuminate — the pre-summit full-day flagship entrepreneurship training workshop led by certified instructors and industry mentors.",
    deliverables: [
      "Full-day structured workshop execution with 150+ participants",
      "Hands-on case study solving and business model canvas sessions",
      "Participant certification and post-workshop feedback report"
    ]
  }
];

/**
 * INITIAL GALLERY IMAGES
 */
export const INITIAL_GALLERY: GalleryImage[] = [];

/**
 * INSTAGRAM FEED POSTS
 */
export const INITIAL_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    permalink: "https://instagram.com/nec_ecell",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    caption: "🚀 Big news! Registrations for E-Summit '26 are officially OPEN! Link in bio. #NECECell #IITBombayECell #StartupCulture",
    timestamp: "2026-07-20",
    isFeatured: true,
    likeCount: 245
  },
  {
    id: "ig-2",
    permalink: "https://instagram.com/nec_ecell",
    mediaUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    caption: "Highlights from our interactive workshop in association with E-Cell IIT Bombay. Empowering student innovators! 💡",
    timestamp: "2026-07-15",
    isFeatured: true,
    likeCount: 189
  },
  {
    id: "ig-3",
    permalink: "https://instagram.com/nec_ecell",
    mediaUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    caption: "Meet the student leads driving the entrepreneurship revolution at NEC Campus! 🔥 #TeamECELL",
    timestamp: "2026-07-10",
    isFeatured: true,
    likeCount: 310
  },
  {
    id: "ig-4",
    permalink: "https://instagram.com/nec_ecell",
    mediaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    caption: "Ideation to Execution! Quick tips for building a pitch deck that attracts investors. 📊",
    timestamp: "2026-07-01",
    isFeatured: false,
    likeCount: 154
  }
];

/**
 * OFFICIAL TEAM MEMBER INTERFACE WITH EXTENDED METADATA
 */
export interface DetailedTeamMember extends TeamMember {
  regdNo?: string;
  year?: string;
  section?: string;
}

export interface OfficialTeamStructure {
  president: DetailedTeamMember;
  vicePresidents: DetailedTeamMember[];
  secretaries: DetailedTeamMember[];
}

export const OFFICIAL_TEAM: OfficialTeamStructure = {
  president: {
    id: "tm-pres-1",
    name: "Sunnapu Likitha",
    role: "President",
    department: "Data Science (Sec 2)",
    year: "3rd Year",
    regdNo: "24L31A44B1",
    imageUrl: "/team/president.JPG"
  },
  vicePresidents: [
    {
      id: "tm-vp-1",
      name: "Mohamed Khaja Eshaq",
      role: "Vice President",
      department: "CSE (Sec 4)",
      year: "3rd Year",
      regdNo: "24L31A05O8",
      imageUrl: "/team/vice_president1.JPG"
    },
    {
      id: "tm-vp-2",
      name: "Peela Leela",
      role: "Vice President",
      department: "CSE (Sec 6)",
      year: "3rd Year",
      regdNo: "24L31A05W2",
      imageUrl: "/team/vice_president2.JPG"
    },
    {
      id: "tm-vp-3",
      name: "CH Manoj",
      role: "Vice President",
      department: "Cybersecurity (Sec 1)",
      year: "2nd Year",
      regdNo: "25L31A4626",
      imageUrl: "/team/vice_president3.JPG"
    }
  ],
  secretaries: [
    {
      id: "tm-sec-1",
      name: "Kadagalla Prasad",
      role: "Secretary (Event Manager)",
      department: "CSE (Sec 3)",
      year: "3rd Year",
      regdNo: "24L31A05F2",
      imageUrl: "/team/prasad.JPG"
    },
    {
      id: "tm-sec-2",
      name: "Jureddy Manideep",
      role: "Secretary (Technical Manager)",
      department: "CSE (Sec 3)",
      year: "3rd Year",
      regdNo: "24L31A05F1",
      imageUrl: "/team/manideep.JPG"
    },
    {
      id: "tm-sec-3",
      name: "Vanjarapu Eswara Vara Prasad",
      role: "Secretary (Social Media Manager)",
      department: "AI & DS (Sec 3)",
      year: "3rd Year",
      regdNo: "24L31A5414",
      imageUrl: "/team/eswar.jpeg"
    },
    {
      id: "tm-sec-4",
      name: "Sai Teja",
      role: "Secretary (Content Creator)",
      department: "Mechanical (Sec 2)",
      year: "3rd Year",
      regdNo: "24L31A0399",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

export const INITIAL_TEAM: TeamMember[] = [
  OFFICIAL_TEAM.president,
  ...OFFICIAL_TEAM.vicePresidents,
  ...OFFICIAL_TEAM.secretaries
];
