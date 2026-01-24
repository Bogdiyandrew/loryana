"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Data voastră: 23 Iulie 2025
  const startDate = new Date("2025-07-23T00:00:00")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeTogether({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [startDate])

  return (
    <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative overflow-x-hidden selection:bg-pink-500/30">

      {/* --- BACKGROUND EFFECTS (OPTIMIZAT PENTRU MOBIL) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Folosim transform-gpu și translate-z-0 pentru a forța placa video.
            Am redus dimensiunile (w-80) și blur-ul (80px) pe mobil pentru performanță. */}
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 sm:w-125 sm:h-125 bg-pink-600/20 rounded-full blur-[80px] sm:blur-[120px] animate-pulse transform-gpu translate-z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 sm:w-100 sm:h-100 bg-purple-600/10 rounded-full blur-[60px] sm:blur-[100px] transform-gpu translate-z-0"></div>
        
        {/* Noise cu mix-blend-overlay pentru randare mai ușoară */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-dvh">

        {/* --- HEADER --- */}
        <header className="w-full flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <span className="font-bold text-lg tracking-widest text-pink-200 uppercase">Loryana</span>
          </div>

          {/* Buton Logout */}
          <button 
            onClick={() => window.location.href = "/api/auth/signout"}
            className="text-xs font-bold text-pink-400/70 hover:text-pink-300 border border-pink-500/20 px-3 py-1.5 rounded-full transition-colors"
          >
            Ieșire
          </button>
        </header>

        {/* --- HERO SECTION --- 
            Am adăugat 'sm:' la animații. Pe mobil (fără sm) nu se va mai anima la intrare,
            ceea ce rezolvă senzația de "greu" la navigarea Back.
        */}
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-2xl space-y-8 sm:animate-in sm:zoom-in-95 sm:duration-1000">

          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-600 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
            
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl mx-auto">
              
              <Image 
                src="/gallery/poza7.PNG" 
                alt="Noi doi"
                fill 
                className="object-cover"
                priority 
                unoptimized
                // sizes ajută browserul să aloce memorie corect
                sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 200px"
              />
              
            </div>
            
            <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full border-4 border-zinc-950 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-200 via-pink-400 to-rose-400 drop-shadow-sm">
              Bună, iubire!
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
              Bine ai venit în universul nostru digital. Aici păstrez toate amintirile noastre.
            </p>
          </div>

          {/* --- COUNTER CARD --- */}
          <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <h3 className="text-xs font-bold text-pink-500 uppercase tracking-[0.3em] mb-6">
              Împreună De
            </h3>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {/* Zile */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {timeTogether.days}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold mt-1">Zile</span>
              </div>

              {/* Ore */}
              <div className="flex flex-col relative">
                <span className="hidden sm:block absolute -left-2 top-2 text-zinc-700">:</span>
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {timeTogether.hours}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold mt-1">Ore</span>
              </div>

              {/* Minute */}
              <div className="flex flex-col relative">
                <span className="hidden sm:block absolute -left-2 top-2 text-zinc-700">:</span>
                <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                  {timeTogether.minutes}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-500 uppercase font-bold mt-1">Min</span>
              </div>

              {/* Secunde */}
              <div className="flex flex-col relative">
                <span className="hidden sm:block absolute -left-2 top-2 text-zinc-700">:</span>
                <span className="text-3xl sm:text-4xl font-black text-rose-500 tabular-nums animate-pulse">
                  {timeTogether.seconds}
                </span>
                <span className="text-[10px] sm:text-xs text-rose-500/70 uppercase font-bold mt-1">Sec</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-zinc-500 italic">
                Începând cu 23 Iulie 2025... și până la infinit. ♾️
              </p>
            </div>
          </div>

        </div>

        {/* --- MENU GRID --- 
            La fel, am pus 'sm:' la animații ca să nu îngreuneze mobilul
        */}
        <div className="w-full grid grid-cols-2 gap-3 mt-12 mb-6 max-w-2xl sm:animate-in sm:slide-in-from-bottom-8 sm:duration-1000 sm:delay-300">
          <Link href="/gallery" className="group bg-zinc-900/50 hover:bg-pink-900/20 border border-white/5 hover:border-pink-500/30 p-4 rounded-2xl transition-all text-left flex flex-col gap-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📸</span>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-pink-200">Galerie</span>
          </Link>

          <Link href="/scrisori" className="group bg-zinc-900/50 hover:bg-purple-900/20 border border-white/5 hover:border-purple-500/30 p-4 rounded-2xl transition-all text-left flex flex-col gap-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💌</span>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-purple-200">Scrisori</span>
          </Link>

          <Link href="/timeline" className="group bg-zinc-900/50 hover:bg-rose-900/20 border border-white/5 hover:border-rose-500/30 p-4 rounded-2xl transition-all text-left flex flex-col gap-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🗓️</span>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-rose-200">Timeline</span>
          </Link>

          <Link href="/dorinte" className="group bg-zinc-900/50 hover:bg-emerald-900/20 border border-white/5 hover:border-emerald-500/30 p-4 rounded-2xl transition-all text-left flex flex-col gap-2">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎁</span>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-emerald-200">Dorințe</span>
          </Link>
          
          {/* BUTON: PROGRAMĂRI */}
          <Link href="/programari" className="col-span-2 group bg-linear-to-r from-zinc-900 to-zinc-800 hover:from-fuchsia-900/20 hover:to-pink-900/20 border border-white/5 hover:border-fuchsia-500/30 p-4 rounded-2xl transition-all text-center flex flex-row items-center justify-center gap-4 mt-2">
             <div className="bg-white/5 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💅</span>
             </div>
             <div className="text-left">
                <span className="block text-sm font-bold text-pink-100 group-hover:text-fuchsia-200">Agenda mea</span>
                <span className="text-xs text-zinc-500">Gestionează programările şi încasările</span>
             </div>
          </Link>
        </div>

      </main>
    </div>
  )
}