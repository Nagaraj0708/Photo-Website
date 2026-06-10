"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { studioInfo } from "@/lib/data";

const IgBigIcon = () => (
  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const IgSmIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const socialImages = [
  { id: "s1", src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80", alt: "Wedding" },
  { id: "s2", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80", alt: "Reception" },
  { id: "s3", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Pre-wedding" },
  { id: "s4", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80", alt: "Maternity" },
  { id: "s5", src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80", alt: "Baby" },
  { id: "s6", src: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=400&q=80", alt: "Ceremony" },
  { id: "s7", src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80", alt: "Events" },
  { id: "s8", src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80", alt: "Couple" },
];

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#1C1614]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="@shiyarahweddings"
          title="Follow Our"
          titleHighlight="Journey"
          description="Daily glimpses from behind the lens. Tag us to be featured."
          className="mb-12"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialImages.map((img, i) => (
            <motion.a
              key={img.id}
              href={studioInfo.instagram}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#2E2421]"
            >
              <Image
                src={img.src} alt={img.alt} fill
                sizes="(max-width:640px)50vw,25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#C8956C]/0 group-hover:bg-[#C8956C]/25 transition-all duration-300 flex items-center justify-center">
                <IgBigIcon />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-9"
        >
          <a
            href={studioInfo.instagram}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#3D2F2A] hover:border-[#C8956C]/50 text-[#7A6358] hover:text-[#C8956C] rounded-full transition-all text-sm"
          >
            <IgSmIcon />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
