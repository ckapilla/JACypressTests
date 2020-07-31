describe('logOut', () => {
  it('Should log out', () => {
      cy.contains('span.link', 'Log Out').click();
  });
});