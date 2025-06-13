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
      <body>
        <Navbar />
        <main>{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
