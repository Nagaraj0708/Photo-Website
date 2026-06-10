import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import PricingPageClient from "@/app/pricing/PricingPageClient";
import { studioInfo } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description: "Transparent pricing for wedding, reception, pre-wedding, maternity, newborn, engagement, corporate & birthday photography in Chennai by Shiyarah Weddings.",
};

const faqs = [
  { q: "What's included in every package?", a: "All packages include professionally edited high-resolution digital files delivered via a private online gallery within the promised timeframe." },
  { q: "How soon will we receive our photos?", a: "Sneak peeks within 48 hours. Full gallery delivered in 7–14 days depending on your package tier. Premium packages get priority delivery." },
  { q: "Can we customise a package?", a: "Absolutely. Contact Aslam directly and we'll craft a bespoke package tailored exactly to your event, venue, and vision." },
  { q: "Is a deposit required to book?", a: "Yes — a 30% deposit secures your date. The remaining balance is due one week before the event." },
  { q: "Do you travel outside Chennai?", a: "Yes — we cover all of Tamil Nadu and are available for destination shoots across India. Travel costs are quoted separately." },
  { q: "Are the prices final?", a: "Our packages are priced for the quality we deliver. We do offer seasonal discounts and bundle deals for back-to-back events — just ask." },
];

export default function PricingPage() {
  return (
    <PageWrapper>

      {/* ── Header ── */}
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Investment</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="font-editorial text-[#0E0E0E] leading-none"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
              Services &amp;<br /><em className="italic text-[#9CA3AF]">Packages</em>
            </h1>
            <p className="text-[#6B6B6B] text-[0.9rem] max-w-xs leading-relaxed">
              Select a service to explore our packages. Every package includes our signature cinematic edit and premium delivery.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      {/* ── Interactive Pricing ── */}
      <PricingPageClient />

      {/* ── FAQ ── */}
      <section className="section-pad bg-[#F8F7F4]">
        <div className="container-editorial" style={{ maxWidth:760 }}>
          <div className="tag text-[#6B6B6B] mb-6">FAQ</div>
          <h2 className="font-editorial text-[#0E0E0E] mb-14"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3.5rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
            Questions <em className="italic text-[#9CA3AF]">Answered</em>
          </h2>
          <div className="divide-y divide-[#EFEDE8]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-7">
                <h3 className="text-[#0E0E0E] font-semibold mb-3 text-[0.9375rem]">{faq.q}</h3>
                <p className="text-[#6B6B6B] leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#0E0E0E] text-center">
        <div className="container-editorial" style={{ maxWidth:600 }}>
          <div className="tag text-[#C8A96E] mb-5">Ready to Begin?</div>
          <h2 className="font-editorial text-white mb-5"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.035em", fontWeight:400 }}>
            Let&apos;s Tell<br /><em className="italic text-white/40">Your Story</em>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">Slots fill quickly during peak wedding season. Reach out to Aslam today.</p>
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
