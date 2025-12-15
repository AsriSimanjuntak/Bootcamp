// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
require('cypress-xpath');
import 'cypress-file-upload';

// Handle AxiosError agar tidak mematikan test
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('AxiosError')) {
    return false;
  }
  return true;
});

Cypress.on('uncaught:exception', (err) => {
  // abaikan error dari event push OrangeHRM
  if (err.message.includes('events/push')) {
    return false;
  }

  return true;
});

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
    return false;
  }
  return true;
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('nextSibling')) {
    return false; // abaikan error dari app
  }
});
