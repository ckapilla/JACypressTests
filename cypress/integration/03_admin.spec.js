describe('Admin Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });
  it('If Not Logged in, Should login Admin user, else proceed', () => {

    cy.get('[data-cy=login_welcome]').then(($selectedElement) => {
      // synchronously ask for the container text
      // and do something based on whether it includes
      // another string
      cy.log('got login button container has contents ...');
      cy.log($selectedElement.text());
      if ($selectedElement.text().includes('Log In / Iniciar')) {
        // need to login
        const username = Cypress.env('AdminTester_username');
        const password = Cypress.env('AdminTester_password');
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
            cy.get('.auth0-lock-widget').submit().wait(2000); // << 2000 required for server response
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

  it('Should go to Admins', () => {
    cy.contains('Admins').click();
  });

  it('Should go to Admins/Utilities', () => {
    cy.contains('Utilities').click();
    // cy.contains('Current Value: Not Visible');
    // cy.contains('toggleTestNamesVisibility').click();
    cy.contains('Current Value: Visible');
  });

  it('Should go to Admins/Students and search for _Test, _Student', () => {
    cy.contains('Students').click();
    cy.get('input').type('_Test');
    cy.contains('_Test, _Student').click();
    // click on editable

    // edit emergency contact; enter XXX + date

    // click save

    // test for presence of XXX + date


  });

  it('Should go to Admins/Members and search for _Test', () => {
    cy.contains('Members').click();
    cy.get('input').type('_Test');
    cy.contains('_Test, _Mentor').click();
  });

  it('Should go to Admins/Sponsors and sort by Group Member Name', () => {
    cy.get('[data-cy=admins-sponsors]').click();
    cy.get('[app-sortable-column="sponsorGroupMemberName"]').click().wait(2000);
    cy.get('[app-sortable-column="sponsorGroupMemberName"]').click().wait(2000);
  });


  it('Should go to Admins/MentorRpts for current year/month and review _TEST, _STUDENT', () => {
    cy.contains('MentorRpts').click();

    cy.contains('[Student: _Test, _Student ]').parent('div').within(() => {
      cy.log('**found student span**');
      cy.get('button').contains('Review').click();
    });
    cy.log('on MR Review Page for _Test, Student => update contents');
    cy.get('#narrative_English').should('have.value', 'This is an auto-generated test mentor report');
    cy.get('[data-cy=submit]').click();
    cy.log('should have returned to MR List');
    cy.contains('Mentor Report Review');

    // again, but delete
    cy.contains('[Student: _Test, _Student ]').parent('div').within(() => {
      cy.log('**found student span**');
      cy.get('button').contains('Review').click();
    });


    cy.log('on MR Review Page for _Test, Student => delete entry');
    // guard to make sure Delete is for right entry
    cy.contains('Mentor Report Review for _Test, _Student');
    cy.get('button').contains('Delete').click();
    cy.on('window:confirm', () => true).wait(1000);
    cy.log('Deleted successfully')

  });

  it('Should go to FollowUp Requests and Add New', () => {
    cy.contains('FollowUpReqs').click();
    cy.contains('Requests / Corrientes');
    cy.get('.btn-default').should('contain', 'Add New FollowUpRequest').click();
    cy.get('select[name="StudentSelector"]').should('contain', '_Test, _Student')
      .select('_Test, _Student');
    cy.get('select[id="requestorRoleSelector"]').should('contain', 'Admin')
      .select('Admin');
    cy.get('input').type('This is a test').clear();
    cy.contains('Cancel').click();

  });


  it('Should go top level Sponsors', () => {
    cy.get('[data-cy=top-sponsors]').click();
    cy.contains('Quarterly Reports');
  });

  it('Should select Q4 2019', () => {
    cy.get('[data-cy=period-selector]').should('contain', '2019 4:Oct-Dic')
      .select('2019 4:Oct-Dic');
    cy.get('#mentor-reports').click();
    cy.get('#ja-comments').click();
  });

  it('Should go to top level Confidential', () => {
    cy.contains('Confidential').click();
  });
  it('Should create a new Confidential report', () => {
    cy.contains('Review/Edit Reports').click();
    cy.get('input').type('_Test');
    cy.get('.dropdown-item').should('contain', '_Test').click();
    cy.get('.btn-default').should('contain', 'Add New Report /Añadir un Nuevo Informe').click()
    cy.get('select[formcontrolname="lastContactMonthSelector"]').should('contain', 'Jul/Jul')
      .select('Jul/Jul');
    cy.get('[type="radio"]').first().check();
    cy.get('textarea').last().type('This is an auto-generated test confidential report');
    cy.contains('Cancel').click();
  });

  it('Should go to top level Becas (Grades List) for Q4 2019', () => {
    cy.contains('Becas').click();
    cy.contains('Grades List');
  });

  it('Should go to Becas / Review/Edit Grades for _Test, _Student', () => {
    cy.contains('_Test, _Student').click();
    cy.contains('Back').click();
  });


  // it('Should go to Becas / StudentRpts and find Carlos', () => {
  //   cy.contains('[data-cy=status-this-month]');
  //   cy.get('StudentRpts').click();
  //   cy.get('[data-cy=period-selector]').should('contain', '2019 4:Oct-Dic')
  //     .select('2019 4:Oct-Dic');
  //   cy.contains('CADENA RIOS, CARLOS ANTONIO').click();
  //   cy.contains('Back').click();
  // });


  it('Should go to top level Quarterly', () => {
    cy.contains('Quarterly').click();
  });
  it('Should go to single student QR page', () => {
    cy.get('[data-cy=period-selector]').should('contain', '2019 4:Oct-Dic')
      .select('2019 4:Oct-Dic');
    cy.contains('CADENA RIOS, CARLOS ANTONIO').click().wait(1000);
  });

  it('Should add comment under JA Comments', () => {
    cy.get('#ja-comments').click();
    cy.get('#narrative_English').type('automatically generated test comment');
    cy.contains('Cancelar').click();
  });

  // it('Should Logout', () => {
  //   cy.log('Logging out');
  //   cy.get('[data-cy=logout]').click();
  // });

});