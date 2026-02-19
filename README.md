# Perdidog - Plataforma de Mascotas Perdidas

Aplicación web para reportar, buscar y encontrar mascotas perdidas.

## 🚀 Características

- Reportes de mascotas perdidas y encontradas
- Dashboard administrativo
- Gestión de usuarios
- Animaciones fluidas y diseño moderno
- Responsive design

## 📋 Requisitos

- Node.js 18+
- npm o yarn
- Docker (opcional, para despliegue)

## 🛠️ Instalación Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🐳 Despliegue con Docker

### Opción 1: Docker Build

```bash
# Construir la imagen
docker build -t perdidog-app .

# Ejecutar el contenedor
docker run -d -p 80:80 --name perdidog perdidog-app
```

### Opción 2: Docker Compose

```bash
# Iniciar la aplicación
docker-compose up -d

# Detener la aplicación
docker-compose down

# Ver logs
docker-compose logs -f
```

## 🌐 Despliegue en Hosting

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Railway
1. Conecta tu repositorio de GitHub
2. Railway detectará automáticamente el Dockerfile
3. Despliega automáticamente

### Render
1. Conecta tu repositorio
2. Selecciona "Docker" como entorno
3. Despliega

### DigitalOcean App Platform
1. Conecta tu repositorio
2. Selecciona Dockerfile
3. Configura el puerto 80
4. Despliega

## 📦 Estructura del Proyecto

```
perdidog/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── lib/           # Utilidades
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── public/            # Archivos estáticos
├── Dockerfile         # Configuración Docker
├── nginx.conf         # Configuración Nginx
└── package.json       # Dependencias
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` para desarrollo:

```env
VITE_APP_NAME=Perdidog
VITE_APP_VERSION=1.0.0
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Tecnologías

- React 18
- Vite
- Tailwind CSS
- Radix UI
- Lucide Icons
- React Router DOM

## 📄 Licencia

MIT

## 👥 Autor

Perdidog Team
