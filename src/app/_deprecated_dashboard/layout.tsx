import DashboardNavigation from "@/components/layout/DashboardNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <DashboardNavigation />
      
      {/* Main Content Area */}
      {/* md:pl-64 pushes content to the right of the 256px wide sidebar on desktop */}
      <main className="flex-1 w-full md:pl-64 pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
