/* eslint-disable no-undef */

import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

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

      it('can create a new article', () => {
        cy.get('[data-cy=new-article-btn').click()
        cy.get('[data-cy=new-article-modal]').within(() => {
          cy.get('[data-cy=title-input]').type('Free burgers')
          cy.get('[data-cy=teaser-input]').type('wow burgers')
          cy.get('[data-cy=body-input]').type('Burgers everywhere UwU')
          cy.get('[data-cy=author-input]').type('Squidward')
          // cy.get('[data-cy=image-input]')
          //   .attachFile('imageFixture.png', { subjectType: 'drag-n-drop' })
          //   .trigger('change')
          cy.get('[data-cy=cancel-btn]').should('exist')
          cy.get('[data-cy=submit-btn]').click()
        })
        // cy.get('[data-cy=submit-message]').should(
        //   'contain',
        //   'Article has been created'
        // )
      })
    })
  })
})
