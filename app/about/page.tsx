import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { teamMembers, awards, studioInfo } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description:
    "Meet Aslam and the team behind Shiyarah Weddings — Chennai's award-winning luxury photography studio.",
};

export default function AboutPage() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="pt-12 pb-24 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="tag text-[#C8A96E] mb-6">Our Story</div>
              <h1
                className="font-editorial text-[#0E0E0E] mb-8 leading-none"
                style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}
              >
                Where Passion
                <br />
                <em className="italic text-[#9CA3AF]">Meets Craft</em>
              </h1>
              <p className="text-[#374151] text-base leading-[1.8] mb-5 max-w-md">
                Founded in 2019 by <strong className="font-semibold text-[#0E0E0E]">Aslam</strong>, Shiyarah Weddings
                was built on one belief — every family deserves photographs that feel like paintings,
                and films that move like poetry.
              </p>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed mb-10 max-w-md">
                What started as one photographer with a camera has grown into Chennai's most celebrated
                luxury studio, with a team of artists who share an unwavering passion for storytelling.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value:"800+", label:"Happy Couples" },
                  { value:"400+", label:"Weddings" },
                  { value:"6+",   label:"Years" },
                  { value:"4.9★", label:"Google Rating" },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 border-[#C8A96E] pl-4">
                    <div className="text-[#0E0E0E] leading-none mb-1"
                      style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:400 }}>
                      {s.value}
                    </div>
                    <div className="text-[#9CA3AF] text-xs tracking-widest uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden" style={{ aspectRatio:"4/5" }}>
                <Image
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85"
                  alt="Aslam — Founder, Shiyarah Weddings"
                  fill sizes="(max-width:1024px)100vw,50vw"
                  className="object-cover" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white mb-0.5" style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.25rem", fontWeight:400 }}>Aslam</p>
                  <p className="text-white/60 text-sm">Founder & Lead Photographer</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 w-48 h-48 border border-[#EFEDE8] -z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-pad bg-[#0E0E0E]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-14">What Drives Us</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
            {[
              { n:"01", title:"Emotion First",      desc:"We don't just take photos — we wait for the exact moment that holds an entire feeling." },
              { n:"02", title:"Cinematic Light",    desc:"Every frame is composed with the same intention as a scene from a feature film." },
              { n:"03", title:"Tamil Heritage",     desc:"We understand the rituals, colours, and culture of Tamil celebrations intimately." },
              { n:"04", title:"Client Comfort",     desc:"We create a relaxed, joyful atmosphere so your personality shines through naturally." },
              { n:"05", title:"Obsessive Quality",  desc:"Each gallery goes through multiple rounds of meticulous editing before delivery." },
              { n:"06", title:"Timely Delivery",    desc:"Sneak peeks in 48 hours, full gallery in 7–14 days — we never keep you waiting." },
            ].map((v) => (
              <div key={v.n} className="bg-[#0E0E0E] p-10 border border-white/6">
                <div className="text-white/10 mb-6" style={{ fontFamily:"'Playfair Display',serif", fontSize:"3rem", fontWeight:400, lineHeight:1 }}>{v.n}</div>
                <h3 className="text-white font-medium text-lg mb-3">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-pad bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#6B6B6B] mb-5">Journey</div>
          <h2 className="font-editorial text-[#0E0E0E] mb-16"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
            Our <em className="italic text-[#9CA3AF]">Story So Far</em>
          </h2>
          <div className="space-y-0 divide-y divide-[#EFEDE8]">
            {[
              { year:"2019", title:"Studio Founded",         desc:"Aslam started Shiyarah Weddings with one camera, one dream, and an obsession for light." },
              { year:"2020", title:"First 100 Weddings",     desc:"Reached 100 weddings and earned our first 5-star Google average within 18 months." },
              { year:"2021", title:"Cinema Expansion",       desc:"Launched full cinematic filmmaking with a licensed drone team and 4K production setup." },
              { year:"2022", title:"Rising Studio Award",    desc:"Named Fastest Growing Luxury Studio in South India by Photography Guild India." },
              { year:"2023", title:"1000+ Happy Clients",    desc:"Crossed the 1,000 client milestone — still growing, still 4.9★ on Google." },
              { year:"2025", title:"New Studio, Anna Nagar", desc:"Opened our state-of-the-art studio and consultation space in Anna Nagar East, Chennai." },
            ].map((item) => (
              <div key={item.year} className="grid grid-cols-[5rem_1fr] sm:grid-cols-[8rem_1fr] gap-6 py-7 items-start">
                <div>
                  <span className="text-[#C8A96E]" style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.25rem", fontWeight:400 }}>{item.year}</span>
                </div>
                <div>
                  <h3 className="text-[#0E0E0E] font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-pad bg-white border-t border-[#EFEDE8]">
        <div className="container-editorial">
          <div className="tag text-[#6B6B6B] mb-5">The Team</div>
          <h2 className="font-editorial text-[#0E0E0E] mb-16"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
            Meet Our <em className="italic text-[#9CA3AF]">Artists</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((m) => (
              <div key={m.id} className="group">
                <div className="relative overflow-hidden mb-5" style={{ aspectRatio:"3/4" }}>
                  <Image src={m.image} alt={m.name} fill sizes="(max-width:640px)100vw,25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/15 transition-all duration-500" />
                </div>
                <h3 className="text-[#0E0E0E] font-semibold text-base mb-0.5">{m.name}</h3>
                <p className="text-[#C8A96E] text-xs font-medium tracking-widest uppercase mb-2">{m.role}</p>
                <p className="text-[#6B6B6B] text-[0.8125rem] leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="section-pad bg-[#F8F7F4] border-t border-[#EFEDE8]">
        <div className="container-editorial" style={{ maxWidth:800 }}>
          <div className="tag text-[#6B6B6B] mb-5">Recognition</div>
          <h2 className="font-editorial text-[#0E0E0E] mb-14"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,4vw,3.5rem)", letterSpacing:"-0.03em", fontWeight:400 }}>
            Awards &amp; <em className="italic text-[#9CA3AF]">Achievements</em>
          </h2>
          <div className="divide-y divide-[#EFEDE8]">
            {awards.map((a) => (
              <div key={a.id} className="flex items-start gap-8 py-7">
                <div className="text-[#C8A96E] shrink-0 w-14"
                  style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:400 }}>
                  {a.year}
                </div>
                <div>
                  <h3 className="text-[#0E0E0E] font-semibold mb-1">{a.title}</h3>
                  <p className="text-[#C8A96E] text-xs font-medium tracking-widest uppercase mb-2">{a.organization}</p>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#0E0E0E] text-center">
        <div className="container-editorial" style={{ maxWidth:620 }}>
          <div className="tag text-[#C8A96E] mb-6">Ready to Begin?</div>
          <h2 className="font-editorial text-white mb-5"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,4rem)", letterSpacing:"-0.035em", fontWeight:400 }}>
            Let&apos;s Create<br />
            <em className="italic text-white/40">Something Beautiful</em>
          </h2>
          <p className="text-white/40 mb-10 leading-relaxed">Reach out to Aslam directly on WhatsApp or fill out our booking form.</p>
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
