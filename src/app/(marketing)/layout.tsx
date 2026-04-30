import MarketingHeader from "@/components/layout/MarketingHeader";
import Footer from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MarketingHeader />
      <main className="flex-1 w-full pt-24 md:pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
