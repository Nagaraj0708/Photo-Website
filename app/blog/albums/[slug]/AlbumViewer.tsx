"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { WeddingAlbum } from "@/lib/types";

const PIXIESET_BASE = "https://shiyarahweddings.pixieset.com";

export default function AlbumViewer({ album }: { album: WeddingAlbum }) {
  const [iframeReady, setIframeReady] = useState(false);

  /* ── "Yet to add" ─────────────────────────────────────────────────────── */
  if (!album.pixiesetUrl) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
        <TopBar album={album} />
        <ComingSoon album={album} />
      </div>
    );
  }

  // Load the gallery page directly — Pixieset shows its own password form
  // inside the iframe; the parent URL and navbar never change.
  const galleryUrl = `${PIXIESET_BASE}/${album.pixiesetUrl}/`;

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col">
      <TopBar album={album} />

      <div className="relative flex-1" style={{ minHeight: "calc(100vh - 50px)" }}>

        {/* Spinner until iframe loads */}
        {!iframeReady && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0E0E0E] pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={album.coverImage}
                alt={album.couple}
                fill
                sizes="100vw"
                className="object-cover opacity-10 blur-sm scale-105"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div
                className="w-10 h-10 border-2 rounded-full animate-spin"
                style={{ borderColor: "rgba(200,169,110,0.2)", borderTopColor: "#C8A96E" }}
              />
              <div className="text-center">
                <p
                  className="text-white mb-1 italic"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.2rem" }}
                >
                  {album.couple}
                </p>
                <p className="text-white/30 text-xs tracking-widest uppercase">
                  Loading gallery…
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pixieset gallery — loads directly, password entered inside the iframe */}
        <iframe
          src={galleryUrl}
          title={`${album.couple} Wedding Gallery`}
          className="w-full border-none block"
          style={{ height: "calc(100vh - 50px)" }}
          onLoad={() => setIframeReady(true)}
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* ── Top bar ──────────────────────────────────────────────────────────────── */
function TopBar({ album }: { album: WeddingAlbum }) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-6 md:px-10 py-3.5 border-b shrink-0 relative z-20"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0A0A0A" }}
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-white/40 text-sm hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>

      <div className="flex flex-col items-center">
        <span
          className="text-white text-sm italic"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
        >
          {album.couple}
        </span>
        <span className="text-white/25 text-xs tracking-widest uppercase" style={{ fontSize: 9 }}>
          {album.venue}
        </span>
      </div>

      <span
        style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 500 }}
        className={album.pixiesetUrl ? "text-[#C8A96E]" : "text-white/20"}
      >
        {album.category.toUpperCase()} · {album.date}
      </span>
    </div>
  );
}

/* ── Coming soon ──────────────────────────────────────────────────────────── */
function ComingSoon({ album }: { album: WeddingAlbum }) {
  return (
    <div
      className="relative flex-1 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 50px)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={album.coverImage}
          alt={album.couple}
          fill
          sizes="100vw"
          className="object-cover opacity-15 blur-md scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-[#0E0E0E]/60" />

      <div className="relative z-10 text-center max-w-md px-6">
        <div
          className="w-14 h-14 flex items-center justify-center mx-auto mb-7"
          style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
        >
          <Clock className="w-5 h-5 text-white/30" />
        </div>

        <p className="text-white/20 text-xs tracking-[0.28em] uppercase mb-4">
          {album.category} · {album.date}
        </p>
        <h2
          className="text-white mb-2 italic"
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(1.75rem,3vw,2.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          {album.couple}
        </h2>
        <p className="text-white/30 text-sm mb-8">{album.venue}</p>

        <div className="mx-auto mb-8" style={{ width: 32, height: 1, background: "rgba(200,169,110,0.3)" }} />

        <p className="text-white/35 text-sm leading-relaxed mb-8">
          This gallery is being curated and will be available soon.
        </p>

        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-8"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(200,169,110,0.5)" }} />
          <span className="text-white/30" style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 500 }}>
            YET TO ADD
          </span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/50 text-xs font-semibold tracking-[0.18em] uppercase hover:border-white/35 hover:text-white/80 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>
      </div>
    </div>
  );
}
