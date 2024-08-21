# Utiliza una imagen base oficial de Node.js
FROM node:lts-alpine

#Intentando forzar cambios | Dockerfile

# Establece el directorio de trabajo en el contenedor
WORKDIR /IGLESIABAUTISTAREFORMADA

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el archivo .env al contenedor
COPY . .

# Expone el puerto que usará la aplicación
EXPOSE 2500

# Define el comando para ejecutar la aplicación
CMD ["npx", "nodemon", "index.js"]
