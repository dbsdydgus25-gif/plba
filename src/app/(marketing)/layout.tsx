export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center w-full">
      <main className="w-full max-w-[430px] bg-white min-h-screen relative shadow-2xl overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
