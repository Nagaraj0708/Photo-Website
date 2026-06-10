"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const col1Ref    = useRef<HTMLDivElement>(null);
  const col2Ref    = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rule draws in first
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Columns slide in from opposite sides
      gsap.fromTo(
        col1Ref.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: col1Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        col2Ref.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: col2Ref.current,
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
      id="manifesto"
      className="bg-[#F8F7F4] flex items-center justify-center"
      style={{ minHeight: "100vh", paddingBlock: "var(--section-pad)" }}
      aria-label="Our Philosophy"
    >
      <div className="container-lumina max-w-5xl mx-auto text-center">
        {/* Accent rule */}
        <div className="flex justify-center mb-8">
          <div
            ref={ruleRef}
            className="h-px bg-[#C8A96E]"
            style={{ width: 60, transform: "scaleX(0)", transformOrigin: "left center" }}
            aria-hidden
          />
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-label text-[#6B6B6B] mb-10"
        >
          OUR PHILOSOPHY
        </motion.div>

        {/* Editorial quote — word-by-word reveal */}
        <div
          className="font-display text-[#0E0E0E] mb-16 text-balance"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
          aria-label="We don't just photograph moments — we architect feelings."
        >
          <TextReveal delay={0.3} className="justify-center">
            We don&apos;t just photograph moments —
          </TextReveal>
          <TextReveal delay={0.6} className="justify-center">
            we architect feelings.
          </TextReveal>
        </div>

        {/* Two-column body text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-3xl mx-auto">
          <div
            ref={col1Ref}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#6B6B6B",
              opacity: 0,
            }}
          >
            Every frame we create begins with listening. Understanding not just what you want captured, but what you want to feel when you look back years from now.
          </div>
          <div
            ref={col2Ref}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#6B6B6B",
              opacity: 0,
            }}
          >
            Light, timing, emotion — these are our instruments. The camera is simply how we sign our name.
          </div>
        </div>
      </div>
    </section>
  );
}
