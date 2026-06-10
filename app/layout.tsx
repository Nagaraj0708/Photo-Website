import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://shiyarahweddings.com"),
  title: {
    default: "Shiyarah Weddings — Crafting Timeless Love Stories",
    template: "%s · Shiyarah Weddings",
  },
  description:
    "Award-winning wedding photography & cinematography studio in Chennai. Weddings, receptions, pre-weddings, maternity, newborn, engagement, corporate & birthday events.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "shiyarah weddings",
    "wedding photography chennai",
    "luxury wedding photographer chennai",
    "cinematic wedding film chennai",
    "pre-wedding shoot chennai",
    "maternity photography chennai",
    "newborn photography chennai",
    "engagement photography chennai",
    "aslam photographer chennai",
  ],
  authors: [{ name: "Shiyarah Weddings" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shiyarahweddings.com",
    siteName: "Shiyarah Weddings",
    title: "Shiyarah Weddings — Crafting Timeless Love Stories",
    description: "Award-winning photography & cinema. Crafted frame by frame in Chennai.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shiyarah Weddings — Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiyarah Weddings — Crafting Timeless Love Stories",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8F7F4] text-[#0E0E0E] antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
