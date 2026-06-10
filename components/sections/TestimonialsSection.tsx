"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const testimonials = [
  {
    id: 1,
    quote:
      "We've seen thousands of wedding photos. Nothing — and we mean nothing — comes close to what Lumina gave us. We cried when we opened the gallery.",
    name: "Priya & Arjun Mehta",
    context: "Married October 2024",
    avatar: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=200&q=80",
  },
  {
    id: 2,
    quote:
      "The way Lumina captured the light during our ceremony — I've never felt so seen in a photograph. It's not just a picture, it's a feeling preserved forever.",
    name: "Sneha & Rahul Kapoor",
    context: "Married March 2024",
    avatar: "https://images.unsplash.com/photo-1522169182878-9a01f346c3d1?w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Our maternity shoot was more than photos — it was an experience. Every image tells the story of who we were in that perfect, terrifying, beautiful moment.",
    name: "Deepika Rao",
    context: "Maternity, 2024",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
];

const secondary = [
  {
    id: 4,
    quote:
      "Our maternity shoot was more than photos — it was an experience. Harshitha made us feel so seen.",
    name: "Deepika Rao",
    context: "Maternity, 2024",
  },
  {
    id: 5,
    quote:
      "The film they created of our wedding day made my father cry. That alone was worth every rupee.",
    name: "Aditya Shenoy",
    context: "Wedding, 2023",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  // Auto-advance every 6s
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  };

  const handlePrev = () => { prev(); resetInterval(); };
  const handleNext = () => { next(); resetInterval(); };

  const active = testimonials[current];

  return (
    <section
      id="testimonials"
      className="bg-[#0E0E0E] section-pad"
      aria-label="Client testimonials"
    >
      <div className="container-lumina">
        {/* Header */}
        <div className="mb-16">
          <div className="text-label text-white/30 mb-5">CLIENT STORIES</div>
          <h2
            className="font-display text-white italic"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.0,
            }}
          >
            Heard from the heart.
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className="relative" style={{ minHeight: 280 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="max-w-4xl"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-8" aria-label="5 stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#C8A96E]" style={{ fontSize: 18 }} aria-hidden>
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-display text-white italic mb-8"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(22px, 2.8vw, 36px)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden shrink-0">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div
                    className="text-white"
                    style={{ fontSize: 15, fontWeight: 500 }}
                  >
                    — {active.name}
                  </div>
                  <div className="text-label text-white/40 mt-1">{active.context}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-12 mb-20">
          <MagneticButton
            onClick={handlePrev}
            className="w-12 h-12 border border-white/20 text-white hover:border-white/60 transition-colors flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            ←
          </MagneticButton>
          <div className="flex items-center gap-3" role="tablist">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => { setCurrent(i); resetInterval(); }}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? "#C8A96E" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <MagneticButton
            onClick={handleNext}
            className="w-12 h-12 border border-white/20 text-white hover:border-white/60 transition-colors flex items-center justify-center"
            aria-label="Next testimonial"
          >
            →
          </MagneticButton>
        </div>

        {/* Secondary testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/10">
          {secondary.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
            >
              <blockquote
                className="text-white/60 mb-5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <div className="text-white text-sm font-medium">{t.name}</div>
                <div className="text-label text-white/30 mt-1">{t.context}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
