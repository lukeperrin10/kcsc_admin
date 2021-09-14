/* eslint-disable no-undef */
import TestHelpers from '../support/testhelper'

// leaving it for now for ease of developing
// replace with import of sizes when tests green
const sizes = ['macbook-16']

describe('Admin is able to change the password', () => {
  sizes.forEach((size) => {
    describe(`on ${size}`, () => {
      beforeEach(() => {
        TestHelpers.sizeParameters(size)

        cy.visit('/')
      })

      describe('successfully', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/auth/password', {
            message:
              "An email has been sent to 'admin@mail.com' containing instructions for resetting your password.",
          })
          cy.intercept('POST', '**/auth/edit', {
            message: 'Password changed successfully',
          })
        })

        it('go through password change flow', () => {
          cy.get('[data-cy=forgot-password-link]').click()
          cy.url('/password/reset')

          cy.get('[data-cy=email-input]').type('admin@mail.com')
          cy.get('[data-cy=submit-btn]').click()
          cy.get('[data-cy=success-message]').should(
            'contain.text',
            'Instructions has been sent to your inbox'
          )
          cy.visit('/password/edit')
          cy.get('[data-cy=new-password-input]').type('newPassword')
          cy.get('[data-cy=new-password-confirmation-input]').type(
            'newPassword'
          )
          cy.get('[data-cy=submit-btn]').click()

          cy.url('/')
          cy.get('[data-cy=success-message]').should(
            'contain',
            'Password changed successfully'
          )
        })
      })

      describe('unsuccessfully with wrong email', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/auth/password', {
            message: 'User with such email is not found',
            statusCode: 404,
          })
        })

        it('is expected to show error message', () => {
          cy.get('[data-cy=forgot-password-link]').click()
          cy.url('/password/reset')

          cy.get('[data-cy=email-input]').type('admin@mail.com')
          cy.get('[data-cy=submit-btn]').click()
          cy.get('[data-cy=wrong-email-error]').should(
            'contain.text',
            'User with such email is not found'
          )
        })
      })

      describe('unsuccessfully with wrong headers', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/auth/edit', {
            message: 'Not authorized',
            statusCode: 401,
          })
        })

        it('is expected to show error message', () => {
          cy.visit('/password/edit')
          cy.get('[data-cy=new-password-input]').type('newPassword')
          cy.get('[data-cy=new-password-confirmation-input]').type(
            'newPassword'
          )
          cy.get('[data-cy=submit-btn]').click()
          cy.get('[data-cy=unauthorized-error]').should(
            'contain.text',
            'Request is not authorized'
          )
        })
      })
    })
  })
})
