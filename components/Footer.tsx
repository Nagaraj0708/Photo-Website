import React from "react";
import Link from "next/link";
import { studioInfo } from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// Shiyarah Weddings — Premium Footer
// Design language: obsidian ground, champagne gold accents, editorial serif
// Signature element: giant ghosted brand watermark behind the grid
// ─────────────────────────────────────────────────────────────────────────────

const TICKER_TEXT = [
  "SHIYARAH WEDDINGS",
  "CRAFTING TIMELESS LOVE STORIES",
  "CHENNAI, TAMIL NADU",
  "AWARD-WINNING PHOTOGRAPHY",
  "6+ YEARS OF ARTISTRY",
];

const quickLinks = [
  { label: "Home",      href: "/"          },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services",  href: "/services"  },
  { label: "Pricing",   href: "/pricing"   },
  { label: "About",     href: "/about"     },
  { label: "Journal",   href: "/blog"      },
  { label: "Contact",   href: "/contact"   },
];

const services = [
  { label: "Wedding Photography", href: "/services/wedding"     },
  { label: "Reception",           href: "/services/reception"   },
  { label: "Pre-Wedding Shoot",   href: "/services/pre-wedding" },
  { label: "Maternity",           href: "/services/maternity"   },
  { label: "Newborn & Baby",      href: "/services/baby"        },
  { label: "Engagement",          href: "/services/engagement"  },
  { label: "Corporate Events",    href: "/services/corporate"   },
  { label: "Birthday",            href: "/services/birthday"    },
];

const socials = [
  {
    label: "Instagram",
    href: studioInfo.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: studioInfo.facebook,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: studioInfo.youtube,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060606" />
      </svg>
    ),
  },
];

// Duplicate for seamless marquee loop
const MARQUEE_ITEMS = [...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* ── Inline styles for animation (Tailwind can't handle keyframes directly) ── */}
      <style>{`
        @keyframes sw-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .sw-ticker-track {
          animation: sw-scroll 32s linear infinite;
        }
        .sw-ticker-track:hover {
          animation-play-state: paused;
        }
        .sw-nav-link::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #C9A96E;
          transition: width 0.25s ease;
          vertical-align: middle;
          margin-right: 0;
          flex-shrink: 0;
        }
        .sw-nav-link:hover::before {
          width: 12px;
          margin-right: 8px;
        }
        .sw-wa-fill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C9A96E;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .sw-wa-fill:hover::before {
          transform: scaleX(1);
        }
        .sw-wa-fill:hover {
          color: #0A0A0A !important;
          border-color: #C9A96E !important;
        }
        .sw-wa-fill > * {
          position: relative;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .sw-ticker-track { animation: none; }
        }
      `}</style>

      <footer
        className="relative bg-[#060606] text-white overflow-hidden"
        role="contentinfo"
        aria-label="Shiyarah Weddings site footer"
      >
        {/* ── Marquee Ticker ─────────────────────────────────────────────── */}
        <div
          className="overflow-hidden whitespace-nowrap border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)", padding: "8px 0" }}
          aria-hidden="true"
        >
          <div className="sw-ticker-track inline-flex">
            {MARQUEE_ITEMS.map((text, i) => (
              <React.Fragment key={i}>
                <span
                  className="inline-block px-10"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.2)",
                    fontWeight: 400,
                  }}
                >
                  {text}
                </span>
                <span
                  style={{
                    color: "rgba(201,169,110,0.45)",
                    fontSize: 10,
                    lineHeight: 1,
                    alignSelf: "center",
                  }}
                >
                  ·
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Ghost Watermark (signature element) ────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(80px, 14vw, 160px)",
            fontWeight: 300,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.022)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
            lineHeight: 1,
          }}
        >
          SHIYARAH
        </div>

        {/* ── Main Footer Grid ────────────────────────────────────────────── */}
        <div
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ padding: "28px clamp(1rem, 4vw, 48px) 22px" }}
        >
          {/* ── Brand Column ── */}
          <div>
            <Link href="/" className="inline-block no-underline">
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  color: "white",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                SHIYARAH
              </p>
              <span
                style={{
                  display: "block",
                  fontSize: 9,
                  letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.22)",
                  marginTop: 6,
                  fontWeight: 400,
                }}
              >
                WEDDINGS · CHENNAI
              </span>
            </Link>

            {/* Gold rule */}
            <div
              style={{
                width: 36,
                height: 1,
                background: "#C9A96E",
                opacity: 0.45,
                margin: "18px 0",
              }}
            />

            <p
              style={{
                fontFamily: "'Cormorant Garant', Georgia, serif",
                fontStyle: "italic",
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 240,
              }}
            >
              Every frame a feeling.
              <br />
              Every memory, forever.
            </p>

            <p
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "rgba(255,255,255,0.25)",
                lineHeight: 1.7,
                marginTop: 20,
              }}
            >
              Led by Aslam — 6+ years of wedding artistry across Chennai & Tamil Nadu.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5" style={{ marginTop: 18 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    transition: "border-color 0.25s, color 0.25s, background 0.25s",
                  }}
                  className="hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-[#C9A96E]/6"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigate Column ── */}
          <div>
            <p
              className="flex items-center gap-3"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Navigate
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  display: "block",
                }}
              />
            </p>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="sw-nav-link flex items-center"
                      style={{
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.38)",
                        letterSpacing: "0.02em",
                        transition: "color 0.2s",
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Services Column ── */}
          <div>
            <p
              className="flex items-center gap-3"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Services
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  display: "block",
                }}
              />
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="sw-nav-link flex items-center"
                    style={{
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                    }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div>
            <p
              className="flex items-center gap-3"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              Get In Touch
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  display: "block",
                }}
              />
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Address */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: 8.5,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.18)",
                    marginBottom: 3,
                    fontWeight: 500,
                  }}
                >
                  LOCATION
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}
                >
                  {studioInfo.address}
                </span>
              </div>

              {/* Phone */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: 8.5,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.18)",
                    marginBottom: 3,
                    fontWeight: 500,
                  }}
                >
                  PHONE
                </span>
                <a
                  href={`tel:${studioInfo.phoneRaw}`}
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-white/75"
                >
                  {studioInfo.phone}
                </a>
              </div>

              {/* Email */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: 8.5,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.18)",
                    marginBottom: 3,
                    fontWeight: 500,
                  }}
                >
                  EMAIL
                </span>
                <a
                  href={`mailto:${studioInfo.email}`}
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-white/75"
                >
                  {studioInfo.email}
                </a>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={studioInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="sw-wa-fill inline-flex items-center gap-2.5 relative overflow-hidden"
                style={{
                  marginTop: 10,
                  padding: "11px 22px",
                  border: "1px solid rgba(201,169,110,0.35)",
                  color: "#C9A96E",
                  fontSize: 9.5,
                  letterSpacing: "0.22em",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "border-color 0.25s, color 0.25s",
                }}
              >
                {/* WhatsApp icon */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.133.558 4.133 1.532 5.867L0 24l6.295-1.516A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.98 0-3.818-.572-5.364-1.556l-.383-.23-3.976.957.99-3.892-.253-.398A9.782 9.782 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
                <span>WHATSAPP US</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "12px clamp(1rem, 4vw, 48px)",
          }}
        >
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.16)", letterSpacing: "0.06em", fontWeight: 300 }}>
            © {year} Shiyarah Weddings. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: "rgba(201,169,110,0.4)", letterSpacing: "0.06em", fontWeight: 300 }}>
            ✦ Crafted with love in Chennai
          </p>
          <nav className="flex items-center gap-6" aria-label="Legal links">
            <Link
              href="/privacy"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.16)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                fontWeight: 300,
                transition: "color 0.2s",
              }}
              className="hover:text-white/50"
            >
              Privacy Policy
            </Link>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "inline-block" }} aria-hidden="true" />
            <Link
              href="/terms"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.16)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                fontWeight: 300,
                transition: "color 0.2s",
              }}
              className="hover:text-white/50"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}