"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"
import { Calendar, Utensils, Leaf, Wheat, User, LogIn } from "lucide-react"
import Link from "next/link"

interface Menu {
  id: string
  fecha: string
  estado: "a confirmar" | "confirmado"
}

interface Plato {
  id: string
  menu_id: string
  tipo: "general" | "celiaco" | "vegetariano"
  nombre: string
  descripcion: string
}

// Datos de prueba para mostrar menús
const menusPrueba: Menu[] = [
  {
    id: "menu-1",
    fecha: new Date().toISOString().split("T")[0],
    estado: "confirmado",
  },
  {
    id: "menu-2",
    fecha: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    estado: "confirmado",
  },
  {
    id: "menu-3",
    fecha: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    estado: "a confirmar",
  },
]

const platosPrueba: Plato[] = [
  // Menú de hoy
  {
    id: "plato-1",
    menu_id: "menu-1",
    tipo: "general",
    nombre: "Milanesa Napolitana con Papas Fritas",
    descripcion:
      "Milanesa de carne crispy cubierta con jamón, queso y salsa de tomate, acompañada de papas fritas doradas y ensalada mixta fresca.",
  },
  {
    id: "plato-2",
    menu_id: "menu-1",
    tipo: "vegetariano",
    nombre: "Bowl de Quinoa Mediterráneo",
    descripcion:
      "Quinoa cocida con garbanzos especiados, tomates cherry, pepino, aceitunas kalamata, queso feta y aderezo de yogurt con hierbas frescas.",
  },
  {
    id: "plato-3",
    menu_id: "menu-1",
    tipo: "celiaco",
    nombre: "Salmón Grillado con Vegetales",
    descripcion:
      "Filete de salmón a la plancha con limón y hierbas, acompañado de vegetales asados (calabaza, brócoli, zanahoria) y arroz integral.",
  },
  // Menú de mañana
  {
    id: "plato-4",
    menu_id: "menu-2",
    tipo: "general",
    nombre: "Pasta Boloñesa Casera",
    descripcion:
      "Spaghetti al dente con salsa boloñesa preparada con carne molida, tomates frescos, cebolla, apio y zanahoria. Servida con queso parmesano.",
  },
  {
    id: "plato-5",
    menu_id: "menu-2",
    tipo: "vegetariano",
    nombre: "Hamburguesa de Lentejas",
    descripcion:
      "Hamburguesa casera de lentejas y vegetales, servida en pan integral con lechuga, tomate, cebolla y mayonesa vegana. Incluye papas al horno.",
  },
  {
    id: "plato-6",
    menu_id: "menu-2",
    tipo: "celiaco",
    nombre: "Pollo al Limón con Puré",
    descripcion:
      "Pechuga de pollo marinada en limón y romero, cocida a la plancha, acompañada de puré de papas cremoso y verduras salteadas sin gluten.",
  },
  // Menú pasado mañana
  {
    id: "plato-7",
    menu_id: "menu-3",
    tipo: "general",
    nombre: "Guiso de Lentejas con Chorizo",
    descripcion:
      "Guiso tradicional de lentejas con chorizo colorado, calabaza, zanahoria, cebolla y pimiento rojo. Servido con arroz blanco.",
  },
  {
    id: "plato-8",
    menu_id: "menu-3",
    tipo: "vegetariano",
    nombre: "Risotto de Hongos",
    descripcion:
      "Risotto cremoso preparado con hongos portobello y champiñones, caldo de verduras, vino blanco, cebolla y queso parmesano.",
  },
  {
    id: "plato-9",
    menu_id: "menu-3",
    tipo: "celiaco",
    nombre: "Pescado a la Plancha con Ensalada",
    descripcion:
      "Filete de merluza a la plancha con limón y perejil, acompañado de ensalada completa con lechuga, tomate, huevo duro y aceitunas.",
  },
]

export default function MenuPage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [menu, setMenu] = useState<Menu | null>(null)
  const [platos, setPlatos] = useState<Plato[]>([])
  const [reservas, setReservas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMenuData()
    if (user) {
      loadUserReservas()
    }
  }, [selectedDate, user])

  const loadMenuData = async () => {
    try {
      // Primero intentar cargar desde Supabase
      const { data: menuData, error: menuError } = await supabase
        .from("menus")
        .select("*")
        .eq("fecha", selectedDate)
        .eq("estado", "confirmado")
        .single()

      if (menuData) {
        setMenu(menuData)
        const { data: platosData, error: platosError } = await supabase
          .from("platos")
          .select("*")
          .eq("menu_id", menuData.id)

        if (!platosError) {
          setPlatos(platosData || [])
          setLoading(false)
          return
        }
      }

      // Si no hay datos en Supabase, usar datos de prueba
      const menuPrueba = menusPrueba.find((m) => m.fecha === selectedDate)
      if (menuPrueba) {
        setMenu(menuPrueba)
        const platosPruebaFiltrados = platosPrueba.filter((p) => p.menu_id === menuPrueba.id)
        setPlatos(platosPruebaFiltrados)
      } else {
        setMenu(null)
        setPlatos([])
      }
    } catch (error) {
      console.error("Error cargando menú:", error)
      // Fallback a datos de prueba
      const menuPrueba = menusPrueba.find((m) => m.fecha === selectedDate)
      if (menuPrueba) {
        setMenu(menuPrueba)
        const platosPruebaFiltrados = platosPrueba.filter((p) => p.menu_id === menuPrueba.id)
        setPlatos(platosPruebaFiltrados)
      }
    } finally {
      setLoading(false)
    }
  }

  const loadUserReservas = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("reservas")
        .select("*")
        .eq("user_id", user.id)
        .eq("fecha", selectedDate)

      if (error) throw error
      setReservas(data || [])
    } catch (error) {
      console.error("Error cargando reservas:", error)
    }
  }

  const handleReserve = async (platoId: string) => {
    if (!user) {
      alert("Debes iniciar sesión para hacer reservas")
      return
    }

    try {
      const existingReserva = reservas.find((r) => r.plato_id === platoId)

      if (existingReserva) {
        // Cancelar reserva
        const { error } = await supabase.from("reservas").delete().eq("id", existingReserva.id)

        if (error) throw error
        setReservas(reservas.filter((r) => r.id !== existingReserva.id))
      } else {
        // Verificar límite de 2 reservas
        if (reservas.length >= 2) {
          alert("Solo puedes reservar hasta 2 platos por día")
          return
        }

        // Crear nueva reserva
        const { data, error } = await supabase
          .from("reservas")
          .insert([
            {
              user_id: user.id,
              plato_id: platoId,
              fecha: selectedDate,
            },
          ])
          .select()
          .single()

        if (error) throw error
        setReservas([...reservas, data])
      }
    } catch (error) {
      console.error("Error en reserva:", error)
      alert("Error al procesar la reserva")
    }
  }

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "vegetariano":
        return <Leaf className="h-5 w-5 text-green-600" />
      case "celiaco":
        return <Wheat className="h-5 w-5 text-yellow-600" />
      default:
        return <Utensils className="h-5 w-5 text-unicen-dark" />
    }
  }

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "vegetariano":
        return "bg-green-100 text-green-800"
      case "celiaco":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPrice = (tipo: string) => {
    switch (tipo) {
      case "vegetariano":
        return "$2.500"
      case "celiaco":
        return "$2.800"
      default:
        return "$2.200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Menú del Día</h1>
          <p className="text-xl text-gray-600 mb-6">Descubre nuestras opciones gastronómicas</p>
          <div className="flex items-center justify-center space-x-4">
            <Calendar className="h-5 w-5 text-unicen-dark" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicen-light outline-none"
            />
          </div>
        </div>

        {/* Login prompt for non-authenticated users */}
        {!user && (
          <div className="bg-unicen-light bg-opacity-10 border border-unicen-light rounded-xl p-6 mb-8 text-center">
            <User className="h-12 w-12 text-unicen-dark mx-auto mb-4" />
            <h3 className="text-xl font-bold text-unicen-dark mb-2">¿Quieres hacer una reserva?</h3>
            <p className="text-unicen-dark mb-4">Inicia sesión para reservar hasta 2 platos por día</p>
            <Link href="/login" className="btn-primary inline-flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Iniciar Sesión</span>
            </Link>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unicen-dark mx-auto mb-4"></div>
            <p>Cargando menú...</p>
          </div>
        ) : !menu ? (
          <div className="card text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay menú disponible</h3>
            <p className="text-gray-600">No se ha confirmado el menú para esta fecha</p>
          </div>
        ) : (
          <>
            {/* Menu Status */}
            <div className="text-center mb-8">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  menu.estado === "confirmado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {menu.estado === "confirmado" ? "✓ Menú Confirmado" : "⏳ Menú a Confirmar"}
              </span>
            </div>

            {/* Reservas Summary */}
            {user && reservas.length > 0 && (
              <div className="bg-unicen-light bg-opacity-10 border border-unicen-light rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-unicen-dark mb-2">Tus Reservas</h3>
                <p className="text-unicen-dark">
                  Tienes {reservas.length} plato{reservas.length !== 1 ? "s" : ""} reservado
                  {reservas.length !== 1 ? "s" : ""} para hoy.
                  {reservas.length < 2 && ` Puedes reservar ${2 - reservas.length} más.`}
                </p>
              </div>
            )}

            {/* Platos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platos.map((plato) => {
                const isReserved = user && reservas.some((r) => r.plato_id === plato.id)
                const canReserve = user && (reservas.length < 2 || isReserved)

                return (
                  <div key={plato.id} className={`card ${isReserved ? "ring-2 ring-unicen-light" : ""}`}>
                    {/* Image placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center">
                        {getIcon(plato.tipo)}
                        <p className="text-gray-500 text-sm mt-2">Imagen del plato</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getIcon(plato.tipo)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(plato.tipo)}`}>
                          {plato.tipo.charAt(0).toUpperCase() + plato.tipo.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-unicen-dark">{getPrice(plato.tipo)}</span>
                      </div>
                    </div>

                    {isReserved && (
                      <div className="bg-unicen-dark text-white px-3 py-1 rounded-full text-sm font-medium mb-4 text-center">
                        ✓ Reservado
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plato.nombre}</h3>
                    <p className="text-gray-600 mb-6">{plato.descripcion}</p>

                    {user ? (
                      <button
                        onClick={() => handleReserve(plato.id)}
                        disabled={!canReserve && !isReserved}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                          isReserved
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : canReserve
                              ? "btn-primary"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isReserved ? "Cancelar Reserva" : "Reservar"}
                      </button>
                    ) : (
                      <Link href="/login" className="btn-secondary w-full text-center">
                        Iniciar Sesión para Reservar
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>

            {platos.length === 0 && (
              <div className="card text-center py-16">
                <Utensils className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sin platos disponibles</h3>
                <p className="text-gray-600">No hay platos cargados para este menú</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
