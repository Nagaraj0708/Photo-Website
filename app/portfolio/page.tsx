import type { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import Gallery from "@/components/Gallery";
import { portfolioItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio — Our Work",
  description: "Browse our complete portfolio of wedding, reception, pre-wedding, maternity, newborn and event photography by Shiyarah Weddings, Chennai.",
};

export default function PortfolioPage() {
  return (
    <PageWrapper>
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Our Work</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="font-editorial text-[#0E0E0E] leading-none"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
              The<br /><em className="italic text-[#9CA3AF]">Portfolio</em>
            </h1>
            <p className="text-[#6B6B6B] text-[0.9rem] max-w-xs leading-relaxed">
              A curated collection spanning weddings, receptions, pre-weddings, maternity, newborn and milestone events across Chennai.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      <section className="section-pad bg-[#F8F7F4]">
        <div className="container-editorial">
          <Gallery items={portfolioItems} />
        </div>
      </section>
    </PageWrapper>
  );
}
