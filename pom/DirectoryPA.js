class DirectoryPA {

  verifyDirectoryPage() {
    cy.get('.oxd-table', { timeout: 15000 })
      .should('exist');
  }
}

export default new DirectoryPA();
