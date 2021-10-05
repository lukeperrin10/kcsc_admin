/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Edit Testimonials', () => {
  sizes.forEach((size) => {
    describe(`and edit Testimonials info on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/app_data', {
          fixture: 'app_data.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        const selection = 'testimonials'
        TestHelpers.sizeCase(size, selection)
      })

      context('successfully', () => {
        beforeEach(() => {
          cy.intercept('PUT', '**/app_data**', {
            statusCode: 200,
          })
        })

        it('is expected to show to show success message on submit', () => {
          cy.get('[data-cy=testimonials-table]').within(() => {
            cy.get('[data-cy=testimonial]').should('have.length', 2)
            cy.get('[data-cy=testimonial]')
              .first()
              .within(() => {
                cy.get('[data-cy=edit-button]').click()
              })
          })
          cy.get('[data-cy=testimonial-submit-button]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain.text',
            'Info has been updated'
          )
        })
      })

      context('unsuccessfully', () => {
        beforeEach(() => {
          cy.intercept('PUT', '**/app_data**', {
            statusCode: 400,
          })
          cy.get('[data-cy=testimonials-table]').within(() => {
            cy.get('[data-cy=testimonial]')
              .first()
              .within(() => {
                cy.get('[data-cy=edit-button]').click()
              })
          })
        })

        it('is expected to show success message on submit', () => {
          cy.get('[data-cy=testimonial-submit-button]').first().click()
          cy.get('[data-cy=snack-content]').should(
            'contain.text',
            'Request failed with status code 400'
          )
        })
      })
    })
  })
})
