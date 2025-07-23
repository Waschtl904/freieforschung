describe('Mobile Projektanlage', () => {
  beforeEach(() => {
    cy.setMobileViewport();
    cy.visit('/create-project');
  });

  it('erstellt ein Projekt auf Mobilgerät', () => {
    cy.fillProjectForm({
      title: 'Testprojekt',
      description: 'Kurze Beschreibung min 20 Zeichen.',
      category: 'mathematics'
    });
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Projekt erfolgreich erstellt');
    });
  });
});
