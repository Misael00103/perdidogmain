# 🚀 Guía de Despliegue - Perdidog

Esta guía te ayudará a desplegar Perdidog en diferentes plataformas de hosting.

## 📋 Tabla de Contenidos

1. [Despliegue con Docker](#despliegue-con-docker)
2. [Vercel](#vercel)
3. [Netlify](#netlify)
4. [Railway](#railway)
5. [Render](#render)
6. [DigitalOcean](#digitalocean)
7. [AWS](#aws)
8. [Google Cloud](#google-cloud)

---

## 🐳 Despliegue con Docker

### Requisitos
- Docker instalado
- Docker Compose (opcional)

### Opción 1: Docker Simple

```bash
# Construir la imagen
docker build -t perdidog-app .

# Ejecutar el contenedor
docker run -d -p 80:80 --name perdidog perdidog-app

# Ver logs
docker logs -f perdidog

# Detener
docker stop perdidog
docker rm perdidog
```

### Opción 2: Docker Compose (Recomendado)

```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

### Opción 3: Script de Despliegue

```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Desplegar con Docker Compose
./deploy.sh compose

# Ver logs
./deploy.sh logs

# Detener
./deploy.sh stop
```

---

## ☁️ Vercel

### Despliegue Automático

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Vite
3. Configuración automática, solo haz clic en "Deploy"

### Despliegue Manual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

### Configuración (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## 🌐 Netlify

### Despliegue Automático

1. Conecta tu repositorio a Netlify
2. Configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

### Despliegue Manual

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod --dir=dist
```

### Configuración (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🚂 Railway

### Despliegue con Dockerfile

1. Crea una cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Railway detectará automáticamente el Dockerfile
4. Haz clic en "Deploy"
5. Railway asignará automáticamente un dominio

### Variables de Entorno

En Railway Dashboard:
- Ve a tu proyecto
- Click en "Variables"
- Agrega las variables necesarias

---

## 🎨 Render

### Despliegue con Dockerfile

1. Crea una cuenta en [Render](https://render.com)
2. New → Web Service
3. Conecta tu repositorio
4. Configuración:
   - Environment: Docker
   - Docker Command: (dejar vacío, usa el CMD del Dockerfile)
5. Deploy

### Configuración Manual

Si prefieres no usar Docker:
- Build Command: `npm run build`
- Start Command: `npx serve -s dist -l 80`
- Publish Directory: `dist`

---

## 🌊 DigitalOcean App Platform

### Despliegue

1. Crea una cuenta en [DigitalOcean](https://www.digitalocean.com)
2. Apps → Create App
3. Conecta tu repositorio
4. Configuración:
   - Type: Web Service
   - Dockerfile Path: `Dockerfile`
   - HTTP Port: 80
5. Deploy

### Configuración de Dominio

1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

---

## ☁️ AWS (Amazon Web Services)

### Opción 1: AWS Amplify

```bash
# Instalar Amplify CLI
npm install -g @aws-amplify/cli

# Configurar
amplify configure

# Inicializar
amplify init

# Agregar hosting
amplify add hosting

# Publicar
amplify publish
```

### Opción 2: AWS ECS (Elastic Container Service)

1. Sube la imagen a ECR (Elastic Container Registry)
2. Crea un cluster ECS
3. Define un task definition usando tu imagen
4. Crea un servicio ECS
5. Configura un Application Load Balancer

### Opción 3: AWS S3 + CloudFront

```bash
# Build
npm run build

# Subir a S3
aws s3 sync dist/ s3://tu-bucket-name --delete

# Invalidar cache de CloudFront
aws cloudfront create-invalidation --distribution-id TU_ID --paths "/*"
```

---

## 🔵 Google Cloud Platform

### Cloud Run (con Docker)

```bash
# Autenticar
gcloud auth login

# Configurar proyecto
gcloud config set project TU_PROJECT_ID

# Build y push
gcloud builds submit --tag gcr.io/TU_PROJECT_ID/perdidog

# Deploy
gcloud run deploy perdidog \
  --image gcr.io/TU_PROJECT_ID/perdidog \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

---

## 🔧 Configuración Post-Despliegue

### Variables de Entorno

Asegúrate de configurar estas variables en tu plataforma:

```env
NODE_ENV=production
VITE_APP_NAME=Perdidog
VITE_APP_VERSION=1.0.0
```

### Dominio Personalizado

1. Compra un dominio (Namecheap, GoDaddy, etc.)
2. Configura los DNS según tu plataforma:
   - Vercel: Agrega registros A/CNAME
   - Netlify: Agrega registros A/CNAME
   - Railway: Agrega registro CNAME
   - Render: Agrega registro CNAME

### SSL/HTTPS

La mayoría de plataformas modernas incluyen SSL automático:
- ✅ Vercel: SSL automático
- ✅ Netlify: SSL automático
- ✅ Railway: SSL automático
- ✅ Render: SSL automático

---

## 📊 Monitoreo

### Logs

```bash
# Docker
docker logs -f perdidog

# Docker Compose
docker-compose logs -f

# Vercel
vercel logs

# Netlify
netlify logs
```

### Health Check

Todas las plataformas pueden usar el endpoint raíz:
```
GET https://tu-dominio.com/
```

---

## 🆘 Troubleshooting

### Error: Puerto en uso

```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Usa 8080 en lugar de 80
```

### Error: Build falla

```bash
# Limpiar cache
rm -rf node_modules dist
npm install
npm run build
```

### Error: Rutas no funcionan (404)

Asegúrate de que tu servidor está configurado para SPA:
- Nginx: Usa el `nginx.conf` incluido
- Vercel/Netlify: Configuración automática
- Otros: Redirige todas las rutas a `index.html`

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs de tu plataforma
2. Verifica las variables de entorno
3. Asegúrate de que el build local funciona: `npm run build && npm run preview`

---

## ✅ Checklist de Despliegue

- [ ] Build local exitoso
- [ ] Variables de entorno configuradas
- [ ] Dockerfile probado localmente
- [ ] Dominio configurado (opcional)
- [ ] SSL habilitado
- [ ] Monitoreo configurado
- [ ] Backup configurado

¡Listo para producción! 🚀
