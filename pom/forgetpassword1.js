class ForgetPassword1 {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('Forgot your password?', { timeout: 15000 }).should('be.visible');
  }

  inputUsername(username) {
    const selector = 'input[placeholder="Username"]';
    cy.get(selector, { timeout: 15000 }).should('be.visible');

    if (!username) {
      cy.log('⚠️ Username kosong!');
      cy.get(selector).should('have.value', '');
      return;
    }

    cy.get(selector).clear().type(username);
  }

  clickReset() {
    cy.contains('button', 'Reset Password', { timeout: 15000 }).should('be.visible').click();
  }

  verifySuccessMessage() {
    cy.contains('Reset Password link sent successfully', { timeout: 15000 }).should('be.visible');
  }

  verifyErrorMessage() {
    cy.contains('Username cannot be empty', { timeout: 15000 }).should('be.visible');
  }
}

export default new ForgetPassword1();
