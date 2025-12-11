describe('Tugas16 with Intercept', () => {

  // TC-01 Login berhasil dengan intercept dashboard
  it('TC-01: Dashboard', () => {
    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary*').as('actionSummary');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait('@actionSummary', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');

    // Logout berhasil
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  });

  // TC-02 Login berhasil Intercept timesheet
  it('TC-02: Timesheet', () => {
    cy.intercept('GET', '**/api/v2/time/employees/timesheets/list*').as('getTimesheet');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet');
    cy.wait('@getTimesheet', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-table', { timeout: 15000 }).should('exist');

    // Logout berhasil
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  });

  // TC-03 Login berhasil Intercept Admin Users
  it('TC-03: Admin Users', () => {
    cy.intercept('GET','**/api/v2/admin/users*').as('getUsers');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    cy.wait('@getUsers', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-table', { timeout: 15000 }).should('exist');

    // Logout berhasil
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  });

  // TC-04 Login berhasil Interceot Recruitment Candidates
  it('TC-04: Recruitment Candidates', () => {
    cy.intercept('GET','**/api/v2/recruitment/candidates*').as('getCandidates');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    cy.wait('@getCandidates', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-table', { timeout: 15000 }).should('exist');

    // Logout berhasil
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);
  });

  // TC-05 Login berhasil Intercept Buzz
  it('TC-05: Buzz', () => {
    cy.intercept('GET', '**/api/v2/leave/**').as('getLeaveList');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 }).should('be.visible');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
    cy.wait('@getLeaveList', { timeout: 30000 }).its('response.statusCode').should('eq', 200);
    cy.get('.oxd-table', { timeout: 15000 }).should('exist');

    // Logout berhasil
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