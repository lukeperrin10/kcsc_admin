/* eslint-disable no-undef */
import TestHelpers from '../support/testhelper'
import sizes from '../support/index'

sizes.forEach((size) => {
  describe(`Broker can see business analytics ${size}`, () => {
    const selection = 'menu-analytics'
    beforeEach(() => {
      cy.visit('/')
      TestHelpers.authenticate()
      TestHelpers.sizeParameters(size)
      TestHelpers.sizeCase(size, selection)
    })

    describe('Successfully', () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/analytics', {
          body: {},
        })
      })
      it('is expected to take broker to analytics page', () => {
        cy.url().should('contain', '/analytics')
      })
    })

    describe('When no data is present', () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/analytics', {
          statusCode: 500,
        })
      })

      it('is expected to show a message for no analytics', () => {
        cy.get('[data-cy=analytics-error-message]').should(
          'contain',
          "There were no analytics to be found. Let's hope we can dig them up later!"
        )
      })
    })
  })
})
