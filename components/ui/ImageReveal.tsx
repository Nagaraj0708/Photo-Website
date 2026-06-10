"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const EASE = [0.76, 0, 0.24, 1] as const;

export default function ImageReveal({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-5% 0px" });

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Image — scales down from 1.15 as it reveals */}
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.15, filter: "grayscale(30%)" }}
        animate={isInView ? { scale: 1.0, filter: "grayscale(0%)" } : { scale: 1.15, filter: "grayscale(30%)" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>

      {/* Overlay that wipes off from right to left */}
      <motion.div
        className="absolute inset-0 bg-[#0E0E0E] z-10 origin-right"
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
}
