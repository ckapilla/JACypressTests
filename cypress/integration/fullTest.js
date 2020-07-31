describe('Full Test', () => {
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
  it('Should go to Admins', () => {
    cy.contains('Admins').click().wait(3000);        
  });

  it('Should go to Students and search for Carlos', () => {
    cy.contains('Students').click();
    cy.get('input').type('CADENA RIOS').wait(1000);
    cy.contains('CADENA RIOS').click().wait(1000);
  }); 

  it('Should go to Members and search for Chris', () => {
    cy.contains('Members').click();
    cy.go(-1).wait(1000).go(1).wait(1000);
    cy.get('input').type('Kapilla').wait(1000);
    cy.contains('Kapilla').click().wait(1000);
  });

  it('Should go to Sponsors and sort by Group Member Name', () => {
    cy.get('a').eq(12).should('contain', 'Sponsors').click().wait(1000); //13th '<a>' element that contains Sponsors, it'r true
    //OTRA FORMA DE ACCEDER CON ROUTE
    //cy.server();
    //cy.route('admins/sponsor-groups').as('getAdmSpon')
    //cy.visit('admins/sponsor-groups').wait(1000)
    //cy.wait('@getAdmSpon')
    cy.contains('Group Member Name').click().wait(1000);
  });

  it('Should go to Mentor Rpts and select 2018 Aug and look for Carlos', () => {
    cy.contains('MentorRpts').click().wait(1000)
    cy.get('select[name="yearSelector"]').wait(1000).select('2018').wait(1000);
    cy.get('select[name="monthSelector"]').wait(1000).select('Aug/Ago').wait(1000);
    cy.contains('[Student: CADENA RIOS, CARLOS ANTONIO ]').click().wait(1000);
    cy.get('[type="checkbox"]').check().wait(1000).uncheck().wait(1000);
    cy.go(-1).wait(1000).get('button').eq(4).should('contain', 'Review').click().wait(1000);
  });

  it('Should take a Screenshot after selecting Mentor Reports Submitted', () => {
    cy.contains('Misc Rpts').click().wait(1000)
    cy.get('select[name="StatusSelector"]').wait(1000.).select('Mentor Reports Submitted').wait(1000);
    cy.scrollTo('center').screenshot('mentorReportsSubmitted').wait(1000);
  });

  it('Should select Closed request status and add new Follow Up Request', () => {
    cy.contains('FollowUpReqs').click().wait(1000)
    cy.get('select[name="MRReviewedStatusSelector"]').wait(1000).select('Closed').wait(1000);
    cy.contains('Add New FollowUpRequest').click().wait(1000)
    cy.get('select[name="StudentSelector"]').wait(1000.).select('CADENA RIOS, CARLOS ANTONIO').wait(1000);
    cy.get('select[id="requestorRoleSelector"]').wait(1000.).select('Student').wait(1000);
    cy.get('input').type('This is a test').wait(1000).clear().wait(1000); 
    cy.contains('Cancel').click().wait(1000);
  });
  it('Should go to Sponsors', () => {
    cy.contains('Sponsors').click();
  });
  it('Should be able to change the select values and go through the tabs', () => {
    cy.get('select[name="activePeriodSelector"]').wait(1000).select('2019 3:Jul-Set').wait(1000).select('2019 4:Oct-Dic').wait(1000).select('2020 1:Ene-Mar').wait(1000);
    cy.contains('Mentor Reports').click();
    cy.contains('JA Comments').click();
  });
  it('Should go to Estudiantes', () => {
    cy.contains('Estudiantes').click().wait(1000);
  });
  it('Should edit last report', () => {
    cy.get('button').wait(1000).contains('Editar').click().wait(1000);
    cy.get('button').wait(1000).contains('Cancelar').click().wait(1000);
    cy.scrollTo('bottom').wait(1000);
  });
  it('Should go to Confidential', () => {
    cy.contains('Confidential').click().wait(1000);
  });
  it('Should create a new report', () => {
    cy.contains('Review/Edit Reports').click().wait(1000); 
    cy.get('input').type('CADENA RIOS').wait(1000);
    cy.contains('CADENA RIOS').click().wait(1000);
    cy.contains('Add New Report /Añadir un Nuevo Informe').click().wait(1000);
    cy.get('select[formcontrolname="lastContactMonthSelector"]').wait(1000).select('Jul/Jul').wait(1000);
    cy.get('[type="radio"]').first().check().wait(1000); 
    cy.get('textarea').last().type('This is a test').wait(1000).clear().wait(1000);
    cy.contains('Cancel').click().wait(1000);
  });
  it('Should go to Becas', () => {
    cy.contains('Becas').click().wait(1000);
  });
  it('Should go to my grades', () => {
    cy.contains('CADENA RIOS, CARLOS ANTONIO').click().wait(1000);
    cy.contains('Back').click().wait(1000);
    cy.contains('StudentRpts').click();  
  });
  it('Should go to Quarterly', () => {
    cy.contains('Quarterly').click().wait(1000);
  });
  it('Should be able to comment under JA Comments', () => {
    cy.contains('CADENA RIOS, CARLOS ANTONIO').click().wait(1000);
    cy.contains('JA Comments').click().wait(1000);
    cy.get('textarea').last().type('test').wait(1000);
    cy.get('textarea').last().type('{backspace}').wait(100).clear().wait(1000);
    cy.get('select[name="activePeriodSelector"]').wait(1000.).select('2019 4:Oct-Dic').wait(1000);
  });
  it('Should log out', () => {
    cy.contains('span.link', 'Log Out').click();
  });
  it('Should clear cookies', () => {
    cy.clearCookies();
    cy.pause();
  });
});