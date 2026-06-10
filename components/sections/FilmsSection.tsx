"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import ImageReveal from "@/components/ui/ImageReveal";

const featuredFilm = {
  id: "f0",
  thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&q=80",
  title: "Priya & Arjun",
  venue: "The Leela Palace · Bengaluru",
  year: "2024",
  duration: "5:34",
  // Cinematic wedding highlight reel — "Our Beautiful Wedding" by Junebug Weddings
  videoUrl: "https://www.youtube.com/embed/6FBFxKFBCns",
};

const reelFilms = [
  {
    id: "f1",
    thumb: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&q=80",
    title: "Riya & Karan",
    venue: "ITC Windsor, Bengaluru",
    duration: "5:42",
    year: "2024",
    // Beautiful Indian wedding cinematic film
    videoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
  },
  {
    id: "f2",
    thumb: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80",
    title: "Meera & Vikram",
    venue: "Taj West End, Bengaluru",
    duration: "4:18",
    year: "2023",
    // Award-winning wedding film
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
  },
  {
    id: "f3",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    title: "Ananya & Dev",
    venue: "Falaknuma Palace, Hyderabad",
    duration: "6:05",
    year: "2023",
    // Cinematic wedding reel
    videoUrl: "https://www.youtube.com/embed/ZbZSe6N_BXs",
  },
];

export default function FilmsSection() {
  const [activeFilm, setActiveFilm] = useState<typeof featuredFilm | null>(null);

  return (
    <>
      <section
        id="films"
        className="bg-[#F8F7F4] section-pad"
        aria-label="Cinematic films"
      >
        <div className="container-lumina">
          {/* Header */}
          <div className="mb-14">
            <div className="text-label text-[#6B6B6B] mb-5">CINEMATIC FILMS</div>
            <TextReveal
              as="h2"
              delay={0.1}
              className="font-display text-[#0E0E0E] mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.0,
              } as React.CSSProperties}
            >
              Still photography isn&apos;t enough.
            </TextReveal>
            <p
              className="text-[#6B6B6B] max-w-lg"
              style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}
            >
              We create cinematic short films of your day — 4–6 minute masterpieces set to music that moves you.
            </p>
          </div>

          {/* Featured film */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative overflow-hidden mb-8 group cursor-pointer"
            style={{ aspectRatio: "16/9" }}
            onClick={() => setActiveFilm(featuredFilm)}
            role="button"
            tabIndex={0}
            aria-label={`Play film: ${featuredFilm.title}`}
            onKeyDown={(e) => e.key === "Enter" && setActiveFilm(featuredFilm)}
          >
            <Image
              src={featuredFilm.thumb}
              alt={featuredFilm.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-[filter] duration-500 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/70 via-[#0E0E0E]/20 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="play-btn"
                style={{
                  transform: "scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.76,0,0.24,1)",
                }}
              >
                <Play className="w-7 h-7 text-white fill-white ml-1" aria-hidden />
              </div>
            </div>

            {/* Metadata */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <p className="text-white/50 text-sm mb-2">
                {featuredFilm.venue} · {featuredFilm.year}
              </p>
              <h3
                className="font-display text-white"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 48px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                {featuredFilm.title}
              </h3>
            </div>
          </motion.div>

          {/* Film reel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reelFilms.map((film, i) => (
              <motion.div
                key={film.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
              >
                <button
                  className="group w-full text-left"
                  onClick={() => setActiveFilm(film)}
                  aria-label={`Play film: ${film.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative mb-4 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <ImageReveal
                      src={film.thumb}
                      alt={film.title}
                      className="w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Play icon on hover */}
                    <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/30 transition-all duration-400 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-5 h-5 text-[#0E0E0E] fill-[#0E0E0E] ml-0.5" aria-hidden />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4
                        className="text-[#0E0E0E] mb-1"
                        style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em" }}
                      >
                        {film.title}
                      </h4>
                      <p className="text-[#6B6B6B]" style={{ fontSize: 13, fontWeight: 300 }}>
                        {film.venue}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-[#6B6B6B] shrink-0" style={{ fontSize: 12 }}>
                      <Clock className="w-3 h-3" aria-hidden />
                      {film.duration}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveFilm(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Film: ${activeFilm.title}`}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-5xl overflow-hidden bg-[#000]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveFilm(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative pt-[56.25%]">
                <iframe
                  src={`${activeFilm.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeFilm.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-display text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, fontStyle: "italic" }}
                >
                  {activeFilm.title}
                </h3>
                <p className="text-white/50 text-sm mt-1">{activeFilm.venue}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
