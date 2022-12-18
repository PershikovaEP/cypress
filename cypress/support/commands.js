Cypress.Commands.add('login', (email, pass) => {
  cy.contains('Log in').click();
  if (email) {
    cy.get('#mail').type(email);
  }
  if (pass) {
    cy.get('#pass').type(pass);
  }
  cy.contains('Submit').click();
});

Cypress.Commands.add('addBook', (title, description, author, addFavorites) => {
  cy.contains('Add new').click();
  cy.get('#title').type(title);
  cy.get('#description').type(description);
  cy.get('#authors').type(author);
  if (addFavorites) {
    cy.get('#favorite').click();
  }
  cy.contains('Submit').click();
});
