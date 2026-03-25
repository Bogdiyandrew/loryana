"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart } from "lucide-react"

export default function MartisorPage() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative overflow-x-hidden flex flex-col items-center justify-center p-4">
      
      {/* --- BACKGROUND MAGIC --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-red-600/15 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Buton Înapoi */}
        <div className="w-full flex justify-start mb-6">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Înapoi acasă</span>
          </Link>
        </div>

        {/* --- MĂRȚIȘOR CARD --- */}
        <div className="w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center group">
          
          {/* Șnurul de Mărțișor (Alb-Roșu) pe marginea de sus */}
          <div className="absolute top-0 left-0 w-full h-2 flex">
            <div className="w-1/2 h-full bg-white opacity-90 shadow-[0_0_10px_white]"></div>
            <div className="w-1/2 h-full bg-red-600 opacity-90 shadow-[0_0_10px_red]"></div>
          </div>
          <div className="absolute top-2 left-0 w-full h-1 flex flex-row-reverse">
            <div className="w-1/2 h-full bg-white/50"></div>
            <div className="w-1/2 h-full bg-red-600/50"></div>
          </div>

          {/* Icoana centrală */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative z-10 w-full h-full bg-zinc-800 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-5xl shadow-lg transform group-hover:scale-110 transition-transform duration-500">
              🌷
            </div>
            {/* O mică inimioară care pulsează */}
            <div className="absolute -bottom-2 -right-2 bg-zinc-900 p-1.5 rounded-full border border-red-500/30">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-bounce" />
            </div>
          </div>

          <h1 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
            Primul nostru Mărțișor
          </h1>
          <p className="text-zinc-400 text-sm mb-8 font-mono tracking-widest uppercase">
            1 Martie 2025
          </p>

          {/* Mesajul scrisorii */}
          <div className="space-y-4 text-zinc-300 text-base leading-relaxed text-left bg-black/20 p-6 rounded-2xl border border-white/5 relative">
            <span className="absolute -top-3 left-6 text-2xl">❝</span>
            <p>
              Iubita mea,
            </p>
            <p>
             Nu vreau sǎ te încarc cu multe mesaje, vreau doar sǎ îți spun cǎ <span className="text-emerald-300 font-bold">TE IUBESC</span>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}