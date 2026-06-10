import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — full-bleed image under nav */}
        <div className="relative bg-[#0E0E0E]" style={{ minHeight:"60vh", paddingTop:"var(--nav-height)" }}>
          <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover opacity-55" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />
          <div className="relative z-10 container-editorial flex flex-col justify-end pb-16 pt-20">
            <span className="tag text-[#C8A96E] mb-5">{post.category}</span>
            <h1 className="font-editorial text-white max-w-3xl"
              style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,5vw,4.5rem)", letterSpacing:"-0.035em", lineHeight:1.05, fontWeight:400 }}>
              {post.title}
            </h1>
          </div>
        </div>

        {/* Meta bar */}
        <div className="bg-white border-b border-[#EFEDE8]">
          <div className="container-editorial py-5 flex flex-wrap items-center gap-6">
            <Link href="/blog" className="flex items-center gap-1.5 text-[#6B6B6B] text-sm hover:text-[#0E0E0E] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Link>
            <span className="flex items-center gap-2 text-[#9CA3AF] text-xs">
              <Image src={post.authorImage} alt={post.author} width={24} height={24} className="rounded-full object-cover" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5 text-[#9CA3AF] text-xs"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            <span className="flex items-center gap-1.5 text-[#9CA3AF] text-xs"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
          </div>
        </div>

        {/* Content */}
        <section className="section-pad bg-[#F8F7F4]">
          <div className="container-editorial" style={{ maxWidth:760 }}>
            <p className="text-[#374151] text-lg leading-[1.85] mb-10 font-light">{post.excerpt}</p>
            <div className="rule-thin mb-12" />
            <div className="space-y-6 text-[#374151] text-[0.9375rem] leading-[1.85]">
              <p>Photography is more than clicking a button — it&apos;s about understanding light, composition, emotion, and the story you want to tell. At Shiyarah Weddings, we believe every photograph should evoke feeling and preserve a moment that can never be recreated.</p>
              <p>Whether you&apos;re preparing for your Tamil wedding, planning a sunrise pre-wedding shoot at Mahabalipuram, or celebrating a new life with a maternity session — the key is to trust your photographer and let your authentic emotions shine through.</p>
              <h2 className="font-editorial text-[#0E0E0E] pt-6"
                style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.75rem", letterSpacing:"-0.025em", fontWeight:400 }}>
                Key Preparation Tips
              </h2>
              <ul className="space-y-4">
                {["Plan your outfits at least two weeks in advance","Choose locations that carry personal meaning","Stay relaxed — genuine emotion always wins","Communicate your vision clearly with your photographer","Get a full night's rest before the shoot"].map((tip) => (
                  <li key={tip} className="flex items-start gap-4">
                    <span className="accent-line mt-3 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-12 border-t border-[#EFEDE8] mt-12">
              <Tag className="w-3.5 h-3.5 text-[#9CA3AF]" />
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs border border-[#EFEDE8] text-[#6B6B6B] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors cursor-default">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section-pad bg-white border-t border-[#EFEDE8]">
          <div className="container-editorial">
            <div className="tag text-[#6B6B6B] mb-5">Continue Reading</div>
            <h2 className="font-editorial text-[#0E0E0E] mb-12"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.75rem,4vw,3rem)", letterSpacing:"-0.025em", fontWeight:400 }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio:"3/2" }}>
                    <Image src={rel.image} alt={rel.title} fill sizes="(max-width:640px)100vw,33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <span className="tag text-[#C8A96E] mb-2 block">{rel.category}</span>
                  <h3 className="font-editorial text-[#0E0E0E] group-hover:text-[#C8A96E] transition-colors"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", letterSpacing:"-0.02em", lineHeight:1.25, fontWeight:400 }}>
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
