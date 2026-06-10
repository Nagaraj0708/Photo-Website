"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { studioInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background image
      gsap.to(imgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ minHeight: "70vh" }}>
      {/* Full-bleed image with parallax */}
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85"
          alt="Book a session — Shiyarah Weddings"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#111]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111]/80 via-[#111]/40 to-transparent" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay z-[1]" />

      {/* Content */}
      <div className="relative z-10 container-editorial flex items-center" style={{ minHeight: "70vh", paddingBlock: "var(--section-pad)" }}>
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8] animate-pulse" />
              <span className="text-label text-white/50">Limited Dates in 2025</span>
            </div>

            {/* Headline */}
            <h2
              className="font-editorial text-white mb-6"
              style={{
                fontFamily: "var(--font-editorial, Georgia, serif)",
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Your Love Story
              <br />
              <em className="italic text-white/45">Deserves Forever.</em>
            </h2>

            <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md">
              Join 800+ couples across Tamil Nadu who trusted Shiyarah Weddings
              to turn their most precious day into art that lasts generations.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/book" className="btn-accent">
                Book a Session
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${studioInfo.phoneRaw}`}
                className="btn-outline border-white/25 text-white hover:border-white/60 hover:bg-white/5"
              >
                <Phone className="w-4 h-4" />
                {studioInfo.phone}
              </a>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              {[
                { n: "800+", l: "Couples" },
                { n: "4.9★", l: "Google" },
                { n: "6+",   l: "Years"   },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-white font-semibold text-lg leading-none">{s.n}</div>
                  <div className="text-white/40 text-[0.65rem] tracking-widest uppercase mt-0.5">{s.l}</div>
                </div>
              ))}
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <a
                href={studioInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-green-400 text-sm hover:text-green-300 transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.503A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.007-1.365l-.359-.214-3.732.884.948-3.643-.235-.374A9.775 9.775 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
