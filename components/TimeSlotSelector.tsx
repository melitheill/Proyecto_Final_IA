"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Clock, Users } from "lucide-react"

interface TimeSlot {
  time: string
  available: number
  total: number
}

interface TimeSlotSelectorProps {
  selectedDate: string
  onSlotSelect: (time: string) => void
  selectedSlot?: string
}

export default function TimeSlotSelector({ selectedDate, onSlotSelect, selectedSlot }: TimeSlotSelectorProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)

  // Generar slots de tiempo (11:30 a 14:00, cada 15 minutos)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const startTime = new Date(`2024-01-01 11:30:00`)
    const endTime = new Date(`2024-01-01 14:00:00`)

    while (startTime <= endTime) {
      const timeString = startTime.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })

      slots.push({
        time: timeString,
        available: 10, // Máximo 10 personas por turno
        total: 10,
      })

      startTime.setMinutes(startTime.getMinutes() + 15)
    }

    return slots
  }

  useEffect(() => {
    const loadTimeSlots = async () => {
      setLoading(true)

      try {
        // Obtener reservas existentes para la fecha
        const { data: reservas, error } = await supabase
          .from("turnos_reservas")
          .select("turno")
          .eq("fecha", selectedDate)

        if (error) throw error

        const baseSlots = generateTimeSlots()

        // Contar reservas por turno
        const reservasPorTurno: { [key: string]: number } = {}
        reservas?.forEach((reserva) => {
          reservasPorTurno[reserva.turno] = (reservasPorTurno[reserva.turno] || 0) + 1
        })

        // Actualizar disponibilidad
        const slotsWithAvailability = baseSlots.map((slot) => ({
          ...slot,
          available: slot.total - (reservasPorTurno[slot.time] || 0),
        }))

        setTimeSlots(slotsWithAvailability)
      } catch (error) {
        console.error("Error cargando turnos:", error)
      } finally {
        setLoading(false)
      }
    }

    if (selectedDate) {
      loadTimeSlots()
    }
  }, [selectedDate])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Seleccionar Turno</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Cargando turnos...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Seleccionar Turno</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <Button
              key={slot.time}
              variant={selectedSlot === slot.time ? "default" : "outline"}
              disabled={slot.available === 0}
              onClick={() => onSlotSelect(slot.time)}
              className="flex flex-col items-center p-4 h-auto"
            >
              <span className="font-medium">{slot.time}</span>
              <div className="flex items-center space-x-1 text-xs mt-1">
                <Users className="h-3 w-3" />
                <span>
                  {slot.available}/{slot.total}
                </span>
              </div>
            </Button>
          ))}
        </div>

        {timeSlots.every((slot) => slot.available === 0) && (
          <div className="text-center py-4 text-gray-500">No hay turnos disponibles para esta fecha</div>
        )}
      </CardContent>
    </Card>
  )
}
