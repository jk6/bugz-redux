describe ('initial load UI', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it ('loads and displays title', () => {
        cy.get('h2').contains('BugZ');
    });
});