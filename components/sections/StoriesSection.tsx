"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "wedding",
    label: "Wedding",
    headline: "Where Vows\nBecome Visual Poetry",
    sub: "Full-day Tamil wedding coverage. Rituals, emotions, and stolen glances — all immortalised.",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85",
    href: "/services/wedding",
    count: "400+ weddings",
  },
  {
    id: "prewedding",
    label: "Pre-Wedding",
    headline: "Your Love Story\nBefore the Big Day",
    sub: "Scenic locations. Natural light. Authentic chemistry. A film for just the two of you.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=85",
    href: "/services/pre-wedding",
    count: "200+ shoots",
  },
  {
    id: "reception",
    label: "Reception",
    headline: "Celebrate.\nDance. Remember.",
    sub: "Every toast, every dance-floor moment and every joyful tear — captured in cinematic detail.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85",
    href: "/services/reception",
    count: "350+ receptions",
  },
  {
    id: "maternity",
    label: "Maternity",
    headline: "The Most\nBeautiful Wait",
    sub: "Fine-art maternity portraits that celebrate the radiance of expecting.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=85",
    href: "/services/maternity",
    count: "150+ sessions",
  },
  {
    id: "newborn",
    label: "Newborn",
    headline: "Tiny Fingers,\nTimeless Frames",
    sub: "Safety-certified newborn photography in our state-of-the-art Chennai studio.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85",
    href: "/services/baby",
    count: "100+ babies",
  },
];

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.06 }}
      className="group"
    >
      <Link href={cat.href} className="block">
        {/* Image container with parallax */}
        <div className="relative overflow-hidden rounded-sm mb-6" style={{ aspectRatio: "4/5" }}>
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.15]">
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              sizes="(max-width:640px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#111]/20 group-hover:bg-[#111]/10 transition-all duration-500" />
          </motion.div>

          {/* Count pill */}
          <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-[0.65rem] font-medium text-[#111] tracking-wide">{cat.count}</span>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-4 h-4 text-[#111]" />
          </div>
        </div>

        {/* Text */}
        <div className="tag text-[#6B7280] mb-3">{cat.label}</div>
        <h3
          className="font-editorial text-[#111] mb-3 group-hover:text-[#1A73E8] transition-colors"
          style={{
            fontFamily: "var(--font-editorial,Georgia,serif)",
            fontSize: "clamp(1.4rem,2.5vw,2rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            whiteSpace: "pre-line",
          }}
        >
          {cat.headline}
        </h3>
        <p className="text-[0.875rem] text-[#6B7280] leading-relaxed line-clamp-2">{cat.sub}</p>
      </Link>
    </motion.div>
  );
}

export default function StoriesSection() {
  return (
    <section className="section-pad bg-[#F8F7F4]">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="tag text-[#6B7280] mb-4">Our Services</div>
            <h2
              className="font-editorial text-[#111]"
              style={{
                fontFamily: "var(--font-editorial,Georgia,serif)",
                fontSize: "clamp(2.5rem,5vw,5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
              }}
            >
              Stories Worth
              <br />
              <em className="text-[#6B7280] italic">Telling</em>
            </h2>
          </div>
          <Link href="/portfolio" className="btn-outline shrink-0 self-start sm:self-end">
            See All Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
