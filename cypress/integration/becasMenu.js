describe('becasMenu', () => {
  it('Should go to Becas', () => {
    cy.contains('Becas').click().wait(1000);
  });
  it('Should go to my grades', () => {
    cy.contains('CADENA RIOS, CARLOS ANTONIO').click().wait(1000);
    cy.contains('Back').click().wait(1000);
    cy.contains('StudentRpts').click();  
  });
});
