"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast follower for the crosshair lines
  const springConfig = { stiffness: 400, damping: 35, mass: 0.3 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  // Slow, heavy trail dot
  const trailX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 });
  const trailY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });

  const [state, setState] = useState<"default" | "hover" | "click">("default");
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const cursorLabel = el.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "";
      setLabel(cursorLabel);
      setState("hover");
    };

    const leave = () => {
      setState("default");
      setLabel("");
    };

    const down = () => setState("click");
    const up   = () => setState(label ? "hover" : "default");

    const attach = () => {
      document.querySelectorAll("a,button,[data-cursor-label]").forEach((el) => {
        el.addEventListener("mouseenter", enter as EventListener);
        el.addEventListener("mouseleave", leave as EventListener);
      });
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      observer.disconnect();
    };
  }, [visible, label]); // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <div className="hidden md:block" aria-hidden>
      {/* ── Trail dot ── */}
      <motion.div
        className="fixed pointer-events-none z-[9996] rounded-full"
        style={{
          x: trailX, y: trailY,
          translateX: "-50%", translateY: "-50%",
          width: 6, height: 6,
          background: "#C8A96E",
          opacity: visible ? 0.5 : 0,
        }}
      />

      {/* ── Crosshair ── */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        animate={{ scale: isClick ? 0.7 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {/* Horizontal line */}
        <motion.div
          className="absolute bg-[#C8A96E]"
          style={{ top: "50%", translateY: "-50%" }}
          animate={{ width: isHover ? 28 : 16, height: 1, left: isHover ? -14 : -8, opacity: isHover ? 0.9 : 0.6 }}
          transition={{ duration: 0.2 }}
        />
        {/* Vertical line */}
        <motion.div
          className="absolute bg-[#C8A96E]"
          style={{ left: "50%", translateX: "-50%" }}
          animate={{ height: isHover ? 28 : 16, width: 1, top: isHover ? -14 : -8, opacity: isHover ? 0.9 : 0.6 }}
          transition={{ duration: 0.2 }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute rounded-full bg-[#C8A96E]"
          style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
          animate={{ width: isHover ? 5 : 3, height: isHover ? 5 : 3 }}
          transition={{ duration: 0.2 }}
        />
        {/* Outer ring — only on hover */}
        <AnimatePresence>
          {isHover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute border border-[#C8A96E]/40 rounded-full"
              style={{
                width: 44, height: 44,
                top: "50%", left: "50%",
                translateX: "-50%", translateY: "-50%",
              }}
            />
          )}
        </AnimatePresence>
        {/* Label pill */}
        <AnimatePresence>
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute left-6 top-4 px-3 py-1 bg-[#0E0E0E] text-white whitespace-nowrap pointer-events-none"
              style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Inter',sans-serif" }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
