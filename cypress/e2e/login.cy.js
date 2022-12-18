beforeEach(() => {
  cy.visit('/');
});

it('Should open the main page', () => {
  cy.contains('Books list').should('be.visible');
});

it('Should successfully login', () => {
  cy.login('test@test.com', 'test');
  cy.contains('Добро пожаловать test@test.com').should('be.visible');
  cy.contains('Add new').should('be.visible').and('have.class', 'btn');
});

it('Should not login with empty login', () => {
  cy.login('', 'test');
  cy.get('#mail')
    .then(($el) => $el[0].checkValidity())
    .should('be.false');
});

it('Should not login with empty password', () => {
  cy.login('test@test.com');
  cy.get('#pass')
    .then(($el) => $el[0].checkValidity())
    .should('be.false');
});
