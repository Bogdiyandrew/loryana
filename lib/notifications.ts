"use server"

export async function trimiteNotificareManuala(mesaj: string) {
  
  console.log("\n🚀 [DEBUG] Start trimitere notificare...");

  // Citim cheile din "seiful" serverului (Environment Variables)
  const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

  // Verificare de siguranță
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.error("⛔ [EROARE] Lipsesc cheile din Vercel Environment Variables!");
    return { success: false, error: "Configurare server incompletă (lipsă chei)" };
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic ${ONESIGNAL_API_KEY}` // Cheia vine din server, nimeni nu o vede
  };

  const data = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ["Total Subscriptions"], 
    contents: { en: mesaj },
    headings: { en: "Mesaj nou ❤️" }, 
    url: "https://loryana.vercel.app", 
  };

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error("❌ Eroare OneSignal:", responseData);
        return { success: false, error: responseData.errors?.[0] || "Eroare la trimitere" };
    }
    
    console.log("✅ Notificare trimisă cu succes!");
    return { success: true };

  } catch (err) {
    console.error("💥 Eroare server:", err);
    return { success: false, error: "Eroare server" };
  }
}