import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dbjnigqimbaeiiciboao.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiam5pZ3FpbWJhZWlpY2lib2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjUwNjgsImV4cCI6MjA2NTc0MTA2OH0.HU8-3n-g5PJsQPS27tYpc2QdI8yanjrVaxI0bPjTziE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          dni: string
          nombre: string
          rol: "admin" | "usuario"
          alergias?: string
          vegetariano: boolean
          celiaco: boolean
          foto?: string
          created_at: string
        }
        Insert: {
          dni: string
          nombre: string
          rol?: "admin" | "usuario"
          alergias?: string
          vegetariano?: boolean
          celiaco?: boolean
          foto?: string
        }
        Update: {
          nombre?: string
          alergias?: string
          vegetariano?: boolean
          celiaco?: boolean
          foto?: string
        }
      }
      menus: {
        Row: {
          id: string
          fecha: string
          estado: "a confirmar" | "confirmado"
          created_at: string
        }
        Insert: {
          fecha: string
          estado?: "a confirmar" | "confirmado"
        }
        Update: {
          estado?: "a confirmar" | "confirmado"
        }
      }
      platos: {
        Row: {
          id: string
          menu_id: string
          tipo: "general" | "celiaco" | "vegetariano"
          nombre: string
          descripcion: string
          created_at: string
        }
        Insert: {
          menu_id: string
          tipo: "general" | "celiaco" | "vegetariano"
          nombre: string
          descripcion: string
        }
        Update: {
          nombre?: string
          descripcion?: string
        }
      }
      reservas: {
        Row: {
          id: string
          user_id: string
          plato_id: string
          fecha: string
          created_at: string
        }
        Insert: {
          user_id: string
          plato_id: string
          fecha: string
        }
      }
    }
  }
}
