import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnSmart",
  description: "Real-time AI Teaching/Practicing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: shadesOfPurple,
            variables: {
              colorPrimary: "#fe5933",
              colorBackground: "transparent", // Make background transparent
            },

            elements: {
              rootBox:
                "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
              card: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
              formButtonPrimary:
                "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
              footer: "hidden", // Hides the footer with "Secured by Clerk"
              footerAction: "hidden",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
