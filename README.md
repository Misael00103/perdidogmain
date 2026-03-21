# Perdidog - Plataforma para Mascotas Perdidas

Perdidog es una plataforma web que conecta a personas que han perdido mascotas con personas que han encontrado animales. Incluye un dashboard administrativo completo para gestionar reportes y usuarios.

## 🚀 Características

### Frontend
- ✅ Landing page moderna y responsive
- ✅ Dashboard administrativo completo
- ✅ Gestión de reportes (perdidos/encontrados)
- ✅ Gestión de usuarios
- ✅ Estadísticas en tiempo real
- ✅ Autenticación con JWT
- ✅ Modo fallback con datos mock
- ✅ SEO optimizado
- ✅ Páginas legales completas

### Backend (API)
- ✅ API REST completa
- ✅ Autenticación JWT con refresh tokens
- ✅ CRUD de reportes
- ✅ CRUD de usuarios
- ✅ Sistema de chat
- ✅ Geolocalización
- ✅ Documentación Swagger

## 📦 Tecnologías

- **Frontend:** React 18, Vite, TailwindCSS, Radix UI
- **Backend:** Node.js, Express (API separada)
- **Autenticación:** JWT
- **HTTP Client:** Axios
- **Notificaciones:** Sonner
- **Iconos:** Lucide React

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/perdidog.git
cd perdidog

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_URL=https://backend.perdidog.cloud/api

# App Configuration
VITE_APP_NAME=Perdidog
VITE_APP_URL=http://localhost:5173
```

### API Backend

La API está desplegada en: `https://backend.perdidog.cloud/api`

Documentación completa: https://backend.perdidog.cloud/api/docs

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview del build de producción
npm run preview

# Probar conexión con la API
node test-api.js
```

## 📱 Estructura del Proyecto

```
perdidog/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes de UI (Radix)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/           # Páginas de la aplicación
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TermsPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   ├── DisclaimerPage.jsx
│   │   ├── SafetyReportPage.jsx
│   │   └── SitemapPage.jsx
│   ├── services/        # Servicios de API
│   │   └── api.js
│   ├── images/          # Imágenes y assets
│   ├── lib/            # Utilidades
│   ├── hooks/          # Custom hooks
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env                # Variables de entorno (no commitear)
├── .env.example        # Ejemplo de variables
├── .env.production     # Variables de producción
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) con refresh tokens:

1. Login: `POST /api/auth/login`
2. Los tokens se guardan en localStorage
3. El interceptor de Axios agrega automáticamente el token a cada request
4. Si el token expira, se refresca automáticamente
5. Si el refresh falla, redirige al login

## 📊 Dashboard

El dashboard administrativo incluye:

- **Reportes:**
  - Ver todos los reportes
  - Crear nuevos reportes
  - Editar reportes existentes
  - Eliminar reportes
  - Cerrar reportes (marcar como resueltos)
  - Filtros por tipo y estado
  - Búsqueda en tiempo real

- **Usuarios:**
  - Ver todos los usuarios
  - Ver usuarios reportados
  - Bloquear/desbloquear usuarios
  - Eliminar usuarios
  - Filtros y búsqueda

- **Estadísticas:**
  - Total de reportes
  - Mascotas perdidas/encontradas
  - Reportes resueltos
  - Total de usuarios activos

## 🌐 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod --dir=dist
```

### Docker

```bash
# Build
docker build -t perdidog-app .

# Run
docker run -d -p 80:80 perdidog-app
```

## 📝 Documentación Adicional

- [Configuración de la API](./API_SETUP.md)
- [Guía de Despliegue](./DEPLOYMENT.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📧 Contacto

- Email: perdidogcontacto@gmail.com
- Teléfono: +1 (849) 250-1084
- Ubicación: República Dominicana

## 🙏 Agradecimientos

- [Radix UI](https://www.radix-ui.com/) - Componentes de UI
- [Lucide](https://lucide.dev/) - Iconos
- [TailwindCSS](https://tailwindcss.com/) - Estilos
- [Vite](https://vitejs.dev/) - Build tool

---

Hecho con ❤️ para las mascotas
