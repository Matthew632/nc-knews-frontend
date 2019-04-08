Cypress.Commands.add("stubAndVisitArticles", file => {
  cy.server();
  cy.route(
    "https://nc-knews-server-main.herokuapp.com/api/articles",
    file.json
  );
  cy.route(
    "https://nc-knews-server-main.herokuapp.com/api/users",
    "fx:users.json"
  );
  cy.route(
    "https://nc-knews-server-main.herokuapp.com/api/topics",
    "fx:topics.json"
  );
  cy.visit("/articles");
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
