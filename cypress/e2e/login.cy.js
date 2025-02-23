describe('Проверка авторизации', function () {

    describe('Позитивный кейс авторизации', () => {
        it('Успешный вход в систему', () => {
          cy.visit('https://login.qa.studio'); // Заходим на сайт
          cy.get('#mail').type('german@dolnikov.ru'); // Вводим логин
          cy.get('#pass').type('iLoveqastudio1'); // Вводим пароль
          cy.get('#loginButton').click(); // Нажимаем кнопку входа
          cy.contains('Авторизация прошла успешно').should('be.visible'); // Проверяем, что после входа отображается нужный текст
          cy.get('body').should('be.visible'); // Проверяем, что присутствует кнопка закрытия (крестик)
        });
    });
      describe('Проверка восстановления пароля', () => {
        it('Должен отображать сообщение после запроса восстановления пароля', () => {
          cy.visit('https://login.qa.studio'); // Заходим на сайт
          cy.get('#forgotEmailButton').click(); // Нажимаем на ссылку "Забыли пароль"
          cy.get('#mailForgot').type('test@example.com'); // Вводим email
          cy.get('#restoreEmailButton').click(); // Отправляем запрос на восстановление
          cy.contains('Успешно отправили пароль на e-mail').should('be.visible'); // Проверяем, что после попытки входа отображается нужный текст
          cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие кнопки крестика для закрытия уведомления
        });
      });
      describe('Негативный тест авторизации', () => {
        it('Должен отображать ошибку при вводе неправильного пароля', () => {
          cy.visit('https://login.qa.studio'); // Заходим на сайт
          cy.get('#mail').type('german@dolnikov.ru'); // Вводим правильный логин
          cy.get('#pass').type('iLoveqastudio'); // Вводим неправильный пароль
          cy.get('#loginButton').click();// Нажимаем кнопку "Войти"
          cy.contains('Такого логина или пароля нет').should('be.visible'); // Проверяем, что после входа отображается нужный текст
          cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие кнопки крестика для закрытия уведомления
        });
      });
      describe('Негативный тест авторизации 2', () => {
        it('Должен отображать ошибку при вводе неправильного логина', () => {
          cy.visit('https://login.qa.studio'); // Заходим на сайт
          cy.get('#mail').type('german@dlnikov.ru'); // Вводим неправильный логин
          cy.get('#pass').type('iLoveqastudio1'); // Вводим правильный пароль
          cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
          cy.contains('Такого логина или пароля нет').should('be.visible'); // Проверяем, что после входа отображается нужный текст
          cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Проверяем наличие кнопки крестика для закрытия уведомления
        });
      });
      describe('негативный кейс валидации', () => {
        it('Должно отображаться сообщение об ошибке, если в логине отсутствует @', () => {
          cy.visit('https://login.qa.studio'); // Заходим на сайт
          cy.get('#mail').type('germandolnikov.ru');// Ввод логина без '@'
          cy.get('#pass').type('iLoveqastudio1'); // Вводим правильный пароль
          cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
          cy.contains('Нужно исправить проблему валидации').should('be.visible'); // Проверяем, что после входа отображается нужный текст
        });
        describe('Тест на приведение логина к нижнему регистру', () => {
            it('Должно отображаться сообщение об ошибке, если логин не приводится к нижнему регистру', () => {
            cy.visit('https://login.qa.studio'); // Заходим на сайт
            cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввод логина с заглавными буквами
            cy.get('#pass').type('iLoveqastudio1'); // Вводим правильный пароль
            cy.get('#loginButton').click(); // Нажимаем кнопку "Войти"
            cy.contains('Авторизация прошла успешно').should('be.visible'); // Проверяем, что после входа отображается нужный текст // Некорректное поведение, вход с указанным логином приводит к ошибке
            cy.get('body').should('be.visible'); // Проверяем, что присутствует кнопка закрытия (крестик)
            });
        });
    });
 })
