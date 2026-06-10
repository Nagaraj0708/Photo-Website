"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Camera, Baby, Star, Video } from "lucide-react";
import type { Service } from "@/lib/types";

const ICONS: Record<string, React.ReactNode> = {
  Heart:    <Heart    className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Camera:   <Camera   className="w-5 h-5" />,
  Baby:     <Baby     className="w-5 h-5" />,
  Star:     <Star     className="w-5 h-5" />,
  Video:    <Video    className="w-5 h-5" />,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.09 }}
    >
      <Link href={service.href} className="group block h-full">
        <div className="relative overflow-hidden rounded-3xl bg-[#1C1614] border border-[#3D2F2A] hover:border-[#C8956C]/35 transition-all duration-500 card-hover h-full flex flex-col">
          {/* Image */}
          <div className="relative h-56 img-zoom">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1614] via-black/10 to-transparent" />
            {/* Icon badge */}
            <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-black/55 backdrop-blur-md border border-[#C8956C]/30 flex items-center justify-center text-[#C8956C]">
              {ICONS[service.icon] ?? <Camera className="w-5 h-5" />}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-[#FAF5F0] font-medium text-lg mb-2 group-hover:text-[#C8956C] transition-colors"
              style={{ fontFamily: "var(--font-cormorant, serif)", fontSize: "1.2rem" }}>
              {service.title}
            </h3>
            <p className="text-[#7A6358] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {service.description}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {service.features.slice(0, 3).map((f) => (
                <span key={f} className="px-2.5 py-0.5 text-[0.65rem] rounded-full border border-[#3D2F2A] text-[#7A6358]">
                  {f}
                </span>
              ))}
              {service.features.length > 3 && (
                <span className="px-2.5 py-0.5 text-[0.65rem] rounded-full border border-[#3D2F2A] text-[#3D2F2A]">
                  +{service.features.length - 3}
                </span>
              )}
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#C8956C] group-hover:gap-3 transition-all">
              Explore Service
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom rose line on hover */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8956C] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
