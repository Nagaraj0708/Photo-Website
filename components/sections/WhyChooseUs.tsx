"use client";

import { motion } from "framer-motion";
import { Camera, Film, Palette, Zap, BookOpen, Navigation } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { whyChooseUs } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  Camera:     <Camera     className="w-6 h-6" />,
  Film:       <Film       className="w-6 h-6" />,
  Palette:    <Palette    className="w-6 h-6" />,
  Zap:        <Zap        className="w-6 h-6" />,
  BookOpen:   <BookOpen   className="w-6 h-6" />,
  Navigation: <Navigation className="w-6 h-6" />,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-[#1C1614] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-rose opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Shiyarah"
          title="Crafted with"
          titleHighlight="Passion & Precision"
          description="Every session is a unique story told with artistry, care, and a deep respect for your most cherished moments."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#0D0A09] border border-[#3D2F2A] hover:border-[#C8956C]/30 transition-all duration-500 card-hover"
            >
              {/* Background number */}
              <div className="absolute top-3 right-4 text-7xl font-light text-white/[0.025] select-none pointer-events-none"
                style={{ fontFamily: "var(--font-cormorant,serif)" }}>
                0{i + 1}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#C8956C]/10 border border-[#C8956C]/20 flex items-center justify-center text-[#C8956C] mb-5 group-hover:bg-[#C8956C]/18 transition-colors">
                {ICONS[item.icon]}
              </div>

              <h3 className="text-[#FAF5F0] font-medium text-lg mb-2 group-hover:text-[#C8956C] transition-colors"
                style={{ fontFamily: "var(--font-cormorant,serif)", fontSize: "1.15rem" }}>
                {item.title}
              </h3>
              <p className="text-[#7A6358] text-sm leading-relaxed">{item.description}</p>

              <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#C8956C]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
