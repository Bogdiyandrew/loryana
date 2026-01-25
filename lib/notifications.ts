"use server"

export async function trimiteNotificareManuala(mesaj: string) {
  
  console.log("\n🚀 [DEBUG] Start trimitere notificare...");

  // --- AM PUS CHEILE DIRECT AICI CA SĂ FIM SIGURI CĂ MERGE ---
  const ONESIGNAL_APP_ID = "cd031b88-0af4-4cc2-8338-43901752358a";
  const ONESIGNAL_API_KEY = "os_v2_app_zubrxcak6rgmfazyioibourvrj3s4wjcjfbe7evjnxs3d2tz2osm3u3i6npolqhkfl6htvwppwpj6bm7nna6pcnjil7sxcjc4xkwhhq"; // <--- ATENȚIE: Trebuie să pui cheia lungă (REST API KEY) aici!
  // -----------------------------------------------------------

  if (ONESIGNAL_API_KEY.includes("PUNE_AICI")) {
      console.error("⛔ [EROARE] Nu ai pus REST API KEY în cod!");
      return { success: false, error: "Cheie lipsă" };
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic ${ONESIGNAL_API_KEY}`
  };

  const data = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ["Total Subscriptions"], // Trimitem la toți abonații
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
    console.log("📥 [DEBUG] Răspuns OneSignal:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
        // Dacă primești eroare de la OneSignal, o vedem aici
        return { success: false, error: responseData.errors?.[0] || "Eroare necunoscută" };
    }
    
    return { success: true };

  } catch (err) {
    console.error("💥 [EROARE FETALĂ]", err);
    return { success: false, error: "Nu s-a putut conecta la OneSignal" };
  }
}