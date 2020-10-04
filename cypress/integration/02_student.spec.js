describe('Student Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });
  it('If Not Logged in, Should login Student user, else proceed', () => {
    cy.get('[data-cy=login_welcome]').then(($selectedElement) => {
      // synchronously ask for the container text
      // and do something based on whether it includes
      // another string
      cy.log('got login button container has contents ...');
      cy.log($selectedElement.text());
      if ($selectedElement.text().includes('Log In / Iniciar')) {
        // need to login
        const username = Cypress.env('StudentTester_username');
        const password = Cypress.env('StudentTester_password');

        cy.log('LOGGING IN WITH username = ' + username);
        cy.log('LOGGING IN WITH password = ' + password);

        cy.get('[data-cy=login]').click();
        // now see if we are prompted to log or that is skipped from cache
        cy.get('body').then(($body) => {

          cy.log('is widget showing?');

          //if ($body.hasClass('.auth0-lock-widget')) {
          if ($body.text().includes('Set password')) {

            cy.log('confirming widget is showing');
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


  it('Should Logout', () => {
    cy.log('Logging out');
    cy.get('[data-cy=logout]').click();
  });

});