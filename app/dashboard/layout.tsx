import Navbar, { MobileNavbar } from "@/components/navigation/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Desktop Navbar */}
      <div className="hidden md:block flex-shrink-0 w-full">
        <Navbar />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex-shrink-0 w-full">
        <MobileNavbar />
      </div>

      {/* Main Content - override global main styles */}
      <main className="flex-1 overflow-auto w-full h-full !m-0 !p-0 !max-w-none !gap-0 bg-background">
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
