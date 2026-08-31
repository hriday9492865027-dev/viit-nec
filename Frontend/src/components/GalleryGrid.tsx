import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage } from '@/types';
import LightboxModal from './LightboxModal';
import { Maximize2, ArrowRight, Settings } from 'lucide-react';

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchFeaturedImages();
  }, []);

  const fetchFeaturedImages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery?featured=true');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Error fetching featured gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-28 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-extrabold text-blue-800 uppercase tracking-widest">
              Event Highlights
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-950">
              Featured Moments
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-medium">
              Highlights from pitch competitions, IIT Bombay summits, and student entrepreneurship workshops.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 text-slate-800 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-sm hover:border-blue-300 hover:-translate-y-0.5"
              title="Upload new photos & select featured images"
            >
              <Settings className="w-4 h-4 text-blue-700" />
              Manage Featured
            </Link>
            <Link
              to="/gallery"
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-blue-700/20"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Gallery Grid - BIGGER CARDS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 space-y-5 shadow-sm">
            <p className="text-slate-600 text-base font-medium">No featured images selected yet.</p>
            <Link
              to="/admin"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white text-xs font-extrabold uppercase tracking-wider"
            >
              Go to Admin Panel to Select Featured Images
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {images.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="gallery-card group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-slate-200 stagger-item"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Overlay with smooth transition */}
                <div className="overlay absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/30 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1.5 rounded-full bg-blue-700/90 backdrop-blur-md text-[11px] font-extrabold text-white uppercase tracking-wider border border-blue-400/30 transition-all duration-300 group-hover:bg-blue-600">
                      {img.category || 'Featured'}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/90 text-blue-900 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-400 shadow-md">
                      <Maximize2 className="w-5 h-5 text-blue-700" />
                    </div>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="text-lg font-extrabold text-white group-hover:text-blue-100 transition-colors duration-300 line-clamp-1">
                      {img.title}
                    </h3>
                    <p className="text-xs text-blue-200/80 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400">{img.uploadedAt}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <LightboxModal
          image={selectedImage}
          images={images}
          onClose={() => setSelectedImage(null)}
          onSelectImage={(img) => setSelectedImage(img)}
        />

      </div>
    </section>
  );
}
