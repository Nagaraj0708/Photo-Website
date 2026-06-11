"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { awards } from "@/lib/data";

export default function AwardsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#1C1614] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-rose opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Recognition"
          title="Awards &"
          titleHighlight="Achievements"
          description="Industry recognition for our dedication to photographic and cinematic excellence."
          className="mb-16"
        />

        <div className="relative">
          {/* Centre timeline line — hidden on mobile */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#C8956C]/50 via-[#C8956C]/20 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {awards.map((award, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className={`relative flex flex-col sm:flex-row ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"} items-start sm:items-center gap-4 sm:gap-10`}
                >
                  <div className="flex-1">
                    <div className={`bg-[#0D0A09] border border-[#3D2F2A] hover:border-[#C8956C]/25 rounded-2xl p-5 sm:p-6 transition-all ${isLeft ? "sm:mr-8" : "sm:ml-8"}`}>
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-end" : "justify-start"}`}>
                        <Trophy className="w-3.5 h-3.5 text-[#C8956C]" />
                        <span className="text-[#C8956C] text-[0.65rem] font-bold uppercase tracking-widest">{award.year}</span>
                      </div>
                      <h3 className="text-[#FAF5F0] font-medium text-sm mb-0.5">{award.title}</h3>
                      <p className="text-[#C8956C] text-xs mb-2">{award.organization}</p>
                      <p className="text-[#7A6358] text-xs leading-relaxed">{award.description}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#C8956C] bg-[#0D0A09] z-10 animate-pulse-rose" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
