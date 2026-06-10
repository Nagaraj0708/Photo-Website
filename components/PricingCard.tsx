"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPackage } from "@/lib/types";

const tierStyle: Record<string, { border: string; glow: string; badge: string }> = {
  silver:   { border: "border-[#A8A8A8]/25", glow: "hover:shadow-[#A8A8A8]/8",  badge: "text-[#C0C0C0]" },
  gold:     { border: "border-[#C8956C]/45", glow: "hover:shadow-[#C8956C]/15", badge: "text-[#E8B49A]" },
  platinum: { border: "border-[#E8E6E4]/25", glow: "hover:shadow-[#E8E6E4]/8",  badge: "text-[#E8E6E4]" },
  royal:    { border: "border-[#C8956C]/55", glow: "hover:shadow-[#C8956C]/20", badge: "text-[#C8956C]" },
};

export default function PricingCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const ts = tierStyle[pkg.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-full"
    >
      {pkg.popular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#C8956C] text-[#0D0A09] text-[0.7rem] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-[#C8956C]/30">
            <Gem className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border bg-[#1C1614] h-full flex flex-col transition-shadow duration-400",
          ts.border, ts.glow,
          pkg.popular && "shadow-2xl shadow-[#C8956C]/12"
        )}
      >
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          {/* Tier name */}
          <div className="mb-5">
            <span className={cn("text-[0.65rem] font-bold uppercase tracking-[0.2em]", ts.badge)}>
              {pkg.name}
            </span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-[#7A6358] text-base">{pkg.currency}</span>
              <span className="text-4xl font-light text-[#FAF5F0]"
                style={{ fontFamily: "var(--font-cormorant, serif)" }}>
                {pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[#7A6358] text-xs mt-1">{pkg.duration}</p>
          </div>

          <p className="text-[#7A6358] text-sm mb-6">{pkg.description}</p>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-1">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <div className={cn("mt-0.5 shrink-0", ts.badge)}>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-[#C4A99A] text-[0.82rem]">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/book?package=${pkg.id}`}
            className={cn(
              "block text-center py-3.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300",
              pkg.popular
                ? "bg-[#C8956C] hover:bg-[#E8B49A] text-[#0D0A09] hover:shadow-lg hover:shadow-[#C8956C]/30"
                : "border border-[#3D2F2A] hover:border-[#C8956C]/50 text-[#FAF5F0] hover:text-[#C8956C] hover:bg-[#C8956C]/5"
            )}
          >
            {pkg.cta}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
