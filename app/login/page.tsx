"use client"

import { useState, useEffect } from "react"
import { loginAction } from "@/actions"

export default function LoginPage() {
  const levels = [
    {
      id: 1,
      type: "normal",
      question: "Să calculăm puțin. Întoarce infinitul. Ultima lună nu rămâne întreagă. Adaugă numărul din basm care apare de trei ori.",
      hint: "Ce pare imposibil devine 8, ce e final se rupe în două şi le aduni, iar basmul se multiplică.",
      answer: "23",
      placeholder: "??"
    },
    {
      id: 2,
      type: "normal",
      question: "Cum ne strigam la început? Gândeşte-te la o literǎ din cuvânt şi la telefoanele cu butoane.",
      hint: "Ce litera apeşi pentru a scrie R",
      answer: "07",
      placeholder: "??"
    },
    {
      id: 3,
      type: "whatsapp_prank",
      question: "A fost puțin greu, nu? Hai să nu te mai chinui. Apasă pe buton, cere-mi răspunsul și scrie-l mai jos.",
      hint: "Nu e nicio capcană (promit)",
      answer: "2025",
      placeholder: "????"
    }
  ]

  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [passwordParts, setPasswordParts] = useState(["??", "??", "????"])
  const [isUnlocking, setIsUnlocking] = useState(false)

  // State-uri pentru Hint
  const [showHintConfirm, setShowHintConfirm] = useState(false)
  const [hintRevealed, setHintRevealed] = useState(false)

  // Timer eroare
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Resetare hint la nivel nou
  useEffect(() => {
    setShowHintConfirm(false)
    setHintRevealed(false)
    setInput("")
  }, [currentLevel])

  const handleCheck = async () => {
    const correctVal = levels[currentLevel].answer
    const userVal = input.trim()

    if (userVal === correctVal) {
      advanceLevel(correctVal)
    } else {
      const errorMessages = [
        "Greșit iubire! 🧐",
        "Mai încearcă! ❤️",
        "Nu e asta... 🤔",
        "Ups! Greșit 🥺"
      ]
      setError(errorMessages[Math.floor(Math.random() * errorMessages.length)])
    }
  }

  const advanceLevel = async (val: string) => {
    const newParts = [...passwordParts]
    newParts[currentLevel] = val
    setPasswordParts(newParts)

    setError("")

    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
    } else {
      setIsUnlocking(true)
      const fullPassword = newParts.join("")

      const formData = new FormData()
      formData.append("password", fullPassword)
      await loginAction(formData)
    }
  }

  const handleWhatsAppPrank = () => {
    const phoneNumber = "40730784892"
    const message = encodeURIComponent("Iubire, m-am blocat! Care e ultimul cod? 🥺")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    // FOLOSIM min-h-[100dvh] PENTRU SUPORT MOBILE PERFECT (safari/chrome bars)
    <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-4 py-6 font-sans relative overflow-hidden text-pink-50">

      {/* --- BACKGROUND ANIMAT (GLOW) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bulina Roz Sus */}
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-pink-600/20 rounded-full blur-[80px] animate-pulse"></div>
        {/* Bulina Mov Jos */}
        <div className="absolute bottom-[0%] -right-[10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        {/* Gradient subtil general */}
        <div className="absolute inset-0 bg-linear-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950"></div>
      </div>

      {/* --- CONTAINER PRINCIPAL --- */}
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border border-white/10 relative z-10 flex flex-col justify-center">

        {/* HEADER - Progres Parolă */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6 bg-pink-950/30 px-4 py-1.5 rounded-full border border-pink-500/20">
            <span className="animate-pulse text-lg">🔒</span>
            <span className="text-xs font-bold text-pink-300 tracking-[0.2em] uppercase">
              Protocol de securitate
            </span>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-mono">
            {passwordParts.map((part, index) => (
              <div
                key={index}
                className={`flex items-center justify-center min-w-14 h-14 sm:h-16 rounded-2xl border-2 transition-all duration-500 shadow-lg ${index === currentLevel
                  ? "border-pink-500 bg-pink-500/10 text-pink-100 scale-110 shadow-pink-500/20 ring-2 ring-pink-500/20"
                  : index < currentLevel
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-white/5 text-white/20 bg-black/20"
                  }`}
              >
                {part}
              </div>
            ))}
          </div>
        </div>

        {/* ZONA DE ÎNTREBĂRI */}
        {!isUnlocking ? (
          <div className="space-y-6 animate-fade-in">

            {/* CARD ÎNTREBARE */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3">

              <div className="flex justify-between items-start w-full">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest pt-1">
                  Nivel {currentLevel + 1} / 3
                </span>

                {/* HINT BUTTON */}
                {levels[currentLevel].type !== "whatsapp_prank" && (
                  <div>
                    {!hintRevealed ? (
                      <div className="flex items-center justify-end">
                        {!showHintConfirm ? (
                          <button
                            onClick={() => setShowHintConfirm(true)}
                            className="text-[10px] bg-white/10 hover:bg-pink-500/20 border border-white/10 text-pink-200 px-3 py-1.5 rounded-full transition-all active:scale-95"
                          >
                            Indiciu? 💡
                          </button>
                        ) : (
                          <div className="flex gap-2 items-center bg-zinc-900 px-2 py-1 rounded-lg border border-pink-500/30 animate-in fade-in zoom-in duration-300">
                            <button onClick={() => setHintRevealed(true)} className="text-[10px] text-emerald-400 font-bold px-1 py-1">DA</button>
                            <span className="text-zinc-600">|</span>
                            <button onClick={() => setShowHintConfirm(false)} className="text-[10px] text-rose-400 font-bold px-1 py-1">NU</button>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-medium text-pink-50 leading-relaxed">
                "{levels[currentLevel].question}"
              </h2>

              {hintRevealed && levels[currentLevel].type !== "whatsapp_prank" && (
                <div className="bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl mt-1">
                  <p className="text-sm text-pink-200 italic">
                    <span className="font-bold mr-1 text-pink-400">Indiciu:</span>
                    {levels[currentLevel].hint}
                  </p>
                </div>
              )}
            </div>

            {/* BUTTON WHATSAPP (Doar la nivelul 3) */}
            {levels[currentLevel].type === "whatsapp_prank" && (
              <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
                <button
                  onClick={handleWhatsAppPrank}
                  className="w-full rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] py-4 px-4 text-base font-bold text-white shadow-lg shadow-green-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.828-.907-.372-1.541-1.24-1.646-1.393-.105-.151-.395-.526-.395-1.006 0-.476.245-.71.329-.806.068-.077.172-.116.276-.116.102 0 .205.002.308.002.086 0 .208-.035.325.247.126.301.428 1.047.464 1.123.038.076.063.165.009.273-.054.109-.082.176-.159.27-.082.096-.17.2-.242.272-.079.077-.162.161-.07.319.091.157.404.665.867 1.079.593.53 1.092.693 1.25.768.156.074.249.063.342-.043.093-.107.403-.469.51-.629.108-.16.216-.134.364-.078.148.056.936.44 1.096.521.16.081.266.121.305.187.039.066.039.385-.105.79z" /></svg>
                  Cere-mi ajutorul
                </button>

                <div className="relative flex py-5 items-center">
                  <div className="grow border-t border-white/10"></div>
                  <span className="shrink-0 mx-4 text-white/30 text-[10px] uppercase tracking-widest font-bold">Apoi introdu codul</span>
                  <div className="grow border-t border-white/10"></div>
                </div>
              </div>
            )}

            {/* INPUT + EROARE + BUTON */}
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text" // Folosim text, nu number, ca să arate mai bine pe iOS
                  inputMode="numeric" // Asta deschide tastatura numerică pe telefon!
                  pattern="[0-9]*"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                  className="block w-full rounded-2xl border-2 border-white/10 bg-black/40 py-4 px-4 text-pink-100 text-center text-3xl font-bold shadow-inner focus:border-pink-500 focus:ring-0 focus:bg-black/60 transition-all outline-none placeholder:text-white/10 tracking-widest"
                  placeholder={levels[currentLevel].placeholder}
                  autoFocus
                  autoComplete="off"
                />

                {/* Mesaj eroare plutitor */}
                {error && (
                  <div className="absolute -bottom-12 left-0 right-0 flex justify-center z-20">
                    <div className="bg-rose-600 text-white text-sm font-bold px-6 py-2 rounded-full animate-bounce shadow-lg shadow-rose-900/50 border border-white/20">
                      {error}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleCheck}
                className="w-full rounded-2xl bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 py-4 px-4 text-lg font-bold text-white shadow-lg shadow-pink-900/40 active:scale-[0.98] transition-all border-t border-white/20"
              >
                Verifică şi continuă
              </button>
            </div>

          </div>
        ) : (
          /* LOADING STATE */
          <div className="text-center py-12 space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
              <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin relative z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl z-20 animate-bounce">❤️</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Acces Permis!</h2>
              <p className="text-pink-200/60 text-sm">Se pregătește surpriza...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}