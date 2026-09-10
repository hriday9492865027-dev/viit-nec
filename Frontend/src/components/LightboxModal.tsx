import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { GalleryImage } from '@/types';

interface LightboxModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  initialPhotoIndex?: number;
  onClose: () => void;
  onSelectImage: (img: GalleryImage, initialPhotoIndex?: number) => void;
}

export default function LightboxModal({
  image,
  images,
  initialPhotoIndex = 0,
  onClose,
  onSelectImage,
}: LightboxModalProps) {
  const [subPhotoIndex, setSubPhotoIndex] = useState(initialPhotoIndex);

  // Sync subPhotoIndex when image changes
  useEffect(() => {
    setSubPhotoIndex(initialPhotoIndex);
  }, [image, initialPhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, images, subPhotoIndex]);

  if (!image) return null;

  const currentCardPhotos = (image.images && image.images.length > 0) ? image.images : [image.url];
  const isMultiPhoto = currentCardPhotos.length > 1;
  const currentCardIndex = images.findIndex((img) => img.id === image.id);

  const handleNext = () => {
    if (isMultiPhoto && subPhotoIndex < currentCardPhotos.length - 1) {
      setSubPhotoIndex(prev => prev + 1);
    } else {
      // Go to next card
      const nextCardIndex = currentCardIndex < images.length - 1 ? currentCardIndex + 1 : 0;
      onSelectImage(images[nextCardIndex], 0);
      setSubPhotoIndex(0);
    }
  };

  const handlePrev = () => {
    if (isMultiPhoto && subPhotoIndex > 0) {
      setSubPhotoIndex(prev => prev - 1);
    } else {
      // Go to prev card
      const prevCardIndex = currentCardIndex > 0 ? currentCardIndex - 1 : images.length - 1;
      const prevPhotos = (images[prevCardIndex].images && images[prevCardIndex].images!.length > 0)
        ? images[prevCardIndex].images!
        : [images[prevCardIndex].url];
      onSelectImage(images[prevCardIndex], prevPhotos.length - 1);
      setSubPhotoIndex(prevPhotos.length - 1);
    }
  };

  const currentPhotoUrl = currentCardPhotos[subPhotoIndex] || image.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition-colors z-50 border border-slate-700 shadow-lg cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      {(images.length > 1 || isMultiPhoto) && (
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-6 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all z-50 border border-slate-700 shadow-xl hover:scale-110 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {(images.length > 1 || isMultiPhoto) && (
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-6 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all z-50 border border-slate-700 shadow-xl hover:scale-110 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Main Content */}
      <div className="max-w-5xl w-full flex flex-col items-center">
        {/* Large Image Frame */}
        <div className="relative max-h-[70vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950">
          <img
            src={currentPhotoUrl}
            alt={`${image.title} - Photo ${subPhotoIndex + 1}`}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl"
          />

          {isMultiPhoto && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30 text-xs font-black flex items-center gap-1.5 shadow-md">
              <Layers className="w-3.5 h-3.5" />
              <span>Card {subPhotoIndex + 1} of {currentCardPhotos.length}</span>
            </div>
          )}
        </div>

        {/* Multi-Photo Thumbnail Bar if card deck has multiple photos */}
        {isMultiPhoto && (
          <div className="flex items-center gap-2 mt-4 overflow-x-auto py-1 max-w-full px-2">
            {currentCardPhotos.map((photoUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSubPhotoIndex(idx)}
                className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  idx === subPhotoIndex
                    ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/40'
                    : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                }`}
              >
                <img src={photoUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Details & Info */}
        <div className="mt-3 text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600/25 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
              {image.category || 'Event Gallery'}
            </span>
            {isMultiPhoto && (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
                Multi-Card Album ({currentCardPhotos.length} Photos)
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{image.title}</h3>
          <p className="text-xs text-slate-400 font-mono">Date: {image.uploadedAt}</p>
        </div>
      </div>

    </div>
  );
}
