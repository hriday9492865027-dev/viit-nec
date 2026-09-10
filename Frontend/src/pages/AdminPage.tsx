import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage, InstagramPost, EventItem } from '@/types';
import { INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_INSTAGRAM_POSTS } from '@/data/initialData';
import GalleryCard from '@/components/GalleryCard';
import LightboxModal from '@/components/LightboxModal';
import {
  Upload, Star, Trash2, ArrowLeft, Image as ImageIcon,
  Instagram, CloudUpload, CheckCircle2, AlertCircle,
  Folder, Eye, EyeOff, RefreshCw, BarChart3, Settings2,
  Calendar, MapPin, Plus, ExternalLink, Sparkles, X, Layers,
  Mail, MessageSquare, Clock, Lock, ShieldCheck, KeyRound, LogOut
} from 'lucide-react';

const STORAGE_KEY = 'ecell_events';
const STORAGE_KEY_GALLERY = 'ecell_gallery';
const VALID_PASSCODES = [
  ((import.meta as any).env?.VITE_ADMIN_PASSCODE as string),
  'nec@2026',
  'viitnec@2026',
].filter(Boolean);
const AUTH_STORAGE_KEY = 'ecell_admin_auth';




/* Helper to compress uploaded event images for responsive preview and local storage */
function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── Stat Card ─── */
function StatCard({
  label, value, icon: Icon, accent,
}: {
  label: string; value: number; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-xs text-slate-500 font-semibold mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    }
    return false;
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PASSCODES.includes(passcodeInput.trim())) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect authorization key. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasscodeInput('');
    setAuthError('');
  };

  const [activeTab, setActiveTab] = useState<'events' | 'gallery' | 'instagram' | 'messages'>('events');
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_GALLERY);
  const [igPosts, setIgPosts] = useState<InstagramPost[]>(INITIAL_INSTAGRAM_POSTS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [loading, setLoading] = useState(false);

  // Inquiries / Messages State (from MongoDB)
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Gallery Upload Form State
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isProcessingGallery, setIsProcessingGallery] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Summit');
  const [isFeaturedInput, setIsFeaturedInput] = useState(true);
  const [eventCodeGalleryInput, setEventCodeGalleryInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedGalleryModalImg, setSelectedGalleryModalImg] = useState<GalleryImage | null>(null);
  const [selectedGalleryModalPhotoIdx, setSelectedGalleryModalPhotoIdx] = useState(0);

  // Event Creation Form State
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'upcoming' | 'past'>('upcoming');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [eventImagePreview, setEventImagePreview] = useState('');
  const [eventImageName, setEventImageName] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [useUrlInstead, setUseUrlInstead] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [eventCodeInput, setEventCodeInput] = useState('');
  const [eventMsg, setEventMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => { 
    if (isAuthenticated) {
      fetchData(); 
      loadEvents();
      fetchContactMessages();
    }
  }, [isAuthenticated]);

  const fetchContactMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setContactMessages(data.messages);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Fallback to local storage backup
    try {
      const local = localStorage.getItem('ecell_contact_messages');
      if (local) {
        setContactMessages(JSON.parse(local));
      }
    } catch {
      // ignore
    } finally {
      setLoadingMessages(false);
    }
  };

  const deleteContactMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    const updated = contactMessages.filter((m) => (m._id || m.id) !== id);
    setContactMessages(updated);
    try {
      localStorage.setItem('ecell_contact_messages', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const loadEvents = async () => {
    let currentEvents = INITIAL_EVENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentEvents = parsed;
          setEvents(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load events from storage:', err);
    }

    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.events));
        }
      }
    } catch {
      // Backend offline or static mode fallback
    }
  };

  const saveEvents = (updated: EventItem[]) => {
    setEvents(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save events to storage:', err);
    }
  };

  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setEventMsg({ type: 'error', text: 'Please select a valid image file (PNG, JPG, JPEG, WEBP).' });
      return;
    }

    setIsProcessingImage(true);
    setEventMsg(null);
    try {
      const dataUrl = await compressImage(file);
      setEventImagePreview(dataUrl);
      setEventImageUrl(dataUrl);
      setEventImageName(file.name);
    } catch (err) {
      console.error('Error reading image file:', err);
      setEventMsg({ type: 'error', text: 'Failed to process image file. Please try another image.' });
    } finally {
      setIsProcessingImage(false);
    }
  };

  const removeEventImage = () => {
    setEventImagePreview('');
    setEventImageUrl('');
    setEventImageName('');
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      setEventMsg({ type: 'error', text: 'Please enter an event title.' });
      return;
    }

    const finalImageUrl = (eventImagePreview || eventImageUrl).trim() ||
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80';

    const newEvent: EventItem = {
      id: `event-${Date.now()}`,
      title: eventTitle.trim(),
      category: eventCategory,
      date: eventDate.trim() || 'Date To Be Announced',
      location: eventLocation.trim() || 'VIIT Campus',
      imageUrl: finalImageUrl,
      description: eventDescription.trim() || 'Join us for this flagship entrepreneurship event organized by NEC E-Cell VIIT.',
      link: eventLink.trim() || undefined,
      eventCode: eventCodeInput.trim().toUpperCase() || undefined,
    };

    const updated = [newEvent, ...events];
    saveEvents(updated);
    setEventMsg({ type: 'success', text: 'Event published successfully! It is now visible on the website.' });

    // Persist to backend database
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
    } catch (err) {
      console.warn('Event saved locally; background server sync pending:', err);
    }
    
    // Reset inputs
    setEventTitle('');
    setEventDate('');
    setEventLocation('');
    setEventImageUrl('');
    setEventImagePreview('');
    setEventImageName('');
    setEventDescription('');
    setEventLink('');
    setEventCodeInput('');
    setUseUrlInstead(false);
    setShowEventForm(false);
  };

  const toggleEventCategory = async (id: string, currentCategory: 'upcoming' | 'past') => {
    const nextCat: 'upcoming' | 'past' = currentCategory === 'upcoming' ? 'past' : 'upcoming';
    const updated: EventItem[] = events.map(ev => 
      ev.id === id ? { ...ev, category: nextCat } : ev
    );
    saveEvents(updated);

    try {
      await fetch(`/api/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: nextCat }),
      });
    } catch {}
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const updated = events.filter(ev => ev.id !== id);
    saveEvents(updated);

    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    } catch {}
  };

  const resetEventsToDefaults = () => {
    if (!confirm('Reset all events to the baseline defaults? Any custom added events will be replaced.')) return;
    saveEvents(INITIAL_EVENTS);
  };

  const saveGalleryImages = (updated: GalleryImage[]) => {
    setImages(updated);
    try {
      localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save gallery to localStorage:', err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let localGallery = INITIAL_GALLERY;
      const stored = localStorage.getItem(STORAGE_KEY_GALLERY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            localGallery = parsed;
            setImages(parsed);
          }
        } catch {}
      }

      const [galRes, igRes] = await Promise.all([
        fetch('/api/gallery').catch(() => null),
        fetch('/api/instagram').catch(() => null)
      ]);
      if (galRes && galRes.ok) {
        const galData = await galRes.json();
        if (galData.success && Array.isArray(galData.images)) {
          const apiIds = new Set(galData.images.map((i: any) => i.id));
          const localOnly = localGallery.filter(i => !apiIds.has(i.id));
          const merged = [...localOnly, ...galData.images];
          setImages(merged);
          localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(merged));
        }
      }
      if (igRes && igRes.ok) {
        const igData = await igRes.json();
        if (igData.success) setIgPosts(igData.posts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsProcessingGallery(true);
    setUploadMsg(null);
    try {
      const newFiles: File[] = [];
      const newPreviews: string[] = [];
      for (const f of files) {
        if (f.type.startsWith('image/')) {
          const compressed = await compressImage(f);
          newPreviews.push(compressed);
          newFiles.push(f);
        }
      }
      setSelectedGalleryFiles(prev => [...prev, ...newFiles]);
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    } catch (err) {
      console.error(err);
      setUploadMsg({ type: 'error', text: 'Failed to process some images.' });
    } finally {
      setIsProcessingGallery(false);
    }
  };

  const removeGalleryPreview = (index: number) => {
    setSelectedGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadMsg(null);
    try {
      let finalPhotos: string[] = [];
      if (uploadMode === 'file') {
        finalPhotos = galleryPreviews;
      } else {
        const trimmed = urlInput.trim();
        if (trimmed) finalPhotos = [trimmed];
      }

      if (finalPhotos.length === 0) {
        setUploadMsg({ type: 'error', text: 'Please select at least one photo or enter an image URL.' });
        setUploading(false);
        return;
      }

      const isMulti = finalPhotos.length > 1;
      const newImage: GalleryImage = {
        id: `img-${Date.now()}`,
        title: titleInput.trim() || (isMulti ? `Event Highlights (${finalPhotos.length} Photos)` : 'Untitled Photo'),
        category: categoryInput,
        url: finalPhotos[0],
        images: finalPhotos,
        isFeatured: isFeaturedInput,
        uploadedAt: new Date().toISOString().split('T')[0],
        eventCode: eventCodeGalleryInput.trim().toUpperCase() || undefined,
      };

      const updated = [newImage, ...images];
      saveGalleryImages(updated);

      // Attempt background POST to server
      try {
        await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newImage),
        });
      } catch {}

      setUploadMsg({
        type: 'success',
        text: isMulti
          ? `Successfully uploaded ${finalPhotos.length} photos as an interactive card deck! Visible in website gallery.`
          : 'Photo uploaded successfully! Visible in website gallery.'
      });

      setSelectedGalleryFiles([]);
      setGalleryPreviews([]);
      setUrlInput('');
      setTitleInput('');
      setEventCodeGalleryInput('');
    } catch {
      setUploadMsg({ type: 'error', text: 'An unexpected error occurred during upload.' });
    } finally {
      setUploading(false);
    }
  };

  const toggleFeaturedImage = async (id: string, cur: boolean) => {
    const updated = images.map(img => img.id === id ? { ...img, isFeatured: !cur } : img);
    saveGalleryImages(updated);
    try {
      await fetch('/api/gallery', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isFeatured: !cur }),
      });
    } catch {}
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this photo card from the gallery?')) return;
    const updated = images.filter(img => img.id !== id);
    saveGalleryImages(updated);
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    } catch {}
  };

  const toggleFeaturedIg = async (id: string, cur: boolean) => {
    const res = await fetch('/api/instagram', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isFeatured: !cur }),
    });
    const data = await res.json();
    if (data.success) setIgPosts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !cur } : p));
  };

  const featuredCount   = images.filter(i => i.isFeatured).length;
  const featuredIgCount = igPosts.filter(p => p.isFeatured).length;
  const upcomingEventsCount = events.filter(e => e.category === 'upcoming').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex flex-col justify-between text-slate-100 relative overflow-hidden font-sans">
        {/* Background glow accents */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-50px] right-10 w-[500px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Top Header */}
        <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Site</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gateway Secure</span>
          </div>
        </header>

        {/* Center Card */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
          <div className={`w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-8 sm:p-9 shadow-2xl shadow-black/60 transition-transform ${isShaking ? 'translate-x-[-8px] transition-none' : ''}`}>
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-600/25 mb-6">
              <Lock className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Restricted Administration
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight pt-1">
                Admin Authorization
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                This dashboard is protected. Please enter your secret coordinator passcode to access content controls.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Security Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    required
                    autoFocus
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    placeholder="Enter admin passcode"
                    className="w-full pl-4 pr-11 py-3.5 bg-slate-800/80 border border-slate-700/80 focus:border-blue-500 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                    title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/25 rounded-xl text-xs font-semibold text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Unlock Admin Panel</span>
                <KeyRound className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800/80 text-center space-y-2">
              <p className="text-[11px] text-slate-500 font-medium">
                Authorized session will remain active until you close this browser tab or log out.
              </p>
            </div>

          </div>
        </main>

        {/* Footer info */}
        <footer className="py-5 text-center text-xs text-slate-500 relative z-10 border-t border-slate-800/50">
          NEC E-Cell System Security • Powered by IIT Bombay E-Cell Affiliation
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      {/* ── Top Navigation Bar ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: Brand */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-700 transition-colors border-r border-slate-200 pr-4 mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Site</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-black text-sm shadow-sm">
                  E
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 leading-tight">NEC E-Cell</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { fetchData(); loadEvents(); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                title="Log out and lock admin panel"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>

              {activeTab === 'events' && (
                <button
                  onClick={() => setShowEventForm(v => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black border transition-all ${
                    showEventForm
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-blue-700 text-white border-blue-600 shadow-sm shadow-blue-700/20 hover:bg-blue-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showEventForm ? 'Close Form' : 'Add New Event'}
                </button>
              )}

              {activeTab === 'gallery' && (
                <button
                  onClick={() => setShowUploadPanel(v => !v)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black border transition-all ${
                    showUploadPanel
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : 'bg-blue-700 text-white border-blue-600 shadow-sm shadow-blue-700/20 hover:bg-blue-800'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  {showUploadPanel ? 'Close Upload' : 'Upload Photo'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Content & Event Management
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Add and manage college events, gallery photos, and Instagram feeds in real-time.
            </p>
          </div>
          <p className="text-xs text-slate-400 font-mono bg-white border border-slate-200 rounded-lg px-3 py-2 w-fit">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard label="Total Events"      value={events.length}         icon={Calendar}   accent="bg-purple-100 text-purple-700" />
          <StatCard label="Upcoming Events"   value={upcomingEventsCount}   icon={Sparkles}   accent="bg-emerald-100 text-emerald-700" />
          <StatCard label="Total Photos"      value={images.length}         icon={ImageIcon}  accent="bg-blue-100 text-blue-700" />
          <StatCard label="Instagram Posts"   value={igPosts.length}        icon={Instagram}  accent="bg-pink-100 text-pink-600" />
          <StatCard label="Inquiries (DB)"    value={contactMessages.length} icon={Mail}       accent="bg-amber-100 text-amber-700" />
        </div>

        {/* Tab Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center border-b border-slate-200 px-6 overflow-x-auto">
            {[
              { key: 'events',    label: 'Events & Summits', icon: Calendar,   count: events.length,  active: 'border-purple-600 text-purple-700', inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
              { key: 'gallery',   label: 'Photo Gallery',    icon: ImageIcon,  count: images.length,  active: 'border-blue-700 text-blue-700',     inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
              { key: 'instagram', label: 'Instagram Feed',   icon: Instagram,  count: igPosts.length, active: 'border-pink-600 text-pink-600',      inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
              { key: 'messages',  label: 'Inquiries & DB',   icon: Mail,       count: contactMessages.length, active: 'border-amber-600 text-amber-700', inactive: 'text-slate-500 hover:text-slate-800 border-transparent' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-1 py-4 mr-6 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.key ? tab.active : tab.inactive
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === tab.key ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ═══ EVENTS TAB ═══ */}
          {activeTab === 'events' && (
            <div className="p-6 space-y-6">
              
              {/* Event Feedback Alert */}
              {eventMsg && (
                <div className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between gap-2 ${
                  eventMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  <span>{eventMsg.text}</span>
                  <button onClick={() => setEventMsg(null)} className="hover:opacity-75">
                    &times;
                  </button>
                </div>
              )}

              {/* Event Form Panel */}
              {showEventForm && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-5 animate-scale-up">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h2 className="text-base font-black text-slate-900">Add New Event</h2>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Fill in event details. It will be immediately published to the public /events page.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEventForm(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleCreateEvent} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Event Title *</label>
                        <input
                          type="text"
                          required
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="e.g. E-Summit 2026 / Hackathon / Founder Talk"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Category Status</label>
                        <select
                          value={eventCategory}
                          onChange={(e) => setEventCategory(e.target.value as 'upcoming' | 'past')}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="upcoming">Upcoming Event (Active Registrations)</option>
                          <option value="past">Past Event (Recap / Highlights)</option>
                        </select>
                      </div>

                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Date & Timing</label>
                        <input
                          type="text"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          placeholder="e.g. November 14 - 15, 2026"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Location / Venue</label>
                        <input
                          type="text"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="e.g. Main Auditorium, VIIT Campus"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Banner Image Upload */}
                      <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                            <span>Event Banner Image (Upload Photo)</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setUseUrlInstead(v => !v)}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                          >
                            {useUrlInstead ? 'Switch to Image File Upload' : 'Or paste an Image URL instead'}
                          </button>
                        </div>

                        {!useUrlInstead ? (
                          <div>
                            {eventImagePreview ? (
                              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm group">
                                <img
                                  src={eventImagePreview}
                                  alt="Banner preview"
                                  className="w-full h-48 sm:h-56 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-[11px] font-bold">
                                      <CheckCircle2 className="w-3 h-3" /> Ready
                                    </span>
                                    <span className="text-xs font-medium truncate max-w-[200px] sm:max-w-[300px]">
                                      {eventImageName || 'Custom Banner Image'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold backdrop-blur-xs transition-colors">
                                      <span>Change</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEventImageUpload}
                                        className="hidden"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={removeEventImage}
                                      className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                                      title="Remove Image"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-600 hover:bg-blue-50/30 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all group">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleEventImageUpload}
                                  className="hidden"
                                />
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-105 flex items-center justify-center text-blue-700 transition-all mb-3 shadow-xs">
                                  {isProcessingImage ? (
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                  ) : (
                                    <CloudUpload className="w-6 h-6" />
                                  )}
                                </div>
                                <p className="text-xs font-bold text-slate-800 text-center">
                                  {isProcessingImage ? 'Processing image...' : 'Click to select or upload banner image'}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1 text-center">
                                  PNG, JPG, JPEG, WEBP · Recommended 16:9 banner ratio
                                </p>
                              </label>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <input
                              type="url"
                              value={eventImageUrl}
                              onChange={(e) => {
                                setEventImageUrl(e.target.value);
                                setEventImagePreview(e.target.value);
                              }}
                              placeholder="https://images.unsplash.com/... or direct image link"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                            />
                            {eventImageUrl && (
                              <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-200 h-36">
                                <img
                                  src={eventImageUrl}
                                  alt="URL Preview"
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Registration / External Link */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Registration / Information Link</label>
                        <input
                          type="url"
                          value={eventLink}
                          onChange={(e) => setEventLink(e.target.value)}
                          placeholder="https://forms.google.com/... or https://unstop.com/..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>

                      {/* Special Event Code (Linking Event to Gallery) */}
                      <div className="space-y-1.5 md:col-span-2 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>Special Event Code (Direct Link to Event Gallery Photos)</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              if (eventTitle) {
                                const clean = eventTitle.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 12);
                                setEventCodeInput(clean);
                              }
                            }}
                            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                          >
                            Auto-Generate Code
                          </button>
                        </div>
                        <input
                          type="text"
                          value={eventCodeInput}
                          onChange={(e) => setEventCodeInput(e.target.value.toUpperCase())}
                          placeholder="e.g. EUREKA2026 / SPARK2026 / HACKATHON26"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 text-sm font-mono font-black tracking-wider text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white uppercase"
                        />
                        <p className="text-[11px] text-slate-500 leading-normal">
                          Create this code now. After the event, enter this exact code when uploading event photos in the Gallery section. Visitors on the event page will be redirected straight to those photos without having to search!
                        </p>
                      </div>

                      {/* Description */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Event Description</label>
                        <textarea
                          rows={3}
                          value={eventDescription}
                          onChange={(e) => setEventDescription(e.target.value)}
                          placeholder="Brief description about the event, speakers, schedule, and participation guidelines..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowEventForm(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-black shadow-md shadow-blue-700/20"
                      >
                        Publish Event
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Events Header & Quick Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-slate-900">Current Events ({events.length})</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Manage upcoming summits, hackathons, and past highlight recaps.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetEventsToDefaults}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-all"
                    title="Reset to default events"
                  >
                    Reset Defaults
                  </button>
                  <button
                    onClick={() => setShowEventForm(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Event
                  </button>
                </div>
              </div>

              {/* Events List Cards */}
              {events.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No events in database</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">Click "New Event" or "Reset Defaults" to add events.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Thumbnail */}
                        <div className="relative h-40 bg-slate-100 overflow-hidden">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80';
                            }}
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            {event.category === 'upcoming' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow">
                                Upcoming
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-800 text-white shadow">
                                Past
                              </span>
                            )}
                            {event.eventCode && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950 shadow border border-amber-300">
                                #{event.eventCode}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-4 space-y-2.5">
                          <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="space-y-1 text-xs text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5 truncate">
                              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleEventCategory(event.id, event.category)}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                            event.category === 'upcoming'
                              ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          Mark as {event.category === 'upcoming' ? 'Past' : 'Upcoming'}
                        </button>

                        <div className="flex items-center gap-1.5">
                          {event.eventCode && (
                            <Link
                              to={`/gallery?eventCode=${event.eventCode}`}
                              className="p-1.5 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all flex items-center gap-1 text-[11px] font-bold"
                              title={`Preview photos with code #${event.eventCode}`}
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>Gallery</span>
                            </Link>
                          )}
                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all"
                              title="Open registration link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all"
                            title="Delete event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ═══ GALLERY TAB ═══ */}
          {activeTab === 'gallery' && (
            <div className="p-6 space-y-6">
              {/* Upload Panel */}
              {showUploadPanel && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 animate-scale-up">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h2 className="text-sm font-black text-slate-900">Upload New Photo</h2>
                    <button onClick={() => setShowUploadPanel(false)} className="text-xs text-slate-400 hover:text-slate-700 font-bold">Close</button>
                  </div>
                  {uploadMsg && (
                    <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      uploadMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {uploadMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                      {uploadMsg.text}
                    </div>
                  )}
                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setUploadMode('file')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          uploadMode === 'file' ? 'bg-blue-700 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
                        }`}>
                        File Upload
                      </button>
                      <button type="button" onClick={() => setUploadMode('url')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          uploadMode === 'url' ? 'bg-blue-700 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
                        }`}>
                        Paste URL
                      </button>
                    </div>

                    {uploadMode === 'file' ? (
                      <div className="space-y-3">
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-600 hover:bg-blue-50/40 rounded-2xl p-6 cursor-pointer transition-all group">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultipleFilesChange}
                            className="hidden"
                          />
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-700 transition-all mb-2 shadow-xs">
                            {isProcessingGallery ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CloudUpload className="w-6 h-6" />}
                          </div>
                          <p className="text-xs font-bold text-slate-800 text-center">
                            {isProcessingGallery ? 'Optimizing & processing photos...' : 'Click to select multiple photos or drag and drop'}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1 text-center">
                            Upload 1 photo or multiple photos at once (PNG, JPG, JPEG, WEBP)
                          </p>
                        </label>

                        {/* Previews of selected photos */}
                        {galleryPreviews.length > 0 && (
                          <div className="space-y-2 p-3.5 rounded-xl bg-white border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                              <span>Selected Photos ({galleryPreviews.length})</span>
                              {galleryPreviews.length > 1 ? (
                                <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold">
                                  <Layers className="w-3 h-3" /> Will display as interactive card deck
                                </span>
                              ) : (
                                <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-semibold">
                                  Single picture card
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2.5 overflow-x-auto py-1.5">
                              {galleryPreviews.map((previewUrl, idx) => (
                                <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs group">
                                  <img src={previewUrl} alt={`Selected ${idx + 1}`} className="w-full h-full object-cover" />
                                  <span className="absolute bottom-0 inset-x-0 text-center bg-black/60 text-white text-[9px] font-bold">
                                    #{idx + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryPreview(idx)}
                                    className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white transition-colors cursor-pointer shadow-xs"
                                    title="Remove this photo"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      />
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Photo title / caption"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      />
                      <select
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      >
                        {['Summit', 'Pitching', 'Workshop', 'Hackathon', 'Team', 'Campus'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Event Code Link */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Link to Event Code (Auto-Filters for Visitors)</span>
                        </label>
                        {eventCodeGalleryInput && (
                          <button
                            type="button"
                            onClick={() => setEventCodeGalleryInput('')}
                            className="text-[10px] font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                          >
                            Clear Code
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Select existing event */}
                        <select
                          value={events.some(ev => ev.eventCode && ev.eventCode === eventCodeGalleryInput) ? eventCodeGalleryInput : ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              setEventCodeGalleryInput(e.target.value);
                              const matchedEv = events.find(ev => ev.eventCode === e.target.value);
                              if (matchedEv && !titleInput) {
                                setTitleInput(`${matchedEv.title} Highlights`);
                              }
                            }
                          }}
                          className="px-3 py-2 rounded-xl border border-amber-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="">-- Choose from existing events --</option>
                          {events
                            .filter(ev => Boolean(ev.eventCode))
                            .map(ev => (
                              <option key={ev.id} value={ev.eventCode}>
                                #{ev.eventCode} ({ev.title})
                              </option>
                            ))}
                        </select>
                        {/* Manual entry */}
                        <input
                          type="text"
                          placeholder="Or enter code manually (e.g. EUREKA2026)"
                          value={eventCodeGalleryInput}
                          onChange={(e) => setEventCodeGalleryInput(e.target.value.toUpperCase())}
                          className="px-3 py-2 rounded-xl border border-amber-300 text-xs font-mono font-bold tracking-wider uppercase focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white text-slate-900"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Enter the same code given to the event. Users clicking from the event page will see these photos instantly without searching.
                      </p>
                    </div>

                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeaturedInput}
                        onChange={(e) => setIsFeaturedInput(e.target.checked)}
                        className="rounded"
                      />
                      Show as Featured (visible on public gallery & home page)
                    </label>
                    <button
                      type="submit"
                      disabled={uploading || isProcessingGallery}
                      className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-black transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? 'Publishing...' : 'Confirm Upload to Gallery'}
                    </button>
                  </form>
                </div>
              )}

              {/* Gallery Grid */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Photos ({images.length})</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Click the star to feature/unfeature. Use arrows on multi-photo cards to flip through photos.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-72 bg-slate-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No photos found</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">Upload your first photo or card deck to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                  {images.map((img, i) => (
                    <GalleryCard
                      key={img.id}
                      img={img}
                      index={i}
                      isAdmin={true}
                      onToggleFeatured={toggleFeaturedImage}
                      onDelete={deleteImage}
                      onClick={(item, idx = 0) => {
                        setSelectedGalleryModalImg(item);
                        setSelectedGalleryModalPhotoIdx(idx);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ INSTAGRAM TAB ═══ */}
          {activeTab === 'instagram' && (
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Instagram Feed</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Toggle which posts appear on the public homepage.
                    <span className="ml-2 text-pink-600 font-bold">{featuredIgCount} currently visible.</span>
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-2xl overflow-hidden animate-pulse">
                      <div className="h-48 bg-slate-200" />
                      <div className="p-3 space-y-2">
                        <div className="h-2.5 bg-slate-200 rounded-full w-3/4" />
                        <div className="h-2.5 bg-slate-200 rounded-full w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : igPosts.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Instagram className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No Instagram posts found</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">Connect your Instagram feed to display posts.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {igPosts.map(post => (
                    <div key={post.id}
                      className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                        post.isFeatured ? 'border-pink-300 ring-1 ring-pink-200' : 'border-slate-200'
                      }`}>
                      <div className="relative h-52 bg-slate-100 overflow-hidden">
                        <img src={post.mediaUrl} alt="IG Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black shadow backdrop-blur-sm ${
                          post.isFeatured
                            ? 'bg-pink-600 text-white'
                            : 'bg-black/50 text-white'
                        }`}>
                          {post.isFeatured ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {post.isFeatured ? 'Visible' : 'Hidden'}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">{post.caption}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-mono">{post.timestamp}</span>
                          <button
                            onClick={() => toggleFeaturedIg(post.id, post.isFeatured)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black border transition-all ${
                              post.isFeatured
                                ? 'bg-pink-600 text-white border-pink-500 hover:bg-pink-700'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50'
                            }`}>
                            {post.isFeatured
                              ? <><EyeOff className="w-3 h-3" /> Hide</>
                              : <><Eye className="w-3 h-3" /> Show on Site</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ CONTACT MESSAGES TAB (MONGODB) ═══ */}
          {activeTab === 'messages' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-slate-900">Contact Inquiries & Database Records</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Messages submitted from the website Contact page. Stored in MongoDB with email notifications dispatched.
                  </p>
                </div>
                <button
                  onClick={fetchContactMessages}
                  disabled={loadingMessages}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors w-fit cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                  Refresh Messages
                </button>
              </div>

              {loadingMessages ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : contactMessages.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-bold text-sm">No inquiries recorded yet</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">
                    When someone submits the Contact form, their inquiry will be stored in MongoDB and appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((msg: any) => {
                    const msgId = msg._id || msg.id;
                    const dateStr = msg.createdAt ? new Date(msg.createdAt).toLocaleString('en-IN') : 'Recently';

                    return (
                      <div
                        key={msgId}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200">
                              {msg.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-slate-900">{msg.name}</h3>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> MongoDB
                                </span>
                                {msg.emailSent ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                    <Mail className="w-2.5 h-2.5" /> Email Sent
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                    <Clock className="w-2.5 h-2.5" /> Recorded
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">
                                <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">
                                  {msg.email}
                                </a>
                                {msg.subject && <span className="ml-2 text-slate-400">· Topic: <strong className="text-slate-700">{msg.subject}</strong></span>}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {dateStr}
                            </span>
                            <button
                              onClick={() => deleteContactMessage(msgId)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-100">
                          <p className="text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-200 mt-4">
        <span>© {new Date().getFullYear()} NEC E-Cell · Admin Panel</span>
        <Link to="/" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold transition-colors">
          <Settings2 className="w-3.5 h-3.5" />
          View Public Website
        </Link>
      </footer>

      {/* Lightbox Modal */}
      <LightboxModal
        image={selectedGalleryModalImg}
        images={images}
        initialPhotoIndex={selectedGalleryModalPhotoIdx}
        onClose={() => setSelectedGalleryModalImg(null)}
        onSelectImage={(img, idx = 0) => {
          setSelectedGalleryModalImg(img);
          setSelectedGalleryModalPhotoIdx(idx);
        }}
      />
    </div>
  );
}
