describe('QUIZ', () => {
  it('runs', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    
// TC-01 Login berhasil--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
    cy.contains('button', 'Login').click();
    cy.wait('@actionSummary').its('response.statuscode').should('eq',200);
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 15000 })
      .should('be.visible');

// Logout berhasil--

    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('.oxd-userdropdown-link', 'Logout').click();
    cy.wait(1000);

// TC-02 Login gagal (Field Username tidak diisi -> Required)--

    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);

// TC-03 Login gagal (Username salah -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('asri@yopmail.com');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);

// TC-4 Login gagal (Field Password tidak diisi -> Required)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-05 Login gagal (password salah -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('admin');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-06 Login gagal (kedua field tidak diisi -> Required)--

    cy.contains('button', 'Login').click();
    cy.wait(1000);

// TC-07 Login gagal (field username diisi special karakter -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('; DROP TABLE users;--');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-08 Login gagal (field passwoord terlalu panjang -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('isi password dengan karakter yang panjang dan Sistem menolak tetap tampil validasi error isi password dengan karakter yang panjang dan Sistem menolak tetap tampil validasi error isi password dengan karakter yang panjang dan Sistem menolak tetap tampil validasi error');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-09 Login gagal (isi username hanya spasi -> Invalid credential dan Required)--

    cy.get('input[placeholder="Username"]').type(' ');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-10 Login gagal (isi password hanya spasi -> Invalid credential dan Required)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type(' ');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-11 Login gagal (isi username depannya spasi -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type(' admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-12 Login gagal (isi password depannya spasi -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type(' Admin');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-13 Login gagal (case sensitivity uppercase di password -> Invalid credential)--

    cy.get('input[placeholder="Username"]').type('Admin');
    cy.get('input[placeholder="Password"]').type('ADMIN123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

// TC-14 Login berhasil (case sensitivity uppercase di username)--

    cy.get('input[placeholder="Username"]').type('ADMIN');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('button', 'Login').click();
    cy.wait(1000);

  })
})