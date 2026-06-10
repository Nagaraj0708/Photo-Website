"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioItem, PortfolioCategory } from "@/lib/types";

const categories: { value: PortfolioCategory; label: string }[] = [
  { value: "all",        label: "All Work"     },
  { value: "weddings",   label: "Weddings"     },
  { value: "reception",  label: "Reception"    },
  { value: "pre-wedding",label: "Pre-Wedding"  },
  { value: "maternity",  label: "Maternity"    },
  { value: "baby",       label: "Newborn"      },
  { value: "events",     label: "Events"       },
];

export default function Gallery({ items }: { items: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [lightboxIndex,  setLightboxIndex]  = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const openLightbox  = useCallback((i: number) => { setLightboxIndex(i); document.body.style.overflow = "hidden"; }, []);
  const closeLightbox = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = ""; }, []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0)), [filtered.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0)),                  [filtered.length]);

  return (
    <>
      {/* ── Category Filters ── */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200",
              activeCategory === cat.value
                ? "bg-[#0E0E0E] text-white"
                : "bg-white border border-[#EFEDE8] text-[#6B6B6B] hover:border-[#0E0E0E] hover:text-[#0E0E0E]"
            )}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#9CA3AF] self-center">
          {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
        </span>
      </div>

      {/* ── Masonry Grid ── */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => openLightbox(index)}
                className="group relative block w-full overflow-hidden bg-[#EFEDE8]"
              >
                <div className="relative" style={{ aspectRatio: `${item.width}/${item.height}` }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:640px)100vw,(max-width:1280px)50vw,25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/35 transition-all duration-400 flex items-end justify-between p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium tracking-wide">
                      {item.title}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {/* Featured dot */}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="w-2 h-2 rounded-full bg-[#C8A96E] block" />
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-[#9CA3AF] text-sm">No photos in this category yet.</div>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E0E0E]/96 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].image}
                alt={filtered[lightboxIndex].title}
                width={filtered[lightboxIndex].width * 2}
                height={filtered[lightboxIndex].height * 2}
                className="object-contain max-h-[85vh] w-auto mx-auto"
                priority
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1 pb-1">
                <span className="text-white/50 text-xs tracking-wide">{filtered[lightboxIndex].title}</span>
                <span className="text-white/30 text-xs">{lightboxIndex + 1} / {filtered.length}</span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
