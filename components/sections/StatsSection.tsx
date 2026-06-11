"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: 847,
    suffix: "+",
    label: "Stories Told",
    description:
      "Families, couples, and individuals who trusted us with their most important days.",
  },
  {
    number: 12,
    suffix: " yrs",
    label: "Of Craft",
    description:
      "Over a decade refining our eye, our editing, and our understanding of light.",
  },
  {
    number: 23,
    suffix: "",
    label: "International Awards",
    description:
      "Recognised by WPJA, ISPWP, and Fearless Photographers.",
  },
  {
    number: 100,
    suffix: "%",
    label: "Would Return",
    description:
      "Every client surveyed said they'd book us again without hesitation.",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each number on enter
      stats.forEach((s, i) => {
        const el = numRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: s.number,
              duration: 2.0,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });

      // Stagger in the stat items
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-[#F8F7F4] section-pad overflow-hidden"
      aria-label="Studio statistics"
    >
      <div className="container-lumina">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: image with parallax — shown below stats on mobile */}
          <div className="relative overflow-hidden order-2 lg:order-1" style={{ aspectRatio: "4/5" }}>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80"
              alt="Lumina Studio — behind the lens"
              speed={0.25}
              className="w-full h-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: stats */}
          <div className="order-1 lg:order-2">
            <div className="text-label text-[#6B6B6B] mb-8">BY THE NUMBERS</div>
            <TextReveal
              as="h2"
              delay={0.1}
              className="font-display text-[#0E0E0E] mb-14"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.05,
              } as React.CSSProperties}
            >
              A decade of devotion to the craft.
            </TextReveal>

            <div className="grid grid-cols-2 gap-10">
              {stats.map((s, i) => (
                <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
                  {/* Number */}
                  <div
                    className="font-display leading-none mb-3 stat-number"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(48px, 5vw, 72px)",
                      fontWeight: 400,
                      color: "#C8A96E",
                      letterSpacing: "-0.03em",
                    }}
                    aria-label={`${s.number}${s.suffix} ${s.label}`}
                  >
                    <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
                    <span className="text-[#0E0E0E]">{s.suffix}</span>
                  </div>

                  {/* Label */}
                  <div
                    className="text-[#0E0E0E] mb-2"
                    style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}
                  >
                    {s.label}
                  </div>

                  {/* Description */}
                  <p
                    className="text-[#6B6B6B]"
                    style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65 }}
                  >
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
