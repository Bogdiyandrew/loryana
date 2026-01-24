"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Calendar, Clock, User, Trash2, MessageCircle, Wallet, Sparkles, X } from "lucide-react"

// Tipul pentru o programare
type Appointment = {
  id: number
  clientName: string
  service: string
  date: string
  time: string
  price: number
  notes: string
}

export default function AgendaPage() {
  
  // --- STATE ---
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Formular nou
  const [newApp, setNewApp] = useState({
    clientName: "",
    service: "Semipermanentă",
    date: new Date().toISOString().split('T')[0], // Azi default
    time: "12:00",
    price: 100,
    notes: ""
  })

  // --- 1. ÎNCĂRCARE DIN MEMORIE LA START ---
  useEffect(() => {
    const savedData = localStorage.getItem("loryana_agenda")
    if (savedData) {
      setAppointments(JSON.parse(savedData))
    }
    setIsLoaded(true)
  }, [])

  // --- 2. SALVARE AUTOMATĂ CÂND SE SCHIMBĂ CEVA ---
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("loryana_agenda", JSON.stringify(appointments))
    }
  }, [appointments, isLoaded])

  // --- ACȚIUNI ---
  
  const handleAddAppointment = () => {
    if (!newApp.clientName) return

    const appointment: Appointment = {
      id: Date.now(),
      ...newApp
    }

    // Adăugăm și sortăm după dată și oră
    const updatedList = [...appointments, appointment].sort((a, b) => {
        return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
    })

    setAppointments(updatedList)
    setShowAddModal(false)
    
    // Reset parțial
    setNewApp(prev => ({ ...prev, clientName: "", notes: "" }))
  }

  const handleDelete = (id: number) => {
    if (confirm("Sigur ștergi programarea?")) {
      setAppointments(appointments.filter(a => a.id !== id))
    }
  }

  const handleWhatsAppConfirm = (app: Appointment) => {
    // Mesaj predefinit către clientă
    const text = `Bună, ${app.clientName}! 👋 Îți scriu să îți reamintesc de programarea ta la unghii pentru ${app.date} la ora ${app.time}. Te aștept cu drag! 💅`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  // --- CALCUL STATISTICI ---
  const totalMoney = appointments.reduce((sum, app) => sum + Number(app.price), 0)
  const today = new Date().toISOString().split('T')[0]
  const appointmentsToday = appointments.filter(a => a.date === today)

  return (
    <div className="min-h-dvh bg-zinc-950 text-pink-50 font-sans relative selection:bg-pink-500/30 pb-24">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[5%] right-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-100 h-100 bg-pink-600/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-6 max-w-xl">
        
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-xl py-4 rounded-b-2xl px-2 border-b border-white/5">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-pink-300 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Înapoi</span>
          </Link>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-fuchsia-400">
            Agenda Mea 💅
          </h1>
        </header>

        {/* --- CARD STATISTICI --- */}
        <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Azi</span>
                <span className="text-2xl font-bold text-white">{appointmentsToday.length} <span className="text-sm font-normal text-zinc-500">prog.</span></span>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1">
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Total Lei</span>
                <span className="text-2xl font-bold text-emerald-400">{totalMoney} <span className="text-sm font-normal text-zinc-500">RON</span></span>
            </div>
        </div>

        {/* --- LISTA PROGRAMĂRI --- */}
        <div className="space-y-4">
            <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-2">Urmează</h2>
            
            {appointments.length === 0 ? (
                <div className="text-center py-10 opacity-50">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-zinc-600" />
                    <p>Nu ai nicio programare.<br/>Adaugă una nouă!</p>
                </div>
            ) : (
                appointments.map((app) => (
                    <div key={app.id} className="bg-zinc-900 border border-white/5 p-5 rounded-2xl flex flex-col gap-3 shadow-lg relative group">
                        
                        {/* Top Row: Ora & Data */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                                <Clock className="w-3 h-3 text-pink-400" />
                                <span className="text-sm font-bold text-pink-200">{app.time}</span>
                                <span className="text-xs text-zinc-500">|</span>
                                <span className="text-xs text-zinc-400">{app.date}</span>
                            </div>
                            <button onClick={() => handleDelete(app.id)} className="text-zinc-600 hover:text-rose-500 p-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Client Info */}
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <User className="w-4 h-4 text-zinc-500" />
                                {app.clientName}
                            </h3>
                            <p className="text-sm text-zinc-400 ml-6">{app.service}</p>
                            {app.notes && <p className="text-xs text-zinc-600 ml-6 mt-1 italic">"{app.notes}"</p>}
                        </div>

                        {/* Bottom Row: Preț & WhatsApp */}
                        <div className="flex justify-between items-center mt-2 pt-3 border-t border-white/5">
                            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                                <Wallet className="w-3 h-3" /> {app.price} Lei
                            </span>
                            
                            <button 
                                onClick={() => handleWhatsAppConfirm(app)}
                                className="flex items-center gap-2 text-xs font-bold bg-[#25D366]/10 text-[#25D366] px-3 py-2 rounded-xl hover:bg-[#25D366]/20 transition-colors"
                            >
                                <MessageCircle className="w-3 h-3" />
                                Confirmă
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

      </main>

      {/* --- FAB (Floating Action Button) --- */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-pink-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 active:scale-95 transition-all z-50 border border-white/20"
      >
        <Plus className="w-8 h-8 text-white" />
      </button>

      {/* --- MODAL ADĂUGARE --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-zinc-900 w-full max-w-md rounded-3xl border border-white/10 p-6 shadow-2xl animate-in slide-in-from-bottom-10">
                
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Programare Nouă</h2>
                    <button onClick={() => setShowAddModal(false)} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Nume */}
                    <div>
                        <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Clientă</label>
                        <input 
                            type="text" 
                            value={newApp.clientName}
                            onChange={e => setNewApp({...newApp, clientName: e.target.value})}
                            placeholder="Ex: Andreea Popescu"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                            autoFocus
                        />
                    </div>

                    {/* Serviciu & Preț */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Serviciu</label>
                            <select 
                                value={newApp.service}
                                onChange={e => setNewApp({...newApp, service: e.target.value})}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none appearance-none"
                            >
                                <option>Semipermanentă</option>
                                <option>Gel Construcție</option>
                                <option>Gel Întreținere</option>
                                <option>Pedichiură</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Preț (Lei)</label>
                            <input 
                                type="number" 
                                value={newApp.price}
                                onChange={e => setNewApp({...newApp, price: Number(e.target.value)})}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Data & Ora */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Data</label>
                            <input 
                                type="date" 
                                value={newApp.date}
                                onChange={e => setNewApp({...newApp, date: e.target.value})}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Ora</label>
                            <input 
                                type="time" 
                                value={newApp.time}
                                onChange={e => setNewApp({...newApp, time: e.target.value})}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Note (Opțional)</label>
                        <textarea 
                            value={newApp.notes}
                            onChange={e => setNewApp({...newApp, notes: e.target.value})}
                            placeholder="Ex: Model french, vrea sclipici..."
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none h-20 resize-none"
                        />
                    </div>

                    <button 
                        onClick={handleAddAppointment}
                        disabled={!newApp.clientName}
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Adaugă în agendǎ
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  )
}