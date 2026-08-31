import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LightboxModal from '@/components/LightboxModal';
import { GalleryImage } from '@/types';
import { ArrowLeft, Expand, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/* Team Memories Photos */
const MEMORIES_PHOTOS = [
  { id: 'm1', url: '/team/m1.JPG', title: 'NEC E-Cell Team Memory 1' },
  { id: 'm2', url: '/team/m2.JPG', title: 'NEC E-Cell Team Memory 2' },
  { id: 'm3', url: '/team/m3.JPG', title: 'NEC E-Cell Team Memory 3' },
  { id: 'm4', url: '/team/m4.JPG', title: 'NEC E-Cell Team Memory 4' },
  { id: 'm5', url: '/team/m5.JPG', title: 'NEC E-Cell Team Memory 5' },
  { id: 'm6', url: '/team/m6.JPG', title: 'NEC E-Cell Team Memory 6' },
];

function MemoryCard({ photo, index, onClick }: { photo: typeof MEMORIES_PHOTOS[0]; index: number; onClick: () => void }) {
  const { isVisible, ref } = useScrollAnimation(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={onClick}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1.5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden bg-slate-900 aspect-[4/3]">
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-3 rounded-full bg-white/30 text-white backdrop-blur-md border border-white/40 shadow-lg">
            <Expand className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamMemoriesPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImage | null>(null);

  const galleryFormatImages: GalleryImage[] = MEMORIES_PHOTOS.map((p) => ({
    id: p.id,
    url: p.url,
    title: p.title,
    isFeatured: true,
    uploadedAt: '2026-07-31',
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans page-enter">
      <Navbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Navigation & Header */}
          <div className="space-y-4">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-xs font-black text-blue-700 hover:text-blue-900 uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Team Hierarchy
            </Link>

            <div className="border-b border-slate-200 pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-black text-blue-900 uppercase tracking-widest">
                <ImageIcon className="w-4 h-4 text-blue-700" />
                Team Gallery &amp; Memories
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Team <span className="gradient-text">Memories</span>
              </h1>
            </div>
          </div>

          {/* ====================================================
              FEATURED HERO PHOTO (Main_team.jpeg)
             ==================================================== */}
          <div className="space-y-4">
            <div 
              onClick={() => setSelectedPhoto({
                id: 'main-team',
                url: '/team/Main_team.jpeg',
                title: 'NEC E-Cell — Main Team Photo',
                isFeatured: true,
                uploadedAt: '2026-07-31'
              })}
              className="group relative rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 bg-white cursor-pointer"
            >
              <img
                src="/team/Main_team.jpeg"
                alt="NEC E-Cell Main Team"
                className="w-full h-auto max-h-[750px] object-contain rounded-3xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* ====================================================
              MEMORIES GALLERY (m1, m2, m3, m4, m5, m6)
             ==================================================== */}
          <div className="space-y-6 pt-4">
            <div className="border-t border-slate-200 pt-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900">
                Team Photos
              </h2>
              <span className="text-xs font-mono font-bold text-slate-400">6 Photos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEMORIES_PHOTOS.map((photo, index) => (
                <MemoryCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onClick={() => setSelectedPhoto({
                    id: photo.id,
                    url: photo.url,
                    title: photo.title,
                    isFeatured: true,
                    uploadedAt: '2026-07-31'
                  })}
                />
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          <LightboxModal
            image={selectedPhoto}
            images={[
              {
                id: 'main-team',
                url: '/team/Main_team.jpeg',
                title: 'NEC E-Cell — Main Team Photo',
                isFeatured: true,
                uploadedAt: '2026-07-31'
              },
              ...galleryFormatImages
            ]}
            onClose={() => setSelectedPhoto(null)}
            onSelectImage={setSelectedPhoto}
          />

        </div>
      </main>

      <Footer />
    </div>
  );
}
