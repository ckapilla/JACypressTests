describe('Student Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });

  it('If Not Logged in, Should login Student user, else proceed', () => {
    const username = Cypress.env('StudentTester_username');
    const password = Cypress.env('StudentTester_password');
    cy.login(username, password);
  });

  it('Should go to Estudiantes and add new report', () => {
    cy.contains('Estudiantes').click();
    cy.contains('Estudiantes').click();
    cy.contains('Añadir Nuevo Reporte').click();
    cy.get('textarea').last().type('This is an auto-generated test student self report');
    cy.get('button').contains('Guardar').click();
  });
  // it('Should edit / cancel editing last report', () => {
  //   cy.get('button').contains('Editar').click();
  //   cy.get('button').contains('Cancelar').click();
  // });

  it('Should go to Estudiantes and edit profile', () => {
    cy.contains('Perfil').click();
    cy.get('#cellPhone').click().type('{backspace}1');
  });

  it('Should go to Estudiantes and enter GPA', () => {
    cy.contains('ingrese Promedio').click();
    cy.get('#gradePointAvg').click().type('9.5');
    cy.contains('Guardar').click();
  });


  it('Should Logout', () => {
    cy.log('Logging out');
    cy.get('[data-cy=logout]').click();
  });

});