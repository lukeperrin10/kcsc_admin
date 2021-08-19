describe('admin can navigate to articles dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/articles', {
      fixture: 'all_articles.json',
    })
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
    cy.get('[data-cy=articles-dashboard]').click()
  })

  it('is expected to show a table with the list of all articles', () => {
    cy.get('[data-cy=articles-table]').within(() => {
      cy.get('[data-cy=article]')
        .should('have.length', 6)
        .first()
        .within(() => {
          cy.get('[data-cy=status]').should('be.visible')
          cy.get('[data-cy=title]').should(
            'contain.text',
            'Most recent article'
          )
          cy.get('[data-cy=author]').should('contain.text', 'Liu Kang')
          cy.get('[data-cy=date]').should('contain.text', '2021-05-12')
          cy.get('[data-cy=action]').should('be.visible')
        })
    })
  })
})
