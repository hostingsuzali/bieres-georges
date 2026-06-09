import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Oswald, Poppins } from "next/font/google";

import { AgeVerification } from "@/components/ui/AgeVerification";
import { AgeVerificationProvider } from "@/lib/age-context";

import "./globals.css";

// Bold condensed display for the big uppercase poster headings.
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Italic serif for the editorial / script accents ("Fondateur", etc.).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Bières Georges — Brasser autrement depuis 1836",
  description:
    "Maison Georges brasse des bières sincères, généreuses et exigeantes depuis 1836. Quatre caractères, une même exigence, au cœur de Lyon.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      className={`${oswald.variable} ${fraunces.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body>
        <AgeVerificationProvider>
          <AgeVerification />
          {children}
        </AgeVerificationProvider>
      </body>
    </html>
  );
}
