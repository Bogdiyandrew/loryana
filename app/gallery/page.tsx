"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Camera, ArrowLeft, X } from "lucide-react"

export default function GalleryPage() {
    const photos = [
        { src: "/gallery/poza2.PNG", alt: "Noi doi", caption: "Așa te aveam trecută în tlf ❤️" },
        { src: "/gallery/poza1.JPG", alt: "Vacanta", caption: "La mare 🌊" },
        { src: "/gallery/poza3.PNG", alt: "Prima poza", caption: "Prima poză cerută de la tn și prima din tlf meu" },
        { src: "/gallery/poza4.PNG", alt: "Prima poza", caption: "Prima poză a noastră" },
        { src: "/gallery/poza5.PNG", alt: "Noi doi", caption: "Noi doi la început" },
        { src: "/gallery/poza6.PNG", alt: "Noi doi", caption: "Noi doi recent" },
        { src: "/gallery/poza7.PNG", alt: "Noi doi", caption: "Noi doi recent" },
        { src: "/gallery/poza8.PNG", alt: "Noi doi", caption: "Frumoși" },
        { src: "/gallery/poza9.PNG", alt: "Noi doi", caption: "Frumoși dar cu plafonu dus (o să-mi fie dor de mașina asta)" },
    ]

    const [selectedPhoto, setSelectedPhoto] = useState<null | typeof photos[0]>(null)

    return (
        <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative selection:bg-pink-500/30 pb-10 touch-manipulation">
            
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-pink-600/10 rounded-full blur-[100px] will-change-transform"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-purple-600/10 rounded-full blur-[100px] will-change-transform"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-6">
                {/* HEADER */}
                <header className="flex items-center justify-between mb-8 sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl py-4 rounded-b-2xl px-2 border-b border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-pink-300 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 active:scale-95 duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Înapoi</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-rose-400 hidden sm:block">
                            Galeria noastră
                        </h1>
                        <div className="bg-linear-to-br from-pink-500 to-rose-600 p-2.5 rounded-xl">
                            <Camera className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </header>

                {/* GRILA DE POZE */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPhoto(photo)}
                            className="break-inside-avoid relative group cursor-pointer active:scale-[0.98] transition-transform duration-200"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg">
                                {/* ADAUGAT: unoptimized={true} pentru a evita eroarea de validare resursă */}
                                <div className="relative w-full">
                                    <img
                                        src={photo.src}
                                        alt={photo.alt}
                                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-[10px] sm:text-xs font-bold text-pink-100 line-clamp-2">{photo.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LIGHTBOX */}
                {selectedPhoto && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button className="absolute top-6 right-6 bg-white/10 text-white p-3 rounded-full z-50">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative w-full max-w-4xl max-h-[80vh] flex flex-col items-center">
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.alt}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                            />
                            <div className="mt-6 bg-zinc-900/80 p-4 rounded-2xl border border-white/10">
                                <p className="text-center text-sm font-medium text-pink-100">
                                    {selectedPhoto.caption}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}