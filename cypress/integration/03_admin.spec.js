//const { type } = require("cypress/types/jquery");


describe('Admin Test', () => {

  it('Should go to Jovenes Adelante website', () => {
    cy.visit('');
  });
  it('If Not Logged in, Should login Admin user, else proceed', () => {
    const username = Cypress.env('AdminTester_username');
    const password = Cypress.env('AdminTester_password');
    cy.login(username, password);
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

    cy.get('input').type('{backspace}_Test').wait(1500); // must wait for server
    cy.tab();
    cy.contains('Student Summary: _Test, _Student').click();
    // on student profile
    cy.get('#ckEditMode').click();
    cy.get('#mentorGUId').should('contain', '_Test, _Mentor')
      .select('_Unassigned, _Mentor');
    cy.get('[data-cy=btn-save]').click();

    cy.get('#mentorGUId').should('contain', '_Unassigned, _Mentor')
      .select('_Test, _Mentor');
    cy.get('[data-cy=btn-save]').click();

    cy.contains('Member Profile').click();
    cy.get('#ckEditMode').click(); 
    cy.get('#cellPhone').click().type('{backspace}1');
    cy.get('#ckEditMode').click();
    cy.contains('Mentor Reports').click();
    cy.contains('Quarterly Reports').click();
    cy.contains(' Go To Quarterly Reports for this student.').click();
    cy.contains('Student Summary: _Test, _Student').click();


    cy.get('[data-cy=goto-mentor]').click();
    // on mentor profile
    cy.get('[data-cy=last-names]').invoke('val').then(($val) => {
      expect($val).eq('_Test');
    });

    cy.get('[data-cy=btn-back]').click();
    // on student profile
    cy.get('#mentorGUId').should('contain', '_Test, _Mentor');

  });
  it('Should go to Admins/Members and search for _Test, _Mentor', () => {
    cy.contains('Members').click();
    cy.get('input').type('{backspace}_Test, _Mentor').wait(1000); // must wait for server
    cy.tab();
    cy.contains('Member Profile: _Test, _Mentor').click();
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

    cy.get('input').type('{backspace}_Test').wait(1000); // must wait for server
    cy.tab();
    cy.contains('Student Summary: _Test, _Student');
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

  it('Should Logout', () => {
    cy.log('Logging out');
    cy.get('[data-cy=logout]').click();
  });
});