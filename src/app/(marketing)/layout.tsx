import MarketingHeader from "@/components/layout/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MarketingHeader />
      <main className="flex-1 w-full pt-20 md:pt-24">
        {children}
      </main>
    </div>
  );
}
