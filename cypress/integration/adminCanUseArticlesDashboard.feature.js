/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use Articles Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to articles dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/articles', {
          fixture: 'all_articles.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        cy.visit('/articles')
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
              cy.get('[data-cy=action]').scrollIntoView().should('be.visible')
            })
        })
      })
    })
  })
})
