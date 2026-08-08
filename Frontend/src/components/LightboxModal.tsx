import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/types';

interface LightboxModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onSelectImage: (img: GalleryImage) => void;
}

export default function LightboxModal({
  image,
  images,
  onClose,
  onSelectImage,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, images]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onSelectImage(images[currentIndex + 1]);
    } else {
      onSelectImage(images[0]); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectImage(images[currentIndex - 1]);
    } else {
      onSelectImage(images[images.length - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors z-50 border border-slate-700"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors z-50 border border-slate-700 hidden sm:flex"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors z-50 border border-slate-700 hidden sm:flex"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Main Content */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950">
          <img
            src={image.url}
            alt={image.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        <div className="mt-4 text-center space-y-1">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            {image.category || 'Event Gallery'}
          </span>
          <h3 className="text-xl font-bold text-white">{image.title}</h3>
          <p className="text-xs text-slate-400 font-mono">Uploaded: {image.uploadedAt}</p>
        </div>
      </div>

    </div>
  );
}
