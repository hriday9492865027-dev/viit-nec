'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import { GalleryImage } from '@/types';
import { ArrowLeft, Star, Maximize2, Settings } from 'lucide-react';

export default function DedicatedGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, [showOnlyFeatured]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const url = showOnlyFeatured ? '/api/gallery?featured=true' : '/api/gallery';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-950">
                NEC E-Cell Photo Archive
              </h1>
              <p className="text-slate-600 text-sm sm:text-base font-normal">
                Explore our full repository of pitch competitions, workshops, summits, and campus events.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  showOnlyFeatured
                    ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <Star className={`w-4 h-4 ${showOnlyFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                {showOnlyFeatured ? 'Showing Featured Only' : 'Show Featured Only'}
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <Settings className="w-4 h-4" /> Admin Upload
              </Link>
            </div>
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-64 bg-slate-100 rounded-2xl" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <p className="text-slate-600">No images found matching your filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="card-tech group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 text-white">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-blue-700/90 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider border border-blue-400/30">
                        {img.category || 'General'}
                      </span>
                      {img.isFeatured && (
                        <span className="p-1.5 rounded-full bg-amber-400 text-slate-900 shadow-md">
                          <Star className="w-3.5 h-3.5 fill-slate-900" />
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-200 transition-colors line-clamp-1">
                        {img.title}
                      </h3>
                      <p className="text-xs text-blue-200/80 font-mono mt-0.5">{img.uploadedAt}</p>
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
      </main>

      <Footer />
    </div>
  );
}
