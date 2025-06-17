"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"
import { Calendar, Download, QrCode, Receipt, Clock } from "lucide-react"

interface ReservaWithPlato {
  id: string
  fecha: string
  created_at: string
  platos: {
    nombre: string
    tipo: string
    descripcion: string
  }
}

export default function ReservasPage() {
  const { user } = useAuth()
  const [reservas, setReservas] = useState<ReservaWithPlato[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadReservas()
    }
  }, [user])

  const loadReservas = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("reservas")
        .select(`
          id,
          fecha,
          created_at,
          platos (
            nombre,
            tipo,
            descripcion
          )
        `)
        .eq("user_id", user.id)
        .order("fecha", { ascending: false })

      if (error) throw error
      setReservas(data || [])
    } catch (error) {
      console.error("Error cargando reservas:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateQRData = (reserva: ReservaWithPlato) => {
    return `RESERVA-${reserva.id}-${user?.dni}-${reserva.fecha}`
  }

  const downloadComprobante = (reserva: ReservaWithPlato) => {
    const content = `
COMEDOR UNIVERSITARIO UNICEN
============================

COMPROBANTE DE RESERVA

Nombre: ${user?.nombre}
DNI: ${user?.dni}
Fecha: ${new Date(reserva.fecha).toLocaleDateString("es-AR")}
Plato: ${reserva.platos.nombre}
Tipo: ${reserva.platos.tipo}

Código QR: ${generateQRData(reserva)}

Presenta este comprobante al momento del retiro.
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `comprobante-${reserva.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h1>
            <p className="text-gray-600">Inicia sesión para ver tus reservas</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mis Reservas</h1>
          <p className="text-xl text-gray-600">Historial de tus reservas en el comedor universitario</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unicen-dark mx-auto mb-4"></div>
            <p>Cargando reservas...</p>
          </div>
        ) : reservas.length === 0 ? (
          <div className="card text-center py-16">
            <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tienes reservas</h3>
            <p className="text-gray-600 mb-6">Aún no has realizado ninguna reserva</p>
            <a href="/menu" className="btn-primary">
              Ver Menú
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-unicen-dark" />
                        <span className="font-semibold text-gray-900">
                          {new Date(reserva.fecha).toLocaleDateString("es-AR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          reserva.platos.tipo === "vegetariano"
                            ? "bg-green-100 text-green-800"
                            : reserva.platos.tipo === "celiaco"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {reserva.platos.tipo.charAt(0).toUpperCase() + reserva.platos.tipo.slice(1)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reserva.platos.nombre}</h3>
                    <p className="text-gray-600 mb-2">{reserva.platos.descripcion}</p>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Reservado el {new Date(reserva.created_at).toLocaleDateString("es-AR")}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
                    <button
                      onClick={() => downloadComprobante(reserva)}
                      className="btn-secondary flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Descargar</span>
                    </button>

                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                      <QrCode className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                      <div className="text-xs text-gray-600 font-mono">{generateQRData(reserva).slice(0, 20)}...</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
