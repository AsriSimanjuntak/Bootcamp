import LoginPage from '../POM/LoginPA';
import DashboardPage from '../POM/DashboardPA';
import ForgotPasswordPage from '../POM/ForgetPasswordPA';
import DashboardPages from '../POM/DashboardPage1';

describe('Login Feature - POM & Intercept', () => {

  //POSITIVE CASE

  it('TC-01: Login berhasil - Dashboard', () => {
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary*'
    ).as('actionSummary');

    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');

    cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 200);

    DashboardPage.verifyDashboard();
    DashboardPage.logout();
  });


  //NEGATIVE CASE

  it('TC-02: Username kosong', () => {
    LoginPage.visit();
    LoginPage.login(undefined, 'admin123');
  });

  it('TC-03: Username salah', () => {
    LoginPage.visit();
    LoginPage.login('asri@yopmail.com', 'admin123');
  });

  it('TC-04: Password kosong', () => {
    LoginPage.visit();
    LoginPage.login('Admin', undefined);
  });

  it('TC-05: Password salah', () => {
    LoginPage.visit();
    LoginPage.login('Admin', 'admin');
  });

  it('TC-06: Kedua field kosong', () => {
    LoginPage.visit();
    LoginPage.login();
  });

  it('TC-07: Username special character', () => {
    LoginPage.visit();
    LoginPage.login('; DROP TABLE users;--', 'admin123');
  });

  it('TC-08: Password terlalu panjang', () => {
    LoginPage.visit();
    LoginPage.login('Admin', 'a'.repeat(500));
  });

  it('TC-09: Username spasi', () => {
    LoginPage.visit();
    LoginPage.login(' ', 'admin123');
  });

  it('TC-10: Password spasi', () => {
    LoginPage.visit();
    LoginPage.login('Admin', ' ');
  });

  it('TC-11: Username diawali spasi', () => {
    LoginPage.visit();
    LoginPage.login(' Admin', 'admin123');
  });

  it('TC-12: Password diawali spasi', () => {
    LoginPage.visit();
    LoginPage.login('Admin', ' admin123');
  });

  it('TC-13: Password uppercase', () => {
    LoginPage.visit();
    LoginPage.login('Admin', 'ADMIN123');
  });

  it('TC-14: Username uppercase berhasil', () => {
    LoginPage.visit();
    LoginPage.login('ADMIN', 'admin123');
    DashboardPage.verifyDashboard();
    DashboardPage.logout();
  });

});

describe('Forgot Password Feature', () => {

  it('TC-FP-01: Reset password berhasil', () => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();

    ForgotPasswordPage.inputUsername('Admin');
    ForgotPasswordPage.clickReset();
    ForgotPasswordPage.verifySuccessMessage();
  });

});

describe('Dashboard with Intercept POM', () => {

  it('TC-01: Dashboard Intercept', () => {
    // 1. Visit login page & login
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');

    // 2. Setup intercept setelah login (supaya request tidak terlewat)
    cy.intercept('GET', '**/api/v2/directory/employees*').as('viewDirectory');

    // 3. Tunggu request dashboard
    DashboardPages.waitForDirectory();

    // 4. Verifikasi halaman dashboard muncul
    DashboardPages.verifyDashboardVisible();

    // 5. Logout
    DashboardPages.logout();
  });

});
