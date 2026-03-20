# Configuración de la API - Perdidog

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# API Configuration
VITE_API_URL=https://backend.perdidog.cloud/api

# App Configuration
VITE_APP_NAME=Perdidog
VITE_APP_URL=http://localhost:5173
```

### Entornos

**Desarrollo Local:**
```env
VITE_API_URL=http://localhost:3000/api
```

**Producción:**
```env
VITE_API_URL=https://backend.perdidog.cloud/api
```

## Documentación de la API

La documentación completa de la API está disponible en:
https://backend.perdidog.cloud/api/docs

## Endpoints Conectados

### Autenticación
- ✅ `POST /api/auth/login` - Login con email y contraseña
- ✅ `POST /api/auth/logout` - Cerrar sesión
- ✅ `POST /api/auth/refresh` - Refrescar token de acceso
- ✅ `GET /api/auth/me` - Obtener información del usuario actual

### Usuarios
- ✅ `GET /api/user` - Obtener todos los usuarios
- ✅ `GET /api/user/reported` - Obtener usuarios reportados
- ✅ `DELETE /api/user/{id}` - Bloquear usuario (soft delete)
- ✅ `PATCH /api/user/{id}/restore` - Desbloquear usuario

### Reportes
- ✅ `GET /api/report` - Obtener todos los reportes
- ✅ `POST /api/report` - Crear nuevo reporte
- ✅ `PATCH /api/report/{id}` - Actualizar reporte
- ✅ `DELETE /api/report/{id}` - Eliminar reporte

## Funcionalidades del Dashboard

### Gestión de Reportes
- ✅ Ver todos los reportes (perdidos/encontrados)
- ✅ Crear nuevos reportes
- ✅ Editar reportes existentes
- ✅ Eliminar reportes
- ✅ Cerrar reportes (marcar como resueltos)
- ✅ Filtrar por tipo y estado
- ✅ Búsqueda en tiempo real

### Gestión de Usuarios
- ✅ Ver todos los usuarios
- ✅ Ver usuarios reportados
- ✅ Bloquear/desbloquear usuarios
- ✅ Eliminar usuarios
- ✅ Filtrar por estado
- ✅ Búsqueda en tiempo real

### Estadísticas
- ✅ Total de reportes
- ✅ Mascotas perdidas
- ✅ Mascotas encontradas
- ✅ Reportes resueltos
- ✅ Total de usuarios
- ✅ Usuarios activos

## Modo Fallback

Si la API no está disponible, el dashboard automáticamente usará datos de demostración (mock data) para que puedas seguir trabajando en el frontend.

## Autenticación

El sistema usa JWT (JSON Web Tokens) con refresh tokens:

1. Al hacer login, se reciben:
   - `accessToken` - Token de acceso (corta duración)
   - `refreshToken` - Token de refresco (larga duración)

2. Los tokens se guardan en localStorage:
   - `perdidog_token` - Access token
   - `perdidog_refresh_token` - Refresh token
   - `perdidog_user` - Información del usuario

3. El interceptor de Axios automáticamente:
   - Agrega el token a cada request
   - Refresca el token si expira
   - Redirige al login si el refresh falla

## Estructura de Respuestas

La API puede devolver datos en dos formatos:

```javascript
// Formato 1: Con wrapper
{
  "data": [...],
  "message": "Success"
}

// Formato 2: Directo
[...]
```

El código maneja ambos formatos automáticamente.

## Manejo de Errores

Todos los errores de la API se manejan con:
- Toast notifications para el usuario
- Console.error para debugging
- Fallback a datos mock si la API falla

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Producción

Para producción, el archivo `.env.production` ya está configurado con:

```env
VITE_API_URL=https://backend.perdidog.cloud/api
VITE_APP_URL=https://perdidog.com
```

El build de producción usará automáticamente estas variables.

## Testing de la API

Puedes probar los endpoints directamente en:
- Documentación Swagger: https://backend.perdidog.cloud/api/docs
- Base URL: https://backend.perdidog.cloud/api

### Ejemplo de Login

```bash
curl -X POST https://backend.perdidog.cloud/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@perdidog.com",
    "password": "tu_password"
  }'
```
