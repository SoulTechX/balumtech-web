"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface GalleryViewerProps {
  mainImage: string;
  images: string[];
  altText: string;
  gradient: string;
}

export default function GalleryViewer({ mainImage, images, altText, gradient }: GalleryViewerProps) {
  // Merge: si hay galería, la usamos; si no, solo la imagen principal
  const allImages = images && images.length > 0 ? images : mainImage ? [mainImage] : [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (allImages.length === 0) {
    return (
      <div className={`glass-panel rounded-3xl flex items-center justify-center min-h-[380px] border border-white/5 bg-gradient-to-br ${gradient}`}>
        <span className="text-zinc-600 font-mono text-sm">Sin imagen</span>
      </div>
    );
  }

  const prev = () => setActive(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActive(i => (i + 1) % allImages.length);

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 p-2 rounded-xl transition-colors z-10">
            <X size={24} />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <img
            src={allImages[active]}
            alt={altText}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl"
            onClick={e => e.stopPropagation()}
          />
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActive(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-white w-5" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* Imagen principal */}
        <div
          className={`glass-panel rounded-3xl relative overflow-hidden min-h-[360px] group border border-white/5 bg-gradient-to-br ${gradient} cursor-zoom-in`}
          onClick={() => setLightbox(true)}
        >
          <img
            src={allImages[active]}
            alt={altText}
            className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
          {/* Zoom hint */}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white/60 group-hover:text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
            <ZoomIn size={16} />
          </div>
          {/* Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white/70 text-xs font-mono px-2.5 py-1 rounded-lg">
              {active + 1} / {allImages.length}
            </div>
          )}
          {/* Arrows on hover */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md hover:bg-black/80 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md hover:bg-black/80 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allImages.map((url, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  i === active
                    ? "border-blue-500 scale-105 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
