/* eslint-disable no-undef */
import sizes from '../support/index'

describe('Application features can be accessed', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  sizes.forEach((size) => {
    context(`${size}`, () => {
      beforeEach(() => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
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
          switch (size) {
            case 'macbook-15':
              cy.get('[data-cy=logout-button]').click()
              cy.get('[data-cy=email-field]').should('be.visible')
              break

            default:
              cy.get('[data-cy=hamburger-menu]').click()
              cy.get('[data-cy=logout-button]').click()
              cy.get('[data-cy=email-field]').should('be.visible')
              break
          }
        })
      })
    })
  })
})
