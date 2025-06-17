"use client"

import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Plato } from "@/lib/types"
import { Leaf, Wheat, Utensils, Star, Clock } from "lucide-react"

interface PlatoCardProps {
  plato: Plato
  onReserve: (platoId: string) => void
  isReserved: boolean
  canReserve: boolean
}

export default function PlatoCard({ plato, onReserve, isReserved, canReserve }: PlatoCardProps) {
  const getIcon = () => {
    switch (plato.tipo) {
      case "vegetariano":
        return <Leaf className="h-5 w-5 text-green-600" />
      case "celiaco":
        return <Wheat className="h-5 w-5 text-yellow-600" />
      default:
        return <Utensils className="h-5 w-5 text-blue-600" />
    }
  }

  const getBadgeColor = () => {
    switch (plato.tipo) {
      case "vegetariano":
        return "bg-green-500 text-white"
      case "celiaco":
        return "bg-yellow-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getImageUrl = () => {
    // Generate food images based on plato type and name
    switch (plato.tipo) {
      case "vegetariano":
        return "/placeholder.svg?height=200&width=300&text=🥗+Vegetariano"
      case "celiaco":
        return "/placeholder.svg?height=200&width=300&text=🍞+Sin+Gluten"
      default:
        return "/placeholder.svg?height=200&width=300&text=🍽️+Plato+Principal"
    }
  }

  const getPrice = () => {
    // Mock prices based on type
    switch (plato.tipo) {
      case "vegetariano":
        return "$2.500"
      case "celiaco":
        return "$2.800"
      default:
        return "$2.200"
    }
  }

  return (
    <div className={`food-card ${isReserved ? "ring-4 ring-blue-500 ring-opacity-50" : ""}`}>
      {/* Food Image */}
      <div className="relative">
        <img src={getImageUrl() || "/placeholder.svg"} alt={plato.nombre} className="food-card-image" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getBadgeColor()} flex items-center space-x-1 px-3 py-1`}>
            {getIcon()}
            <span className="font-medium">{plato.tipo.charAt(0).toUpperCase() + plato.tipo.slice(1)}</span>
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4">
          <div className="price-tag">{getPrice()}</div>
        </div>

        {/* Reserved indicator */}
        {isReserved && (
          <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">✓ RESERVADO</div>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plato.nombre}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{plato.descripcion}</p>
        </div>

        {/* Rating and time */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>15-20 min</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onReserve(plato.id)}
          disabled={!canReserve && !isReserved}
          variant={isReserved ? "destructive" : "default"}
          className={`w-full py-3 text-base font-semibold rounded-xl transition-all duration-300 ${
            isReserved ? "bg-red-500 hover:bg-red-600" : "btn-unicen"
          }`}
        >
          {isReserved ? "Cancelar Reserva" : "Agregar a Reserva"}
        </Button>
      </CardContent>
    </div>
  )
}
