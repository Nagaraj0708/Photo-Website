"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Meet",
    description:
      "A conversation over coffee — virtual or in person. We learn your story, your vision, and what matters most.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Locations, lighting scouting, wardrobe direction, shot lists. Every detail crafted before we ever pick up the camera.",
  },
  {
    number: "03",
    title: "Capture",
    description:
      "The day itself. Unobtrusive, present, always watching for the real moments between the posed ones.",
  },
  {
    number: "04",
    title: "Create",
    description:
      "2–3 weeks of editing. Color grading, retouching, narrative sequencing. This is where good becomes extraordinary.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "A private online gallery, USB keepsake, and optionally a hand-crafted heirloom album printed in Italy.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
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
      id="process"
      className="bg-[#0E0E0E] section-pad overflow-hidden"
      aria-label="Our process"
    >
      <div className="container-lumina">
        {/* Header */}
        <div className="mb-20">
          <div className="text-label text-white/30 mb-5">THE EXPERIENCE</div>
          <TextReveal
            as="h2"
            delay={0.1}
            className="font-display text-white"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.0,
            } as React.CSSProperties}
          >
            From first hello to final frame.
          </TextReveal>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 divide-y sm:divide-y-0 md:divide-x divide-white/10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="process-step relative px-0 md:px-8 py-8 md:py-0 first:pl-0 last:pr-0 sm:px-6"
              style={{ opacity: 0 }}
            >
              {/* Background number */}
              <div
                className="absolute top-0 right-2 font-display leading-none select-none pointer-events-none"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(72px, 8vw, 96px)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.05)",
                }}
                aria-hidden
              >
                {step.number}
              </div>

              {/* Step number label */}
              <div className="text-label text-white/30 mb-6">{step.number}</div>

              {/* Title */}
              <h3
                className="text-white mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-white/60"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
