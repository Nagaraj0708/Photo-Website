"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { studioInfo } from "@/lib/data";

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
          alt="Book a session — Shiyarah Weddings"
          fill sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0D0A09]/78" />
        <div className="absolute inset-0 bg-radial-rose" />
        {/* Warm edge glow */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#C8956C]/8 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-rose mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8956C] animate-pulse inline-block" />
            Limited Dates Available in 2026
          </span>

          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] font-light text-[#FAF5F0] mb-5 leading-[1.1]"
            style={{ fontFamily: "var(--font-cormorant, serif)" }}
          >
            Your Love Story Deserves{" "}
            <em className="text-rose-gradient not-italic">to Live Forever</em>
          </h2>

          <p className="text-[#C4A99A] text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Join 800+ happy couples across Tamil Nadu who trusted Shiyarah Weddings to
            immortalise their most precious moments. Let&apos;s create something beautiful together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C8956C] hover:bg-[#E8B49A] text-[#0D0A09] font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#C8956C]/35 hover:-translate-y-0.5"
            >
              Book a Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${studioInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#C8956C]/30 hover:border-[#C8956C]/70 text-[#FAF5F0] hover:text-[#C8956C] font-medium rounded-full transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              {studioInfo.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
