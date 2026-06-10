"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import type { Award } from "@/lib/types";

export default function AwardsTimeline({ awards }: { awards: Award[] }) {
  return (
    <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Recognition"
          title="Awards &"
          titleHighlight="Achievements"
          description="Industry recognition for our dedication to photographic excellence."
          className="mb-14"
        />

        <div className="space-y-6">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-5 bg-[#222] border border-[#2A2A2A] hover:border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                    {award.year}
                  </span>
                  <div className="h-px flex-1 bg-[#2A2A2A]" />
                </div>
                <h3 className="text-white font-semibold mb-0.5">{award.title}</h3>
                <p className="text-[#D4AF37] text-xs mb-2">{award.organization}</p>
                <p className="text-[#B3B3B3] text-sm">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
