/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin is able to create an info snippet ', () => {
  sizes.forEach((size) => {
    describe(`on ${size}`, () => {
      const selection = 'info-creation'
      beforeEach(() => {
        cy.intercept('POST', '**api/information/**', {
          message: 'Your information snippet has successfully been created',
        })
        cy.intercept('GET', '**api/information', {
          fixture: 'information_items.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.sizeCase(size, selection)
        TestHelpers.authenticate()
      })

      describe('successfully', () => {
        it('is expected to show information creation page', () => {
          cy.get('[data-cy=status]').click()
          cy.get('[data-cy=pinned]').click()
          cy.get('[data-cy=header]').type('Covid 19 measures')
          cy.get('[data-cy=description]').type(
            'Some longer text to see that the body of the article creation is working correctly'
          )
          cy.get('[data-cy=link]').type('www.google.com')
          cy.get('[data-cy=article-submit]').click()
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Your information snippet has successfully been created'
          )
        })
      })
    })
  })
})
