# Configuración de CORS para Perdidog

## Problema
El backend está rechazando peticiones del frontend debido a errores de CORS (Cross-Origin Resource Sharing).

## Solución

### 1. Actualizar el archivo `.env` del Backend

En tu archivo `.env` del backend, actualiza la variable `CORS_ORIGIN` para incluir todas las URLs del frontend:

```env
CORS_ORIGIN=https://perdidog.cloud,https://www.perdidog.cloud,https://app.perdidog.cloud,http://localhost:5173,http://localhost:3000
```

**URLs incluidas:**
- `https://perdidog.cloud` - Dominio principal
- `https://www.perdidog.cloud` - Dominio con www
- `https://app.perdidog.cloud` - Subdominio de la app (si aplica)
- `http://localhost:5173` - Desarrollo local con Vite
- `http://localhost:3000` - Desarrollo local alternativo

### 2. Verificar la configuración del Backend

Asegúrate de que tu backend (NestJS) esté configurado para usar la variable `CORS_ORIGIN`:

```typescript
// main.ts
app.enableCors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### 3. Reiniciar el Backend

Después de actualizar el archivo `.env`, reinicia el servidor backend para que los cambios surtan efecto:

```bash
# Si usas PM2
pm2 restart perdidog-backend

# Si usas Docker
docker-compose restart backend

# Si usas npm directamente
npm run start:prod
```

### 4. Verificar las URLs del Frontend

**Desarrollo (.env):**
```env
VITE_API_URL=https://backend.perdidog.cloud/api
VITE_APP_URL=http://localhost:5173
```

**Producción (.env.production):**
```env
VITE_API_URL=https://backend.perdidog.cloud/api
VITE_APP_URL=https://perdidog.cloud
```

### 5. Configuración de Netlify (si aplica)

Si estás desplegando en Netlify, asegúrate de configurar las variables de entorno en el dashboard de Netlify:

1. Ve a: Site settings → Environment variables
2. Agrega:
   - `VITE_API_URL` = `https://backend.perdidog.cloud/api`
   - `VITE_APP_URL` = `https://perdidog.cloud`

### 6. Verificar que funciona

Después de hacer los cambios:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña Network
3. Intenta hacer login o crear un reporte
4. Verifica que las peticiones a `https://backend.perdidog.cloud/api` tengan status 200 (no 403 o CORS error)

## Errores Comunes

### Error: "Access to fetch has been blocked by CORS policy"
**Causa:** La URL del frontend no está en `CORS_ORIGIN` del backend
**Solución:** Agregar la URL a `CORS_ORIGIN` y reiniciar el backend

### Error: "Preflight request doesn't pass"
**Causa:** El backend no está manejando correctamente las peticiones OPTIONS
**Solución:** Verificar que el backend tenga configurado el método OPTIONS en CORS

### Error: "Credentials flag is true, but Access-Control-Allow-Credentials is not"
**Causa:** El backend no tiene `credentials: true` en la configuración de CORS
**Solución:** Agregar `credentials: true` en la configuración de CORS del backend

## Contacto

Si los problemas persisten después de seguir estos pasos, verifica:
1. Que el backend esté corriendo y accesible
2. Que no haya un firewall bloqueando las peticiones
3. Que el certificado SSL esté válido en ambos dominios
