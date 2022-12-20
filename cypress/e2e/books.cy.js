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
    'Harry Potter And The Chamber of secrets5',
    'The book tells about the adventures of a young English magician',
    'J.K. Rowling'
  );

  cy.contains('Harry Potter And The Chamber of secrets5')
    .find('.btn-success')
    .click();
  cy.contains('Favorites').click();

  cy.contains('Harry Potter And The Chamber of secrets5').should('be.visible');
});

//успешное удаление книги из фаворитов с главной страницы
it('should successfully remove book from favorites', () => {
  cy.addBook(
    'Harry Potter and the Prisoner of Azcoban5',
    'The book tells about the adventures of a young English magician',
    'J.K. Rowling',
    'yes'
  );

  // cy.contains ищет первый элемент
  cy.contains('Harry Potter and the Prisoner of Azcoban5')
    .find('.btn-secondary')
    .click();

  // Если тесты мы запускаем несколько раз и соответственно книг
  // с одним названием оказывается много,то берем последнюю добавленную книгу
  //cy.get('a.mt-3').last().find('.btn-secondary').click({ force: true });
  //Тогда появляется ошибка - Cypress requires elements be attached in the DOM to interact with them.
  //теряется родительский элемент при выполнении find(), так как большая цепочка элементов,
  //а react успевает перерисовать DOM за это время

  cy.contains('Harry Potter and the Prisoner of Azcoban5')
    .find('button')
    .should('have.text', 'Add to favorite');

  //cy.get('a.mt-3').last().find('button').should('have.text', 'Add to favorite');
});
