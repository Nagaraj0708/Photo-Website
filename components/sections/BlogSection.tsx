import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function BlogSection() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="section-pad bg-[#F8F7F4]">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="tag text-[#6B7280] mb-4">Journal</div>
            <h2
              className="font-editorial text-[#111]"
              style={{
                fontFamily: "var(--font-editorial, Georgia, serif)",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
              }}
            >
              Stories &<br />
              <em className="italic text-[#6B7280]">Inspiration</em>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline shrink-0 self-start sm:self-end">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="card-editorial overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:640px)100vw,33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/95 text-[#111] text-[0.65rem] font-medium tracking-wide rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-[#9CA3AF] text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h3
                    className="font-editorial text-[#111] mb-2 group-hover:text-[#1A73E8] transition-colors line-clamp-2"
                    style={{
                      fontFamily: "var(--font-editorial, Georgia, serif)",
                      fontSize: "1.15rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-[#6B7280] text-[0.8125rem] leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 text-[0.75rem] font-medium text-[#1A73E8]">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
