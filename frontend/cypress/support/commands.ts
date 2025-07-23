Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(375, 667);
});

Cypress.Commands.add('fillProjectForm', (data) => {
  cy.get('#title').type(data.title);
  cy.get('#description').type(data.description);
  cy.get('#category').select(data.category);
});
