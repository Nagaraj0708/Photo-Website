import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { services, portfolioItems, studioInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Extra services not in the data services array
const extraServices = [
  { id:"engagement", title:"Engagement Photography", description:"Capture the magic of your engagement — intimate, joyful, and full of emotion at your favourite locations.", image:"https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=85", features:["2–4 Hours Coverage","1–2 Photographers","Cinematic Highlight Clip","Multiple Location Changes","Online Gallery","High-Res Digital Files"] },
  { id:"corporate",  title:"Corporate Events",       description:"Professional documentation for conferences, product launches, award nights and brand events across Chennai.", image:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85", features:["Half to Full Day","2 Photographers","Event Highlight Reel","Stage & Speaker Coverage","Commercial Usage License","Fast Turnaround"] },
  { id:"birthday",   title:"Birthday Celebrations",  description:"Milestone birthdays captured with joy — from cake smashes to elegant adult celebrations.", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85", features:["2–6 Hours Coverage","1–2 Photographers","Highlight Reel","Candid & Styled Moments","Online Gallery","Quick Digital Delivery"] },
];

export async function generateStaticParams() {
  return [
    ...services.map((s) => ({ service: s.id })),
    ...extraServices.map((s) => ({ service: s.id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: sid } = await params;
  const s = services.find((x) => x.id === sid) ?? extraServices.find((x) => x.id === sid);
  if (!s) return { title: "Service Not Found" };
  return { title: `${s.title} | Shiyarah Weddings`, description: s.description, openGraph: { images: [{ url: s.image }] } };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: sid } = await params;
  const service = services.find((x) => x.id === sid) ?? extraServices.find((x) => x.id === sid);
  if (!service) notFound();

  const related = portfolioItems
    .filter((item) => item.category === sid || item.category === `${sid}s` || item.category === "weddings")
    .slice(0, 6);

  const processSteps = [
    { n:"01", title:"Initial Consultation",      desc:"We understand your vision, venue, and any specific requests — over a call or in person in Chennai." },
    { n:"02", title:"Date & Package Confirmed",  desc:"Once you confirm and pay the deposit, your date is locked. We handle all planning from here." },
    { n:"03", title:"Day of the Event",          desc:"Our team arrives early, captures every moment with care, and ensures nothing is missed." },
    { n:"04", title:"Editing & Delivery",        desc:"Sneak peeks in 48 hours. Full gallery delivered in 7–14 days via a private online gallery." },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* ── Full-bleed Hero (behind nav) ── */}
        <section className="relative flex items-end bg-[#0E0E0E]"
          style={{ minHeight:"80vh", paddingTop:"var(--nav-height)" }}>
          <div className="absolute inset-0">
            <Image src={service.image} alt={service.title} fill sizes="100vw" className="object-cover opacity-55" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-[#0E0E0E]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/40 to-transparent" />
          </div>

          <div className="relative z-10 container-lumina pb-20 pt-10">
            <div className="tag text-[#C8A96E] mb-5">Shiyarah Weddings</div>
            <h1 className="font-editorial text-white mb-5 max-w-2xl"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2.5rem,7vw,7rem)", letterSpacing:"-0.04em", lineHeight:0.9, fontWeight:400 }}>
              {service.title}
            </h1>
            <p className="text-white/60 text-[0.9375rem] max-w-lg mb-10 leading-relaxed">{service.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/pricing?service=${service.id}`} className="btn-accent">
                View Packages <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={studioInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-[0.8125rem] font-medium tracking-[0.05em] uppercase hover:border-white/60 transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ── Included + Process ── */}
        <section className="section-pad bg-[#F8F7F4]">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

              {/* What's included */}
              <div>
                <div className="tag text-[#6B6B6B] mb-5">What&apos;s Included</div>
                <h2 className="font-editorial text-[#0E0E0E] mb-10"
                  style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
                  Every Package<br /><em className="italic text-[#9CA3AF]">Includes</em>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-4 bg-white border border-[#EFEDE8] hover:border-[#C8A96E]/40 transition-colors">
                      <div className="w-6 h-6 bg-[#C8A96E]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#C8A96E]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[#374151] text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/pricing" className="btn-outline">See Full Pricing <ArrowRight className="w-4 h-4" /></Link>
              </div>

              {/* Process */}
              <div>
                <div className="tag text-[#6B6B6B] mb-5">How It Works</div>
                <h2 className="font-editorial text-[#0E0E0E] mb-10"
                  style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
                  Our<br /><em className="italic text-[#9CA3AF]">Process</em>
                </h2>
                <div className="divide-y divide-[#EFEDE8]">
                  {processSteps.map((step) => (
                    <div key={step.n} className="flex items-start gap-6 py-6">
                      <span className="text-[#C8A96E]/40 shrink-0 w-10"
                        style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.25rem", fontWeight:400 }}>
                        {step.n}
                      </span>
                      <div>
                        <h3 className="text-[#0E0E0E] font-semibold text-sm mb-1.5">{step.title}</h3>
                        <p className="text-[#6B6B6B] text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Portfolio Preview ── */}
        {related.length > 0 && (
          <section className="section-pad bg-white border-t border-[#EFEDE8]">
            <div className="container-editorial">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="tag text-[#6B6B6B] mb-4">From Our Portfolio</div>
                  <h2 className="font-editorial text-[#0E0E0E]"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
                    {service.title} <em className="italic text-[#9CA3AF]">Gallery</em>
                  </h2>
                </div>
                <Link href="/portfolio" className="hidden sm:flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((item) => (
                  <Link key={item.id} href="/portfolio"
                    className="group relative overflow-hidden bg-[#EFEDE8]"
                    style={{ aspectRatio:`${item.width}/${item.height}` }}>
                    <Image src={item.image} alt={item.title} fill
                      sizes="(max-width:640px)50vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/20 transition-all duration-500" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-28 bg-[#0E0E0E] text-center">
          <div className="container-editorial" style={{ maxWidth:620 }}>
            <div className="tag text-[#C8A96E] mb-6">Ready to Book?</div>
            <h2 className="font-editorial text-white mb-5"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.035em", fontWeight:400 }}>
              Book Your<br /><em className="italic text-white/40">{service.title}</em>
            </h2>
            <p className="text-white/40 mb-10 leading-relaxed">Limited slots available. Contact Aslam today to check availability.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/book?service=${service.id}`} className="btn-accent">Book Now <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[0.8125rem] font-medium tracking-[0.05em] uppercase hover:border-white/50 transition-colors">
                Ask a Question
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
