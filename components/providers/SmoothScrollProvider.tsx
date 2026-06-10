"use client";

import { useEffect } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    const init = async () => {
      const [{ default: Lenis }, { gsap }] = await Promise.all([
        import("lenis"),
        import("gsap"),
      ]);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      // Integrate with GSAP ticker for perfect synchronisation
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Expose for ScrollTrigger
      (window as unknown as Record<string, unknown>).lenis = lenis;
    };

    init();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
