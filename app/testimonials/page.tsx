import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { testimonials, studioInfo } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Testimonials — Client Stories",
  description: "Read what our clients say about Shiyarah Weddings. 4.9★ average from 800+ happy couples.",
};

export default function TestimonialsPage() {
  return (
    <PageWrapper>
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Client Love</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <h1 className="font-editorial text-[#0E0E0E] leading-none"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
              What Clients<br /><em className="italic text-[#9CA3AF]">Say</em>
            </h1>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 text-[#C8A96E] fill-[#C8A96E]" />)}
              </div>
              <p className="text-[#0E0E0E] font-semibold text-lg leading-none">4.9 / 5.0</p>
              <p className="text-[#9CA3AF] text-xs tracking-widest uppercase">800+ Reviews</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      <section className="section-pad bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id}
                className="flex flex-col p-8 hover:shadow-[0_8px_40px_rgba(14,14,14,0.07)] transition-shadow duration-300"
                style={{ background: i % 7 === 0 ? "#0E0E0E" : "white", border: i % 7 === 0 ? "none" : "1px solid #EFEDE8" }}>
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#C8A96E]" style={{ color:"#C8A96E" }} />
                  ))}
                </div>
                <p className="text-[0.875rem] leading-[1.85] flex-1 mb-6"
                  style={{ color: i % 7 === 0 ? "rgba(255,255,255,0.65)" : "#374151" }}>
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-5"
                  style={{ borderTop: i % 7 === 0 ? "1px solid rgba(255,255,255,0.1)" : "1px solid #EFEDE8" }}>
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                    <Image src={t.image} alt={t.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-none mb-1" style={{ color: i % 7 === 0 ? "white" : "#0E0E0E" }}>{t.name}</p>
                    <p className="text-[#C8A96E] text-xs">{t.event}</p>
                    <p className="text-xs mt-0.5" style={{ color: i % 7 === 0 ? "rgba(255,255,255,0.3)" : "#9CA3AF" }}>{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#0E0E0E] text-center">
        <div className="container-editorial" style={{ maxWidth:600 }}>
          <div className="tag text-[#C8A96E] mb-6">Join the Family</div>
          <h2 className="font-editorial text-white mb-5"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.035em", fontWeight:400 }}>
            Become Our Next<br /><em className="italic text-white/40">Happy Couple</em>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">800+ families trust Shiyarah Weddings. Let Aslam tell your love story.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book" className="btn-accent">Book a Session <ArrowRight className="w-4 h-4" /></Link>
            <a href={studioInfo.whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[0.8125rem] font-medium tracking-[0.05em] uppercase hover:border-white/50 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
