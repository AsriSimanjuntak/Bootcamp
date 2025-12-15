import LoginPage from '../POM/LoginPA';
import DashboardPages from '../POM/DashboardPage1';

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
