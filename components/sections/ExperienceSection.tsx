"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Meet",
    sub: "A relaxed discovery call — we listen to your vision, share our process, and ensure we're the perfect match.",
    detail: "30-min call, no pressure",
  },
  {
    num: "02",
    title: "Plan",
    sub: "We scout locations, build your shot-list, and align on the cinematic style that fits your story.",
    detail: "Pre-session consultation",
  },
  {
    num: "03",
    title: "Capture",
    sub: "On the day, we blend into the background — only appearing when we need to direct magic.",
    detail: "Full event coverage",
  },
  {
    num: "04",
    title: "Create",
    sub: "Expert colour grading, careful curation, and cinematic retouching — each image is a finished artwork.",
    detail: "7–14 day editing",
  },
  {
    num: "05",
    title: "Deliver",
    sub: "Your private gallery goes live. High-resolution downloads. Optional heirloom albums.",
    detail: "Secure online gallery",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated vertical progress line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );

      // Steps stagger in
      gsap.fromTo(
        ".exp-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pad bg-[#111] text-white overflow-hidden">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32">
            <div className="tag text-white/40 mb-6">The Experience</div>
            <h2
              className="font-editorial text-white mb-8"
              style={{
                fontFamily: "var(--font-editorial,Georgia,serif)",
                fontSize: "clamp(2.5rem,5vw,5.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              How We
              <br />
              <em className="italic text-white/40">Work</em>
            </h2>
            <p className="text-white/50 text-[0.9375rem] leading-relaxed max-w-sm">
              From first call to gallery delivery, every step is designed to be effortless and memorable.
            </p>

            {/* Decorative image */}
            <div className="mt-12 relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80"
                alt="Behind the scenes"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent" />
              <div className="absolute bottom-5 left-5 text-label text-white/60">
                Behind the lens
              </div>
            </div>
          </div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10">
              <div ref={lineRef} className="absolute inset-0 bg-white/40 origin-top" />
            </div>

            <div className="space-y-12">
              {steps.map((s, i) => (
                <div key={s.num} className="exp-step relative pl-16 opacity-0">
                  {/* Dot */}
                  <div className="absolute left-[16px] top-1 w-2 h-2 rounded-full bg-[#1A73E8] border-2 border-[#111]" />
                  
                  <div className="text-label text-white/30 mb-3">{s.num}</div>
                  <h3
                    className="font-editorial text-white mb-3"
                    style={{
                      fontFamily: "var(--font-editorial,Georgia,serif)",
                      fontSize: "clamp(1.5rem,3vw,2.5rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{s.sub}</p>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/10 text-white/40 text-[0.65rem] font-medium tracking-wide">
                    {s.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
