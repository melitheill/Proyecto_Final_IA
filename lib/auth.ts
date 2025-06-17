"use client"

import { supabase } from "./supabase"
import type { Database } from "./supabase"

type User = Database["public"]["Tables"]["users"]["Row"]

export const authService = {
  async login(dni: string, nombre: string): Promise<User | null> {
    try {
      // Buscar usuario existente
      const { data: existingUser, error: searchError } = await supabase
        .from("users")
        .select("*")
        .eq("dni", dni)
        .single()

      if (existingUser) {
        localStorage.setItem("user", JSON.stringify(existingUser))
        return existingUser
      }

      // Crear nuevo usuario
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([
          {
            dni,
            nombre,
            rol: "usuario",
            vegetariano: false,
            celiaco: false,
          },
        ])
        .select()
        .single()

      if (createError) throw createError

      localStorage.setItem("user", JSON.stringify(newUser))
      return newUser
    } catch (error) {
      console.error("Error en login:", error)
      return null
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },

  logout() {
    localStorage.removeItem("user")
  },

  async updateProfile(userId: string, updates: Database["public"]["Tables"]["users"]["Update"]): Promise<boolean> {
    try {
      const { error } = await supabase.from("users").update(updates).eq("id", userId)

      if (error) throw error

      // Actualizar localStorage
      const currentUser = this.getCurrentUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...updates }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      return true
    } catch (error) {
      console.error("Error actualizando perfil:", error)
      return false
    }
  },
}
