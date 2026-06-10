"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !imageRef.current) return;

      const displacement = 80; // max ±80px
      const clampedSpeed = Math.min(Math.abs(speed), 1);

      gsap.fromTo(
        imageRef.current,
        { yPercent: -clampedSpeed * 10 },
        {
          yPercent: clampedSpeed * 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Image wrapper is slightly larger to prevent gaps during parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full"
        style={{ height: "110%", top: "-5%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
