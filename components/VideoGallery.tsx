"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, Film } from "lucide-react";
import type { VideoItem } from "@/lib/types";

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <>
      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              onClick={() => setActiveVideo(video)}
              className="group relative w-full text-left overflow-hidden rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#D4AF37]/30 transition-all duration-300 card-hover"
            >
              {/* Thumbnail */}
              <div className="relative h-52 img-zoom">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-[#D4AF37]/40 animate-pulse-gold">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded-lg backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </span>
                </div>

                {/* Category */}
                <div className="absolute top-3 left-3">
                  <span className="flex items-center gap-1 px-2 py-1 bg-[#D4AF37]/90 text-black text-xs font-semibold rounded-lg">
                    <Film className="w-3 h-3" />
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {video.title}
                </h3>
                <p className="text-[#B3B3B3] text-xs line-clamp-2">
                  {video.description}
                </p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl bg-[#1A1A1A] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video embed */}
              <div className="relative pt-[56.25%]">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Video info */}
              <div className="p-5">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {activeVideo.title}
                </h3>
                <p className="text-[#B3B3B3] text-sm">{activeVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
