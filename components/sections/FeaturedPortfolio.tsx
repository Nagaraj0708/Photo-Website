"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { portfolioItems } from "@/lib/data";

const featured = portfolioItems.filter((item) => item.featured);

// Display in a premium masonry-style layout
const layoutMap = [
  "col-span-1 row-span-2",  // tall
  "col-span-1 row-span-1",  // normal
  "col-span-1 row-span-1",  // normal
  "col-span-1 row-span-2",  // tall
  "col-span-1 row-span-1",  // normal
  "col-span-1 row-span-1",  // normal
];

export default function FeaturedPortfolio() {
  return (
    <section className="py-20 sm:py-28 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="Our Work"
            title="Featured"
            titleHighlight="Portfolio"
            description="A curated selection of our finest work across weddings, portraits, and celebrations."
            centered={false}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="group shrink-0 flex items-center gap-2 px-6 py-3 border border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#B3B3B3] hover:text-[#D4AF37] rounded-full transition-all text-sm font-medium"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-4 sm:grid-rows-2 gap-4 auto-rows-[200px] sm:auto-rows-[280px]">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={layoutMap[index] || "col-span-1 row-span-1"}
            >
              <Link href="/portfolio" className="group relative block w-full h-full overflow-hidden rounded-2xl bg-[#1A1A1A]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                {/* Title reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-[#D4AF37] text-xs capitalize">{item.category.replace("-", " ")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Category quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {["Weddings", "Reception", "Pre-Wedding", "Maternity", "Baby Shoots", "Events"].map((cat) => (
            <Link
              key={cat}
              href={`/portfolio?category=${cat.toLowerCase().replace(" ", "-")}`}
              className="px-4 py-1.5 text-xs border border-[#2A2A2A] hover:border-[#D4AF37]/50 text-[#B3B3B3] hover:text-[#D4AF37] rounded-full transition-all"
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
