import React, { useState } from 'react';
import { GalleryImage } from '@/types';
import { Star, ChevronLeft, ChevronRight, Layers, Maximize2, Trash2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface GalleryCardProps {
  img: GalleryImage;
  index?: number;
  onClick: (img: GalleryImage, photoIndex?: number) => void;
  isAdmin?: boolean;
  onToggleFeatured?: (id: string, current: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function GalleryCard({
  img,
  index = 0,
  onClick,
  isAdmin = false,
  onToggleFeatured,
  onDelete,
}: GalleryCardProps) {
  const { isVisible, ref } = useScrollAnimation(0.05);
  
  // Normalise photo list: use img.images if available and has items, else [img.url]
  const photoList = (img.images && img.images.length > 0) ? img.images : [img.url];
  const isMultiCard = photoList.length > 1;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : photoList.length - 1));
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev < photoList.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setActiveCardIndex(idx);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative select-none transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      {/* ── Visual Card Deck Effect for Multiple Photos ── */}
      {isMultiCard && (
        <>
          {/* Back Card 2 (Bottom layer, tilted slightly right) */}
          <div
            className="absolute inset-0 rounded-2xl bg-amber-100/70 border border-slate-300/80 shadow-xs pointer-events-none transform rotate-3 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:rotate-4"
            aria-hidden="true"
          />
          {/* Back Card 1 (Middle layer, tilted slightly left) */}
          <div
            className="absolute inset-0 rounded-2xl bg-blue-100/80 border border-slate-300/90 shadow-xs pointer-events-none transform -rotate-2 -translate-x-1.5 translate-y-1 transition-transform duration-300 group-hover:-rotate-3"
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Main Front Card ── */}
      <div
        onClick={() => onClick(img, activeCardIndex)}
        className={`group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-slate-200/90 bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isMultiCard ? 'z-10 ring-1 ring-black/5' : ''
        }`}
      >
        {/* Active Photo */}
        <img
          src={photoList[activeCardIndex]}
          alt={`${img.title} (Photo ${activeCardIndex + 1})`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/40 opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

        {/* Top Header Information & Multi-Card Badge */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-20 pointer-events-none">
          {/* Category Tag & Event Code Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-blue-700/90 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-white border border-blue-400/30 shadow-xs">
              {img.category || 'Event'}
            </span>
            {img.eventCode && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-black tracking-wider uppercase shadow-xs border border-amber-300">
                #{img.eventCode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Multi-Card Indicator Badge */}
            {isMultiCard && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/95 backdrop-blur-md text-slate-950 text-[11px] font-black shadow-md border border-amber-300">
                <Layers className="w-3 h-3 text-slate-950" />
                <span>{activeCardIndex + 1}/{photoList.length} Cards</span>
              </span>
            )}

            {/* Featured Star Badge (in public view) */}
            {!isAdmin && img.isFeatured && (
              <span className="p-1.5 rounded-full bg-amber-400 text-slate-900 shadow-md" title="Featured Photo">
                <Star className="w-3.5 h-3.5 fill-slate-900" />
              </span>
            )}

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex items-center gap-1">
                {onToggleFeatured && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFeatured(img.id, img.isFeatured);
                    }}
                    className={`p-1.5 rounded-lg border transition-all ${
                      img.isFeatured
                        ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                        : 'bg-black/50 text-white hover:bg-black/75 border-white/20'
                    }`}
                    title={img.isFeatured ? 'Featured (Click to unfeature)' : 'Not Featured (Click to feature)'}
                  >
                    <Star className={`w-3.5 h-3.5 ${img.isFeatured ? 'fill-slate-900' : ''}`} />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(img.id);
                    }}
                    className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white border border-red-500/30 transition-all shadow-xs"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Interactive Card Stack Controls: Flip Arrows (Left & Right) */}
        {isMultiCard && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
            <button
              type="button"
              onClick={handlePrevCard}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs border border-white/25 pointer-events-auto transition-all transform -translate-x-1 group-hover:translate-x-0 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md"
              title="Previous Photo Card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextCard}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs border border-white/25 pointer-events-auto transition-all transform translate-x-1 group-hover:translate-x-0 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md"
              title="Next Photo Card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Bar: Title, Date & Card Stack Dots */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex flex-col gap-2">
          {/* Multi-Card Dot Pagination */}
          {isMultiCard && (
            <div className="flex items-center gap-1.5 justify-center py-1">
              {photoList.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => handleDotClick(e, i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeCardIndex
                      ? 'w-6 bg-amber-400 shadow-xs'
                      : 'w-1.5 bg-white/50 hover:bg-white/90'
                  }`}
                  title={`View Card ${i + 1}`}
                />
              ))}
            </div>
          )}

          <div className="flex items-end justify-between">
            <div className="flex-1 pr-2">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition-colors line-clamp-1 drop-shadow-xs">
                {img.title}
              </h3>
              <p className="text-[11px] text-blue-200/80 font-mono mt-0.5">
                {img.uploadedAt}
                {isMultiCard && ` · ${photoList.length} Photos in Card Deck`}
              </p>
            </div>

            <div className="shrink-0 p-1.5 rounded-lg bg-white/10 group-hover:bg-white/25 backdrop-blur-xs text-white/80 group-hover:text-white transition-all">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
