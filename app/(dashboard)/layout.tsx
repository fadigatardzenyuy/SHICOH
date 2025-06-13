// import Navbar from "@/components/Navbar";
// import Navbar from "@/components/NavbarAcademic";
// import Navbar from "@/components/Navbar";
import Navbar from "@/components/NavbarAcademic";
import FooterSection from "@/components/tutor/FooterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnSmart",
  description: "Meet and Explore with your favorite Tutors",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="hidden md:block flex-shrink-0 w-full">
          <Navbar />
        </div>

        <main className="flex-1 overflow-auto w-full h-full !m-0 !p-0 !max-w-none !gap-0 bg-background">
          <div className="h-full w-full">{children}</div>
        </main>
        <div className="md:hidden flex-shrink-0 w-full">
          <FooterSection />
        </div>
      </body>
    </html>
  );
}
