# Problema del Jarro de Agua

El Problema del Jarro de Agua es una aplicación que resuelve el clásico problema de optimización de medidas utilizando dos jarras de diferentes capacidades. Esta aplicación está diseñada para ofrecer una experiencia de usuario intuitiva y visualmente atractiva, permitiendo a los usuarios interactuar con el problema de forma dinámica.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js para construir aplicaciones del lado del servidor.
- **TypeScript**: Un superconjunto de JavaScript que aporta tipado estático.
- **Swagger**: Herramienta para documentar y probar APIs.

## Instalación

Para configurar el proyecto localmente, sigue estos pasos:

### Prerrequisitos

Asegúrate de tener instalados los siguientes elementos en tu sistema:

- Node.js (recomendado: versión 14 o superior)
- npm (generalmente se instala junto con Node.js)

### Pasos de Instalación

1. Clona el repositorio en tu máquina local:

   ```bash

[   git clone https://github.com/mauro8778/problema-jarro-agua.git
](https://github.com/mauro8778/gota-agua.git
)
#### Navega al directorio del proyecto
#### Instala dependencias
npm install
#### Inicia la aplicacion
npm run start:Dev
La aplicación se abrirá automáticamente en tu navegador predeterminado en la dirección http://localhost:3000.

## Documentación API con Swagger

Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación de la API a través de Swagger en la siguiente ruta:

http://localhost:3000/api

### DTO Informativo

La API incluye un DTO (Data Transfer Object) informativo que facilita la comprensión de los parámetros necesarios para las solicitudes.

### Ejemplos de Uso

En la documentación de Swagger, tienes la opción de seleccionar entre **dos ejemplos** predefinidos para probar las diferentes funcionalidades de la API. Esto permite a los usuarios experimentar con las solicitudes de forma sencilla y rápida.

## Características

- **Interfaz de usuario intuitiva**: Facilita la interacción del usuario con el problema.
- **Solución dinámica**: Permite calcular y visualizar diferentes soluciones para el problema del jarro de agua.
- **Documentación API**: Swagger proporciona una forma fácil de explorar y probar los endpoints de la API.
- **DTO informativo**: Ayuda a comprender los parámetros necesarios para las solicitudes.
- **Ejemplos predefinidos**: Permite seleccionar entre dos ejemplos para probar las funcionalidades de la API.
- **Sin dependencias de base de datos**: La aplicación no requiere configuración de base de datos, lo que simplifica la instalación y el despliegue.

## Puntos finales de la API

### POST /api

- **Descripción**: Resuelve el problema de los jarrones de agua.
- **Cuerpo de la solicitud**: Debe contener un JSON que incluya las capacidades de los jarrones y la cantidad objetivo deseada.

#### Ejemplo de solicitud

```json
{
    "x_capacity": 3,
    "y_capacity": 5,
    "z_amount_wanted": 4
}

#### Respuesta exitosa (200)
{
  "solution": [
    {
      "step": 1,
      "bucketX": 0,
      "bucketY": 5,
      "action": "Fill bucket Y"
    },
    {
      "step": 2,
      "bucketX": 3,
      "bucketY": 2,
      "action": "Transfer from Y to X"
    },
    {
      "step": 3,
      "bucketX": 0,
      "bucketY": 2,
      "action": "Empty bucket X"
    },
    {
      "step": 4,
      "bucketX": 2,
      "bucketY": 0,
      "action": "Transfer from Y to X"
    },
    {
      "step": 5,
      "bucketX": 2,
      "bucketY": 5,
      "action": "Fill bucket Y"
    },
    {
      "step": 6,
      "bucketX": 3,
      "bucketY": 4,
      "action": "Transfer from Y to X"
    },
    {
      "step": 7,
      "bucketX": 0,
      "bucketY": 4,
      "action": "SOLVED",
      "status": "Solved"
    }
  ]
}
