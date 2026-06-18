'use client';

import { useState, useEffect, useCallback } from 'react';

interface EventGalleryProps {
  galleryImages: string[];
  eventTitle: string;
}

export default function EventGallery({ galleryImages, eventTitle }: EventGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (index === null) return;
    setIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
  }, [index, galleryImages.length]);

  const handleNext = useCallback(() => {
    if (index === null) return;
    setIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
  }, [index, galleryImages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [index, handlePrev, handleNext]
  );

  useEffect(() => {
    if (index !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [index, handleKeyDown]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {galleryImages.map((url, idx) => (
          <button
            key={url + idx}
            onClick={() => setIndex(idx)}
            className="block overflow-hidden rounded-xl aspect-[4/3] bg-[#f4f4f5] group relative focus:outline-none focus:ring-2 focus:ring-[#0080C7] focus:ring-offset-2"
          >
            <img
              src={url}
              alt={`${eventTitle} — photo ${idx + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {index !== null && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/90 backdrop-blur-md transition-all duration-300 p-4 select-none">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-white/80 max-w-5xl py-2 z-10">
            <span className="text-sm font-medium">
              {index + 1} / {galleryImages.length}
            </span>
            <button
              onClick={() => setIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center focus:outline-none"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Stage */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-between gap-4 py-4">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white focus:outline-none shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Central Image */}
            <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden">
              <img
                src={galleryImages[index]}
                alt={`${eventTitle} — large photo ${index + 1}`}
                className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ease-out transform"
              />
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white focus:outline-none shrink-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="w-full max-w-5xl overflow-x-auto pb-4 pt-2 shrink-0 z-10">
            <div className="flex gap-2.5 justify-center mx-auto w-max px-4">
              {galleryImages.map((url, idx) => (
                <button
                  key={url + '-thumb-' + idx}
                  onClick={() => setIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 focus:outline-none ${
                    idx === index ? 'border-[#0080C7] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={url} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
