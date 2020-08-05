describe('Full Test', () => {

  // beforeEach(() => {
  //   cy.restoreLocalStorageCache();
  //   cy.log('restoringFromLocalStorageCache');
  // });

  // afterEach(() => {
  //   cy.saveLocalStorageCache();
  //   cy.log('saveToLocalStorageCache');
  // });


  it('Should go to Jovenes Adelante website directly', () => {
    cy.visit('');
  });
  it('If Not Logged in, Should login user, else proceed', () => {

    // this only works if there's 100% guarantee
    // body has fully rendered without any pending changes
    // to its state
    cy.wait(3000);
    cy.get('[data-cy=login_welcome]').then(($selectedElement) => {
      // synchronously ask for the container text
      // and do something based on whether it includes
      // another string
      cy.log('got login button container has contents ...');
      cy.log($selectedElement.text());
      if ($selectedElement.text().includes('Log In / Iniciar')) {
        // need to login
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        cy.log('LOGGING IN WITH username = ' + username);
        cy.log('LOGGING IN WITH password = ' + password);

        cy.get('[data-cy=login]').click().wait(2000);
        // cy.get('#auth0-lock-container-1').wait(500);
        // cy.pause();

        // now see if we are prompted to log or that is skipped from cache
        cy.get('body').then(($body) => {

          cy.log('is widget showing?').wait(500);

          //if ($body.hasClass('.auth0-lock-widget')) {
          if ($body.text().includes('Set password')) {

            cy.log('confirming widget is showing');
            cy.get('.auth0-lock-widget').should('contain', 'Set password');
            //

            // cy.pause();
            cy.get('input[name="email"]').type(username);
            cy.get('input[name="password"]').type(password);
            // cy.get('button').should("contain", 'Log In / Iniciar sesión').click();

            cy.get('.auth0-lock-widget').submit().wait(2000);
            // if (cy.location.contains('localhost')) {
            //   cy.log('Login successful')
            // }
          } else {
            cy.log('widget was skipped, auto login');
            // done
          }
        });

      } else {
        cy.log('already logged in via cookie');
        // cy.get('[data-cy=logout]').click();
      }
    });
  });

  it('Should go to Admins', () => {
    cy.contains('Admins').click();
  });
  /***
    it('Should go to Students and search for Carlos', () => {
      cy.contains('Students').click().wait(1500);
      cy.get('input').type('CADENA RI');
      cy.contains('CADENA RIOS').click().wait(1500);
    });

    it('Should go to Members and search for Chris', () => {
      cy.contains('Members').click();
      cy.go(-1).go(1);
      cy.get('input').type('Kapilla');
      cy.contains('Kapilla').click();
    });

    it('Should go to Sponsors and sort by Group Member Name', () => {
      cy.get('a').eq(12).should('contain', 'Sponsors').click(); //13th '<a>' element that contains Sponsors, it'r true
      //OTRA FORMA DE ACCEDER CON ROUTE
      //cy.server();
      //cy.route('admins/sponsor-groups').as('getAdmSpon')
      //cy.visit('admins/sponsor-groups')
      //cy.wait('@getAdmSpon')
      cy.contains('Group Member Name').click();
    });

    it('Should go to Mentor Rpts and select 2018 Aug and look for Carlos', () => {
      cy.contains('MentorRpts').click();
      cy.get('select[name="yearSelector"]').select('2018');
      cy.get('select[name="monthSelector"]').select('Aug/Ago');
      cy.get('#id2783 > .link').wait(1000).click().wait(1000);
      // cy.scrollTo('bottom');
      cy.pause();

      cy.contains('[Student: SANCHEZ CASTILLO, CINTHYA MARLET ]');
      // cy.contains('[Student: CADENA RIOS, CARLOS ANTONIO ]').wait(2000).click();
      cy.pause();
      cy.get('[type="checkbox"]').check().uncheck();
      cy.pause();
      cy.go(-1).wait(1000).get('button').eq(4).should('contain', 'Review').click();
    });

    it('Should select Closed request status and add new Follow Up Request', () => {
      cy.contains('FollowUpReqs').click()
      cy.get('select[name="MRReviewedStatusSelector"]').select('Closed');
      cy.contains('Add New FollowUpRequest').click()
      cy.get('select[name="StudentSelector"]').wait(1000.).select('CADENA RIOS, CARLOS ANTONIO');
      cy.get('select[id="requestorRoleSelector"]').wait(1000.).select('Student');
      cy.get('input').type('This is a test').clear();
      cy.contains('Cancel').click();
    });
    it('Should go to Sponsors', () => {
      cy.contains('Sponsors').click();
    });
    it('Should be able to change the select values and go through the tabs', () => {
      cy.get('select[name="activePeriodSelector"]').select('2019 3:Jul-Set').select('2019 4:Oct-Dic').select('2020 1:Ene-Mar');
      cy.contains('Mentor Reports').click();
      cy.contains('JA Comments').click();
    });
    it('Should go to Estudiantes', () => {
      cy.contains('Estudiantes').click();
    });
    it('Should edit Most Recent Quarterly Report', () => {
      cy.contains('Editar').click();
      cy.get('button').contains('Cancelar').click();
      cy.scrollTo('bottom');
    });
    it('Should go to Confidential', () => {
      cy.contains('Confidential').click();
    });
    it('Should create a new Confidential report', () => {
      cy.contains('Review/Edit Reports').click();
      cy.get('input').type('CADENA RI');
      cy.contains('CADENA RIOS').click().wait(2000);


      cy.contains('Add New Report').click();
      cy.get('select[formcontrolname="lastContactMonthSelector"]').select('Jul/Jul');
      cy.get('[type="radio"]').first().check();
      cy.get('textarea').last().type('This is a test').clear();
      cy.contains('Cancel').click();
    });
    it('Should go to Becas', () => {
      cy.contains('Becas').click();
    });
    it('Should go to my grades', () => {
      cy.contains('CADENA RIOS, CARLOS ANTONIO').click();
      cy.contains('Back').click();
      cy.contains('StudentRpts').click();
    });
    it('Should go to Quarterly', () => {
      cy.contains('Quarterly').click();
    });
    it('Should be able to comment under JA Comments', () => {
      cy.contains('CADENA RIOS, CARLOS ANTONIO').click();
      cy.contains('JA Comments').click();
      cy.get('textarea').last().type('test');
      cy.get('textarea').last().type('{backspace}').wait(100).clear();
      cy.get('select[name="activePeriodSelector"]').wait(1000.).select('2019 4:Oct-Dic');
    });

    ***/
  it('Should Logout', () => {
    cy.log('Logging out');
    cy.get('[data-cy=logout]').click();
  });



});