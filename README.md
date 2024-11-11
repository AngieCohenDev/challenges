
# 🌌 didi-changes - API RESTful de Star Wars

**Proyecto desarrollado por Angie Lizeth Cohen Ramírez**  
📧 angiedev2001@gmail.com

---

## 📖 Descripción

Este proyecto es una RESTful API implementada en **NestJS** que consume la información de la API pública de Star Wars ([SWAPI](https://swapi.dev/)) y sincroniza estos datos en una base de datos **MongoDB**. La API permite realizar consultas filtradas sobre cuatro entidades principales: **People**, **Films**, **Starships** y **Planets**.

La aplicación sincroniza los datos de Star Wars cada cierto tiempo utilizando un cron job que descarga los datos y los guarda en MongoDB.

---

## 🔧 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener las siguientes variables de entorno configuradas en el archivo `.env`:

```env
API_HOST=https://swapi.dev/api
DATABASE_URL=mongodb+srv://adminDB:1001893858..@cluster0.4tyw0uq.mongodb.net/didi-changedb
```

---

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/usuario/didi-changes.git
   cd didi-changes
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

   ```env
   API_HOST=https://swapi.dev/api
   DATABASE_URL=mongodb+srv://adminDB:1001893858..@cluster0.4tyw0uq.mongodb.net/didi-changedb
   ```

4. **Iniciar la aplicación**

   ```bash
   npm run start:dev
   ```

   La API estará disponible en `http://localhost:3000`, y la documentación interactiva de Swagger estará en `http://localhost:3000/api`.

---

## 🌐 Endpoints de la API

La API expone los siguientes endpoints, que permiten obtener información de las entidades **People**, **Films**, **Starships** y **Planets**.

### 🌠 People

- **GET `/people`**: Listado de personas con filtros opcionales.
  - **Filtros disponibles**:
    - `name`: Filtrar por el nombre de la persona.

### 🎬 Films

- **GET `/films`**: Listado de películas con filtros opcionales.
  - **Filtros disponibles**:
    - `title`: Filtrar por título de la película.
    - `director`: Filtrar por director de la película.
    - `producer`: Filtrar por productor de la película.
    - `release_date`: Filtrar por fecha de lanzamiento (formato YYYY-MM-DD).

### 🚀 Starships

- **GET `/starships`**: Listado de naves espaciales con filtros opcionales.
  - **Filtros disponibles**:
    - `name`: Filtrar por el nombre de la nave.
    - `model`: Filtrar por modelo de la nave.
    - `manufacturer`: Filtrar por fabricante.
    - `starship_class`: Filtrar por clase de la nave.

### 🌍 Planets

- **GET `/planets`**: Listado de planetas con filtros opcionales.
  - **Filtros disponibles**:
    - `name`: Filtrar por nombre del planeta.
    - `climate`: Filtrar por clima del planeta.
    - `terrain`: Filtrar por terreno del planeta.
    - `population`: Filtrar por población del planeta.

---

## 🧪 Tests Unitarios

Se han implementado tests unitarios para cada entidad y controlador. Los tests se ejecutan usando **Jest**. A continuación se describen los tests implementados:

### Tests de `PeopleController`

- **GET `/people`**:
  - **Test con filtro**: Verifica que se retorna un listado de personas filtrado por el parámetro `name`.
  - **Test sin filtros**: Verifica que se retorna el listado completo de personas cuando no se proporcionan filtros.

### Tests de `FilmsController`

- **GET `/films`**:
  - **Test con filtros**: Verifica que se retorna un listado de películas filtrado por `title`, `director`, `producer`, o `release_date`.
  - **Test sin filtros**: Verifica que se retorna el listado completo de películas cuando no se proporcionan filtros.

### Tests de `StarshipsController`

- **GET `/starships`**:
  - **Test con filtros**: Verifica que se retorna un listado de naves espaciales filtrado por `name`, `model`, `manufacturer`, o `starship_class`.
  - **Test sin filtros**: Verifica que se retorna el listado completo de naves espaciales cuando no se proporcionan filtros.

### Tests de `PlanetsController`

- **GET `/planets`**:
  - **Test con filtros**: Verifica que se retorna un listado de planetas filtrado por `name`, `climate`, `terrain`, o `population`.
  - **Test sin filtros**: Verifica que se retorna el listado completo de planetas cuando no se proporcionan filtros.

Para ejecutar los tests, utiliza el siguiente comando:

```bash
npm run test
```

---

## 📄 Documentación Swagger

La documentación de la API está generada y accesible a través de **Swagger** en la ruta `/api`. Puedes acceder a la documentación interactiva y realizar pruebas directamente desde la interfaz Swagger:

- **URL**: `http://localhost:3000/api`

En la interfaz de Swagger, podrás ver todos los endpoints disponibles y probar las diferentes funcionalidades, incluyendo filtros y paginación.

---

## 📜 Licencia

Este proyecto está bajo una licencia **UNLICENSED**.


**Proyecto desarrollado por Angie Lizeth Cohen Ramírez**  
📧 angiedev2001@gmail.com