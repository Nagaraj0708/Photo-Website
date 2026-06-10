"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-[#1C1614] border border-[#3D2F2A] hover:border-[#C8956C]/25 rounded-3xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300">
      {/* Decorative quote */}
      <div className="absolute top-5 right-6 opacity-8">
        <Quote className="w-12 h-12 text-[#C8956C] fill-current" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-[#C8956C] fill-[#C8956C]" />
        ))}
      </div>

      {/* Review */}
      <p className="text-[#C4A99A] text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#3D2F2A]">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C8956C]/30 shrink-0">
          <Image src={testimonial.image} alt={testimonial.name} fill sizes="44px" className="object-cover" />
        </div>
        <div>
          <div className="text-[#FAF5F0] font-medium text-sm">{testimonial.name}</div>
          <div className="text-[#C8956C] text-[0.7rem]">{testimonial.event}</div>
          <div className="text-[#3D2F2A] text-[0.65rem] mt-0.5">{testimonial.date}</div>
        </div>
      </div>
    </div>
  );
}
