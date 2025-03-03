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
