import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

import { AgeVerification } from "@/components/ui/AgeVerification";
import { AgeVerificationProvider } from "@/lib/age-context";

import "./globals.css";

const grayback = localFont({
  src: "../public/GW Grayback Variable Fonts/Variable/GWGraybackVFVF.ttf",
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  // les accents de la charte sont posés en Poppins italique
  style: ["normal", "italic"],
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
      className={`${grayback.variable} ${poppins.variable}`}
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
