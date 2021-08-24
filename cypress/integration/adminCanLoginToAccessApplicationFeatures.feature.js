/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

sizes.forEach((size) => {
  describe(`Application features can be accessed on ${size}`, () => {
    beforeEach(() => {
      cy.visit('/')
      TestHelpers.sizeParameters(size)
    })
    describe('Successfully by an authenticated broker', () => {
      beforeEach(() => {
        cy.intercept('POST', '**/api/auth/sign_in', {
          fixture: 'authenticated_admin.json',
        })
        cy.intercept('GET', '**/api/auth/validate_token', {
          fixture: 'authenticated_admin.json',
          headers: { uid: 'johnny@cage.com' },
        })
        cy.get('[data-cy=email-field]').type('johnny@cage.com')
        cy.get('[data-cy=password-field]').type('password')
        cy.get('[data-cy=login-btn]').click()
      })
    })

    describe('Unsuccessfully with wrong credentials', () => {
      beforeEach(() => {
        cy.intercept('POST', '**/api/auth/sign_in', {
          statusCode: 422,
          body: { data: { errors: ['Wrong credentials, please try again'] } },
        })
        cy.get('[data-cy=email-field]').type('johnny@cage.com')
        cy.get('[data-cy=password-field]').type('assword')
        cy.get('[data-cy=login-btn]').click()
      })

      it('is expected to show an error message', () => {
        cy.get('[data-cy=error-snack]').should(
          'contain',
          'Wrong credentials, please try again'
        )
      })
    })
    describe('Admin is able to logout after being logged in', () => {
      beforeEach(() => {
        cy.intercept('POST', '**/api/auth/sign_in', {
          fixture: 'authenticated_admin.json',
        })
        cy.intercept('GET', '**/api/auth/validate_token', {
          fixture: 'authenticated_admin.json',
          headers: { uid: 'johnny@cage.com' },
        })
        cy.intercept('DELETE', '**/api/auth/sign_out', {
          statusCode: 200,
        })

        cy.get('[data-cy=email-field]').type('johnny@cage.com')
        cy.get('[data-cy=password-field]').type('password')
        cy.get('[data-cy=login-btn]').click()
      })

      it('is expected to log the user out', () => {
        TestHelpers.sizeCase(size)
      })
    })
  })
})
