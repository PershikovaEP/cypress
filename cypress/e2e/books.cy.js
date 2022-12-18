beforeEach(() => {
  cy.visit('/');
  cy.login('test@test.com', 'test');
});

//усппешное добавление книги без обложки и файла книги и без перемещения в фавориты
it('Should successfully add books without cover and book file without moving to favorites', () => {
  cy.addBook(
    'Witcher',
    'The Witcher is the master of the sword and the master of magic, waging a continuous war against bloodthirsty monsters that threaten the peace of a fairy-tale land.',
    'Andrzej Sapkowski'
  );
  cy.contains('Witcher').should('be.visible');
});

//успешное добавление книги без обложки и файла книги с перемещением в фавориты
it('Should successfully add books without cover and book file and added to favorites', () => {
  cy.addBook(
    'Harry Potter and the filov stone',
    'The book tells about the adventures of a young English magician',
    'J.K. Rowling',
    'yes'
  );
  cy.contains('Harry Potter and the filov stone').should('be.visible');
  cy.contains('Favorites').click();
  cy.contains('Harry Potter and the filov stone').should('be.visible');
});

//успешное перемещение уже добавленной книги в фавориты с главной страницы
it('Should successfully move added books to favorites', () => {
  cy.addBook(
    'Harry Potter And The Chamber of secrets',
    'The book tells about the adventures of a young English magician',
    'J.K. Rowling'
  );

  //принудительный запуск, так как тярется родительский элемент DOM
  cy.get('.btn-success').last().click({ force: true });
  cy.contains('Favorites').click();
  cy.contains('Harry Potter And The Chamber of secrets').should('be.visible');
});

//успешное удаление книги из фаворитов с главной страницы
it('should successfully remove book from favorites', () => {
  cy.addBook(
    'Harry Potter and the Prisoner of Azcoban',
    'The book tells about the adventures of a young English magician',
    'J.K. Rowling',
    'yes'
  );

  //удаляем последнюю книгу из фаворитов
  //react перезагружает страницу и теряется родительский элемент DOM
  /* cy.get('.mt-3:nth-last-child(2) .h-100 > .card-footer > .btn')
    .last()
    .wait(15000)
    .click();*/

  cy.get('.mt-3:nth-last-child(2) .h-100 > .card-footer > .btn')
    .last()
    .should('be.visible')
    .then((e) => {
      Cypress.$(e).click();
    });

  //cy.contains('Harry Potter and the Prisoner of Azcoban').should('not.be.visible');
  cy.get('.mt-3:nth-last-child(2) .h-100 > .card-footer > .btn').should(
    'have.text',
    'Add to favorite'
  );
});
