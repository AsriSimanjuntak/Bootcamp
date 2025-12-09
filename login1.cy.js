describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://mpower-ps.mandalafinance.com/')
        
    cy.get(':nth-child(1) > .form-control').type('0000031');
    cy.get('#signin_password').type('Adira123!');
    cy.xpath("(//button[normalize-space()='Masuk'])[1]").click();
  
    cy.intercept('/some/api/endpoint').as('loginSuccess'); 
  })
})