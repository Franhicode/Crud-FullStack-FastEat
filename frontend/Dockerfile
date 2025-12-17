# Build stage
# Usa una imagen base de Node.js
FROM node:20-alpine AS build
# directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos de configuración de dependencias
COPY package*.json ./
# Instala las dependencias
RUN npm install
# Copia el resto del código fuente
COPY . .
# Construye la aplicación para producción
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
