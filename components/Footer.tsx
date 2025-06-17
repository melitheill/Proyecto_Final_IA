"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, ExternalLink } from "lucide-react"

export default function Footer() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/unicen.oficial",
      icon: Facebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/unicen.oficial",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/unicen_oficial",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "comedor@unicen.edu.ar",
      href: "mailto:comedor@unicen.edu.ar",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "(02284) 426050",
      href: "tel:+542284426050",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: "Campus Universitario, Tandil, Buenos Aires",
      href: "https://maps.google.com/?q=Campus+Universitario+UNICEN+Tandil",
    },
  ]

  return (
    <footer className="bg-unicen-dark text-white">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-16 px-6">
          {/* Identidad Institucional */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-unicen-light rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-unicen-dark font-bold text-xl">U</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">UNICEN</h3>
                <p className="text-unicen-light text-sm">Comedor Universitario</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Brindamos alimentación saludable y accesible para toda la comunidad universitaria, promoviendo hábitos
              alimentarios responsables y nutritivos.
            </p>

            {/* Redes Sociales */}
            <div>
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-white hover:scale-110`}
                      aria-label={`Seguir en ${social.name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-6">Contacto</h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <div key={index} className="group">
                    <a
                      href={contact.href}
                      className="flex items-start space-x-3 text-gray-300 hover:text-unicen-light transition-colors duration-300"
                      aria-label={contact.label}
                    >
                      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{contact.label}</p>
                        <p className="text-sm font-medium">{contact.value}</p>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Horarios */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-6">Horarios de Atención</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 text-unicen-light flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Servicio</p>
                  <p className="text-white font-medium">Lunes a Viernes</p>
                  <p className="text-unicen-light font-bold text-lg">11:30 - 14:30</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-unicen-light">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Importante</p>
                <p className="text-sm text-white">
                  <strong>Reservas hasta las 10:00</strong>
                </p>
                <p className="text-xs text-gray-300 mt-1">Asegura tu lugar reservando con anticipación</p>
              </div>
            </div>
          </div>

          {/* Mapa Interactivo */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold text-lg mb-6">Ubicación</h4>
            <div className="relative">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                {!mapLoaded && (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-700">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-unicen-light mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Cargando mapa...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.5234567890123!2d-59.1234567!3d-37.3234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sUNICEN%20Campus%20Universitario!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
                  width="100%"
                  height="192"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`transition-opacity duration-300 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setMapLoaded(true)}
                  title="Ubicación del Comedor Universitario UNICEN"
                />
              </div>

              <a
                href="https://maps.google.com/?q=Campus+Universitario+UNICEN+Tandil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 mt-3 text-unicen-light hover:text-white transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Ver en Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-700 py-6 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} Universidad Nacional del Centro de la Provincia de Buenos Aires
              </p>
              <p className="text-gray-400 text-xs mt-1">Todos los derechos reservados</p>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <a href="/politica-privacidad" className="text-gray-300 hover:text-unicen-light transition-colors">
                Política de Privacidad
              </a>
              <a href="/terminos-condiciones" className="text-gray-300 hover:text-unicen-light transition-colors">
                Términos y Condiciones
              </a>
              <a href="/accesibilidad" className="text-gray-300 hover:text-unicen-light transition-colors">
                Accesibilidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
