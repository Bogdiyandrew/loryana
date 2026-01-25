"use server"

export async function trimiteNotificareManuala(mesaj: string) {
  
  // --- DEBUG 1: Începem funcția ---
  console.log("\n🚀 [DEBUG] Start trimitere notificare...");
  console.log("📝 Mesaj de trimis:", mesaj);

  // 1. Citim valorile
  const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string;
  const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY as string;

  // --- DEBUG 2: Verificăm cheile (FĂRĂ să le afișăm complet pentru securitate) ---
  console.log("🔑 [DEBUG] Verificare variabile de mediu:");
  console.log("   - APP ID:", ONESIGNAL_APP_ID ? `✅ Prezent (${ONESIGNAL_APP_ID.substring(0, 5)}...)` : "❌ LIPSEȘTE (Undefined)");
  console.log("   - API KEY:", ONESIGNAL_API_KEY ? `✅ Prezent` : "❌ LIPSEȘTE (Undefined)");

  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.error("⛔ [EROARE CRITICĂ] Lipsesc cheile din .env! Oprește serverul și verifică fișierul.");
    return { success: false, error: "Chei lipsă pe server" };
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic ${ONESIGNAL_API_KEY}`
  };

  const data = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ["Total Subscriptions"], 
    contents: { en: mesaj },
    headings: { en: "Mesaj de la Iubitul tău ❤️" }, 
    // NOTĂ: Pentru testare locală, e bine să pui localhost, altfel te duce pe un site care poate nu există încă
    url: "https://loryana.vercel.app", 
  };

  // --- DEBUG 3: Încercăm request-ul către OneSignal ---
  console.log("wv [DEBUG] Trimit request către OneSignal API...");

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    // --- DEBUG 4: Analizăm răspunsul ---
    const responseData = await response.json();
    console.log("📥 [DEBUG] Răspuns de la OneSignal:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.error("⛔ [EROARE API]", response.statusText);
      throw new Error(`Eroare OneSignal: ${responseData.errors?.[0] || response.statusText}`);
    }
    
    // Verificăm dacă a găsit destinatari (recipients)
    if (responseData.recipients === 0) {
      console.warn("⚠️ [ATENȚIE] Notificarea a fost trimisă cu succes, dar către 0 persoane. Ești sigur că te-ai abonat?");
    } else {
      console.log(`✅ [SUCCES] Notificare trimisă către ${responseData.recipients} dispozitive!`);
    }

    return { success: true };

  } catch (err) {
    console.error("💥 [EXCEPTION] Ceva a crăpat grav:", err);
    return { success: false, error: "Nu s-a trimis" };
  }
}