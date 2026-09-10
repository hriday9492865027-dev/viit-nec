import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage } from '@/types';
import LightboxModal from './LightboxModal';
import GalleryCard from './GalleryCard';
import { ArrowRight, Settings } from 'lucide-react';
import { INITIAL_GALLERY } from '@/data/initialData';

const STORAGE_KEY = 'ecell_gallery';

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    fetchFeaturedImages();
  }, []);

  const fetchFeaturedImages = async () => {
    setLoading(true);
    let allImages: GalleryImage[] = INITIAL_GALLERY;

    // Check localStorage first
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allImages = parsed;
        }
      }
    } catch {}

    // Check API to sync
    try {
      const res = await fetch('/api/gallery?featured=true');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.images)) {
          setImages(data.images);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Offline or static build fallback
    } finally {
      setLoading(false);
    }

    setImages(allImages.filter(i => i.isFeatured));
  };

  const handleCardClick = (img: GalleryImage, photoIndex = 0) => {
    setSelectedImage(img);
    setSelectedPhotoIndex(photoIndex);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#fffdf8] tech-grid-pattern text-[#0f0d0c] border-b border-[rgba(24,58,55,0.12)] relative overflow-hidden">
      {/* Earthy Elegance Ambient Lighting Orbs matching Hero & Events */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,214,172,0.45) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(129,83,85,0.14) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(24,58,55,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-xs font-bold text-[#8A5A58] uppercase tracking-widest">
              Event Highlights
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#183A37] tracking-tight">
              Featured <span className="gradient-text">Moments</span>
            </h2>
            <p className="text-[#5A6772] text-base sm:text-lg max-w-xl font-medium">
              Highlights from pitch competitions, IIT Bombay summits, and student entrepreneurship workshops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#163A36] hover:bg-[#102A27] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#163A36]/20 transition-all hover:-translate-y-0.5"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-slate-200/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="p-16 text-center bg-[#fffdf8] rounded-3xl border border-[rgba(24,58,55,0.12)] space-y-5 shadow-xs">
            <p className="text-[#5A6772] text-base font-medium">No featured event highlights yet.</p>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#163A36] hover:bg-[#102A27] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#163A36]/20"
            >
              View Photo Archive
            </Link>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
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

        {/* Lightbox Modal */}
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
    </section>
  );
}
