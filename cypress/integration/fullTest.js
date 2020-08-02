describe('Full Test', () => {
  it('Should go to Jovenes Adelante website directly', () => {
    cy.visit('');
  });
  it('Should login user', () => {
    cy.get('[data-cy=login]').click()
    // cy.get('button').should("contain", 'Log In / Iniciar sesión').click();
    cy.get('input[name="email"]').type('carlos.cadena05@hotmail.com');
    cy.get('input[name="password"]').type('klos050007');
    cy.get('form').submit().wait(1500);
    cy.log('Login successful')
  });
  it('Should go to Admins', () => {
    cy.contains('Admins').click();
  });

  it('Should go to Students and search for Carlos', () => {
    cy.contains('Students').click().wait(1500);
    cy.get('input').type('CADENA RIOS');
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
  /***
    it('Should go to Mentor Rpts and select 2018 Aug and look for Carlos', () => {
      cy.contains('MentorRpts').click()
      cy.get('select[name="yearSelector"]').select('2018');
      cy.get('select[name="monthSelector"]').select('Aug/Ago');
      cy.contains('[Student: CADENA RIOS, CARLOS ANTONIO ]').click();
      cy.get('[type="checkbox"]').check().uncheck();
      cy.go(-1).get('button').eq(4).should('contain', 'Review').click();
    });
  
    it('Should take a Screenshot after selecting Mentor Reports Submitted', () => {
      cy.contains('Misc Rpts').click()
      cy.get('select[name="StatusSelector"]').wait(1000.).select('Mentor Reports Submitted');
      cy.scrollTo('center').screenshot('mentorReportsSubmitted');
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
    it('Should edit last report', () => {
      cy.contains('Editar').click();
      cy.get('button').contains('Cancelar').click();
      cy.scrollTo('bottom');
    });
    it('Should go to Confidential', () => {
      cy.contains('Confidential').click();
    });
    it('Should create a new report', () => {
      cy.contains('Review/Edit Reports').click();
      cy.get('input').type('CADENA RIOS');
      cy.get('button').contains('CADENA RIOS').click().wait(2000);
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
  **/
});