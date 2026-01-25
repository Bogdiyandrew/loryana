"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const runOneSignal = async () => {
        try {
          await OneSignal.init({
            appId: "cd031b88-0af4-4cc2-8338-43901752358a", // ID-ul tău este corect aici
            allowLocalhostAsSecureOrigin: true,
            // AM SCOS 'notifyButton' CA SĂ SCĂPĂM DE EROAREA DE TYPESCRIPT
          });
          
          // Aceasta va forța apariția ferestrei de "Allow"
          OneSignal.Slidedown.promptPush(); 
        } catch (error) {
          console.error("Eroare la inițializarea OneSignal:", error);
        }
      };

      runOneSignal();
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title>Loryana</title>
        <meta name="description" content="Te iubesc" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}