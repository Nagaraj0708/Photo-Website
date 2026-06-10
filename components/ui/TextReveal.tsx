"use client";

import { useRef, ElementType, CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: ElementType;
}

export default function TextReveal({
  children,
  className,
  style,
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10% 0px" });

  const words = children.split(" ");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
      style={style}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
              delay: delay + i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
