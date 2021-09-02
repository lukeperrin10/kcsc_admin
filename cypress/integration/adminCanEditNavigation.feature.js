/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use Navigation Dashboard', () => {
  sizes.forEach((size) => {
      const selection = 'navigation'
      beforeEach(() => {
        TestHelpers.sizeParameters(size)
        cy.intercept('GET', '**/app_data', {
          fixture: 'app_data.json',
        })
        cy.intercept('PUT', '**/app_data**', {
          statusCode: 200,
          body: {
            message: 'Info has been updated',
          },
        })
        cy.visit('/')
        TestHelpers.authenticate()
        TestHelpers.sizeCase(size, selection)
      })

      describe(`and edit Navigation info ${size}`, () => {
        it('is expected to show navigation accordion with pre-filled form in details', () => {
          cy.get('[data-cy=navigation-form]').within(() => {
            cy.get('[data-cy=tab-input]')
              .first()
              .find('input')
              .should('have.value', 'home')
            cy.get('[data-cy=tab-switch]').should('have.length', 32)
          })
        })

        context('successfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/app_data**', {
              statusCode: 200,
              body: {
                message: 'Info has been updated',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=navigation-submit-button]').click()
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
              body: {
                error_message: 'Something went wrong, try again later',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=navigation-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain.text',
              'Something went wrong, try again later'
            )
          })
        })
      })
    })
  })
