"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { User, Save, AlertCircle, CheckCircle } from "lucide-react"

export default function PerfilPage() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    alergias: user?.alergias || "",
    vegetariano: user?.vegetariano || false,
    celiaco: user?.celiaco || false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setMessage(null)

    try {
      const success = await updateProfile(formData)

      if (success) {
        setMessage({ type: "success", text: "Perfil actualizado correctamente" })
      } else {
        setMessage({ type: "error", text: "Error al actualizar el perfil" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión" })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h1>
            <p className="text-gray-600">Inicia sesión para ver tu perfil</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container-max section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-unicen-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Actualiza tu información personal y preferencias alimentarias</p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* DNI (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DNI</label>
                <input
                  value={user.dni}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">El DNI no se puede modificar</p>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  value={formData.nombre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ingresa tu nombre completo"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicen-light outline-none"
                />
              </div>

              {/* Preferencias Alimentarias */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias Alimentarias</h3>
                <div className="space-y-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.vegetariano}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vegetariano: e.target.checked }))}
                      disabled={loading}
                      className="mt-1 h-4 w-4 text-unicen-dark focus:ring-unicen-light border-gray-300 rounded"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Vegetariano</span>
                      <p className="text-xs text-gray-500">Prefiero opciones vegetarianas</p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.celiaco}
                      onChange={(e) => setFormData((prev) => ({ ...prev, celiaco: e.target.checked }))}
                      disabled={loading}
                      className="mt-1 h-4 w-4 text-unicen-dark focus:ring-unicen-light border-gray-300 rounded"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Celíaco</span>
                      <p className="text-xs text-gray-500">Necesito opciones sin gluten</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Alergias */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alergias o Restricciones Alimentarias
                </label>
                <textarea
                  value={formData.alergias}
                  onChange={(e) => setFormData((prev) => ({ ...prev, alergias: e.target.value }))}
                  placeholder="Describe cualquier alergia alimentaria o restricción..."
                  disabled={loading}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicen-light outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Esta información nos ayuda a brindarte un mejor servicio</p>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`flex items-center space-x-2 p-4 rounded-lg ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? "Guardando..." : "Guardar Cambios"}</span>
              </button>
            </form>
          </div>

          {/* Account Info */}
          <div className="card mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Cuenta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Rol</p>
                <p className="text-lg capitalize">{user.rol}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha de registro</p>
                <p className="text-lg">{new Date(user.created_at).toLocaleDateString("es-AR")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
