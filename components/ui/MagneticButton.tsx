"use client";

import { useRef, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  type = "button",
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.35;
    const distY = (e.clientY - centerY) * 0.35;
    x.set(Math.max(-20, Math.min(20, distX)));
    y.set(Math.max(-20, Math.min(20, distY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionDiv = (
    <motion.div style={{ x, y }} className="w-full h-full flex items-center justify-center">
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cn("inline-flex items-center justify-center relative overflow-hidden", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
      >
        {motionDiv}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={cn("inline-flex items-center justify-center relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {motionDiv}
    </button>
  );
}
