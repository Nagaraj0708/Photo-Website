import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all photography services by Shiyarah Weddings — Wedding, Reception, Pre-Wedding, Maternity, Newborn, Engagement, Corporate & Birthday photography in Chennai.",
};

export default function ServicesPage() {
  return (
    <PageWrapper>

      {/* ── Header ── */}
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">What We Offer</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="font-editorial text-[#0E0E0E] leading-none"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
              Our<br /><em className="italic text-[#9CA3AF]">Services</em>
            </h1>
            <p className="text-[#6B6B6B] text-[0.9rem] max-w-xs leading-relaxed">
              From grand Tamil weddings to intimate newborn sessions — we cover every milestone with cinematic artistry.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      {/* ── Services Grid ── */}
      <section className="section-pad bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative overflow-hidden bg-white border border-[#EFEDE8] hover:border-[#C8A96E]/40 transition-all duration-500 hover:shadow-[0_12px_50px_rgba(14,14,14,0.08)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: i === 0 ? "16/8" : "16/9" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width:768px)100vw,50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/50 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="font-editorial text-[#0E0E0E]"
                      style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)", letterSpacing:"-0.025em", fontWeight:400 }}>
                      {service.title}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#C8A96E] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((f) => (
                      <span key={f} className="px-3 py-1 bg-[#F8F7F4] border border-[#EFEDE8] text-[#6B6B6B] text-xs">
                        {f}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-3 py-1 text-[#C8A96E] text-xs">+{service.features.length - 3} more</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            {/* Extra services not in services array */}
            {[
              {
                id: "engagement",
                title: "Engagement Photography",
                description: "Capture the magic of your engagement — intimate, joyful and full of emotion, at your favourite locations.",
                image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=85",
                tags: ["2–4 Hours", "Multiple Locations", "Cinematic Clip"],
              },
              {
                id: "corporate",
                title: "Corporate Events",
                description: "Professional documentation for conferences, product launches, award nights and brand events across Chennai.",
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=85",
                tags: ["Full Day", "4K Video", "Commercial License"],
              },
              {
                id: "birthday",
                title: "Birthday Celebrations",
                description: "Milestone birthdays captured with joy — from kids' cake smashes to elegant adult celebrations.",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85",
                tags: ["2–6 Hours", "Highlight Reel", "Same-Day Delivery"],
              },
            ].map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative overflow-hidden bg-white border border-[#EFEDE8] hover:border-[#C8A96E]/40 transition-all duration-500 hover:shadow-[0_12px_50px_rgba(14,14,14,0.08)]"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio:"16/9" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width:768px)100vw,50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/50 via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="font-editorial text-[#0E0E0E]"
                      style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)", letterSpacing:"-0.025em", fontWeight:400 }}>
                      {service.title}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#C8A96E] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[#F8F7F4] border border-[#EFEDE8] text-[#6B6B6B] text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#0E0E0E] text-center">
        <div className="container-editorial" style={{ maxWidth:600 }}>
          <div className="tag text-[#C8A96E] mb-5">Not Sure Which Service?</div>
          <h2 className="font-editorial text-white mb-5"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", letterSpacing:"-0.035em", fontWeight:400 }}>
            Let&apos;s Find the
            <br /><em className="italic text-white/40">Perfect Package</em>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">Contact Aslam and we&apos;ll craft a bespoke package for your exact vision and budget.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="btn-accent">View Pricing <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[0.8125rem] font-medium tracking-[0.05em] uppercase hover:border-white/50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
