// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectDropdown', (labelText, optionText) => {
  
  // Klik dropdown berdasarkan label
  cy.contains('label', labelText, { timeout: 15000 })
    .should('be.visible')
    .parent()
    .find('[class*=control], [class*=container], .css-19bb58m')
    .first()
    .click({ force: true });

  // Klik opsi
  cy.get('body', { timeout: 15000 })
    .contains(optionText)
    .should('be.visible')
    .click({ force: true });

  // Verifikasi: value muncul di field dropdown
  cy.contains('label', labelText)
    .parent()
    .find('div[class*="-singleValue"], div > div:nth-child(2) > div')
    .should('contain.text', optionText);
});
