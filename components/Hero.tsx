"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Split text into chars for GSAP masking
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ willChange: "transform" }}
          aria-hidden
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=90",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=90",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=90",
];

export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null);
  const bgRef     = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 600], [0, 120]);
  const textY  = useTransform(scrollY, [0, 400], [0, -60]);
  const fadeOut = useTransform(scrollY, [0, 350], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Headline chars reveal
      tl.fromTo(
        ".split-char",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: { each: 0.015, from: "start" },
        }
      );

      // Sub-text + CTA fade up
      tl.fromTo(
        [subRef.current, ctaRef.current, statsRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 },
        "-=0.3"
      );

      // Parallax bg via ScrollTrigger
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-[#111]"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src={HERO_IMAGES[0]}
          alt="Shiyarah Weddings — Tamil Wedding Photography Chennai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/85 via-[#111]/30 to-[#111]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111]/40 via-transparent to-transparent" />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay z-[1]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: fadeOut }}
        className="relative z-10 container-editorial w-full pb-20 pt-[var(--nav-height)]"
      >
        {/* Label */}
        <div className="tag text-white/60 mb-8">
          Chennai · Est. 2019
        </div>

        {/* Main headline */}
        <div className="overflow-hidden mb-8">
          <h1
            ref={headRef}
            className="font-editorial text-white leading-none"
            style={{
              fontFamily: "var(--font-editorial, Georgia, serif)",
              fontSize: "clamp(3.5rem, 11vw, 12rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            <div className="overflow-hidden">
              <SplitText text="MEMORIES" />
            </div>
            <div className="overflow-hidden flex items-baseline gap-4 sm:gap-8">
              <SplitText text="YOU CAN" />
              <span className="font-editorial italic text-white/40" style={{ fontFamily: "var(--font-editorial,Georgia,serif)", fontSize: "0.55em" }}>
                feel.
              </span>
            </div>
          </h1>
        </div>

        {/* Sub-text */}
        <p
          ref={subRef}
          className="text-white/60 text-base sm:text-lg max-w-sm leading-relaxed mb-10 font-light opacity-0"
        >
          Cinematic wedding photography & films for couples who want more than just photos — they want art.
        </p>

        {/* CTA row */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-5 mb-16 opacity-0">
          <Link href="/portfolio" className="btn-primary">
            View Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/book" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white/5">
            Book Session
          </Link>
          <a
            href="https://wa.me/917200735915"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L0 24l6.335-1.503A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.007-1.365l-.359-.214-3.732.884.948-3.643-.235-.374A9.775 9.775 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Floating stats row */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl opacity-0">
          {[
            { n: "800+",  l: "Couples" },
            { n: "400+",  l: "Weddings" },
            { n: "6+",    l: "Years" },
            { n: "4.9★",  l: "Google" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-white font-editorial stat-number" style={{ fontFamily: "var(--font-editorial,Georgia,serif)", fontSize: "clamp(1.75rem,3.5vw,2.5rem)", letterSpacing: "-0.03em" }}>
                {s.n}
              </div>
              <div className="text-white/45 text-label mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-[var(--gutter)] z-10 flex flex-col items-center gap-2"
      >
        <div className="text-label text-white/40" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Scroll
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
