import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { weddingAlbums } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlbumViewer from "./AlbumViewer";

export async function generateStaticParams() {
  return weddingAlbums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = weddingAlbums.find((a) => a.slug === slug);
  if (!album) return { title: "Album Not Found" };
  return {
    title: `${album.couple} — Wedding Album | Shiyarah Weddings`,
    description: `View the private wedding gallery of ${album.couple} at ${album.venue}.`,
    openGraph: {
      title: `${album.couple} — Wedding Album`,
      images: [{ url: album.coverImage }],
    },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = weddingAlbums.find((a) => a.slug === slug);
  if (!album) notFound();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <AlbumViewer album={album} />
      </main>
      <Footer />
    </>
  );
}
