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
      <body className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <main className="w-full flex flex-col items-center justify-center min-h-screen">
          {children}
        </main>
        <FooterSection />
      </body>
    </html>
  );
}
