import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Journal — Photography Tips & Stories",
  description: "Photography tips, wedding planning guides, and behind-the-scenes stories from Shiyarah Weddings, Chennai.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <PageWrapper>
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Journal</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="font-editorial text-[#0E0E0E] leading-none"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(3rem,7vw,6.5rem)", letterSpacing:"-0.04em", lineHeight:0.92, fontWeight:400 }}>
              Stories &amp;<br /><em className="italic text-[#9CA3AF]">Inspiration</em>
            </h1>
            <p className="text-[#6B6B6B] text-[0.9rem] max-w-xs leading-relaxed">Photography tips, wedding guides and behind-the-scenes stories from our team.</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      {/* Featured */}
      {featured && (
        <section className="section-pad bg-[#F8F7F4]">
          <div className="container-editorial">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden" style={{ aspectRatio:"16/10" }}>
                  <Image src={featured.image} alt={featured.title} fill sizes="(max-width:1024px)100vw,50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                </div>
                <div>
                  <span className="tag text-[#C8A96E] mb-5 block">{featured.category}</span>
                  <h2 className="font-editorial text-[#0E0E0E] mb-5 group-hover:text-[#C8A96E] transition-colors"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.75rem,4vw,3rem)", letterSpacing:"-0.03em", lineHeight:1.1, fontWeight:400 }}>
                    {featured.title}
                  </h2>
                  <p className="text-[#6B6B6B] leading-relaxed mb-7 text-[0.9375rem]">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-[#9CA3AF] text-xs mb-8">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    <span className="text-[#EFEDE8]">·</span>
                    <span>{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#0E0E0E] text-sm font-semibold tracking-wide group-hover:text-[#C8A96E] transition-colors">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section-pad bg-white border-t border-[#EFEDE8]">
        <div className="container-editorial">
          <div className="tag text-[#6B6B6B] mb-12">All Articles</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article>
                  <div className="relative overflow-hidden mb-5" style={{ aspectRatio:"3/2" }}>
                    <Image src={post.image} alt={post.title} fill sizes="(max-width:640px)100vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/10 transition-all" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0E0E0E] text-[0.65rem] font-semibold tracking-widest uppercase">{post.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3 text-[#9CA3AF] text-xs">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>·</span><span>{post.date}</span>
                  </div>
                  <h3 className="font-editorial text-[#0E0E0E] mb-2 group-hover:text-[#C8A96E] transition-colors"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", letterSpacing:"-0.02em", lineHeight:1.25, fontWeight:400 }}>
                    {post.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
