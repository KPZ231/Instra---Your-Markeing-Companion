import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/** Layout for all public marketing pages — adds the fixed Navbar and Footer. */
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col pt-[73px]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
