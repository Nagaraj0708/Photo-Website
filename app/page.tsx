import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import FilmsSection from "@/components/sections/FilmsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingSection from "@/components/sections/BookingSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shiyarah Weddings — Crafting Timeless Love Stories",
  description:
    "Award-winning wedding photography & cinematography in Chennai by Aslam. Weddings, receptions, pre-weddings, maternity & newborn photography.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ManifestoSection />
        <HorizontalGallery />
        <PortfolioGrid />
        <ProcessSection />
        <FilmsSection />
        <StatsSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
