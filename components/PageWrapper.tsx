/**
 * PageWrapper — wraps all inner pages.
 * Applies top padding equal to nav-height so content starts exactly below the fixed nav.
 * Use heroBleed=true for pages where the first section intentionally bleeds behind the nav.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PageWrapper({
  children,
  heroBleed = false,
}: {
  children: React.ReactNode;
  heroBleed?: boolean;
}) {
  return (
    <>
      <Navbar />
      <main style={heroBleed ? undefined : { paddingTop: "var(--nav-height)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
