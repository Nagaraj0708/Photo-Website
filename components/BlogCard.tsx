"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/20 rounded-2xl overflow-hidden transition-all duration-300 card-hover h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 img-zoom">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent" />
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#D4AF37]/90 text-black text-xs font-semibold rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-[#B3B3B3] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[#666] text-xs mb-4 pt-4 border-t border-[#2A2A2A]">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </div>
            </div>

            {/* Read more */}
            <div className="flex items-center gap-1.5 text-sm text-[#D4AF37] font-medium group-hover:gap-2.5 transition-all">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
