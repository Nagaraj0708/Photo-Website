import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      {/* spacer pushes content below fixed nav */}
      <div style={{ height: "var(--nav-height)" }} aria-hidden="true" />
      <main className="min-h-[75vh] bg-[#F8F7F4] flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="select-none leading-none mb-6"
            style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(8rem,25vw,18rem)", letterSpacing:"-0.06em", lineHeight:1, color:"rgba(14,14,14,0.04)", fontWeight:400 }}>
            404
          </div>
          <h1 className="font-editorial text-[#0E0E0E] mb-4"
            style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,5vw,3.5rem)", letterSpacing:"-0.03em", lineHeight:1.1, marginTop:"-4rem", fontWeight:400 }}>
            Page Not Found
          </h1>
          <p className="text-[#6B6B6B] text-base leading-relaxed mb-12 max-w-sm mx-auto">
            This page seems to have wandered off like a perfect golden-hour shot. Let us guide you back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary"><ArrowLeft className="w-4 h-4" /> Back to Home</Link>
            <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
