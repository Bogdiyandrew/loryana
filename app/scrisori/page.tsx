"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Heart, X, Sparkles, Lock, Timer, Calendar } from "lucide-react"

export default function ScrisoriPage() {

    const [now, setNow] = useState(new Date())

    // Actualizăm timpul în fiecare secundă
    useEffect(() => {
        setNow(new Date())
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // --- LISTA SCRISORILOR ---
    const letters = [
        {
            id: 1,
            title: "Scrisori facute de mine",
            emoji: "🥺",
            date: "24 Ian 2026",
            unlockDate: null,
            color: "from-pink-500 to-rose-500",
            content: `
        de completat cu poze
      `
        },

        {
            id: 2,
            title: "Citește-mă când ți-e dor de noi...",
            emoji: "🥺",
            date: "2026",
            unlockDate: null,
            color: "from-pink-500 to-rose-500",
            content: `
        Iubirea mea,
        
        Dacă citești asta, înseamnă că nu ne-am mai vǎzut de mult timp.
        Dar sǎ ştii ca te iubesc şi voi face tot posibilul să te strâng în brațe din nou cât mai repede.
        
        Te iubesc infinit.
      `
        },
        {
            id: 3,
            title: "De ce te iubesc?",
            emoji: "❤️",
            date: "Azi și mereu",
            unlockDate: null,
            color: "from-rose-500 to-red-600",
            content: `
        Te iubesc pentru că ești tu.
        Te iubesc pentru felul în care te comporți.
        Te iubesc pentru rǎbdarea ta.
        Te iubesc pentru că ești cea mai bună prietenă a mea.
        
        Și te iubesc pentru că, indiferent ce se întâmplă, tu ești acasă pentru mine.
      `
        },

        // --- 2. SĂRBĂTORI VIITOARE (BLOCATE) ---

        // Valentine's Day
        {
            id: 4,
            title: "Secret de Valentine's Day 🌹",
            emoji: "🔒",
            date: "14 Feb 2026",
            unlockDate: "2026-02-14T00:00:00",
            color: "from-red-600 to-rose-700",
            content: `
        La mulți ani de Ziua Îndrăgostiților, iubita mea! ❤️
        
        Poate că e o sărbătoare comercială pentru alții, dar pentru mine e doar o altă scuză să te răsfăț și să îți spun cât de mult însemni pentru mine.
        Ești Valentin-ul meu pe viață.
      `
        },

        // Dragobete
        {
            id: 5,
            title: "De Dragobete",
            emoji: "💙",
            date: "24 Feb 2026",
            unlockDate: "2026-02-24T00:00:00",
            color: "from-blue-500 to-indigo-600",
            content: `
        Dragobetele sărută fetele! 😘
        
        Astăzi sărbătorim iubirea în stil românesc. Se spune că cine se iubește astăzi, va avea un an plin de belșug.
        Eu zic că noi o să avem o viață întreagă de belșug sufletesc. Te iubesc, mândra mea!
      `
        },

        // Ziua Femeii
        {
            id: 6,
            title: "Pentru cea mai frumoasă femeie 🌷",
            emoji: "💃",
            date: "08 Mar 2026",
            unlockDate: "2026-03-08T00:00:00",
            color: "from-fuchsia-500 to-pink-500",
            content: `
        La mulți ani de 8 Martie!
        
        Ești puternică, ești frumoasă, ești inteligentă și ești a mea.
        Îți mulțumesc că îmi faci viața mai colorată prin simpla ta prezență.
        Astăzi ești regină (deși pentru mine ești în fiecare zi).
      `
        },

        // 1 AN DE RELAȚIE
        {
            id: 7,
            title: "1 AN DE NOI DOI! 🥂",
            emoji: "👑",
            date: "23 Iul 2026",
            unlockDate: "2026-07-23T00:00:00",
            color: "from-amber-400 to-orange-500",
            content: `
        La mulți ani, iubirea vieții mele! ❤️❤️❤️
        
        Nu îmi vine să cred că a trecut un an de când am început oficial acest drum împreună (23.07.2025).
        A fost cel mai frumos an din viața mea. Am râs, am învățat, am crescut împreună.
        
        Te iubesc mai mult ca ieri și mai puțin ca mâine. La mulți ani nouă! 🥂
      `
        }
    ]

    const [selectedLetter, setSelectedLetter] = useState<null | typeof letters[0]>(null)

    // --- FUNCȚIE CALCUL TIMP (DETALIATĂ) ---
    const getTimeRemaining = (unlockDateStr: string) => {
        const unlock = new Date(unlockDateStr).getTime()
        const current = now.getTime()
        const diff = unlock - current

        if (diff <= 0) return null

        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        // Afișăm tot timpul detaliat ca să vadă minutele scurse
        if (days > 0) return `${days}z ${hours}h ${minutes}m ${seconds}s`
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
        return `${minutes}m ${seconds}s`
    }

    return (
        <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative selection:bg-pink-500/30 pb-10">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-125 h-125 bg-pink-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-6">

                {/* HEADER */}
                <header className="flex items-center justify-between mb-10 sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-xl py-4 rounded-b-2xl px-2 border-b border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-pink-300 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-pink-500/30 hover:bg-pink-500/10 active:scale-95 duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Înapoi</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-purple-400 hidden sm:block">
                            Scrisori
                        </h1>
                        <div className="bg-white/10 p-2 rounded-xl">
                            <Mail className="w-5 h-5 text-pink-300" />
                        </div>
                    </div>
                </header>

                {/* GRID DE SCRISORI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {letters.map((letter) => {
                        // Verificăm dacă e blocată
                        const isLocked = letter.unlockDate ? new Date(letter.unlockDate) > now : false
                        const timeRemaining = letter.unlockDate ? getTimeRemaining(letter.unlockDate) : null

                        return (
                            <div
                                key={letter.id}
                                onClick={() => {
                                    if (!isLocked) setSelectedLetter(letter)
                                }}
                                className={`group relative ${isLocked ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                            >
                                {/* Card Plic */}
                                <div className={`bg-zinc-900 border ${isLocked ? 'border-zinc-800' : 'border-white/10'} rounded-3xl p-6 h-full transition-all duration-300 ${!isLocked && 'group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-pink-500/10 hover:border-pink-500/30'} flex flex-col justify-between overflow-hidden`}>

                                    {/* Gradient Top */}
                                    <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${isLocked ? 'from-zinc-700 to-zinc-800' : letter.color}`}></div>

                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl text-2xl transition-transform duration-300 ${!isLocked && 'group-hover:scale-110 bg-white/5'} ${isLocked && 'bg-zinc-800/50 grayscale opacity-50'}`}>
                                                {letter.emoji}
                                            </div>

                                            {/* Data sau Lacăt */}
                                            {isLocked ? (
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-950/30 px-2 py-1 rounded-md border border-rose-500/20">
                                                        <Lock className="w-3 h-3" /> Blocat
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded-md border border-white/5">
                                                    {letter.date}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className={`text-xl font-bold mb-2 transition-colors ${isLocked ? 'text-zinc-600' : 'text-pink-50 group-hover:text-pink-200'}`}>
                                            {letter.title}
                                        </h3>

                                        {/* Mesaj diferit dacă e blocat */}
                                        {isLocked ? (
                                            <div className="mt-4 bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
                                                <p className="text-xs text-rose-300/80 flex items-center gap-2 font-bold mb-1">
                                                    <Timer className="w-3 h-3 animate-pulse" /> Se deschide în:
                                                </p>
                                                <p className="text-xs text-zinc-400 font-mono tracking-tight">
                                                    {timeRemaining}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-zinc-400 line-clamp-2 italic opacity-60">
                                                "Apasă pentru a deschide scrisoarea..."
                                            </p>
                                        )}
                                    </div>

                                    {!isLocked && (
                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-pink-400/80 uppercase tracking-wider group-hover:text-pink-300 transition-colors">
                                            <Sparkles className="w-3 h-3" />
                                            Citește acum
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* --- MODAL CITIRE (LETTER VIEW) --- */}
                {selectedLetter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                            onClick={() => setSelectedLetter(null)}
                        ></div>

                        <div className="relative w-full max-w-2xl bg-[#fffcf5] text-zinc-800 rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden max-h-[85vh] flex flex-col">

                            <div className={`h-3 w-full bg-linear-to-r ${selectedLetter.color}`}></div>

                            <button
                                onClick={() => setSelectedLetter(null)}
                                className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-zinc-500"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar">

                                <div className="flex items-center justify-center mb-8">
                                    <span className="text-4xl animate-bounce">{selectedLetter.emoji}</span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-serif text-zinc-900">
                                    {selectedLetter.title}
                                </h2>

                                <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-10">
                                    — {selectedLetter.date} —
                                </p>

                                <div className="prose prose-zinc mx-auto font-serif text-lg leading-relaxed whitespace-pre-line text-zinc-700">
                                    {selectedLetter.content}
                                </div>

                                <div className="mt-12 flex justify-center">
                                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}