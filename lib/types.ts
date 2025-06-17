export interface User {
  id: string // UUID
  dni: string // character varying
  nombre: string // text
  rol: "admin" | "usuario" // text
  es_vegetariano: boolean
  es_celiaco: boolean
  enfermedades?: string // text, nullable
  created_at?: string // timestamp with time zone
}

export interface Menu {
  id: string // UUID
  fecha: string // date
  estado: "activo" | "inactivo" // text
  created_at?: string // timestamp with time zone
}

export interface Plato {
  id: string // UUID
  menu_id: string // UUID foreign key
  tipo: "general" | "celiaco" | "vegetariano" // text
  nombre: string // text
  descripcion: string // text
  created_at?: string // timestamp with time zone
}

export interface Reserva {
  id: string // UUID
  user_id: string // UUID foreign key
  plato_id: string // UUID foreign key
  fecha: string // date
  created_at?: string // timestamp with time zone
}

export interface TurnoReserva {
  id: string
  user_id: string
  fecha: string
  turno: string
}

export interface Pago {
  id: string
  fecha: string
  link_mercado_pago?: string
  link_cuenta_dni?: string
}

export interface TimeSlot {
  time: string
  available: number
  total: number
}
