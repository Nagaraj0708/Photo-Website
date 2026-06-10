import SectionHeader from "@/components/SectionHeader";
import VideoGallery from "@/components/VideoGallery";
import { featuredVideos } from "@/lib/data";

export default function FeaturedVideos() {
  return (
    <section className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cinematic Films"
          title="Featured"
          titleHighlight="Videos"
          description="Watch our cinematic wedding films and see how we transform your love story into a timeless masterpiece."
          className="mb-14"
        />
        <VideoGallery videos={featuredVideos} />
      </div>
    </section>
  );
}
