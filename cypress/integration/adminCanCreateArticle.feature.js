/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin is able to create an article ', () => {
  sizes.forEach((size) => {
    describe(`on ${size}`, () => {
      const selection = 'article-creation'
      beforeEach(() => {
        cy.intercept('POST', '**/articles/**', {
          message: 'Your article has successfully been created',
        })
        cy.intercept('GET', '**/api/articles', {
          fixture: 'all_articles.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.sizeCase(size, selection)
        TestHelpers.authenticate()
      })

      describe('successfully', () => {
        it('is expected to show article creation page', () => {
          const filepath = '../fixtures/imageFixture.png'
          cy.get('[data-cy=article-title]').type('Social Care in London')
          cy.get('[data-cy=article-body]').type(
            'Some longer text to see that the body of the article creation is working correctly'
          )
          cy.get('[data-cy=alt]').type('screenshot of dashboard')
          cy.get('[data-cy=image]').should('contain', '')
          cy.get('[data-cy=image]').should('have.attr', 'src')
          cy.get('[data-cy=article-submit]').click()
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Your article has successfully been created'
          )
        })
      })
    })
  })
})
