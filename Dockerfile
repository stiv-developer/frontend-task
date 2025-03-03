# Usar una imagen de Node.js para construir la aplicación
FROM node:18 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build --prod

# Listar el contenido del directorio de construcción
# RUN ls -la /app/dist
# RUN ls -la /app/dist/frontend-task
RUN ls -la /app/dist/frontend-task/browser

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist/frontend-task/browser /usr/share/nginx/html

# Copiar nginx.conf personalizado para escuchar en el puerto 4200
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 4200
EXPOSE 4200

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
