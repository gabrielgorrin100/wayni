/// <reference types="cypress"/>
Cypress.Commands.add('checkUrl', (url) => {
    cy.url().should('eq', url); // Compara la URL actual con la esperada
  });
Cypress.Commands.add('textValidator', (element, value) => {
    cy.get(element).should('be.visible').and('exist').and('have.text', value)
})
Cypress.Commands.add('textValidatorContain', (element, value) => {
    cy.get(element).should('be.visible').and('exist').and('contain.text', value)
})
Cypress.Commands.add('doClick', (element) => {
    cy.get(element).should('be.visible').and('exist').click().wait(2000)
})
Cypress.Commands.add('doClickAndType', (element, value) => {
    cy.get(element).should('be.visible').click().type(value).wait(500)
})
Cypress.Commands.add('clickCheckOFF', (element) => {
        cy.get(element)
          .should('have.attr', 'aria-checked', 'false')
          .should('exist')                
          .click()                          
          .should('have.attr', 'aria-checked', 'true'); 
})
Cypress.Commands.add('scrollToTop', () => {
    cy.scrollTo('top'); // Desplazar hacia la parte superior de la página
  });
  Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    // Obtiene el contenido del iframe y lo devuelve
    return cy.get(iframeSelector)
        .its('0.contentDocument.body')  // Accede al documento dentro del iframe
        .should('not.be.empty')  // Asegúrate de que no esté vacío
        .then(cy.wrap);  // Vuelve a envolver el cuerpo del iframe para interactuar con él
});