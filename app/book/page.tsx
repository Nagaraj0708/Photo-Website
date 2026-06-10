import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book a Session — Shiyarah Weddings",
  description:
    "Book your photography session with Shiyarah Weddings in Chennai. Wedding, pre-wedding, maternity, newborn, engagement and more — enquire now.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string; service?: string }>;
}) {
  const { package: pkg, service } = await searchParams;
  return (
    <>
      <Navbar />
      {/* No PageWrapper — we handle the layout ourselves for full-viewport */}
      <BookPageClient preselectedService={service} preselectedPackage={pkg} />
      <Footer />
    </>
  );
}
