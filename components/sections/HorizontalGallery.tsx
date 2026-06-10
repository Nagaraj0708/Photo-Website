"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    num: "01",
    category: "WEDDINGS",
    tagline: "Where two worlds become one",
    href: "/portfolio",
    frames: "124 frames",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=95",
  },
  {
    num: "02",
    category: "RECEPTIONS",
    tagline: "The night the world celebrated you",
    href: "/portfolio",
    frames: "98 frames",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=95",
  },
  {
    num: "03",
    category: "PRE-WEDDING",
    tagline: "Before the forever begins",
    href: "/portfolio",
    frames: "86 frames",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1920&q=95",
  },
  {
    num: "04",
    category: "MATERNITY",
    tagline: "A universe growing within",
    href: "/portfolio",
    frames: "62 frames",
    image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1920&q=95",
  },
  {
    num: "05",
    category: "NEWBORNS",
    tagline: "The first chapter",
    href: "/portfolio",
    frames: "74 frames",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1920&q=95",
  },
];

export default function HorizontalGallery() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalPanels = panels.length;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (totalPanels - 1));
            setActiveIdx(idx);
          },
          invalidateOnRefresh: true,
        },
      });

      // Animate each category name as its panel enters
      panels.forEach((_, i) => {
        const panelEl = track.children[i] as HTMLElement;
        const catEl = panelEl.querySelector(".panel-category");
        if (!catEl) return;

        gsap.fromTo(
          catEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: () => `+=${(track.scrollWidth / totalPanels) * i * 0.8}`,
              toggleActions: "play none none reverse",
              scrub: false,
              containerAnimation: tween,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: plain vertical scroll
  if (isMobile) {
    return (
      <section
        id="gallery"
        className="bg-[#0E0E0E]"
        aria-label="Portfolio gallery"
      >
        {panels.map((panel) => (
          <div
            key={panel.num}
            className="relative overflow-hidden"
            style={{ height: "75vw", minHeight: 300 }}
          >
            <Image
              src={panel.image}
              alt={panel.category}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-label text-[#C8A96E] mb-2">{panel.num}</div>
              <div
                className="font-display text-white italic mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 7vw, 56px)",
                  fontWeight: 400,
                }}
              >
                {panel.category}
              </div>
              <p className="text-white/60 text-sm mb-4">{panel.tagline}</p>
              <Link href={panel.href} className="text-label text-white hover:text-[#C8A96E] transition-colors">
                Explore →
              </Link>
            </div>
            <div className="absolute bottom-8 right-8 text-label text-white/40">{panel.frames}</div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden bg-[#0E0E0E]"
      style={{ height: "100vh" }}
      aria-label="Portfolio gallery — horizontal scroll"
    >
      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="horizontal-scroll-track"
        style={{ height: "100%", width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, i) => (
          <div
            key={panel.num}
            className="relative overflow-hidden"
            style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
          >
            {/* Background image with subtle parallax via transform */}
            <Image
              src={panel.image}
              alt={panel.category}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/80 via-[#0E0E0E]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/30 via-transparent to-transparent" />

            {/* Bottom-left text block */}
            <div className="absolute bottom-0 left-0 p-16 pb-20" style={{ maxWidth: "55vw" }}>
              <div className="text-label text-[#C8A96E] mb-4">{panel.num}</div>
              <div
                className="panel-category font-display text-white italic leading-none mb-4"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(48px, 6vw, 96px)",
                  fontWeight: 400,
                  opacity: 0,
                }}
              >
                {panel.category}
              </div>
              <p
                className="text-white/60 mb-6"
                style={{ fontWeight: 300, fontSize: 16 }}
              >
                {panel.tagline}
              </p>
              <Link
                href={panel.href}
                className="text-label text-white hover:text-[#C8A96E] transition-colors inline-flex items-center gap-2 group"
              >
                Explore
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Bottom-right frame count */}
            <div className="absolute bottom-20 right-16">
              <span
                className="px-4 py-2 border border-white/20 text-white/50"
                style={{ fontSize: 11, letterSpacing: "0.15em" }}
              >
                {panel.frames}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
        role="tablist"
        aria-label="Gallery navigation"
      >
        {panels.map((p, i) => (
          <button
            key={p.num}
            role="tab"
            aria-selected={i === activeIdx}
            aria-label={`Panel ${i + 1}: ${p.category}`}
            className="transition-all duration-300"
            style={{
              width: i === activeIdx ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeIdx ? "#C8A96E" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
