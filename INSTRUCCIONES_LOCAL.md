
# Guía de Configuración para Desarrollo Local

Este documento explica cómo configurar y ejecutar la aplicación Himalaya Navigator en tu máquina local.

## Requisitos Previos

- **Node.js**: Debes tener instalado Node.js, preferiblemente la versión 18 o una más reciente. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **npm**: El gestor de paquetes de Node.js, que se instala automáticamente con Node.js.

## 1. Archivos Necesarios

Para replicar el proyecto, no basta con la carpeta `src`. Necesitas descargar la estructura completa del proyecto. Los archivos y carpetas más críticos son:

- **`/` (Raíz del proyecto):**
  - `package.json`: Esencial. Define los scripts y todas las dependencias del proyecto.
  - `package-lock.json`: Asegura que se instalen las versiones exactas de las dependencias, evitando conflictos.
  - `next.config.ts`: Configuración de Next.js (ej. dominios de imagen permitidos).
  - `tailwind.config.ts`: Configuración de Tailwind CSS.
  - `tsconfig.json`: Configuración de TypeScript.
  - `components.json`: Configuración de ShadCN UI.
  - `.env`: Archivo para tus variables de entorno (claves de API).
  - `apphosting.yaml`
  - `README.md`
- **`/src`**: Toda esta carpeta, ya que contiene el código fuente de la aplicación.

## 2. Pasos de Configuración

1.  **Descarga los Archivos**:
    Copia todos los archivos y carpetas mencionados en el punto anterior a una carpeta en tu máquina local.

2.  **Configura las Variables de Entorno**:
    Crea o modifica el archivo `.env` en la raíz del proyecto. Deberás proporcionar tus propias claves de API.
    ```env
    # Clave de API para los mapas interactivos
    NEXT_PUBLIC_MAPBOX_API_KEY="TU_CLAVE_DE_MAPBOX_AQUI"

    # Clave de API para obtener datos del tiempo
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY="TU_CLAVE_DE_OPENWEATHERMAP_AQUI"

    # Clave de API para las funciones de IA con Google Gemini
    GEMINI_API_KEY="TU_CLAVE_DE_GEMINI_AQUI"
    ```

3.  **Instala las Dependencias**:
    Abre una terminal o línea de comandos, navega a la carpeta raíz de tu proyecto y ejecuta el siguiente comando. Este comando leerá el `package.json` e instalará todas las librerías y paquetes necesarios.
    ```bash
    npm install
    ```

4.  **Ejecuta la Aplicación de Desarrollo**:
    Una vez que la instalación se complete sin errores, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Next.js.
    ```bash
    npm run dev
    ```

5.  **Abre la Aplicación**:
    Abre tu navegador web y ve a la dirección `http://localhost:9002` (o la que se indique en tu terminal). Deberías ver la aplicación funcionando.

## Scripts Útiles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia un servidor de producción (necesitas ejecutar `build` antes).
- `npm run lint`: Ejecuta el linter para revisar la calidad del código.
