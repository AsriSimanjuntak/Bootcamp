class LoginPage {

  elements = {
    username: () => cy.get('input[placeholder="Username"]'),
    password: () => cy.get('input[placeholder="Password"]'),
    loginBtn: () => cy.contains('button', 'Login'),
    breadcrumb: () => cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }),
    userMenu: () => cy.get('.oxd-userdropdown-tab'),
    logoutBtn: () => cy.contains('.oxd-userdropdown-link', 'Logout')
  };

  // Generic login
  login(username, password) {
    if (username !== null) this.elements.username().type(username);
    if (password !== null) this.elements.password().type(password);
    this.elements.loginBtn().click();
  }

  // Login berhasil
  loginSuccess(username, password) {
    this.login(username, password);
    this.elements.breadcrumb().should('be.visible');
  }

  // Logout
  logout() {
    this.elements.userMenu().click();
    this.elements.logoutBtn().click();
    cy.wait(1000);
  }

  // Clear fields
  clear() {
    this.elements.username().clear({ force: true });
    this.elements.password().clear({ force: true });
  }
}

export default new LoginPage();
