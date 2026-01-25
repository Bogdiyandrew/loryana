"use server"

export async function trimiteNotificareManuala(mesaj: string) {
  
  console.log("\n🚀 [DEBUG] Start trimitere notificare...");

  const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string;
  const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY as string;

  if (!ONESIGNAL_APP_ID || !ONESIGNAL_API_KEY) {
    console.error("⛔ [EROARE] Lipsesc cheile din .env!");
    return { success: false, error: "Chei lipsă" };
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic ${ONESIGNAL_API_KEY}`
  };

  const data = {
    app_id: ONESIGNAL_APP_ID,
    // 👇 AICI ERA GREȘEALA. Trebuie "Subscribed Users", nu "Total Subscriptions"
    included_segments: ["Subscribed Users"], 
    contents: { en: mesaj },
    headings: { en: "Mesaj de la Iubitul tău ❤️" }, 
    url: "https://loryana.vercel.app", 
  };

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("📥 [DEBUG] Răspuns:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(`Eroare: ${responseData.errors?.[0] || response.statusText}`);
    }
    
    return { success: true };

  } catch (err) {
    console.error("💥 [EROARE]", err);
    return { success: false, error: "Nu s-a trimis" };
  }
}