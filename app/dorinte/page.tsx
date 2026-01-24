"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Gift, CheckCircle2, Circle, Plane, Sparkles, Home, Plus } from "lucide-react"

export default function DorintePage() {

    // --- LISTA DE DORINȚE ---
    // true = îndeplinit (va apărea tăiat și verde)
    // false = urmează (va apărea normal)
    const [wishes, setWishes] = useState([
        {
            category: "Călătorii ✈️",
            items: [
                { id: 1, text: "Să mergem în Dubai", completed: false },
                { id: 2, text: "Un weekend la o cabană la munte", completed: true },
                { id: 3, text: "Un weekend la o cabană la munte(iar)", completed: false },
                { id: 4, text: "Vacanta in Grecia", completed: false },
                { id: 5, text: "Vacanta in Paris", completed: false },
            ]
        },
        {
            category: "Experiențe 🥂",
            items: [
                { id: 4, text: "Să gătim împreună", completed: true },
                { id: 5, text: "Cinema Dragoste la tara 2", completed: false },
                { id: 6, text: "Picnic la apus cu privelişte", completed: false },
                { id: 7, text: "Sa megem la karting", completed: false },
                { id: 8, text: "Sa refacem prima intalnire a noastra", completed: false },
            ]
        },
        {
            category: "Viitor 💍",
            items: [
                { id: 7, text: "Să ne mutăm împreună", completed: false },
                { id: 8, text: "Să avem casa noastră", completed: false },
                { id: 9, text: "Primul bebe", completed: false },
            ]
        }
    ])

    // Funcție simplă de toggle (doar vizual, se resetează la refresh)
    const toggleWish = (id: number) => {
        const newWishes = wishes.map(cat => ({
            ...cat,
            items: cat.items.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }))
        setWishes(newWishes)
    }

    const handleProposeIdea = () => {
        const phoneNumber = "40730784892" // Pune numărul tău aici
        const message = encodeURIComponent("Iubire, mi-a venit o idee nouă pentru lista noastră de dorințe: ")
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
    }

    return (
        <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative selection:bg-pink-500/30 pb-20">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">

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
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-emerald-300 hidden sm:block">
                            Listă de dorințe
                        </h1>
                        <div className="bg-white/10 p-2 rounded-xl">
                            <Gift className="w-5 h-5 text-pink-300" />
                        </div>
                    </div>
                </header>

                {/* LISTA DE CATEGORII */}
                <div className="space-y-8">
                    {wishes.map((category, catIndex) => (
                        <div key={catIndex} className="animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${catIndex * 150}ms` }}>

                            <h3 className="text-lg font-bold text-pink-200/80 mb-4 px-2 flex items-center gap-2">
                                {category.category}
                            </h3>

                            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                                {category.items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleWish(item.id)}
                                        className={`
                      relative p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 border-b border-white/5 last:border-0 hover:bg-white/5
                      ${item.completed ? 'bg-emerald-900/10' : ''}
                    `}
                                    >
                                        {/* CHECKBOX CUSTOM */}
                                        <div className={`
                      shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                      ${item.completed ? 'border-emerald-500 bg-emerald-500 text-zinc-950 scale-110' : 'border-zinc-600 text-transparent'}
                    `}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>

                                        {/* TEXT */}
                                        <span className={`
                      text-sm sm:text-base font-medium transition-all duration-300
                      ${item.completed ? 'text-zinc-500 line-through decoration-emerald-500/50 decoration-2' : 'text-zinc-200'}
                    `}>
                                            {item.text}
                                        </span>

                                        {/* Confetti effect on complete (subtil) */}
                                        {item.completed && (
                                            <Sparkles className="ml-auto w-4 h-4 text-emerald-500 animate-pulse" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* BUTON ADAUGĂ IDEE */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-zinc-500 mb-4 uppercase tracking-widest">Ai o idee nouă?</p>
                    <button
                        onClick={handleProposeIdea}
                        className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-pink-200 border border-pink-500/20 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Propune o dorințǎ
                    </button>
                </div>

            </main>
        </div>
    )
}