import { EventItem, TaskItem, GalleryImage, InstagramPost, TeamMember } from '@/types';

/**
 * CONFIGURATION & INSTAGRAM HANDLE
 * Replace this handle with your official Instagram account handle.
 */
export const INSTAGRAM_CONFIG = {
  handle: "viitnec",
  profileUrl: "https://www.instagram.com/viitnec?igsh=MTF5OHY3MjBoaGhpMA==",
};

/**
 * INITIAL EVENTS DATA
 * Add or update your upcoming and past events here.
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
 * Use the Admin Panel at /admin to upload real images and mark them as featured.
 */
export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: "img-1",
    title: "E-Summit Inauguration Ceremony",
    category: "Summit",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    uploadedAt: "2026-04-16"
  },
  {
    id: "img-2",
    title: "Student Startup Pitch Deck Presentation",
    category: "Pitching",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    uploadedAt: "2026-04-16"
  },
  {
    id: "img-3",
    title: "IIT Bombay E-Cell Mentorship Session",
    category: "Workshop",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    uploadedAt: "2026-04-17"
  },
  {
    id: "img-4",
    title: "Hackathon Team Brainstorming",
    category: "Hackathon",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    uploadedAt: "2026-04-18"
  },
  {
    id: "img-5",
    title: "Guest Keynote Address by Tech Leaders",
    category: "Summit",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    uploadedAt: "2026-04-19"
  },
  {
    id: "img-6",
    title: "Award Distribution & Winner Announcement",
    category: "Summit",
    url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    uploadedAt: "2026-04-20"
  }
];

/**
 * INSTAGRAM FEED POSTS (PLACEHOLDER/INTEGRATION DATA)
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
 * TEAM MEMBERS PLACEHOLDER DATA
 */
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Dr. Faculty Coordinator",
    role: "Faculty Advisor",
    department: "NEC Innovation & Incubation Cell",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    linkedin: "https://linkedin.com",
    email: "advisor@nec.edu.in"
  },
  {
    id: "tm-2",
    name: "Overall Student Lead",
    role: "Overall Coordinator",
    department: "Computer Science & Engg",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    linkedin: "https://linkedin.com",
    email: "lead@nec.edu.in"
  },
  {
    id: "tm-3",
    name: "Events & Operations Head",
    role: "Events Manager",
    department: "Electronics & Comm Engg",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: "tm-4",
    name: "Corporate & IITB Liaison Lead",
    role: "Relations Lead",
    department: "Mechanical Engg",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    linkedin: "https://linkedin.com"
  }
];
