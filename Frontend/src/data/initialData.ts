import { EventItem, GalleryImage, InstagramPost, TeamMember } from '@/types';

/**
 * CONFIGURATION & INSTAGRAM HANDLE
 */
export const INSTAGRAM_CONFIG = {
  handle: "viitnec",
  profileUrl: "https://www.instagram.com/viitnec?igsh=MTF5OHY3MjBoaGhpMA==",
};

/**
 * INITIAL EVENTS DATA
 */
export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "E-Summit '26: Innovate for Tomorrow",
    category: "upcoming",
    date: "August 25-26, 2026",
    location: "NEC Campus Auditorium",
    description: "The flagship annual entrepreneurship summit featuring keynote speakers, startup expos, and pitch competitions in association with E-Cell IIT Bombay.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    link: "#register"
  },
  {
    id: "evt-2",
    title: "Pitch Perfect - B-Plan Competition",
    category: "upcoming",
    date: "September 10, 2026",
    location: "Online / Hybrid",
    description: "Present your business ideas to industry experts, venture capitalists, and mentors. Win seed funding opportunities and incubation support.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    link: "#register"
  },
  {
    id: "evt-3",
    title: "Ideation Bootcamp 2026",
    category: "past",
    date: "April 15, 2026",
    location: "NEC Innovation Hub",
    description: "Hands-on design thinking and problem-solving workshop for aspiring student founders led by IIT Bombay E-Cell mentors.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "evt-4",
    title: "Founder Talk Series: Zero to One",
    category: "past",
    date: "February 28, 2026",
    location: "Virtual Webinar",
    description: "An inspiring talk by successful alumni entrepreneurs discussing product-market fit and building resilient tech startups.",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
  }
];

/**
 * INITIAL GALLERY IMAGES
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
