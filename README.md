# Proyecto Wayni - Automatización de pruebas con Cypress

Este proyecto tiene como objetivo automatizar pruebas para la plataforma de Wayni, utilizando **Cypress**. Se ha estructurado utilizando el modelo **Page Object Model (POM)** para mejorar la mantenibilidad y legibilidad del código, junto con comandos personalizados para optimizar la reutilización del código.

## Estructura del código

La estructura del código se organiza de la siguiente manera:

- **cypress/fixtures**: Contiene los archivos `.json` con las URLs de los diferentes entornos, datos de prueba y validaciones que se utilizarán en los tests.
  - **datosTST.json**: Contiene los datos de prueba como DNI, teléfono, email, etc.
  - **urlsTST.json**: Contiene las URLs para los diferentes entornos y páginas dentro de la aplicación.
  - **validacionesTST.json**: Contiene los textos de validación que serán comparados durante las pruebas.

- **cypress/support/pages**: Aquí se encuentran los archivos de Page Object Model (POM) que definen las interacciones con las distintas páginas de la aplicación.
  - **autoGestionPage.js**: Define los elementos y métodos asociados con la página de "Auto Gestión".
  - **prestamosPage.js**: Define los elementos y métodos asociados con la página de "Préstamos".

- **cypress/e2e**: Los archivos de prueba se encuentran en este directorio. Aquí es donde se ejecutan las pruebas end-to-end, utilizando los comandos y Page Objects para interactuar con la aplicación.
  - **autoGestion.cy.js**: Contiene los tests relacionados con la funcionalidad de Auto Gestión.
  - **prestamos.cy.js**: Contiene los tests relacionados con la funcionalidad de Préstamos.

- **cypress/support/commands.js**: Contiene comandos personalizados para realizar acciones repetitivas de manera más sencilla y reutilizable, como hacer clic en elementos, validar textos, etc.

## Metodología de Pruebas

Se emplea **Cypress** para realizar pruebas end-to-end. A continuación se describen algunas de las principales estrategias utilizadas:

1. **Page Object Model (POM)**: Las interacciones con las páginas de la aplicación se definen en objetos de página que encapsulan todos los elementos de la interfaz y las acciones posibles en esas páginas.
   
2. **Comandos Personalizados**: Se crean comandos para realizar interacciones comunes como hacer clic en elementos, escribir en campos de texto y validar textos. Esto facilita la reutilización de código y mejora la claridad.

3. **Archivos JSON para Datos y Validaciones**: Utilizamos archivos JSON (`datosTST.json`, `urlsTST.json`, `validacionesTST.json`) para almacenar datos y textos que se utilizarán durante las pruebas, lo que hace que las pruebas sean más flexibles y fáciles de modificar.

4. **Diversificación de Opciones de Cypress**: Se utilizan diversas capacidades de Cypress, como el uso de `cy.origin()` para manejar cambios de dominio durante las pruebas, `cy.wait()` para manejar tiempos de carga, y la validación de múltiples elementos de la página con `cy.get()` y `should()`.

## Resolución de Problemas con el Cambio de URL

Cypress no maneja muy bien los cambios de URL entre dominios diferentes debido a las restricciones de seguridad entre orígenes (CORS). Sin embargo, este problema se resuelve usando la función `cy.origin()` de Cypress.

### Cómo se maneja el cambio de URL:

Cuando se navega entre diferentes dominios (por ejemplo, de `autogestion.waynimovil.ar` a `app.waynimovil.ar`), Cypress genera un error porque espera que todo el flujo ocurra en el mismo dominio. Para resolver esto, se encapsulan las interacciones en la nueva URL utilizando `cy.origin()`:

```javascript
cy.origin('https://app.waynimovil.ar', { args: { validacionesTST, datosTST } }, ({ validacionesTST, datosTST }) => {
    cy.location('origin').should('eq', 'https://app.waynimovil.ar');
    cy.location('hash').should('eq', '#/signup');
    // Interacciones dentro del nuevo dominio
});
## INSTALACION
1. Clona el repositorio
Si aún no has clonado el repositorio, hazlo con el siguiente comando:

git clone https://github.com/gabrielgorrin100/wayni.git

2. Instala las dependencias

Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:

npm install

3. Ejecutar las pruebas
suit autoGestion
npm run gestion:run

suit prestamos
npm run prestamos:run

Nota: si decea levantar la interfaz de cypress usar:

npx cypress open

