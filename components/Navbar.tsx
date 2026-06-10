"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { studioInfo } from "@/lib/data";

const serviceItems = [
  { label:"Wedding Photography", href:"/services/wedding",     img:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=90" },
  { label:"Reception",           href:"/services/reception",   img:"https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=90" },
  { label:"Pre-Wedding",         href:"/services/pre-wedding", img:"https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=90" },
  { label:"Maternity",           href:"/services/maternity",   img:"https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&q=90" },
  { label:"Newborn / Baby",      href:"/services/baby",        img:"https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=90" },
  { label:"Engagement",          href:"/services/engagement",  img:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=90" },
  { label:"Corporate Events",    href:"/services/corporate",   img:"https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=90" },
  { label:"Birthday",            href:"/services/birthday",    img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=90" },
];

const navLinks = [
  { label:"Home",      href:"/"          },
  { label:"Portfolio", href:"/portfolio" },
  { label:"Services",  href:"/services", hasMega:true },
  { label:"Pricing",   href:"/pricing"   },
  { label:"About",     href:"/about"     },
  { label:"Blog",      href:"/blog"      },
  { label:"Contact",   href:"/contact"   },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [megaOpen,     setMegaOpen]     = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [hoveredService, setHoveredService] = useState(serviceItems[0]);
  const pathname = usePathname();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHomePage  = pathname === "/";
  const { scrollYProgress, scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));
  useMotionValueEvent(scrollYProgress, "change", (p) => setProgress(p * 100));

  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileOpen]);
  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  const openMega  = () => { if (megaTimer.current) clearTimeout(megaTimer.current); setMegaOpen(true);  };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 180); };

  const isLight = !scrolled && isHomePage;
  const navBg   = scrolled ? "bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(14,14,14,0.08)]" : isHomePage ? "bg-transparent" : "bg-white shadow-[0_1px_0_rgba(14,14,14,0.06)]";

  return (
    <>
      {/* Progress bar */}
      <div className="scroll-progress" style={{ width:`${progress}%` }} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Page scroll progress" />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }}
        className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-400", navBg)}
        style={{ height:"var(--nav-height)" }}
      >
        <div className="container-lumina h-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none shrink-0 z-10" data-cursor-label="Home">
            <span className={cn("font-display tracking-[0.18em] text-[1rem] transition-colors duration-300", isLight ? "text-white" : "text-[#0E0E0E]")}
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:400 }}>
              SHIYARAH
            </span>
            <span className={cn("text-[0.55rem] tracking-[0.32em] uppercase mt-0.5 transition-colors duration-300", isLight ? "text-white/50" : "text-[#9CA3AF]")}
              style={{ fontFamily:"'Inter',sans-serif", fontWeight:500 }}>
              WEDDINGS · CHENNAI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
            {navLinks.map((link) => (
              link.hasMega ? (
                <div key={link.label} className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <Link href={link.href}
                    className={cn("flex items-center gap-1 text-[0.78rem] font-medium tracking-wide transition-colors duration-200",
                      isLight ? "text-white/75 hover:text-white" : "text-mid hover:text-[#0E0E0E]",
                      megaOpen ? (isLight ? "text-white" : "text-[#0E0E0E]") : ""
                    )}
                  >
                    {link.label}
                    <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration:0.2 }} className="inline-block ml-0.5">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  </Link>
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className={cn("nav-link-underline text-[0.78rem] font-medium tracking-wide transition-colors duration-200",
                    isLight ? "text-white/75 hover:text-white" : "text-mid hover:text-[#0E0E0E]",
                    pathname === link.href ? "active" : ""
                  )}
                  style={{ "--underline-bg": isLight ? "#ffffff" : "#0E0E0E" } as React.CSSProperties}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex shrink-0">
            <Link
              href="/book"
              className={cn(
                "relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 text-[0.68rem] font-semibold tracking-widest uppercase transition-all duration-300",
                isLight
                  ? "border border-white/40 text-white hover:border-white"
                  : "border border-accent text-[#0E0E0E] hover:text-white"
              )}
              data-cursor-label="Book"
            >
              {/* Gold fill on hover */}
              <span
                className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />
              {/* Diamond ornament */}
              <span className="relative z-10 text-accent group-hover:text-[#0E0E0E] transition-colors duration-300 text-[8px]">◆</span>
              <span className="relative z-10">Book a Session</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={cn("lg:hidden w-10 h-10 flex items-center justify-center transition-colors", isLight ? "text-white" : "text-[#0E0E0E]")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* ── Mega Menu ── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity:0, y:-8 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.22, ease:[0.25,0.46,0.45,0.94] }}
            className="fixed inset-x-0 z-40 bg-white border-b border-surface shadow-[0_16px_64px_rgba(14,14,14,0.1)]"
            style={{ top:"var(--nav-height)" }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="container-lumina py-8">
              <div className="grid grid-cols-12 gap-8">

                {/* Left — service list */}
                <div className="col-span-4">
                  <p className="tag text-[#9CA3AF] mb-5">Our Services</p>
                  <div className="space-y-0 divide-y divide-surface">
                    {serviceItems.map((s) => (
                      <Link key={s.href} href={s.href}
                        onMouseEnter={() => setHoveredService(s)}
                        className="flex items-center justify-between py-2.5 group"
                      >
                        <span className="text-[0.875rem] text-[#374151] group-hover:text-[#0E0E0E] font-medium transition-colors">
                          {s.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-surface group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <Link href="/services"
                    className="inline-flex items-center gap-2 mt-6 text-[0.75rem] font-semibold tracking-widest uppercase text-accent hover:gap-3 transition-all">
                    All Services <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Center — preview image */}
                <div className="col-span-4 relative overflow-hidden" style={{ aspectRatio:"4/3" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={hoveredService.href}
                      initial={{ opacity:0, scale:1.04 }}
                      animate={{ opacity:1, scale:1 }}
                      exit={{ opacity:0 }}
                      transition={{ duration:0.3 }}
                      className="absolute inset-0"
                    >
                      <Image src={hoveredService.img} alt={hoveredService.label} fill sizes="(max-width:1280px) 33vw, 480px" className="object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0E0E0E]/40 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white text-sm font-medium">{hoveredService.label}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right — quick info */}
                <div className="col-span-4 flex flex-col justify-between">
                  <div>
                    <p className="tag text-[#9CA3AF] mb-5">Quick Links</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label:"Pricing",   href:"/pricing"   },
                        { label:"Portfolio", href:"/portfolio" },
                        { label:"About Us",  href:"/about"     },
                        { label:"Contact",   href:"/contact"   },
                      ].map((l) => (
                        <Link key={l.href} href={l.href}
                          className="px-4 py-3 bg-[#F8F7F4] text-[0.8rem] text-[#374151] font-medium hover:bg-surface hover:text-[#0E0E0E] transition-colors text-center">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-[#0E0E0E]">
                    <p className="text-white/50 text-xs mb-1">Direct line to Aslam</p>
                    <a href={`tel:${studioInfo.phoneRaw}`} className="text-accent font-medium text-sm tracking-wide hover:text-white transition-colors">
                      {studioInfo.phone}
                    </a>
                    <div className="mt-3">
                      <a href={studioInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/60 text-xs hover:text-white transition-colors tracking-widest uppercase">
                        WhatsApp <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0, clipPath:"inset(0 0 100% 0)" }}
            animate={{ opacity:1, clipPath:"inset(0 0 0% 0)" }}
            exit={{ opacity:0, clipPath:"inset(0 0 100% 0)" }}
            transition={{ duration:0.4, ease:[0.76,0,0.24,1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col overflow-y-auto"
            role="dialog" aria-modal="true"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 border-b border-surface" style={{ height:"var(--nav-height)" }}>
              <Link href="/" className="flex flex-col leading-none" onClick={() => setMobileOpen(false)}>
                <span className="font-display text-[#0E0E0E] tracking-[0.18em]" style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"1rem" }}>SHIYARAH</span>
                <span className="text-[0.55rem] text-[#9CA3AF] tracking-[0.32em] uppercase mt-0.5">WEDDINGS</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center text-[#0E0E0E]"><X className="w-5 h-5" /></button>
            </div>

            {/* Nav items */}
            <div className="flex-1 px-6 py-6">
              <nav className="divide-y divide-surface">
                {navLinks.map((link, i) => (
                  <motion.div key={link.label} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.05+i*0.04 }}>
                    {link.hasMega ? (
                      <>
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full flex items-center justify-between py-4"
                        >
                          <span className="font-display text-[#0E0E0E]" style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:400, letterSpacing:"-0.02em" }}>
                            {link.label}
                          </span>
                          <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} className="text-[#9CA3AF]">
                            <svg width="14" height="8" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} className="overflow-hidden">
                              <div className="pb-4 grid grid-cols-2 gap-2">
                                {serviceItems.map((s) => (
                                  <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                                    className="px-3 py-2.5 bg-[#F8F7F4] text-[0.8rem] text-[#374151] hover:bg-surface transition-colors">
                                    {s.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={link.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-4 group">
                        <span className="font-display text-[#0E0E0E]" style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:400, letterSpacing:"-0.02em" }}>
                          {link.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-surface group-hover:text-accent transition-colors" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }} className="mt-8 space-y-3">
                <Link href="/book"
                  className="block w-full py-4 bg-[#0E0E0E] text-white text-[0.8rem] font-semibold tracking-widest uppercase text-center hover:opacity-80 transition-opacity"
                  onClick={() => setMobileOpen(false)}>
                  Book a Session
                </Link>
                <a href={`tel:${studioInfo.phoneRaw}`}
                  className="block w-full py-4 border border-surface text-[#0E0E0E] text-[0.8rem] font-semibold tracking-widest uppercase text-center hover:border-accent transition-colors">
                  {studioInfo.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
