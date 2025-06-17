# Proyecto-Seminario-IA

# 🍽️ Comedor Universitario UNICEN - Sistema de Reservas y Turnos

Este proyecto es una plataforma web desarrollada para modernizar el sistema de reservas del Comedor Universitario de la UNICEN (Tandil), permitiendo a estudiantes y administradores gestionar menús, turnos y pagos de manera eficiente, accesible y adaptada a sus necesidades alimentarias.

---

## 🚀 Tecnologías utilizadas

- **Next.js** – Framework de React para desarrollo frontend rápido y escalable.
- **Tailwind CSS** – Sistema de estilos utility-first para UI limpia, accesible y adaptable.
- **Supabase** – Backend como servicio:
  - Autenticación con rol de usuario o administrador (basado en DNI)
  - Base de datos PostgreSQL
  - API REST y funciones con validaciones (máximo 2 reservas por día, turnos únicos)
- **Vercel** – Plataforma de despliegue para aplicaciones React/Next.js.

---

## 🤖 Inteligencias Artificiales utilizadas

Este proyecto fue co-creado con herramientas de inteligencia artificial generativa, en el marco del Seminario de IA, incluyendo:

### 🧠 ChatGPT-4 (OpenAI)
- Generación del prompt detallado para **V0.dev** y **Supabase**, automatizando estructuras de backend.
- Asistencia en el diseño de experiencia de usuario y flujos de interacción.
- Desarrollo de componentes de frontend en React + Tailwind.
- Estructuración del sistema de turnos y reglas de negocio en SQL y JavaScript.

### 🤖 V0.dev (by Vercel)
- Generación automática de interfaces responsivas a partir de prompts en lenguaje natural.
- Prototipado rápido de vistas como menú diario, formulario de perfil, y panel admin.

---

## 🔐 Funcionalidades principales

### Usuarios (estudiantes)
- Registro e ingreso con DNI.
- Perfil con condiciones alimentarias: vegetariano, celíaco, alergias.
- Visualización y reserva del menú del día (máximo 2 platos).
- Selección de turno de retiro.
- Acceso a historial de reservas.
- Botones de pago con Mercado Pago o Cuenta DNI.

### Administrador
- Carga de menú diario (3 platos: general, vegetariano, celíaco).
- Estado del menú: confirmado / a confirmar.
- Carga manual de links de pago.
- Gestión de turnos y visualización de reservas.

---

## 🎨 Diseño UX/UI
- Basado en los colores institucionales de la UNICEN (azul, celeste y blanco).
- Navegación clara y minimalista.
- Accesibilidad: mobile-first, formularios simples, feedback visual.

---
https://v0-unicen-comedor-app.vercel.app/ 
