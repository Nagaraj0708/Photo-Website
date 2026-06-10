"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { studioInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Hero images — split into left and right panels
const LEFT_IMAGE  = "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=90";
const RIGHT_IMAGE = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=90";

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const tagRef       = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const line3Ref     = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Panels slide in from edges
      tl.fromTo(leftRef.current,  { x: "-8%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1.4 }, 0);
      tl.fromTo(rightRef.current, { x: "8%",  opacity: 0 }, { x: "0%", opacity: 1, duration: 1.4 }, 0);
      // Vertical divider
      tl.fromTo(dividerRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, 0.6);
      // Tag
      tl.fromTo(tagRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.9);
      // Headline lines stagger
      tl.fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
        { y: "100%", opacity: 0 },
        { y: "0%",   opacity: 1, stagger: 0.12, duration: 0.9 }, 1.0);
      // Meta row
      tl.fromTo(metaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.5);
      // CTAs
      tl.fromTo(ctaRef.current?.children ?? [],
        { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, 1.7);
      // Scroll indicator
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.0);

      // Scroll bounce
      gsap.to(scrollRef.current, { y: -6, repeat: -1, yoyo: true, duration: 1.4, ease: "sine.inOut", delay: 2.5 });

      // Slow parallax on both image panels
      [leftRef.current, rightRef.current].forEach((el) => {
        gsap.to(el?.querySelector("img") ?? el, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden bg-[#0E0E0E]"
      style={{ minHeight: "100svh" }}
      aria-label="Hero — Shiyarah Weddings"
    >
      {/* ── Split background panels ── */}
      <div className="absolute inset-0 flex">
        {/* Left panel */}
        <div ref={leftRef} className="relative w-1/2 overflow-hidden" style={{ opacity: 0 }}>
          <Image src={LEFT_IMAGE} alt="Wedding photography" fill sizes="50vw" className="object-cover scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/70 via-[#0E0E0E]/40 to-[#0E0E0E]/60" />
        </div>
        {/* Right panel */}
        <div ref={rightRef} className="relative w-1/2 overflow-hidden" style={{ opacity: 0 }}>
          <Image src={RIGHT_IMAGE} alt="Pre-wedding photography" fill sizes="50vw" className="object-cover scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0E0E0E]/70 via-[#0E0E0E]/40 to-[#0E0E0E]/60" />
        </div>
        {/* Center vertical divider */}
        <div
          ref={dividerRef}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-white/15"
          style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
        />
        {/* Film grain overlay */}
        <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" aria-hidden />
      </div>

      {/* ── Content overlay ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-end container-lumina w-full"
        style={{ minHeight: "100svh", paddingBottom: "clamp(3rem,8vh,6rem)", paddingTop: "var(--nav-height)" }}
      >
        {/* Top-left tag */}
        <div ref={tagRef} className="absolute top-[calc(var(--nav-height)+2rem)] left-[var(--gutter)] opacity-0">
          <span className="text-label text-[#C8A96E]">EST. 2019 · CHENNAI, TAMIL NADU</span>
        </div>

        {/* Top-right stat pill */}
        <div className="absolute top-[calc(var(--nav-height)+2rem)] right-[var(--gutter)] hidden md:flex items-center gap-3 opacity-0"
          style={{ animation: "none" }} ref={undefined}>
          <div className="flex items-center gap-2 px-4 py-2 border border-white/15 backdrop-blur-sm bg-white/5">
            <span className="text-white/80 text-xs tracking-widest">4.9★</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-white/50 text-xs tracking-widest">800+ COUPLES</span>
          </div>
        </div>

        {/* Main headline */}
        <div className="mb-8">
          {/* Overflow hidden wrappers for reveal animation */}
          <div className="overflow-hidden mb-1">
            <div ref={line1Ref} className="font-display text-white" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3.5rem,8vw,10rem)", fontWeight:400, lineHeight:0.88, letterSpacing:"-0.03em", opacity:0 }}>
              SHIYARAH
            </div>
          </div>
          <div className="overflow-hidden mb-1">
            <div ref={line2Ref} className="font-display text-white/90" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3.5rem,8vw,10rem)", fontWeight:400, lineHeight:0.88, letterSpacing:"-0.03em", fontStyle:"italic", marginLeft:"clamp(0px,4vw,64px)", opacity:0 }}>
              Weddings
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line3Ref} className="font-display" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3.5rem,8vw,10rem)", fontWeight:400, lineHeight:0.88, letterSpacing:"-0.03em", color:"transparent", WebkitTextStroke:"1px rgba(255,255,255,0.25)", marginLeft:"clamp(0px,8vw,128px)", opacity:0 }}>
              Chennai
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div ref={metaRef} className="flex flex-wrap items-center gap-6 mb-10 opacity-0">
          <p className="text-white/50 max-w-xs text-sm leading-relaxed" style={{ fontWeight:300 }}>
            Award-winning photography &amp; cinema by <span className="text-white/80">Aslam</span> — crafted frame by frame.
          </p>
          <div className="hidden sm:flex items-center gap-5 text-white/30 text-xs tracking-widest">
            {["Weddings","Pre-Wedding","Maternity","Events"].map((s, i) => (
              <span key={s} className="flex items-center gap-5">
                {i > 0 && <span className="w-px h-3 bg-white/20" />}
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 px-7 py-4 bg-white text-[#0E0E0E] text-[0.8rem] font-semibold tracking-[0.08em] uppercase transition-all hover:bg-[#C8A96E]"
            data-cursor-label="View Work"
          >
            View Our Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={studioInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 border border-white/25 text-white text-[0.8rem] font-semibold tracking-[0.08em] uppercase hover:border-white/60 transition-colors"
            data-cursor-label="WhatsApp"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/0 to-white/40" />
        <span className="text-label text-white/30 rotate-90 mt-1" style={{ fontSize:"9px" }}>SCROLL</span>
      </div>

      {/* ── Bottom stats bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/8 hidden lg:flex">
        {[
          { value:"800+", label:"Happy Couples" },
          { value:"400+", label:"Weddings Shot" },
          { value:"6+",   label:"Years Active"  },
          { value:"4.9★", label:"Google Rating" },
        ].map((s, i) => (
          <div key={s.label} className="flex-1 flex items-center justify-center gap-3 py-4 border-r border-white/8 last:border-r-0">
            <span className="text-white font-display text-xl" style={{ fontFamily:"'Playfair Display',serif", fontWeight:400 }}>{s.value}</span>
            <span className="text-white/30 text-xs tracking-widest uppercase">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
