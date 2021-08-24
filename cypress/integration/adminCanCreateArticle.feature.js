import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin is able to create an article ', () => {
  sizes.forEach((size) => {
    describe(`on ${size}`, () => {
      const selection = 'article-creation'
      beforeEach(() => {
        cy.intercept('POST', 'https://kcsc-api.herokuapp.com/api/articles/**', {
          message: 'Your article has successfully been created',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.sizeCase(size, selection)
        TestHelpers.authenticate()
      })

      describe('successfully', () => {
        it('is expected to show article creation page', () => {
          cy.get('[data-cy=article-title]').type('Social Care in London')
          cy.get('[data-cy=article-body]').type(
            'Some longer text to see that the body of the article creation is working correctly'
          )
          cy.get('[data-cy=article-submit]').click()
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Your article has successfully been created'
          )
          cy.wait(1000)
        })
      })
    })
  })
})
