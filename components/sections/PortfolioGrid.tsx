"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageReveal from "@/components/ui/ImageReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

const ALL_PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    cat: "Weddings",
    span: "col-span-1 sm:col-span-2",
    aspect: "aspect-[16/10]",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    cat: "Pre-Wedding",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
    cat: "Portraits",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    cat: "Weddings",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    cat: "Weddings",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    cat: "Events",
    span: "col-span-1 sm:col-span-2",
    aspect: "aspect-[16/10]",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=700&q=80",
    cat: "Films",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80",
    cat: "Weddings",
    span: "col-span-1 sm:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80",
    cat: "Pre-Wedding",
    span: "col-span-1",
    aspect: "aspect-[3/4]",
  },
];

const FILTERS = ["All", "Weddings", "Films", "Portraits", "Events"];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter((p) => p.cat === activeFilter);

  return (
    <section
      id="work"
      className="bg-[#F8F7F4] section-pad"
      aria-label="Selected portfolio work"
    >
      <div className="container-lumina">
        {/* Header */}
        <div className="mb-14">
          <div className="text-label text-[#6B6B6B] mb-5">SELECTED WORK</div>
          <TextReveal
            as="h2"
            delay={0.1}
            className="font-display text-[#0E0E0E] mb-10"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.0,
            } as React.CSSProperties}
          >
            Every frame, a story.
          </TextReveal>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-8" role="tablist" aria-label="Portfolio filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className="relative text-[0.8125rem] font-medium tracking-wide transition-colors pb-1"
                style={{
                  color: activeFilter === f ? "#0E0E0E" : "#6B6B6B",
                }}
              >
                {f}
                {activeFilter === f && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#0E0E0E]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            style={{ gridAutoRows: "auto" }}
          >
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.06 }}
                className={`${photo.span} ${photo.aspect} relative group`}
                style={{
                  transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
              >
                <div className="w-full h-full overflow-hidden relative">
                  <ImageReveal
                    src={photo.src}
                    alt={`${photo.cat} photography by Lumina Studio`}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/30 transition-all duration-500 flex items-end p-5 pointer-events-none"
                    aria-hidden
                  >
                    <motion.span
                      className="text-label text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {photo.cat}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <MagneticButton
            className="px-10 py-4 border border-[#0E0E0E]/20 text-[#0E0E0E] text-[0.8125rem] font-medium tracking-[0.05em] uppercase hover:border-[#0E0E0E] hover:bg-[#0E0E0E]/3 transition-all"
            aria-label="Load more portfolio work"
          >
            Load More Work
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
