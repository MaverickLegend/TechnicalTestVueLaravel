Prueba Técnica - Laravel + Vue

Este proyecto consiste en una aplicación web utilizando Laravel 11 como backend y Vue 3 como frontend.

INSTALACIÓN:

Backend (Laravel)

Navega al directorio del backend:

`cd backend`

Modifica el nombre del archivo .env.example a:

`.env`

Instala las dependencias de PHP:

`composer install`

Genera la clave de la aplicación:

`php artisan key:generate`

Ejecuta las migraciones:

`php artisan migrate`

Frontend (Vue)

Navega al directorio del frontend:

`cd client`

Instala las dependencias:

`npm install`

Modifica el archivo .env.template a:

`.env`

Dentro del archivo .env sigue las instrucciones.

EJECUCIÓN DEL PROYECTO:

Backend

`cd backend`

`php artisan serve`

El backend estará disponible en http://localhost:8000

Frontend

`cd client`

`npm run dev`

El frontend estará disponible en http://localhost:5173

Tecnologías utilizadas:

Backend: Laravel 11
Frontend: Vue 3 + Vite
Estilos: TailwindCSS
Base de datos: SQLite
