"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [dni, setDni] = useState("")
  const [nombre, setNombre] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!dni || !nombre) {
      setError("Por favor completa todos los campos")
      return
    }

    if (dni.length < 7 || dni.length > 8) {
      setError("El DNI debe tener entre 7 y 8 dígitos")
      return
    }

    setLoading(true)

    try {
      const user = await login(dni, nombre.trim())
      if (user) {
        router.push("/")
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.")
      }
    } catch (error) {
      setError("Error de conexión. Verifica tu internet.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-unicen-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">U</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
              <p className="text-gray-600">Ingresa con tu DNI y nombre completo</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
                  DNI
                </label>
                <input
                  id="dni"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicen-light focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicen-light focus:border-transparent outline-none transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary">
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Si es tu primera vez, se creará tu cuenta automáticamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
