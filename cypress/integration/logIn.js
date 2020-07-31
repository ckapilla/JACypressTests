describe('logIn', () => {
  it('Should go to Jovenes Adelante website directly', () => {
    cy.visit('https://privada.jovenesadelante.org');
  });
  it('Should login user', () => {
    cy.get('button').click('topRight');
    cy.get('input[name="email"]').type('carlos.cadena05@hotmail.com');
    cy.get('input[name="password"]').type('klos050007');
    cy.get('form').submit().wait(1000);
    cy.log('Login successful')
  });
});