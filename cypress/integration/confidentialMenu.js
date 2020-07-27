describe('confidentialMenu', () => {
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
}); 