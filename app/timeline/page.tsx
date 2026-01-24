"use client"

import Link from "next/link"
import { ArrowLeft, Heart, Calendar, Star, Plane, Music, Sparkles } from "lucide-react"

export default function TimelinePage() {
    // --- LISTA EVENIMENTELOR ---
    // Aici adaugi momentele importante. 
    // Poți schimba iconițele (Heart, Plane, Star, Music, etc.)
    const events = [
        {
            date: "Martie 2024",
            title: "Momentul Zero",
            description: "Când ne-am cunoscut prima dată. Cine ar fi crezut că o să ajungem aici?",
            icon: Star, // Iconiță stea
            color: "bg-purple-500"
        },
        {
            date: "Primăvara 2024",
            title: "Ne-am strigat 'Veri' 😂",
            description: "Perioada noastră de tatonare. Râdeam, glumeam, dar știam amândoi că e ceva mai mult acolo.",
            icon: Music, // Iconiță notă muzicală
            color: "bg-blue-500"
        },
        {
            date: "23 Iulie 2025",
            title: "ÎNCEPUTUL OFICIAL ❤️",
            description: "Ziua în care am decis că suntem 'NOI'. Cea mai bună decizie din viața mea.",
            icon: Heart, // Iconiță inimă
            color: "bg-rose-500" // Culoare specială
        },
        {
            date: "23 August 2025",
            title: "Prima lună împreună",
            description: "Deja simțeam că te cunosc de o viață.",
            icon: Calendar,
            color: "bg-pink-500"
        },
        {
            date: "Crăciun 2025",
            title: "Primul Crăciun",
            description: "Sărbătorile au fost mai calde cu tine alături.",
            icon: Sparkles,
            color: "bg-amber-500"
        },
        {
            date: "24 Ianuarie 2026",
            title: "Prezentul",
            description: "Te iubesc mai mult ca oricând. Și povestea continuă...",
            icon: Heart,
            color: "bg-emerald-500"
        }
    ]

    return (
        <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative selection:bg-pink-500/30 pb-10">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">

                {/* HEADER */}
                <header className="flex items-center justify-between mb-12 sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-xl py-4 rounded-b-2xl px-2 border-b border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-pink-300 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-pink-500/30 hover:bg-pink-500/10 active:scale-95 duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Înapoi</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-rose-400 hidden sm:block">
                            Povestea Noastră
                        </h1>
                        <div className="bg-white/10 p-2 rounded-xl">
                            <Calendar className="w-5 h-5 text-pink-300" />
                        </div>
                    </div>
                </header>

                {/* TIMELINE CONTAINER */}
                <div className="relative pl-8 sm:pl-10 space-y-12 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-linear-to-b before:from-pink-500 before:via-purple-500 before:to-zinc-800 before:opacity-30">

                    {events.map((event, index) => {
                        const Icon = event.icon
                        return (
                            <div key={index} className="relative group animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>

                                {/* DOT PE LINIE */}
                                <div className={`absolute -left-[34px] sm:-left-[38px] top-0 w-8 h-8 rounded-full border-4 border-zinc-950 flex items-center justify-center z-10 shadow-lg shadow-black/50 ${event.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-3 h-3 text-white" />
                                </div>

                                {/* CARD EVENIMENT */}
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5 backdrop-blur-sm">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 border border-white/5">
                                        {event.date}
                                    </span>

                                    <h3 className={`text-lg font-bold text-pink-100 mb-2 ${index === 2 ? 'text-rose-400 text-xl' : ''}`}>
                                        {event.title}
                                    </h3>

                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>

                            </div>
                        )
                    })}

                    {/* FINAL TIMELINE (VIITOR) */}
                    <div className="relative group opacity-60 hover:opacity-100 transition-opacity">
                        <div className="absolute -left-[34px] sm:-left-[38px] top-0 w-8 h-8 rounded-full border-4 border-zinc-950 bg-zinc-800 flex items-center justify-center z-10">
                            <span className="text-[10px]">♾️</span>
                        </div>
                        <div className="p-5 border border-dashed border-white/10 rounded-2xl text-center">
                            <p className="text-xs text-zinc-500 italic">
                                Povestea continuă... Viitorul e al nostru.
                            </p>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    )
}