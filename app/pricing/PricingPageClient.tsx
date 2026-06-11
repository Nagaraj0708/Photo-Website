"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, ChevronDown, Check, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { servicePricing } from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE ICONS — sharp SVG, no emoji
// ─────────────────────────────────────────────────────────────────────────────

const ServiceIcon = ({ id, active, size = 18 }: { id: string; active: boolean; size?: number }) => {
  const s = active ? "#C8A96E" : "#9CA3AF";
  const icons: Record<string, React.ReactNode> = {
    wedding: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.5C12 21.5 3 15.5 3 9a4.5 4.5 0 018.25-2.5 4.5 4.5 0 018.25 2.5c0 6.5-9.5 12.5-7.5 12.5z"/>
      </svg>
    ),
    reception: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l1.5 3 3 .5-2.2 2.1.5 3L8 10.5 5.2 12l.5-3L4 6.8l3-.5z"/>
        <path d="M3 20h18M6 20v-4M12 20v-6M18 20v-4"/>
      </svg>
    ),
    "pre-wedding": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
    maternity: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5"/>
        <path d="M12 8c0 0-4 1.5-4 5.5 0 2.5 1 4 2.5 5h7c1.5-1 2.5-2.5 2.5-5 0-4-4-5.5-4-5.5z"/>
        <path d="M9.5 12a3 3 0 005 0"/>
      </svg>
    ),
    newborn: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="3.5"/>
        <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5"/>
        <path d="M4 8c.5-1 1.5-1.5 2.5-1M20 8c-.5-1-1.5-1.5-2.5-1"/>
      </svg>
    ),
    engagement: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    corporate: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="1"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    birthday: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16c0 4-8 4-8 4s-8 0-8-4 2.5-6 8-6 8 2 8 6z"/>
        <path d="M12 10V7M8 7c0-2 1.5-3 2-4.5M16 7c0-2-1.5-3-2-4.5"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.wedding}</>;
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SERVICE_IMAGES: Record<string, string> = {
  wedding:       "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=85",
  reception:     "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=85",
  "pre-wedding": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=85",
  maternity:     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=85",
  newborn:       "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1600&q=85",
  engagement:    "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1600&q=85",
  corporate:     "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85",
  birthday:      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=85",
};

const TERMS = [
  "40% of the package amount is due at the time of booking to confirm your slot.",
  "Balance 50% to be paid on the day of the event before the shoot begins.",
  "Pre-Wedding or Post-Wedding shoot is complimentary for Gold package and above.",
  "Post-wedding shoot must be planned within 3 months of the event. It expires after this period.",
  "Once photo selection is complete, the album will be delivered within 30 working days. Remaining 10% is due after print approval.",
  "Delays beyond one month in providing selected photos will extend the album delivery timeline accordingly.",
  "Additional events or rituals must be communicated in advance — pricing may be revised.",
  "The client must provide a hard disk for file delivery. If we supply one, the cost is borne by the client.",
];

const COVERAGE_CITIES = ["Chennai", "Coimbatore", "Bangalore", "Hyderabad"];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function PricingPageClient() {
  const [active, setActive]     = useState(servicePricing[0].serviceId);
  const [termsOpen, setTermsOpen] = useState(false);
  const [hoveredPkg, setHoveredPkg] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const current = servicePricing.find((s) => s.serviceId === active) ?? servicePricing[0];

  // Scroll active tab into view
  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-id="${active}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  return (
    <div style={{ background: "#F8F7F4" }}>

      {/* ══════════════════════════════════════════════════════════════════
          STICKY SERVICE TAB BAR
      ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          background:   "#FFFFFF",
          borderBottom: "1px solid #EFEDE8",
          position:     "sticky",
          top:          "var(--nav-height, 72px)",
          zIndex:       30,
        }}
      >
        <div
          ref={tabsRef}
          style={{
            display:          "flex",
            overflowX:        "auto",
            scrollbarWidth:   "none",
            msOverflowStyle:  "none",
            maxWidth:         1280,
            margin:           "0 auto",
            padding:          "0 24px",
          }}
        >
          {servicePricing.map((s) => {
            const isAct = active === s.serviceId;
            return (
              <button
                key={s.serviceId}
                data-id={s.serviceId}
                onClick={() => setActive(s.serviceId)}
                style={{
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  gap:            6,
                  padding:        "14px 20px",
                  flexShrink:     0,
                  background:     "transparent",
                  border:         "none",
                  borderBottom:   `2px solid ${isAct ? "#C8A96E" : "transparent"}`,
                  cursor:         "pointer",
                  transition:     "all 0.2s ease",
                  position:       "relative",
                }}
              >
                <ServiceIcon id={s.serviceId} active={isAct} size={17} />
                <span style={{
                  fontSize:      "0.6rem",
                  fontWeight:    700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace:    "nowrap",
                  color:         isAct ? "#0E0E0E" : "#9CA3AF",
                  transition:    "color 0.2s",
                }}>
                  {s.serviceLabel}
                </span>
                {isAct && (
                  <motion.div
                    layoutId="tab-indicator"
                    style={{
                      position:   "absolute",
                      bottom:     -1,
                      left:       0,
                      right:      0,
                      height:     2,
                      background: "#C8A96E",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICE CONTENT
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.serviceId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >

          {/* ── CINEMATIC HERO ── */}
          <HeroSection service={current} />

          {/* ── PACKAGE CARDS ── */}
          <section style={{ padding: "clamp(2.5rem,6vw,72px) clamp(1rem,4vw,24px)", maxWidth: 1280, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 10 }}>
                Our Packages
              </p>
              <h2 style={{
                fontFamily:    "'Playfair Display',serif",
                fontSize:      "clamp(1.8rem,3vw,2.6rem)",
                fontWeight:    400,
                letterSpacing: "-0.03em",
                color:         "#0E0E0E",
                lineHeight:    1.1,
              }}>
                Choose your{" "}
                <em style={{ fontStyle: "italic", color: "#9CA3AF" }}>experience.</em>
              </h2>
            </div>

            {/* Cards grid */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: `repeat(${Math.min(current.packages.length, 3)}, 1fr)`,
              gap:                 16,
              alignItems:          "start",
            }}
              className="pricing-grid"
            >
              {current.packages.map((pkg, i) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  serviceId={current.serviceId}
                  index={i}
                  isHovered={hoveredPkg === pkg.id}
                  anyHovered={hoveredPkg !== null}
                  onHover={setHoveredPkg}
                />
              ))}
            </div>

            {/* Custom CTA */}
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF", marginBottom: 14 }}>
                None of these feel right?
              </p>
              <Link
                href="/contact"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            8,
                  padding:        "12px 28px",
                  border:         "1px solid #0E0E0E",
                  color:          "#0E0E0E",
                  fontSize:       "0.72rem",
                  fontWeight:     700,
                  letterSpacing:  "0.12em",
                  textTransform:  "uppercase",
                  textDecoration: "none",
                  transition:     "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#0E0E0E";
                  el.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#0E0E0E";
                }}
              >
                <Sparkles style={{ width: 13, height: 13 }} />
                Request a Bespoke Quote
              </Link>
            </div>
          </section>

          {/* ── COVERAGE STRIP ── */}
          <div style={{ background: "#0E0E0E", padding: "28px 24px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin style={{ width: 13, height: 13, color: "#C8A96E" }} />
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  Coverage
                </span>
              </div>
              {COVERAGE_CITIES.map((city, i) => (
                <div key={city} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                    {city}
                  </span>
                  {i < COVERAGE_CITIES.length - 1 && (
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(200,169,110,0.4)", display: "inline-block" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── TERMS & CONDITIONS ── */}
          <TermsSection open={termsOpen} onToggle={() => setTermsOpen(!termsOpen)} />

        </motion.div>
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        [data-id]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION — cinematic parallax banner
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection({ service }: { service: typeof servicePricing[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div ref={ref} style={{ position: "relative", height: "clamp(260px, 38vw, 480px)", overflow: "hidden" }}>

      {/* Parallax image */}
      <motion.div style={{ position: "absolute", inset: "-15% 0", y }}>
        <Image
          src={SERVICE_IMAGES[service.serviceId] ?? SERVICE_IMAGES.wedding}
          alt={service.serviceLabel}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(14,14,14,0.88) 0%, rgba(14,14,14,0.55) 45%, rgba(14,14,14,0.15) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(14,14,14,0.6) 0%, transparent 50%)" }} />

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 clamp(1rem,4vw,40px) clamp(1.5rem,5vw,48px)", maxWidth: 1280, margin: "0 auto", left: 0, right: 0 }}>
        <div>
          {/* Icon badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}
          >
            <div style={{
              width:          36, height: 36,
              border:         "1px solid rgba(200,169,110,0.4)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     "rgba(200,169,110,0.08)",
            }}>
              <ServiceIcon id={service.serviceId} active={true} size={16} />
            </div>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A96E", fontWeight: 600 }}>
              {service.serviceLabel} Photography
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:    "'Playfair Display',serif",
              fontSize:      "clamp(1.8rem, 4.5vw, 4rem)",
              fontWeight:    400,
              letterSpacing: "-0.04em",
              lineHeight:    0.92,
              color:         "#FFFFFF",
              marginBottom:  16,
            }}
          >
            {service.serviceLabel}
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Packages</em>
          </motion.h1>

          {/* Description */}
          {service.description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize:  "0.88rem",
                fontWeight: 300,
                color:     "rgba(255,255,255,0.45)",
                maxWidth:  480,
                lineHeight: 1.7,
              }}
            >
              {service.description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom edge fade into bg */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(0deg, #F8F7F4, transparent)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PACKAGE CARD
// ─────────────────────────────────────────────────────────────────────────────

function PackageCard({
  pkg, serviceId, index, isHovered, anyHovered, onHover,
}: {
  pkg: any;
  serviceId: string;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isDark    = pkg.popular;
  const isLifted  = pkg.popular;
  const isDimmed  = anyHovered && !isHovered;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(pkg.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position:   "relative",
        display:    "flex",
        flexDirection: "column",
        background: isDark ? "#0E0E0E" : "#FFFFFF",
        border:     isDark ? "none" : "1px solid #EEECE7",
        transform:  isLifted ? "translateY(-8px)" : "translateY(0)",
        opacity:    isDimmed ? 0.55 : 1,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        cursor:     "default",
      }}
    >
      {/* Popular: gold top line */}
      {isDark && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#C8A96E" }} />
      )}

      {/* Popular badge */}
      {isDark && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          <span style={{
            display:       "inline-block",
            padding:       "4px 14px",
            background:    "#C8A96E",
            color:         "#0E0E0E",
            fontSize:      "0.58rem",
            fontWeight:    800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace:    "nowrap",
          }}>
            ★ Most Popular
          </span>
        </div>
      )}

      <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          paddingBottom:  24,
          marginBottom:   24,
          borderBottom:   `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#F0EFEA"}`,
        }}>
          {/* Package name */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <span style={{
                display:       "block",
                fontSize:      "0.58rem",
                fontWeight:    800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "#C8A96E",
                marginBottom:  4,
              }}>
                {pkg.name}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock style={{ width: 11, height: 11, color: isDark ? "rgba(255,255,255,0.3)" : "#AEAEAD" }} />
                <span style={{ fontSize: "0.7rem", color: isDark ? "rgba(255,255,255,0.35)" : "#AEAEAD" }}>
                  {pkg.duration}
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 2, justifyContent: "flex-end" }}>
                <span style={{ fontSize: "0.78rem", color: isDark ? "rgba(255,255,255,0.4)" : "#9CA3AF", marginTop: 4, lineHeight: 1 }}>₹</span>
                <span style={{
                  fontFamily:    "'Playfair Display',serif",
                  fontSize:      "clamp(1.9rem,3vw,2.5rem)",
                  fontWeight:    400,
                  letterSpacing: "-0.04em",
                  lineHeight:    1,
                  color:         isDark ? "#FFFFFF" : "#0E0E0E",
                }}>
                  {pkg.price.toLocaleString("en-IN")}
                </span>
              </div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: isDark ? "#C8A96E" : "#C8A96E" }}>
                onwards
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize:   "0.82rem",
            fontWeight: 300,
            lineHeight: 1.7,
            color:      isDark ? "rgba(255,255,255,0.45)" : "#6B6B6B",
            margin:     0,
          }}>
            {pkg.description}
          </p>
        </div>

        {/* ── Features ── */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {pkg.features.map((f: string) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, marginTop: 3 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#C8A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{
                fontSize:   "0.8rem",
                lineHeight: 1.55,
                color:      isDark ? "rgba(255,255,255,0.6)" : "#374151",
              }}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <BookButton href={`/book?service=${serviceId}&package=${pkg.id}`} popular={isDark} label={pkg.cta} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOK BUTTON — animated hover
// ─────────────────────────────────────────────────────────────────────────────

function BookButton({ href, popular, label }: { href: string; popular: boolean; label: string }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        gap:            8,
        padding:        "14px 20px",
        background:     popular
          ? hov ? "#C0A060" : "#C8A96E"
          : hov ? "#0E0E0E" : "transparent",
        border:         popular ? "none" : `1px solid ${hov ? "#0E0E0E" : "#DEDBD5"}`,
        color:          popular ? "#0E0E0E" : hov ? "#FFFFFF" : "#0E0E0E",
        fontSize:       "0.7rem",
        fontWeight:     700,
        letterSpacing:  "0.13em",
        textTransform:  "uppercase",
        textDecoration: "none",
        transition:     "all 0.22s ease",
        cursor:         "pointer",
      }}
    >
      {label ?? "Book This Package"}
      <motion.span animate={{ x: hov ? 3 : 0 }} transition={{ duration: 0.2 }}>
        <ArrowRight style={{ width: 13, height: 13 }} />
      </motion.span>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function TermsSection({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ background: "#FFFFFF", borderTop: "1px solid #EFEDE8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Toggle header */}
        <button
          onClick={onToggle}
          style={{
            width:          "100%",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "24px 0",
            background:     "transparent",
            border:         "none",
            cursor:         "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width:          28, height: 28,
              border:         "1px solid #EFEDE8",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#C8A96E" strokeWidth="1.6">
                <path d="M4 4h12M4 8h8M4 12h10M4 16h6" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0E0E0E" }}>
              Terms &amp; Conditions
            </span>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown style={{ width: 16, height: 16, color: "#9CA3AF" }} />
          </motion.div>
        </button>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingBottom: 48 }}>

                {/* Terms grid — 2 columns on desktop */}
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap:                 "12px 40px",
                  marginBottom:        32,
                }}>
                  {TERMS.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: "1px solid #F5F4F0" }}
                    >
                      <span style={{
                        flexShrink:    0,
                        fontFamily:    "'Playfair Display',serif",
                        fontSize:      "0.7rem",
                        fontWeight:    400,
                        color:         "#C8A96E",
                        minWidth:      22,
                        marginTop:     1,
                        lineHeight:    1,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#6B6B6B", margin: 0, fontWeight: 300 }}>
                        {t}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Declaration */}
                <div style={{
                  background:  "#F8F7F4",
                  border:      "1px solid #EFEDE8",
                  borderLeft:  "3px solid #C8A96E",
                  padding:     "20px 24px",
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display',serif",
                    fontStyle:  "italic",
                    fontSize:   "0.88rem",
                    lineHeight: 1.75,
                    color:      "#4B4B4B",
                    margin:     "0 0 14px",
                  }}>
                    &ldquo;Hereby Shiyarah Weddings declares that our team of professional, expert photographers and cinematographers will work on your wedding to give the best craft of your life&apos;s most memorable moments.&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    {COVERAGE_CITIES.map((city, i, arr) => (
                      <span key={city} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0E0E0E" }}>
                          {city}
                        </span>
                        {i < arr.length - 1 && (
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#C8A96E", display: "inline-block" }} />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}