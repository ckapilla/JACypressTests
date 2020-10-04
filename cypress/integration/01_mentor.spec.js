describe('Mentor Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });
  it('If Not Logged in, Should login Mentor user, else proceed', () => {
    cy.get('[data-cy=login_welcome]').then(($selectedElement) => {
      // synchronously ask for the container text
      // and do something based on whether it includes
      // another string
      cy.log('got login button container has contents ...');
      cy.log($selectedElement.text());
      if ($selectedElement.text().includes('Log In / Iniciar')) {
        // need to login
        const username = Cypress.env('MentorTester_username');
        const password = Cypress.env('MentorTester_password');
        cy.log('**LOGGING IN WITH username = ' + username + '**');
        cy.log('**LOGGING IN WITH password = ' + password + '**');

        cy.get('[data-cy=login]').click();
        // now see if we are prompted to log or that is skipped from cache
        cy.get('body').then(($body) => {
          cy.log('is widget showing?');
          //if ($body.hasClass('.auth0-lock-widget')) {
          if ($body.text().includes('Set password')) {
            cy.log('_confirming widget is showing_');
            cy.get('.auth0-lock-widget').should('contain', 'Set password');
            cy.get('input[name="email"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('.auth0-lock-widget').submit().wait(2000); // << 2000 required
          } else {
            cy.log('widget was skipped, auto login');
            // nothing to do
          }
        });

      } else {
        cy.log('already logged in via cookie');
      }
    });
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