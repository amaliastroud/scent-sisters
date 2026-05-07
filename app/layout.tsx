import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { SprayCursor } from "@/components/SprayCursor";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Scent Sisters",
  description: "A warm, feminine community for tracking fragrance memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh font-[var(--font-sans)] antialiased">
        <AppShell>{children}</AppShell>
        <SprayCursor />
      </body>
    </html>
  );
}
