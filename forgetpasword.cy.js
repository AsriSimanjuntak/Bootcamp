import LoginPage from '../pom/LoginPA';
import ForgotPasswordPage1 from '../pom/forgetpassword1';

describe('Forgot Password Feature - POM & Intercept', () => {

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
  });

 it('TC-FP-01: Reset password berhasil (Intercept Mandatory)', () => {
  cy.intercept('POST', '**/request-password-reset**', {
    statusCode: 200,
    body: { message: 'Reset Password link sent successfully' }
  }).as('resetPassword');

  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');

  ForgotPasswordPage1.inputUsername('Admin');
  ForgotPasswordPage1.clickReset();

  // ASSERT UI (bukan cy.wait)
  ForgotPasswordPage1.verifySuccessMessage();
});

   it('TC-FP-02: Reset password gagal (username kosong)', () => {
    ForgotPasswordPage1.clickReset();
    ForgotPasswordPage1.verifyUsernameRequired();
  });

});
