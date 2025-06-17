"use client"

import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Calendar, Users, Utensils, Shield, Clock, Award, ChefHat, Star, ArrowRight, Leaf, Wheat } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unicen-dark"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section - Gradient Background */}
      <section className="hero-section text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-max section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <ChefHat className="h-20 w-20 mx-auto mb-6 text-white" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Comedor Universitario</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Alimentación saludable y accesible para toda la comunidad universitaria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="btn-primary bg-white text-unicen-dark hover:bg-gray-100 text-lg px-8 py-4">
                Ver Menú de Hoy
              </Link>
              {!user ? (
                <Link
                  href="/login"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-unicen-dark text-lg px-8 py-4"
                >
                  Comenzar
                </Link>
              ) : (
                <Link
                  href="/reservas"
                  className="btn-secondary border-white text-white hover:bg-white hover:text-unicen-dark text-lg px-8 py-4"
                >
                  Mis Reservas
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned Cards */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Diseñamos experiencias alimentarias</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro sistema digital facilita el acceso a una alimentación balanceada, permitiendo reservas anticipadas
              y opciones personalizadas según tus necesidades nutricionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reservas Fáciles */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-unicen-dark rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reservas Fáciles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Conectamos estudiantes con el sistema más intuitivo para reservar comidas con anticipación y sin
                complicaciones.
              </p>
            </div>

            {/* Menús Variados */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Menús Variados</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ofrecemos opciones gastronómicas diversas para todos los gustos: platos generales, vegetarianos y
                celíacos.
              </p>
            </div>

            {/* Alimentación Segura */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Alimentación Segura</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Consideramos cuidadosamente todas las alergias y restricciones alimentarias para garantizar tu
                bienestar.
              </p>
            </div>

            {/* Horarios Flexibles */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Horarios Flexibles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Servicio disponible de 11:30 a 14:30 todos los días hábiles, adaptándose a tu rutina universitaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section - White Background */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Menú de Hoy</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las deliciosas opciones que tenemos preparadas para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-unicen-dark" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plato General</h3>
              <p className="text-gray-600 mb-4">Milanesa Napolitana con papas fritas y ensalada mixta</p>
              <span className="text-2xl font-bold text-unicen-dark">$2.200</span>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Opción Vegetariana</h3>
              <p className="text-gray-600 mb-4">Bowl de quinoa mediterráneo con garbanzos y vegetales</p>
              <span className="text-2xl font-bold text-unicen-dark">$2.500</span>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wheat className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sin Gluten</h3>
              <p className="text-gray-600 mb-4">Salmón grillado con vegetales asados y arroz integral</p>
              <span className="text-2xl font-bold text-unicen-dark">$2.800</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/menu" className="btn-primary inline-flex items-center space-x-2">
              <span>Ver Menú Completo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Light Gray Background */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Números que nos respaldan</h2>
            <p className="text-xl text-gray-600">La confianza de la comunidad universitaria</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Users className="h-12 w-12 text-unicen-dark mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Estudiantes atendidos diariamente</p>
            </div>

            <div className="card text-center">
              <Utensils className="h-12 w-12 text-unicen-dark mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15</h3>
              <p className="text-gray-600">Platos diferentes por semana</p>
            </div>

            <div className="card text-center">
              <Award className="h-12 w-12 text-unicen-dark mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8/5</h3>
              <p className="text-gray-600">Calificación promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - White Background */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros estudiantes</h2>
            <p className="text-xl text-gray-600">Experiencias reales de la comunidad universitaria</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "El sistema de reservas es súper fácil de usar. Ya no tengo que hacer cola y siempre encuentro opciones
                que me gustan."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-unicen-light rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">María González</p>
                  <p className="text-sm text-gray-500">Estudiante de Ingeniería</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Como celíaco, es genial tener opciones seguras todos los días. El personal está muy bien capacitado."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-unicen-dark rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <p className="font-semibold">Juan Pérez</p>
                  <p className="text-sm text-gray-500">Estudiante de Veterinaria</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "La comida es deliciosa y los precios son muy accesibles. El comedor se ha vuelto mi lugar favorito del
                campus."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="font-semibold">Ana Rodríguez</p>
                  <p className="text-sm text-gray-500">Estudiante de Psicología</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Separated with Light Blue Background */}
      <section className="bg-gradient-to-r from-unicen-light to-blue-400 section-padding">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para una mejor experiencia alimentaria?
            </h2>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Únete a cientos de estudiantes que ya disfrutan de nuestro sistema de reservas digital
            </p>
            {!user ? (
              <Link
                href="/login"
                className="inline-flex items-center space-x-3 bg-white text-unicen-dark hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Crear Cuenta</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/menu"
                className="inline-flex items-center space-x-3 bg-white text-unicen-dark hover:bg-gray-100 font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span>Ver Menú de Hoy</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
