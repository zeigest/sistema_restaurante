#  Sistema de Reservaciones - Restaurante "El Sazón de la Abuela"

Este proyecto es una aplicación web que permite a los clientes reservar mesas en un restaurante, asegurando la disponibilidad en función del número de comensales y horarios establecidos.
Es la parte del cliente, aún falta la parte del tablero de administración.

##  Tecnologías utilizadas
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Base de datos:MongoDB

## Estructura del Proyecto
- /public: Contiene los archivos HTML, CSS y JavaScript del frontend.
- /models: Modelos de la base de datos (Reservaciones, Mesas y Horarios).
- /routes: Rutas API para manejar reservaciones, mesas y horarios.
- server.js: Archivo principal del servidor Express.

##  Instalación y ejecución

1. Clonar el repositorio
   sh
   git clone https://github.com/zeigest/sistema_restaurante.git

2. Instalar dependencias
cd Sistema_Restaurante
npm install

3. Configurar variables de entorno Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
MONGO_URI=mongodb://localhost:27017/restaurante
PORT=3000

4. Ejecutar servidor
node server.js

5. Abrir en el navegador
http://localhost:3000/formulario.html


---

## Configuración para Despliegue en un Servidor VPS

### Requisitos mínimos del servidor:
- 1 vCPU
- 1-2 GB RAM
- 20-30 GB de almacenamiento SSD
- 1 TB de transferencia mensual

### 1. Instalación de Node.js y dependencias
Actualizar el sistema e instalar Node.js:
sudo apt update && sudo apt upgrade -y curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - sudo apt install -y nodejs node -v # Verificar instalación

Instalar dependencias del proyecto:
cd /ruta/del/proyecto npm install --production


### 2. Configuración de Variables de Entorno
Crear el archivo `.env` en el servidor:
nano /ruta/del/proyecto/.env

Agregar las siguientes variables:
PORT=3000 MONGO_URI=mongodb://localhost:27017/restaurante JWT_SECRET=clave_secreta


### 3. Mantener el Servidor en Ejecución con PM2
Instalar PM2:
sudo npm install -g pm2

Iniciar la aplicación con PM2:
pm2 start server.js --name "reservas" pm2 save pm2 startup


### 4. Habilitar HTTPS con Let's Encrypt
Si se usa un dominio, instalar Let's Encrypt:
sudo apt install certbot sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com


### 5. Configuración de la Base de Datos (MongoDB)
Si usas MongoDB en el VPS, instálalo:
sudo apt install -y mongodb

Habilita la autenticación:
sudo nano /etc/mongodb.conf

Agrega:
security: authorization: enabled

Reinicia MongoDB:
sudo systemctl restart mongodb

Crea un usuario seguro:
mongo use admin db.createUser({ user: "admin", pwd: "contraseña_segura", roles: ["root"] }) exit


### 6. Despliegue del Código
Subir el código a **GitHub**:
git clone https://github.com/zeigest/sistema_restaurante.git /ruta/del/proyecto

Automatizar despliegue con **GitHub Actions o script manual**:
nano /ruta/del/proyecto/deploy.sh

Contenido:
#!/bin/bash cd /ruta/del/proyecto git pull origin main npm install --production pm2 restart reservas

Hacer ejecutable:
chmod +x deploy.sh

Ejecutarlo manualmente:
./deploy.sh