# Utiliza una imagen base oficial de Node.js
FROM node:lts-alpine as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Fase de producción
FROM nginx:alpine

# Copia los archivos de construcción al contenedor nginx
COPY --from=build /app/dist/pagina_iglesia /usr/share/nginx/html

# Exponer el puerto en el que Nginx está escuchando
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
