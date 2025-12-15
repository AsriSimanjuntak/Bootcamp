class DashboardPage1 {
  verifyDashboardVisible() {
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
  }

  waitForDirectory() {
    // intercept sudah dibuat di test
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.wait('@viewDirectory', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  }

  logout() {
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  }
}

export default new DashboardPage1();
