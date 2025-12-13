class DashboardPA {

  visit() {
    cy.visit('/web/index.php/dashboard/index');
  }

  verifyDashboard() {
    // Pastikan dashboard sudah muncul
    cy.get('header.oxd-topbar', { timeout: 20000 }).should('be.visible');
  }

  static clickQuickLaunch(menuName) {
  cy.contains('div.quick-launch-card span', menuName, { timeout: 15000 })
    .should('exist')
    .should('be.visible')
    .scrollIntoView()
    .click();

  }

  logout() {
    cy.get('.oxd-userdropdown-name', { timeout: 15000 }).click({ force: true });
    cy.contains('Logout', { timeout: 15000 }).should('be.visible').click();
  }

}

export default new DashboardPA();
