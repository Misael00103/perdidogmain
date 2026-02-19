#!/bin/bash

# Script de despliegue para Perdidog
# Uso: ./deploy.sh [opción]

set -e

echo "🐕 Perdidog - Script de Despliegue"
echo "=================================="

# Función para construir con Docker
build_docker() {
    echo "📦 Construyendo imagen Docker..."
    docker build -t perdidog-app:latest .
    echo "✅ Imagen construida exitosamente"
}

# Función para ejecutar con Docker
run_docker() {
    echo "🚀 Iniciando contenedor..."
    docker stop perdidog 2>/dev/null || true
    docker rm perdidog 2>/dev/null || true
    docker run -d -p 80:80 --name perdidog perdidog-app:latest
    echo "✅ Aplicación corriendo en http://localhost"
}

# Función para usar Docker Compose
compose_up() {
    echo "🚀 Iniciando con Docker Compose..."
    docker-compose up -d
    echo "✅ Aplicación corriendo en http://localhost"
}

# Función para detener Docker Compose
compose_down() {
    echo "🛑 Deteniendo aplicación..."
    docker-compose down
    echo "✅ Aplicación detenida"
}

# Función para ver logs
show_logs() {
    echo "📋 Mostrando logs..."
    docker-compose logs -f
}

# Función para build local
build_local() {
    echo "📦 Construyendo para producción..."
    npm run build
    echo "✅ Build completado en ./dist"
}

# Menú principal
case "$1" in
    docker)
        build_docker
        run_docker
        ;;
    compose)
        compose_up
        ;;
    stop)
        compose_down
        ;;
    logs)
        show_logs
        ;;
    build)
        build_local
        ;;
    *)
        echo "Uso: ./deploy.sh [opción]"
        echo ""
        echo "Opciones:"
        echo "  docker   - Construir y ejecutar con Docker"
        echo "  compose  - Iniciar con Docker Compose"
        echo "  stop     - Detener Docker Compose"
        echo "  logs     - Ver logs de la aplicación"
        echo "  build    - Build local para producción"
        echo ""
        echo "Ejemplo: ./deploy.sh compose"
        exit 1
        ;;
esac
