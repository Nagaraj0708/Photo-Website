import Link from "next/link";
import { Check, Gem, ArrowRight } from "lucide-react";
import { pricingPackages } from "@/lib/data";

const tierAccent: Record<string, string> = {
  silver:   "#9CA3AF",
  gold:     "#F59E0B",
  platinum: "#E5E7EB",
  royal:    "#1A73E8",
};

export default function PricingSection() {
  return (
    <section className="section-pad bg-[#F8F7F4]">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="tag text-[#6B7280] mb-4">Investment</div>
            <h2
              className="font-editorial text-[#111]"
              style={{
                fontFamily: "var(--font-editorial, Georgia, serif)",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
              }}
            >
              Transparent
              <br />
              <em className="italic text-[#6B7280]">Pricing</em>
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm max-w-xs leading-relaxed">
            Every package includes our signature cinematic edit and premium delivery.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {pricingPackages.map((pkg) => {
            const accent = tierAccent[pkg.tier] ?? "#111";
            return (
              <div
                key={pkg.id}
                className={`relative bg-white border rounded-sm p-7 flex flex-col transition-all duration-300 hover:shadow-[0_16px_60px_rgba(17,17,17,0.1)] hover:-translate-y-1 ${
                  pkg.popular ? "border-[#1A73E8] ring-1 ring-[#1A73E8]" : "border-[#E5E4E0]"
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1A73E8] text-white text-[0.65rem] font-bold uppercase tracking-wider rounded-full shadow-md">
                      <Gem className="w-2.5 h-2.5" /> Most Popular
                    </span>
                  </div>
                )}

                {/* Tier */}
                <div className="mb-5">
                  <span
                    className="text-label font-bold mb-3 block"
                    style={{ color: accent }}
                  >
                    {pkg.name}
                  </span>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-[#6B7280] text-sm">{pkg.currency}</span>
                    <span
                      className="font-editorial text-[#111]"
                      style={{
                        fontFamily: "var(--font-editorial, Georgia, serif)",
                        fontSize: "clamp(2.5rem, 5vw, 3rem)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {pkg.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-[#9CA3AF] text-xs">{pkg.duration}</span>
                </div>

                <p className="text-[#6B7280] text-[0.8125rem] mb-6 leading-relaxed">{pkg.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-7 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className="w-3.5 h-3.5 mt-0.5 shrink-0"
                        style={{ color: accent }}
                        strokeWidth={2.5}
                      />
                      <span className="text-[#374151] text-[0.8125rem] leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/book?package=${pkg.id}`}
                  className={`flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-semibold uppercase tracking-wide transition-all ${
                    pkg.popular
                      ? "bg-[#1A73E8] hover:bg-[#1557b0] text-white"
                      : "border border-[#E5E4E0] hover:border-[#111] text-[#111] hover:bg-[#111] hover:text-white"
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[#9CA3AF] text-sm mt-8">
          Prices are starting rates.{" "}
          <Link href="/contact" className="text-[#1A73E8] hover:underline">
            Contact us for a custom quote.
          </Link>
        </p>
      </div>
    </section>
  );
}
