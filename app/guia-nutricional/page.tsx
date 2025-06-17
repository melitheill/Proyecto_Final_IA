"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Heart, Apple, Droplets, Shield, Clock, Star } from "lucide-react"

export default function GuiaNutricionalPage() {
  const consejos = [
    {
      icon: Apple,
      titulo: "Alimentación Balanceada",
      descripcion: "Incluye frutas, verduras, proteínas, carbohidratos y grasas saludables en tus comidas diarias.",
      tips: [
        "Come al menos 5 porciones de frutas y verduras al día",
        "Prefiere granos integrales sobre refinados",
        "Incluye proteínas magras en cada comida",
      ],
    },
    {
      icon: Droplets,
      titulo: "Hidratación Adecuada",
      descripcion: "Mantén tu cuerpo hidratado bebiendo suficiente agua durante todo el día.",
      tips: [
        "Bebe al menos 8 vasos de agua al día",
        "Aumenta el consumo en días calurosos o al hacer ejercicio",
        "Limita bebidas azucaradas y con cafeína",
      ],
    },
    {
      icon: Clock,
      titulo: "Horarios Regulares",
      descripcion: "Establece horarios fijos para tus comidas y evita saltarte ninguna.",
      tips: [
        "Desayuna dentro de la primera hora después de levantarte",
        "Come cada 3-4 horas aproximadamente",
        "Cena al menos 2 horas antes de dormir",
      ],
    },
    {
      icon: Shield,
      titulo: "Alimentación Segura",
      descripcion: "Mantén buenas prácticas de higiene y seguridad alimentaria.",
      tips: [
        "Lava tus manos antes de comer",
        "Conserva los alimentos a temperatura adecuada",
        "Verifica fechas de vencimiento",
      ],
    },
  ]

  const alimentosRecomendados = [
    { categoria: "Proteínas", alimentos: ["Pollo", "Pescado", "Huevos", "Legumbres", "Frutos secos"] },
    { categoria: "Carbohidratos", alimentos: ["Arroz integral", "Quinoa", "Avena", "Pan integral", "Batata"] },
    {
      categoria: "Grasas saludables",
      alimentos: ["Palta", "Aceite de oliva", "Frutos secos", "Semillas", "Pescado graso"],
    },
    { categoria: "Vitaminas y minerales", alimentos: ["Espinaca", "Brócoli", "Cítricos", "Berries", "Zanahoria"] },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-white">
        <div className="container-max section-padding text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Guía Nutricional</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Consejos y recomendaciones para mantener una alimentación saludable durante tu vida universitaria
          </p>
        </div>
      </section>

      {/* Consejos Principales */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fundamentos de una Buena Alimentación</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principios básicos para mantener un estilo de vida saludable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consejos.map((consejo, index) => {
              const Icon = consejo.icon
              return (
                <div key={index} className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-unicen-light bg-opacity-10 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-unicen-dark" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{consejo.titulo}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{consejo.descripcion}</p>
                  <ul className="space-y-2">
                    {consejo.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-unicen-light mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Alimentos Recomendados */}
      <section className="bg-gray-100 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alimentos Recomendados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lista de alimentos nutritivos organizados por categorías
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alimentosRecomendados.map((grupo, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-bold text-unicen-dark mb-4">{grupo.categoria}</h3>
                <ul className="space-y-2">
                  {grupo.alimentos.map((alimento, alimentoIndex) => (
                    <li key={alimentoIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-unicen-light rounded-full"></div>
                      <span className="text-gray-700">{alimento}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips para Estudiantes */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tips para Estudiantes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Consejos específicos para mantener buenos hábitos durante el período académico
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Durante los Exámenes</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-unicen-light pl-4">
                  <h4 className="font-semibold text-gray-900">Mantén energía estable</h4>
                  <p className="text-gray-600">Evita comidas pesadas que puedan causar somnolencia</p>
                </div>
                <div className="border-l-4 border-unicen-light pl-4">
                  <h4 className="font-semibold text-gray-900">Snacks saludables</h4>
                  <p className="text-gray-600">Frutos secos, frutas y yogur son ideales para estudiar</p>
                </div>
                <div className="border-l-4 border-unicen-light pl-4">
                  <h4 className="font-semibold text-gray-900">Hidratación constante</h4>
                  <p className="text-gray-600">El cerebro necesita agua para funcionar correctamente</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Vida Universitaria</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-unicen-dark pl-4">
                  <h4 className="font-semibold text-gray-900">Planifica tus comidas</h4>
                  <p className="text-gray-600">Usa nuestro sistema de reservas para asegurar tu alimentación</p>
                </div>
                <div className="border-l-4 border-unicen-dark pl-4">
                  <h4 className="font-semibold text-gray-900">Come en horarios regulares</h4>
                  <p className="text-gray-600">No te saltes comidas por estudiar o actividades</p>
                </div>
                <div className="border-l-4 border-unicen-dark pl-4">
                  <h4 className="font-semibold text-gray-900">Socializa durante las comidas</h4>
                  <p className="text-gray-600">Comer con compañeros mejora la experiencia y reduce el estrés</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
