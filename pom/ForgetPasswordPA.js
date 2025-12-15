class ForgetPasswordPA {

  visit() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode'
    );
  }

  inputUsername(username) {
    if (username) {
      cy.get('input[name="username"]')
        .should('be.visible')
        .clear()
        .type(username);
    }
  }

  clickReset() {
    cy.contains('button', 'Reset Password')
      .should('be.visible')
      .click();
  }

  // ✅ NEGATIVE CASE VALIDATION (WAJIB ADA)
  verifyUsernameRequired() {
    cy.get('input[name="username"]')
      .should('have.class', 'oxd-input--error');
  }

  // ✅ OPTIONAL (agar tidak error kalau test lama masih pakai ini)
  verifyErrorMessage() {
    this.verifyUsernameRequired();
  }

  // ✅ POSITIVE CASE
  verifySuccessMessage() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible');
  }
}

export default new ForgetPasswordPA();