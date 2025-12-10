describe('QUIZ: TC-01 sampai TC-05', () => {

  // Abaikan AxiosError agar Cypress tidak fail
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('AxiosError')) {
      return false;
    }
    return true;
  });

  // Session login reusable
  before(() => {
    cy.session('loginSession', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('admin123');
      cy.contains('button', 'Login').click();
      cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
    });
  });

  // Fungsi logout reusable
  const logout = () => {
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  };

  // TC-01: Dashboard
  it('TC-01: Dashboard', () => {
    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary*').as('actionSummary');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    cy.wait('@actionSummary', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');

    logout();
  });

  it('TC-02: Timesheet', () => {
  // Login
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.contains('button', 'Login').click();

  // Tunggu breadcrumb muncul untuk memastikan login sukses
  cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');

  // Pasang intercept **sebelum visit halaman timesheet**
  cy.intercept('GET', '**/api/v2/timesheet/**').as('getTimesheet');

  // Visit halaman timesheet
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet');

  // Tunggu request AJAX terjadi dan periksa status code
  cy.wait('@getTimesheet', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

  // Pastikan tabel muncul
  cy.get('.oxd-table', { timeout: 15000 }).should('exist');

  // Logout
  cy.get('.oxd-userdropdown-tab').click();
  cy.contains('.oxd-userdropdown-link', 'Logout').click();
  cy.wait(1000);
});


  // TC-06 Login gagal Username kosong
  it('TC-06: Login gagal (Username kosong)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-07 Login gagal Username salah
  it('TC-07: Login gagal (Username salah)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('asri@yopmail.com');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-08 Login gagal Password kosong
  it('TC-08: Login gagal (Password kosong)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.contains('button', 'Login').click();
  });

  // TC-09 Login gagal Password salah
  it('TC-09: Login gagal (Password salah)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('admin');
    cy.contains('button', 'Login').click();
  });

  // TC-10 Login gagal Kedua field kosong
  it('TC-10: Login gagal (kedua field kosong)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('button', 'Login').click();
  });

  // TC-11 Login gagal Username special characters
  it('TC-11: Login gagal (Username special character)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('; DROP TABLE users;--');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-12 Login gagal Password terlalu panjang
  it('TC-12: Login gagal (Password terlalu panjang)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('a'.repeat(500));
    cy.contains('button', 'Login').click();
  });

  // TC-13 Login gagal Username hanya spasi
  it('TC-13: Login gagal (Username hanya spasi)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type(' ');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-14 Login gagal Password hanya spasi
  it('TC-14: Login gagal (Password hanya spasi)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type(' ');
    cy.contains('button', 'Login').click();
  });

  // TC-15 Login gagal Username depannya spasi
  it('TC-15: Login gagal (Username depannya spasi)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type(' Admin');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-16 Login gagal Password depannya spasi
  it('TC-16: Login gagal (Password depannya spasi)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type(' admin123');
    cy.contains('button', 'Login').click();
  });

  // TC-17 Login gagal Password uppercase
  it('TC-17: Login gagal (Password uppercase)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('ADMIN123');
    cy.contains('button', 'Login').click();
  });

  // TC-18 Login berhasil Username uppercase
  it('TC-18: Login berhasil (Username uppercase)', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[placeholder="Username"]').type('ADMIN');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
  });

});