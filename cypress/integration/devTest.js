describe('Privada´s Dev Test', () => {
  it('Should go to Jovenes Adelante website directly', () => {
    cy.visit("");
  });
  
  it('Should login user', () => {
    cy.get('button').click('topRight');
    cy.get('input[name="email"]').type('chris@kapilla.net');
    cy.get('input[name="password"]').type('Cjjk2551!');
    cy.get('form').submit().wait(2000);
  });



  it('Should go to Admins', () => {
      if(!cy.contains('Admins').click().wait(2000).end()){
      }        
  });

  it('Should check Server Environment´s status and, depending the status, write a mentor and student report or not', () => {
    cy.contains('Misc Rpts').click().wait(1000)
    cy.get('select[name="StatusSelector"]').wait(1000.).select('Server Environment').wait(1000);
    if (cy.get('div').eq(10).should('contain', 'Database Name JovenesA_Dev')) {
      cy.contains('Mentors').click().wait(1000);
      cy.contains('Add New Report /Añadir un Nuevo Informe').click().wait(1000);
      cy.get('select[formcontrolname="lastContactMonthSelector"]').wait(1000).select('Jul/Jul').wait(1000);
      cy.get('[type="radio"]').first().check().wait(1000); 
      cy.get('textarea').last().type('Hi. This is a test').wait(1000).wait(1000);
      cy.contains('Submit').click().wait(1000);
      cy.contains('Admins').click().wait(1000);
      cy.contains('MentorRpts').click().wait(1000);

      if(cy.get('span').should('contain', '[Student: CADENA RIOS, CARLOS ANTONIO ]')){
        cy.get('button').contains('Review').eq(0).click().wait(1000);
        cy.scrollTo('bottom').wait(1000).contains('Delete').click().wait(1000);
        cy.on('window:confirm', () => true);
        cy.wait(1000);
        cy.on('window:confirm', () => true);
        cy.wait(1000);
        cy.log('Deleted successfully')
      } else{
        cy.log('Mentor report wasnt submitted succesfully')
      }
        cy.contains('Estudiantes').click().wait(1000);
        cy.contains('Añadir Nuevo Reporte').click().wait(1000);
        cy.get('textarea').last().type('This is a test').wait(1000).wait(1000);
        cy.get('button').wait(1000).contains('Guardar').click().wait(1000);
        cy.scrollTo('bottom').wait(1000);
    } else {
      cy.log('Unable to find "Database Name JovenesA_Dev"').wait(1000);   
    }
    
  });
  it('Should log out', () => {
    cy.contains('span.link', 'Log Out').click();
  });
});