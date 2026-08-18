import type { Metadata } from "next";
import { Amiri, Crimson_Text, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} – ${SITE.motto}`,
    template: `%s – ${SITE.name}`,
  },
  description:
    "Mubarak Mosque in Chantilly, Virginia. Prayer times, events, and a welcome to all. Love for All, Hatred for None.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${crimson.variable} ${amiri.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
