/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can create Testimonials', () => {
  sizes.forEach((size) => {
    describe(`and create Testimonials info on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('PUT', '**/app_data**', {
          statusCode: 200,
          body: {
            message: 'Testimonial has been created',
          },
        })
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
        it('is expected to show to show success message on submit', () => {
          const filepath = '../fixtures/imageFixture.png'
          cy.get('[data-cy=create-testimonial]').click()
          cy.get('[data-cy=create-testimonial-form]').within(() => {
            cy.get('[data-cy=image-preview]').should('contain', '')
            cy.get('input[type="file"]').attachFile(filepath)
            cy.get('[data-cy=image-preview]').should('have.attr', 'src')
            cy.get('[data-cy=testimonial-name]').type('Bob')
            cy.get('[data-cy=testimonial-alt]').type('screenshot of dashboard')
            cy.get('[data-cy=testimonial-text]').type(
              'Some longer text to see that the body of the testimonial works'
            )
            cy.get('[data-cy=testimonial-link]').type('https://google.com')
            cy.get('[data-cy=testimonial-submit-button]').click()
          })
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Testimonial has been created'
          )
        })
      })
    })
  })
})
