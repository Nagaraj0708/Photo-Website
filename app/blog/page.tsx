import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight, Lock, Images } from "lucide-react";
import { blogPosts, weddingAlbums } from "@/lib/data";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Journal — Photography Tips & Stories",
  description:
    "Photography tips, wedding planning guides, and behind-the-scenes stories from Shiyarah Weddings, Chennai.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <PageWrapper>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="pt-12 pb-10 bg-[#F8F7F4]">
        <div className="container-editorial">
          <div className="tag text-[#C8A96E] mb-5">Journal</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1
              className="font-editorial text-[#0E0E0E] leading-none"
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(3rem,7vw,6.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                fontWeight: 400,
              }}
            >
              Stories &amp;<br />
              <em className="italic text-[#9CA3AF]">Inspiration</em>
            </h1>
            <p className="text-[#6B6B6B] text-[0.9rem] max-w-xs leading-relaxed">
              Photography tips, wedding guides and behind-the-scenes stories from our team.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      {/* ── Wedding Albums ──────────────────────────────────────────────── */}
      <section className="section-pad bg-[#0E0E0E]">
        <div className="container-editorial">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Images className="w-4 h-4 text-[#C8A96E]" />
                <span
                  className="text-[#C8A96E]"
                  style={{ fontSize: 10, letterSpacing: "0.28em", fontWeight: 500 }}
                >
                  PRIVATE GALLERIES
                </span>
              </div>
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                Wedding Albums
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Private galleries for our couples. Click a card to view — password required.
            </p>
          </div>

          {/* Albums grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingAlbums.map((album) => {
              const isLive = album.pixiesetUrl !== null;

              const cardContent = (
                <>
                  {/* Cover photo */}
                  <Image
                    src={album.coverImage}
                    alt={album.couple}
                    fill
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    className={`object-cover transition-transform duration-700 ${isLive ? "group-hover:scale-105" : "grayscale opacity-60"}`}
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/90 via-[#0E0E0E]/30 to-transparent" />
                  {isLive && (
                    <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/20 transition-all duration-300" />
                  )}

                  {/* Category / status badge */}
                  <div className="absolute top-4 left-4">
                    {isLive ? (
                      <span
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 border border-white/15"
                        style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 500 }}
                      >
                        {album.category.toUpperCase()}
                      </span>
                    ) : (
                      <span
                        className="px-3 py-1 bg-white/5 backdrop-blur-sm text-white/40 border border-white/10"
                        style={{ fontSize: 9, letterSpacing: "0.22em", fontWeight: 500 }}
                      >
                        YET TO ADD
                      </span>
                    )}
                  </div>

                  {/* Lock / clock icon top-right */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                      {isLive ? (
                        <Lock className="w-3.5 h-3.5 text-[#C8A96E]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-white/30" />
                      )}
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-2">
                      {album.date}
                    </p>
                    <h3
                      className={`text-white mb-1 transition-colors ${isLive ? "group-hover:text-[#C8A96E]" : "opacity-50"}`}
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                        fontWeight: 400,
                        fontStyle: "italic",
                        lineHeight: 1.2,
                      }}
                    >
                      {album.couple}
                    </h3>
                    <p className="text-white/40 text-xs">{album.venue}</p>

                    {/* CTA hint */}
                    <div className={`flex items-center gap-2 mt-4 transition-opacity duration-300 ${isLive ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                      {isLive ? (
                        <>
                          <span className="text-[#C8A96E] text-xs tracking-widest uppercase">View Gallery</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A96E]" />
                        </>
                      ) : (
                        <span className="text-white/25 text-xs tracking-widest uppercase italic">Coming soon</span>
                      )}
                    </div>
                  </div>
                </>
              );

              return isLive ? (
                <a
                  key={album.id}
                  href={`https://shiyarahweddings.pixieset.com/${album.pixiesetUrl}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  {cardContent}
                </a>
              ) : (
                <div
                  key={album.id}
                  className="relative overflow-hidden cursor-default"
                  style={{ aspectRatio: "4/5" }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#EFEDE8]" />

      {/* ── Featured article ────────────────────────────────────────────── */}
      {featured && (
        <section className="section-pad bg-[#F8F7F4]">
          <div className="container-editorial">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width:1024px)100vw,50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div>
                  <span className="tag text-[#C8A96E] mb-5 block">{featured.category}</span>
                  <h2
                    className="font-editorial text-[#0E0E0E] mb-5 group-hover:text-[#C8A96E] transition-colors"
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "clamp(1.75rem,4vw,3rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      fontWeight: 400,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#6B6B6B] leading-relaxed mb-7 text-[0.9375rem]">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-5 text-[#9CA3AF] text-xs mb-8">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
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

      {/* ── All articles grid ───────────────────────────────────────────── */}
      <section className="section-pad bg-white border-t border-[#EFEDE8]">
        <div className="container-editorial">
          <div className="tag text-[#6B6B6B] mb-12">All Articles</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article>
                  <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/2" }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width:640px)100vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0E0E0E]/0 group-hover:bg-[#0E0E0E]/10 transition-all" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0E0E0E] text-[0.65rem] font-semibold tracking-widest uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3 text-[#9CA3AF] text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3
                    className="font-editorial text-[#0E0E0E] mb-2 group-hover:text-[#C8A96E] transition-colors"
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.2rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      fontWeight: 400,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
