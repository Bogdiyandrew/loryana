"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // Lista de mesaje pentru butonul NU
  const phrases = [
    "NU",
    "Ce mǎ???",
    "Amuzant, eşti sigurǎ?",
    "Aştept sǎ te mai gândeşti",
    "Uite ce drăguț sunt!",
    "Dacă zici nu, râzi de mine...",
    "Aşa ma simt",
    "ŞTII CEVA, NICI NU TE MAI INTREB ",
    "Ok, gata, nu mai întreb...",
    "Glumeam, TE ROG ZI DA! ❤️"
  ];

  const gifs = [
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif", 
    "https://media.tenor.com/SuVGs-GL7RoAAAAi/shocked-shocked-cat.gif", 
    "https://media.tenor.com/tY1L9P9aIA4AAAAi/big-emoji.gif", 
    "https://media.tenor.com/Pv2zzqOfVy8AAAAi/peach-goma-peach-and-goma.gif", 
    "https://media.tenor.com/Rv3x7_Mlj1kAAAAi/stich-beso.gif", 
    "https://media.tenor.com/vdJ5HagFGY8AAAAj/selfie-stitch.gif", 
    "https://media1.tenor.com/m/a6-122xfz4kAAAAC/sad-stitch-lilo-and-stitch.gif" 
  ];

  // Logică: "Haide mǎ..." este la indexul 7.
  const isFullYesMode = noCount >= 8;

  // Calculăm mărimea butonului DA. Pe mobil creștem puțin mai lent fontul.
  const yesButtonSize = noCount * 15 + 16; 

  const getGif = () => {
    if (yesPressed) return "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
    if (noCount === 0) return "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
    return gifs[Math.min(noCount, gifs.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    // Folosim min-h-dvh pentru suport mai bun pe mobil (evită bara de adresă)
    <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-950/30 text-center p-4 relative overflow-hidden selection:bg-pink-500/30">
      
      {/* Background animat subtil */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 to-pink-950/50"></div>

      {yesPressed ? (
        // --- CÂND APASĂ DA (Final Fericit) ---
        <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500 z-50 w-full max-w-md">
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Yaaay"
            className="w-full max-w-[250px] h-auto object-contain drop-shadow-2xl"
          />
          <h1 className="text-3xl sm:text-5xl font-bold text-pink-200 drop-shadow-lg leading-tight">
            Yeey! Te iubesc! ❤️🥂
          </h1>
          <p className="text-pink-100/80 mt-2 text-base sm:text-lg px-4">
            Ne vedem pe 14 Februarie!
          </p>
          
          <Link href="/" className="mt-8 px-8 py-3 bg-white/10 rounded-full hover:bg-white/20 transition text-pink-200 border border-white/10 text-sm font-bold">
            Înapoi acasă
          </Link>
        </div>
      ) : (
        // --- ÎNTREBAREA ---
        <div className="flex flex-col items-center w-full max-w-lg">
            
            {/* Ascundem elementele când intră modul Full Screen */}
            {!isFullYesMode && (
                <>
                    <Link href="/" className="absolute top-6 left-6 text-pink-300/50 hover:text-pink-300 transition p-2">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>

                    <div className="mb-6 sm:mb-8 relative w-full flex justify-center">
                        <img
                            src={getGif()}
                            alt="Reaction"
                            // Imagine responsive: mai mică pe mobil, mai mare pe desktop
                            className="w-40 h-40 sm:w-64 sm:h-64 object-contain drop-shadow-2xl transition-all duration-300"
                        />
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-500 mb-8 sm:mb-12 drop-shadow-sm px-2 leading-relaxed">
                        Will you be my valentine? 🌹
                    </h1>
                </>
            )}

            {/* Container butoane: Permitem wrap pentru a nu ieși din ecran */}
            <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full transition-all duration-300 ${isFullYesMode ? 'fixed inset-0 z-50 bg-zinc-950/90' : ''}`}>
                
                {/* BUTONUL DA */}
                <button
                    className={`
                        rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold shadow-lg transition-all duration-300 active:scale-95
                        ${isFullYesMode ? 'w-full h-full text-[12vh] sm:text-[15vh] flex flex-col items-center justify-center animate-pulse gap-4' : 'z-20'}
                        // Pe mobil, limităm lățimea ca să nu iasă din ecran când crește
                        ${!isFullYesMode && 'max-w-[85vw] whitespace-normal break-words leading-tight'}
                    `}
                    style={!isFullYesMode ? { fontSize: yesButtonSize, padding: '12px 24px' } : {}}
                    onClick={() => setYesPressed(true)}
                >
                    DA 
                    {/* Inima apare sub text in modul full screen pentru a arata mai bine pe verticala */}
                    {isFullYesMode && <span className="text-[10vh]">❤️</span>}
                    {!isFullYesMode && " ❤️"}
                </button>

                {/* BUTONUL NU */}
                {!isFullYesMode && (
                    <button
                        onClick={handleNoClick}
                        className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 shadow-lg transition-all duration-300 active:scale-95 z-10 text-sm sm:text-base whitespace-nowrap"
                    >
                        {noCount === 0 ? "NU" : getNoButtonText()}
                    </button>
                )}
            </div>
        </div>
      )}
    </div>
  );
}