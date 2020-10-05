describe('Mentor Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });

  it('If Not Logged in, Should login Mentor user, else proceed', () => {
    const username = Cypress.env('MentorTester_username');
    const password = Cypress.env('MentorTester_password');
    cy.login(username, password);
  });

  it('Should go to Mentors Page and click on _Test, _Student then Add New Report', () => {
    cy.contains('Mentors').click();
    cy.contains('Add New Report /Añadir un Nuevo Informe').click();
    cy.get('select[formcontrolname="lastContactMonthSelector"]').should('contain', 'Oct/Oct')
      .select('Oct/Oct');
    cy.get('[type="radio"]').first().check();
    cy.get('textarea').last().type('This is an auto-generated test mentor report');
    cy.contains('Submit').click();
  });

  it('Should Logout', () => {
    cy.log('**Logging out**').wait(3000);
    cy.get('[data-cy=logout]').click();
  });

});