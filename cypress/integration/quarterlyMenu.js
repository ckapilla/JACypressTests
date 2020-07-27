describe('quarterlyMenu', () => {
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
});