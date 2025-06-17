"use client"

import { useState, useEffect } from "react"
import { authService } from "@/lib/auth"
import type { Database } from "@/lib/supabase"

type User = Database["public"]["Tables"]["users"]["Row"]

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (dni: string, nombre: string) => {
    setLoading(true)
    const loggedUser = await authService.login(dni, nombre)
    setUser(loggedUser)
    setLoading(false)
    return loggedUser
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateProfile = async (updates: Database["public"]["Tables"]["users"]["Update"]) => {
    if (!user) return false
    const success = await authService.updateProfile(user.id, updates)
    if (success) {
      setUser({ ...user, ...updates })
    }
    return success
  }

  return {
    user,
    loading,
    login,
    logout,
    updateProfile,
    isAdmin: user?.rol === "admin",
  }
}
