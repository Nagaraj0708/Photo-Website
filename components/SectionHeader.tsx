"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;   /* use lighter variant on dark cards */
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
    >
      {badge && (
        <span className="badge-rose mb-5 inline-flex">
          <span className="w-1 h-1 rounded-full bg-[#C8956C] inline-block" />
          {badge}
        </span>
      )}

      <h2
        className="text-[clamp(1.9rem,4vw,3.25rem)] font-light text-[#FAF5F0] leading-tight mb-4"
        style={{ fontFamily: "var(--font-cormorant, serif)" }}
      >
        {title}{" "}
        {titleHighlight && (
          <em className="text-rose-gradient not-italic">{titleHighlight}</em>
        )}
      </h2>

      {description && (
        <p className="text-[#C4A99A] text-base leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
