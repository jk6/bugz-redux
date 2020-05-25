it ('loads', () => {
    cy.visit('/');

    cy.get('h2').contains('BugZ');
});