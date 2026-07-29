import fs from 'fs';
import path from 'path';
import { GalleryImage, InstagramPost } from '@/types';
import { INITIAL_GALLERY, INITIAL_INSTAGRAM_POSTS } from '@/data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');
const INSTAGRAM_FILE = path.join(DATA_DIR, 'instagram.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getGalleryImages(): GalleryImage[] {
  ensureDataDir();
  if (!fs.existsSync(GALLERY_FILE)) {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(INITIAL_GALLERY, null, 2));
    return INITIAL_GALLERY;
  }
  try {
    const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading gallery file:', err);
    return INITIAL_GALLERY;
  }
}

export function saveGalleryImages(images: GalleryImage[]): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(images, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving gallery images:', err);
    return false;
  }
}

export function getInstagramPosts(): InstagramPost[] {
  ensureDataDir();
  if (!fs.existsSync(INSTAGRAM_FILE)) {
    fs.writeFileSync(INSTAGRAM_FILE, JSON.stringify(INITIAL_INSTAGRAM_POSTS, null, 2));
    return INITIAL_INSTAGRAM_POSTS;
  }
  try {
    const raw = fs.readFileSync(INSTAGRAM_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading instagram file:', err);
    return INITIAL_INSTAGRAM_POSTS;
  }
}

export function saveInstagramPosts(posts: InstagramPost[]): boolean {
  ensureDataDir();
  try {
    fs.writeFileSync(INSTAGRAM_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving instagram posts:', err);
    return false;
  }
}
