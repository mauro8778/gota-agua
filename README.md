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

## Tests

Si deseas ejecutar las pruebas locales, puedes usar el siguiente comando:

```bash
npm run test


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
#### Respuestas de error
cuando no se ingresa ningun valor en el body (400)
{
  "statusCode": 400,
  "message": "Debe llenar todos los campos"
}
cuando se ingresa un numero menor o igual a 0 (404)
{
"statusCode": 404,
  "message": "Los valores ingresados deben ser mayores que cero."
}
cuando se pone un numero que no es entero(404)

{
"statusCode": 404,
  "message": "Los valores ingresados deben ser enteros."
}
#### Logica del Algoritmo!
# Algoritmo de Resolución de Problemas de Jarras

Este algoritmo resuelve el problema de jarras, donde se busca obtener una cantidad específica de agua utilizando jarras con capacidades dadas. A través de un enfoque de búsqueda por anchura (BFS), el algoritmo explora todos los estados posibles hasta encontrar una solución o determinar que no existe.

## Tabla de Contenidos

- [Verificaciones Iniciales](#verificaciones-iniciales)
- [Cola para Búsqueda por Anchura (BFS)](#cola-para-búsqueda-por-anchura-bfs)
- [Bucle Principal](#bucles-principal)
- [Solución](#solución)
- [Cálculo del GCD](#cálculo-del-gcd)
- [Flujo de Ejecución Resumido](#flujo-de-ejecución-resumido)

## Verificaciones Iniciales

1. **Validación de Entradas**: El algoritmo comienza verificando si los valores proporcionados (`x_capacity`, `y_capacity`, `z_amount_wanted`) son enteros válidos. Si no lo son, se lanza una excepción con un mensaje apropiado.
  
2. **Capacidades Positivas**: Se verifica que las capacidades de las jarras y la cantidad deseada sean mayores que cero.

3. **Condición de Solución**: Se valida si el problema tiene solución usando el Máximo Común Divisor (GCD) entre las capacidades de las jarras. Para que haya solución:
   - `z_amount_wanted` debe ser menor o igual que la mayor capacidad de las jarras.
   - `z_amount_wanted` debe ser divisible por el GCD.

   Si alguna de estas condiciones falla, se lanza una excepción indicando que no hay solución.

## Cola para Búsqueda por Anchura (BFS)

El algoritmo utiliza una estructura de cola para implementar una búsqueda en anchura (BFS), ideal para encontrar el menor número de pasos en problemas de caminos.

- **Estado**: Cada elemento de la cola representa un estado de las jarras, donde:
  - `bucketX` es la cantidad de agua en la primera jarra.
  - `bucketY` es la cantidad de agua en la segunda jarra.
  - `step` es el número de pasos realizados para llegar a ese estado.
  - `actions` es un arreglo de objetos que guardan un historial de las acciones ejecutadas.

- **Estado Inicial**: Comienza con ambas jarras vacías (`bucketX = 0`, `bucketY = 0`), con 0 pasos y sin acciones.

## Bucle Principal

El algoritmo comienza sacando un estado de la cola para analizarlo:

1. **Verificación del Objetivo**: Si el estado actual coincide con el objetivo (es decir, alguna de las jarras contiene exactamente `z_amount_wanted` litros), se agrega la acción final "SOLVED" al historial de acciones y se guarda esta secuencia en las soluciones posibles.

2. **Generación de Nuevos Estados**: Si no se ha alcanzado el objetivo, se generan los siguientes estados posibles mediante las acciones permitidas:
   - Llenar la jarra X o Y.
   - Vaciar la jarra X o Y.
   - Transferir agua de la jarra X a la jarra Y.
   - Transferir agua de la jarra Y a la jarra X.

   Cada uno de estos estados genera una nueva entrada en la cola si no ha sido visitado antes. Para evitar ciclos, se mantiene un conjunto de "visitados", que almacena las combinaciones de agua en ambas jarras que ya fueron analizadas.

## Solución

1. **Almacenamiento de Soluciones**: Cuando se encuentra una solución, se guarda en el arreglo `solutions`. Si hay más de una solución, se selecciona la más corta (es decir, la que requiera el menor número de pasos).

2. **Resultado Vacío**: Si no se encuentran soluciones válidas (aunque no debería pasar si las verificaciones iniciales se superan), se devuelve un arreglo vacío.

## Cálculo del GCD

Se utiliza una función auxiliar `gcd` (Máximo Común Divisor) para verificar si el problema tiene solución, ya que el resultado solo es posible si `z_amount_wanted` es divisible por el GCD de las capacidades de las dos jarras. Esta verificación se hace antes de comenzar la búsqueda.

## Flujo de Ejecución Resumido

1. **Entrada**: Recibe las capacidades de las jarras (`x_capacity`, `y_capacity`) y la cantidad de agua deseada (`z_amount_wanted`).

2. **Validaciones**: Se valida que los parámetros sean enteros positivos y que el problema tenga solución con base en el GCD de las capacidades.

3. **Búsqueda por Anchura (BFS)**: Explora todas las acciones posibles en cada estado de las jarras (llenar, vaciar, transferir) y almacena el historial de pasos, evitando visitar estados repetidos.

4. **Resultado**: Si se encuentra una solución, se devuelve la secuencia de pasos más corta. Si no hay solución, se devuelve un arreglo vacío.

## Contribuciones

Si deseas contribuir a este algoritmo, no dudes en abrir un issue o enviar un pull request.
