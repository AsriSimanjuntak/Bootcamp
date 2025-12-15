class LoginPA {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  inputUsername(username) {
    if (username) {
      cy.get('input[name="username"]', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type(username);
    }
  }

  inputPassword(password) {
    if (password) {
      cy.get('input[name="password"]', { timeout: 15000 })
        .should('be.visible')
        .clear()
        .type(password);
    }
  }

  clickLogin() {
    cy.get('button[type="submit"]', { timeout: 15000 })
      .should('be.visible')
      .click();
  }

  login(username, password) {

    // tambahan sesuai permintaan kamu
    if (!username || !password) {
      cy.log('⚠️ Warning: Username or password is missing!');
      return; // tidak throw error
    }

    this.inputUsername(username);
    this.inputPassword(password);
    this.clickLogin();
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?', { timeout: 15000 })
      .should('be.visible')
      .click();
  }
}

export default new LoginPA();
