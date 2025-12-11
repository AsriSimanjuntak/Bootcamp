import LoginPage from '../POM/LoginPage';

describe('QUIZ Login Test with POM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  // TC-01 Login berhasil
  it('TC-01: Login Berhasil', () => {
    LoginPage.loginSuccess('Admin', 'admin123');
    LoginPage.logout();
  });

  // TC-02 Username kosong
  it('TC-02: Username kosong', () => {
    LoginPage.login(null, 'admin123');
    cy.wait(1000);
  });

  // TC-03 Username salah
  it('TC-03: Username salah', () => {
    LoginPage.login('asri@yopmail.com', 'admin123');
    cy.wait(1000);
  });

  // TC-04 Password kosong
  it('TC-04: Password kosong', () => {
    LoginPage.login('Admin', null);
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-05 Password salah
  it('TC-05: Password salah', () => {
    LoginPage.login('Admin', 'admin');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-06 Kedua field kosong
  it('TC-06: Field kosong semua', () => {
    LoginPage.login(null, null);
    cy.wait(1000);
  });

  // TC-07 Username special character
  it('TC-07: Username special character', () => {
    LoginPage.login('; DROP TABLE users;--', 'admin123');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-08 Password terlalu panjang
  it('TC-08: Password panjang', () => {
    LoginPage.login(
      'Admin',
      'isi password dengan karakter yang panjang dan Sistem menolak tetap tampil validasi error'.repeat(3)
    );
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-09 Username hanya spasi
  it('TC-09: Username hanya spasi', () => {
    LoginPage.login(' ', 'admin123');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-10 Password hanya spasi
  it('TC-10: Password hanya spasi', () => {
    LoginPage.login('Admin', ' ');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-11 Password depannya spasi
  it('TC-11: Password depannya spasi', () => {
    LoginPage.login('Admin', ' admin123');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-12 Username depannya spasi
  it('TC-12: Username depannya spasi', () => {
    LoginPage.login(' Admin', 'admin123');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-13 Password uppercase (case sensitive)
  it('TC-13: Password uppercase', () => {
    LoginPage.login('Admin', 'ADMIN123');
    cy.wait(1000);
    LoginPage.clear();
  });

  // TC-14 Username uppercase (tetap berhasil)
  it('TC-14: Username uppercase', () => {
    LoginPage.login('ADMIN', 'admin123');
    cy.wait(1000);
  });

});
