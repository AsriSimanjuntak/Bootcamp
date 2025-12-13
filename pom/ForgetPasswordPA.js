class ForgetPasswordPA {

  inputUsername(username) {
    cy.get('input[placeholder="Username"]').type(username);
  }

  clickReset() {
    cy.contains('button', 'Reset Password').click();
  }

  verifySuccessMessage() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible');
  }
}

export default new ForgetPasswordPA();
