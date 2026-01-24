import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SETĂRI PWA PENTRU MOBLIL ---
export const viewport: Viewport = {
  themeColor: "#ec4899", // <--- MODIFICAT: Roz (ca în manifest), în loc de negru
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Se simte ca o aplicație nativă (fără zoom)
};

export const metadata: Metadata = {
  title: "Loryana",
  description: "Te iubesc",
  manifest: "/manifest.json", // <-- AICI ESTE LEGĂTURA CU PWA
  icons: {
    icon: "/gallery/poza7.PNG",
    apple: "/gallery/poza7.PNG", 
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default", // <--- MODIFICAT: "default" elimină problemele de afișare
    title: "Loryana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}