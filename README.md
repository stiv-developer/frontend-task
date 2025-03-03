
## 🚀 Frontend Task - Angular  

Este es el frontend del proyecto **Task Manager**, desarrollado en **Angular**.  

### 👅 Clonar el repositorio  
```sh
git clone <URL_DEL_REPO>
cd frontend-task
```

### 👥 Instalación de dependencias  
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:  
```sh
npm install
```

### 🔧 Configuración del entorno  
Asegúrarte de configurar correctamente el archivo `environment.prod.ts`.  

```env
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000'
};
```
> **Nota:** Si estás usando Docker, cambia la URL del backend en este archivo.

### ▶️ Ejecutar el proyecto en desarrollo  
```sh
ng serve
```
Esto iniciará el servidor en `http://localhost:4200/login`.

Esto generará los archivos de la aplicación en la carpeta `dist/frontend-task`.

### 🐓 Ejecutar con Docker  
```sh
docker build -t frontend-task .
docker run -p 4200:4200 frontend-task
```

### 📂 Estructura del proyecto  
```
frontend-task/
│── src/
│   ├── app/          # Componentes principales
│   ├── assets/       # Recursos estáticos (imágenes, estilos)
│   ├── environments/ # Archivos de configuración de entorno
│── angular.json      # Configuración de Angular
│── package.json      # Dependencias del proyecto
│── README.md         # Documentación
```

### ✅ Verificar que la app está corriendo  
Abre tu navegador y ve a:  
```
http://localhost:4200/login
```

