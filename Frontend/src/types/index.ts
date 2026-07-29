export interface EventItem {
  id: string;
  title: string;
  category: 'upcoming' | 'past';
  date: string;
  description: string;
  location: string;
  imageUrl: string;
  link?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category?: string;
  isFeatured: boolean;
  uploadedAt: string;
}

export interface InstagramPost {
  id: string;
  permalink: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  isFeatured: boolean;
  likeCount?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  imageUrl: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}
