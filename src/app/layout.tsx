import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Preloader from "@/components/Preloader/Preloader";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-src",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
  display: "swap",
});

const siteUrl = "https://arthurpietro.dev"; // troque pelo domínio final ao publicar

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arthur Pietro — Desenvolvedor em Formação",
  description:
    "Portfólio de Arthur Pietro, estudante de Técnico em Informática e desenvolvedor em formação.",
  keywords: [
    "Arthur Pietro",
    "desenvolvedor",
    "portfólio",
    "IFRO",
    "Next.js",
    "ESP32",
    "three.js",
    "desenvolvimento web",
  ],
  authors: [{ name: profile.fullName, url: profile.github }],
  openGraph: {
    title: "Arthur Pietro — Desenvolvedor em Formação",
    description:
      "Portfólio de Arthur Pietro, estudante de Técnico em Informática e desenvolvedor em formação.",
    url: siteUrl,
    siteName: "Arthur Pietro",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur Pietro — Desenvolvedor em Formação",
    description:
      "Portfólio de Arthur Pietro, estudante de Técnico em Informática e desenvolvedor em formação.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
