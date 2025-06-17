"use client"

import { useAuth } from "@/hooks/useAuth"
import Layout from "@/components/Layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Calendar, Users, CreditCard, BarChart3 } from "lucide-react"

export default function AdminPage() {
  const { user, isAdmin } = useAuth()

  if (!isAdmin) {
    return (
      <Layout>
        <Card>
          <CardContent className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Denegado</h3>
            <p className="text-gray-600">No tienes permisos para acceder al panel administrativo.</p>
          </CardContent>
        </Card>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel Administrativo</h1>
          <p className="text-gray-600 mt-1">Gestiona menús, turnos y pagos del comedor universitario</p>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Gestionar Menús</h3>
              <p className="text-sm text-gray-600 mb-4">Crear y editar menús diarios</p>
              <Button className="w-full">Administrar</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Ver Reservas</h3>
              <p className="text-sm text-gray-600 mb-4">Consultar reservas y turnos</p>
              <Button className="w-full">Ver Reservas</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Links de Pago</h3>
              <p className="text-sm text-gray-600 mb-4">Configurar enlaces de pago</p>
              <Button className="w-full">Configurar</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Estadísticas</h3>
              <p className="text-sm text-gray-600 mb-4">Ver reportes y métricas</p>
              <Button className="w-full">Ver Reportes</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Usuarios</h3>
              <p className="text-sm text-gray-600 mb-4">Gestionar usuarios del sistema</p>
              <Button className="w-full">Administrar</Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <p className="text-sm text-gray-600">Menús Activos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">0</div>
              <p className="text-sm text-gray-600">Reservas Hoy</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <p className="text-sm text-gray-600">Usuarios Registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <p className="text-sm text-gray-600">Turnos Ocupados</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
