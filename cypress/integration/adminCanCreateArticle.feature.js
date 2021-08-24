import { ContextConsumer } from 'react-is'
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin is able to create an article ', () => {
  sizes.forEach((size) => {
    describe(`on ${size}`, () => {
      const selection = 'article-creation'
      beforeEach(() => {
        cy.visit('/')
        TestHelpers.sizeParameters(size)
        TestHelpers.authenticate()
        TestHelpers.sizeCase(size, selection)
      })

      it('is expected to show article creation page', () => {
        cy.get('[data-cy=article-title]').type('Social Care in London')
        cy.get('[data-cy=article-teaser]').type('This is some teaser text')
        cy.get('[data-cy=article-body]').type(
          'Some longer text to see that the body of the article creation is working correctly'
        )
        cy.get('[data-cy=article-author]').type('Johnny Cage')
        cy.get('[data-cy=article-date]').type('2021-08-24')
        cy.get('[data-cy=article-submit]').click();
      })
    })
  })
})
