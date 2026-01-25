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
          // 1. Inițializarea
          await OneSignal.init({
            appId: "cd031b88-0af4-4cc2-8338-43901752358a",
            allowLocalhostAsSecureOrigin: true,
            
            // Setări pentru unificarea worker-ilor (iPhone/PWA)
            serviceWorkerParam: { scope: "/" },
            serviceWorkerPath: "sw.js", 
          });
          
          // 2. Cerem permisiunea
          OneSignal.Slidedown.promptPush(); 

          // 3. Ascultăm notificările când ești pe site
          try {
             const os = OneSignal as any;
             if (os.Notifications) {
                os.Notifications.addEventListener("foregroundWillDisplay", (event: any) => {
                    console.log("Notificare primită în aplicație (va fi afișată automat):", event);
                    // AM SCOS LINIA CARE DĂDEA EROARE: event.notification.display();
                    // Notificarea apare singură dacă nu dăm 'event.preventDefault()'.
                });
             }
          } catch (e) {
             console.log("Eroare la setarea foreground listener:", e);
          }

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