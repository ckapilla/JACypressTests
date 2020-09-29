describe('sponsorsMenu', () => {
  it('Should go to Sponsors', () => {
    cy.contains('Sponsors').click();
  });
  it('Should be able to change the select values and go through the tabs', () => {
    cy.get('select[name="activePeriodSelector"]').wait(1000).select('2019 3:Jul-Set').wait(1000).select('2019 4:Oct-Dic').wait(1000).select('2020 1:Ene-Mar').wait(1000);
    cy.contains('Mentor Reports').click();
    cy.contains('JA Comments').click();
  });
});