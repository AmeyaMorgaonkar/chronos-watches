import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CHRONOS | Haute Horlogerie",
  description:
    "Where time meets artistry. Discover the CHRONOS Tourbillon — 312 hand-finished components, 72-hour power reserve, an eternal masterpiece of precision engineering.",
  keywords: [
    "luxury watch",
    "haute horlogerie",
    "tourbillon",
    "mechanical watch",
    "Swiss watchmaking",
  ],
  openGraph: {
    title: "CHRONOS | Haute Horlogerie",
    description:
      "Where time meets artistry. Discover the CHRONOS Tourbillon — 312 hand-finished components, an eternal masterpiece.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${cormorant.variable} antialiased grain-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
