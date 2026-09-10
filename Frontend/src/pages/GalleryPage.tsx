import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import GalleryCard from '@/components/GalleryCard';
import { GalleryImage } from '@/types';
import { ArrowLeft, Star, Image as ImageIcon, Sparkles, X, Search, Calendar } from 'lucide-react';
import { INITIAL_GALLERY } from '@/data/initialData';

const STORAGE_KEY = 'ecell_gallery';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeEventCode = (searchParams.get('eventCode') || '').trim().toUpperCase();
  const [codeSearchInput, setCodeSearchInput] = useState(activeEventCode);

  const [images, setImages] = useState<GalleryImage[]>(INITIAL_GALLERY);
  const [loading, setLoading] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Sync search input if URL changes
  useEffect(() => {
    setCodeSearchInput(activeEventCode);
  }, [activeEventCode]);

  useEffect(() => { 
    fetchImages(); 
  }, [showOnlyFeatured, activeEventCode]);

  const fetchImages = async () => {
    setLoading(true);
    let currentGallery: GalleryImage[] = INITIAL_GALLERY;

    // 1. Check local storage first (instant client updates)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentGallery = parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read gallery from localStorage:', e);
    }

    // 2. Fetch from API if available to sync
    try {
      const params = new URLSearchParams();
      if (showOnlyFeatured) params.set('featured', 'true');
      if (activeEventCode) params.set('eventCode', activeEventCode);

      const queryString = params.toString();
      const url = queryString ? `/api/gallery?${queryString}` : '/api/gallery';

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          let liveImages = data.images;
          if (activeEventCode) {
            liveImages = liveImages.filter((i: GalleryImage) => 
              i.eventCode && i.eventCode.trim().toUpperCase() === activeEventCode
            );
          }
          if (showOnlyFeatured) {
            liveImages = liveImages.filter((i: GalleryImage) => i.isFeatured);
          }
          setImages(liveImages);
          try {
            // Keep full gallery cached if we fetched without filters
            if (!activeEventCode && !showOnlyFeatured) {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
            }
          } catch {}
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // In static build or offline, continue with local/initial gallery
    } finally {
      setLoading(false);
    }

    // Client-side filtering fallback
    let filtered = currentGallery;
    if (activeEventCode) {
      filtered = filtered.filter(i => i.eventCode && i.eventCode.trim().toUpperCase() === activeEventCode);
    }
    if (showOnlyFeatured) {
      filtered = filtered.filter(i => i.isFeatured);
    }
    setImages(filtered);
  };

  const handleCardClick = (img: GalleryImage, photoIndex = 0) => {
    setSelectedImage(img);
    setSelectedPhotoIndex(photoIndex);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = codeSearchInput.trim().toUpperCase();
    if (clean) {
      searchParams.set('eventCode', clean);
    } else {
      searchParams.delete('eventCode');
    }
    setSearchParams(searchParams);
  };

  const handleClearCodeFilter = () => {
    searchParams.delete('eventCode');
    setSearchParams(searchParams);
    setCodeSearchInput('');
  };

  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#0f0d0c] flex flex-col font-sans page-enter">
      <Navbar />
      <main className="flex-1 py-12 tech-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 border-b border-[rgba(24,58,55,0.12)] pb-8">
            <div className="space-y-2">
              <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#163A36] hover:text-[#102A27] transition-colors mb-2">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-5xl font-black text-[#183A37] tracking-tight">
                NEC E-Cell <span className="gradient-text">Photo Archive</span>
              </h1>
              <p className="text-[#5A6772] text-sm sm:text-base font-medium">
                Explore our full repository of pitch competitions, workshops, summits, and campus events.
              </p>
            </div>

            {/* Controls: Search by Code & Featured Star */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-60">
                  <input
                    type="text"
                    value={codeSearchInput}
                    onChange={(e) => setCodeSearchInput(e.target.value.toUpperCase())}
                    placeholder="Event Code (e.g. EUREKA2026)"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[rgba(24,58,55,0.18)] bg-white text-xs font-mono font-bold tracking-wider uppercase text-[#183A37] focus:ring-2 focus:ring-[#815355] focus:outline-none shadow-xs"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2.5 rounded-xl bg-[#183A37] hover:bg-[#122e2b] text-[#EFD6AC] text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0"
                >
                  Filter
                </button>
              </form>

              <button
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  showOnlyFeatured
                    ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                    : 'bg-white text-slate-700 border-[rgba(24,58,55,0.14)] hover:border-[#815355]'
                }`}
                title={showOnlyFeatured ? 'Show all photos' : 'Show featured only'}
              >
                <Star className={`w-4 h-4 ${showOnlyFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span className="sm:hidden">Featured</span>
              </button>
            </div>
          </div>

          {/* Active Event Code Filter Notification Banner */}
          {activeEventCode && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                  <Sparkles className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider">
                      Filtered by Event Code:
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-mono font-black border border-amber-300 shadow-xs">
                      #{activeEventCode}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                    Directly viewing photos and results linked to this event.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/events"
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#183A37] text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Events Page
                </Link>
                <button
                  onClick={handleClearCodeFilter}
                  className="px-3.5 py-2 rounded-xl bg-[#183A37] hover:bg-[#122e2b] text-[#EFD6AC] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Filter (Show All)
                </button>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-72 sm:h-80 bg-slate-200/70 rounded-3xl" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="p-16 text-center bg-[#fffdf8] rounded-3xl border border-[rgba(24,58,55,0.12)] space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-[#815355] mx-auto flex items-center justify-center">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#183A37]">
                {activeEventCode ? `No photos found for code #${activeEventCode}` : 'No photos found'}
              </h3>
              <p className="text-[#5A6772] text-sm max-w-md mx-auto font-medium">
                {activeEventCode
                  ? `Photos for event code #${activeEventCode} have not been uploaded yet, or the code entered does not match any uploaded album.`
                  : showOnlyFeatured 
                  ? 'No featured photos selected yet. Try viewing all photos or star some in the admin panel.' 
                  : 'No gallery photos have been added yet.'}
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                {activeEventCode && (
                  <button
                    onClick={handleClearCodeFilter}
                    className="px-5 py-2.5 rounded-xl bg-[#183A37] hover:bg-[#122e2b] text-[#EFD6AC] text-xs font-bold cursor-pointer shadow-xs transition-colors"
                  >
                    View All Photos
                  </button>
                )}
                {showOnlyFeatured && !activeEventCode && (
                  <button
                    onClick={() => setShowOnlyFeatured(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#163A36] hover:bg-[#102A27] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    View All Photos
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-9">
              {images.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  img={img}
                  index={i}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}

          {/* Lightbox Modal with Multi-Card Support */}
          <LightboxModal
            image={selectedImage}
            images={images}
            initialPhotoIndex={selectedPhotoIndex}
            onClose={() => setSelectedImage(null)}
            onSelectImage={(img, idx = 0) => {
              setSelectedImage(img);
              setSelectedPhotoIndex(idx);
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
