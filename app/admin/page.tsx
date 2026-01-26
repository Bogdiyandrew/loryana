"use client"

import { useState } from "react"
import { trimiteNotificareManuala } from "@/lib/notifications" // Asigură-te că importul e corect
import { Send, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [mesaj, setMesaj] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSend = async () => {
    if (!mesaj.trim()) return;
    
    setStatus("loading");
    
    // Apelăm funcția de pe server
    const result = await trimiteNotificareManuala(mesaj);
    
    if (result.success) {
      setStatus("success");
      setMesaj(""); // Golim textul după trimitere
      setTimeout(() => setStatus("idle"), 3000); // Resetăm butonul după 3 secunde
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans p-6 flex flex-col items-center justify-center">
      
      {/* Header simplu */}
      <div className="w-full max-w-md mb-8 flex items-center gap-4">
         <Link href="/" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
            <ArrowLeft className="w-5 h-5" />
         </Link>
         <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
            Panou de control
         </h1>
      </div>

      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
        <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wider">
          Ce vrei să transmiți?
        </label>
        
        <textarea
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
          placeholder="Ex: Intra in aplicatie"
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:border-pink-500 outline-none min-h-[150px] resize-none mb-6 text-lg"
        />

        <button
          onClick={handleSend}
          disabled={status === "loading" || !mesaj.trim()}
          className={`
            w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
            ${status === "success" ? "bg-emerald-600 text-white" : 
              status === "error" ? "bg-red-600 text-white" :
              "bg-pink-600 hover:bg-pink-500 text-white"}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {status === "idle" && <><Send className="w-5 h-5" /> Trimite</>}
          {status === "loading" && "Se trimite..."}
          {status === "success" && <><CheckCircle className="w-5 h-5" /> Trimis cu succes!</>}
          {status === "error" && <><AlertCircle className="w-5 h-5" /> Eroare!</>}
        </button>
      </div>
      
      <p className="mt-8 text-zinc-600 text-xs text-center max-w-xs">
        Notificarea va ajunge instant pe telefonul ei (și al tău) dacă are internetul pornit.
      </p>
    </div>
  )
}