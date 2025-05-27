# Etapa 1: Compilar la app
FROM node:18-alpine AS builder
WORKDIR /app

# Copia y limpia dependencias
COPY package*.json ./
RUN npm ci

# Copia el código y genera la build de producción
COPY . .
# Asegúrate de tener en package.json:
#   "scripts": { "build:prod": "vite build" }
RUN npm run build:prod

# Etapa 2: Servir con Nginx (sin tocar default.conf)
FROM nginx:stable-alpine AS production

# Copia la dist directamente al directorio que Nginx ya está configurado para servir
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Arranca Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]