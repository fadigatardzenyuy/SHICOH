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
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
