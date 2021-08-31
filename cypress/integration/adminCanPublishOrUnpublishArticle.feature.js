/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Publish Or Unpublish Article', () => {
  sizes.forEach((size) => {
    describe(`admin can publish or unpublish article on ${size}`, () => {
      const selection = 'articles-dashboard'
      beforeEach(() => {
        cy.intercept('GET', '**/articles', {
          fixture: 'all_articles.json',
        })
        cy.intercept('POST', '**/articles/**', {
          statusCode: 200,
          body: {
            message: 'Article has been unpublished',
          },
        })
        cy.visit('/')
        TestHelpers.sizeParameters(size)
        TestHelpers.authenticate()
        TestHelpers.sizeCase(size, selection)
      })

      context('successfully, by clicking `publish` switch', () => {
        it('is expected to show success message', () => {
          cy.get('[data-cy=publish-1]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain',
            'Article has been unpublished'
          )
        })
      })
    })

    context('unsuccessfully, by clicking `publish` switch', () => {
      beforeEach(() => {
        cy.intercept('POST', '**/articles/**', {
          statusCode: 400,
          body: {
            error_message: 'An error occurred',
          },
        })
      })
      it('is expected to show error message', () => {
        cy.get('[data-cy=publish-1]').click()
        cy.get('[data-cy=snack-content]').should('contain', 'An error occurred')
      })
    })
  })
})
