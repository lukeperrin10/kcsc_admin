/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use Articles Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to articles dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/articles', {
          fixture: 'all_articles.json',
        })
        cy.intercept('GET', '**/articles/1', {
          fixture: 'single_article.json',
        })
        cy.intercept('GET', '**/app_data', {
          fixture: 'app_data.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        const selection = 'articles-dashboard'
        TestHelpers.sizeCase(size, selection)
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
      describe('Admin is able to preview an article', () => {
        it('is expected to preview the article', () => {
          cy.get('[data-cy=article-preview-button]').first().click()
          cy.get('[data-cy=article-container]').within(() => {
            cy.get('[data-cy=title]').should(
              'contain',
              'Suicide rate decreased with 88%'
            )
            cy.get('[data-cy=author]').should('contain', 'Sonya Blade')
            cy.get('[data-cy=date]').should('contain', '2021-05-11')
            cy.get('[data-cy=image]')
              .should('have.attr', 'alt')
              .should('equal', 'Doctor holding tablet')
            cy.get('[data-cy=body]').should(
              'contain',
              'Everywhere you look you see the words self-care, self-help, self-love, and wellness'
            )
            cy.get('[data-cy=close-btn]').click()
          })
          cy.get('[data-cy=body]').should('not.exist')
        })
      })

      describe('Admin is able to edit an article', () => {
        beforeEach(() => {
          cy.intercept('PUT', '**/articles/1', {
            message: 'The article has been successfully updated.',
          })
          cy.get('[data-cy=article-edit-button]').first().click()
        })

        it('is expected to be able to update the article title image, image alt and body', () => {
          cy.get('[data-cy=article-container]').within(() => {
            cy.get('[data-cy=article-title]')
            .find('input')
            .clear()
            .type('This is the new Title for this article')
          })
          cy.get('[data-cy=upload-image-camera]').attachFile('imageFixture.png').trigger('change')
          cy.get('[data-cy=alt]').should('contain', '');
          cy.get('[data-cy=article-body]')
            .clear()
            .type(
              'This is the new text for this article, which is not anywhere near as long as the original'
            )
          cy.get('[data-cy=submit-button]').click()
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Article has been updated'
          )
        })
      })
    })
  })
})
