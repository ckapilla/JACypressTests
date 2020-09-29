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

        cy.get('[data-cy=login]').click().wait(1000);
        // now see if we are prompted to log or that is skipped from cache
        cy.get('body').then(($body) => {
          cy.log('is widget showing?').wait(50);
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

  it('Should go to Admins', () => {
    cy.contains('Admins').click().wait(1000);
  });

  it('Should go to Utilities', () => {
    cy.contains('Utilities').click();
    // cy.contains('Current Value: Not Visible');
    // cy.contains('toggleTestNamesVisibility').click();
    cy.contains('Current Value: Visible');
  });

  it('Should go to Students and search for _Test, _Student', () => {
    cy.contains('Students').click();
    cy.get('input').type('_Test').wait(150);
    cy.contains('_Test, _Student').click();
    // click on editable

    // edit emergency contact; enter XXX + date

    // click save

    // test for presence of XXX + date


  });

  it('Should go to Members and search for _Test', () => {
    cy.contains('Members').click();
    cy.get('input').type('_Test').wait(150);
    cy.contains('_Test, _Mentor').click();
  });


  it('Should go to Sponsors and sort by Group Member Name', () => {
    cy.get('[data-cy=admins-sponsors]').click();
    cy.contains('Group Member Name').click();

  });

  it('Should go to Mentor Rpts and using default (current) year/month and review _TEST, _STUDENT', () => {
    cy.contains('MentorRpts').click().wait(3000);

    if (cy.get('span').should('contain', '[Student: _Test, _Student ]')) {
      cy.get('button').contains('Review').eq(0).click().wait(1000);

      cy.log('on MR Review Page for _Test, Student => update contents');
      cy.get('#narrative_English').should('have.value', 'This is an auto-generated test mentor report');
      cy.log('click on Save');
      cy.get('[data-cy=submit]').click().wait(1000);
      cy.log('should have returned to MR List');
      cy.contains('Mentor Report Review');
      cy.wait(1500);
    }

    if (cy.get('span').should('contain', '[Student: _Test, _Student ]')) {
      cy.get('button').contains('Review').eq(0).click().wait(1000);
      cy.log('on MR Review Page for _Test, Student => delete entry');
      cy.scrollTo('bottom').wait(1000).contains('Delete').click().wait(1000);

      // for reasons not understood, the following commands are not needed:
      // cy.on('window:confirm', () => true);
      // cy.wait(1000);
      // cy.log('Deleted successfully')

    }
  });

  it('Should go to FollowUp Requests and select Closed request status', () => {
    cy.contains('FollowUpReqs').click()
    cy.get('select[name="MRReviewedStatusSelector"]').select('Closed / Resolved');

    // cy.log('add new Follow Up Request');
    // cy.contains('Add New FollowUpRequest').click()
    // cy.get('select[name="StudentSelector"]').wait(1000.).select('_Student, _Test');
    // cy.get('select[id="requestorRoleSelector"]').wait(1000.).select('Admin');
    // cy.get('input').type('This is a test').clear();
    // cy.contains('Cancel').click();

  });


  // it('Should go to Sponsors', () => {
  //   cy.get('[data-cy=top-sponsors]').click();
  // });
  // it('Should be able to change the select values and go through the tabs', () => {
  //   cy.get('select[name="activePeriodSelector"]').select('2019 3:Jul-Set').select('2019 4:Oct-Dic').select('2020 1:Ene-Mar');
  //   cy.contains('Mentor Reports').click();
  //   cy.contains('JA Comments').click();
  // });


  it('Should go to Confidential', () => {
    cy.contains('Confidential').click();
  });
  it('Should create a new Confidential report', () => {
    cy.contains('Review/Edit Reports').click();
    cy.get('input').type('_Test').wait(1500);
    cy.contains('_Test, _Student').click().wait(1500);
    cy.contains('Add New Report /Añadir un Nuevo Informe').click();
    // cy.get('select[formcontrolname="lastContactYearSelector"]').wait(1000).select('2020').wait(1000);
    cy.get('select[formcontrolname="lastContactMonthSelector"]').select('Jul/Jul');
    cy.get('[type="radio"]').first().check();
    cy.get('textarea').last().type('This is an auto-generated test confidential report');
    cy.contains('Cancel').click();
  });


  it('Should go to Becas', () => {
    cy.contains('Becas').click();
  });
  // it('Should go to my grades', () => {
  //   cy.contains('CADENA RIOS, CARLOS ANTONIO').click();
  //   cy.contains('Back').click();
  //   cy.contains('StudentRpts').click();
  // });
  it('Should go to Quarterly', () => {
    cy.contains('Quarterly').click();
  });
  // it('Should be able to comment under JA Comments', () => {
  //   cy.contains('CADENA RIOS, CARLOS ANTONIO').click();
  //   cy.contains('JA Comments').click();
  //   cy.get('textarea').last().type('test');
  //   cy.get('textarea').last().type('{backspace}').wait(100).clear();
  //   cy.get('select[name="activePeriodSelector"]').wait(1000.).select('2019 4:Oct-Dic');
  // });




  it('Should Logout', () => {
    cy.log('Logging out').wait(3000);
    cy.get('[data-cy=logout]').click();
  });

});