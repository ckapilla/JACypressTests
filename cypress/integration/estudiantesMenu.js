describe('estudiantesMenu', () => {
  it('Should go to Estudiantes', () => {
    cy.contains('Estudiantes').click().wait(1000);
  });
  it('Should edit last report', () => {
    cy.get('button').wait(1000).contains('Editar').click().wait(1000);
    cy.get('button').wait(1000).contains('Cancelar').click().wait(1000);
    cy.scrollTo('bottom').wait(1000);
  });
}); 