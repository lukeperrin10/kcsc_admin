/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use information Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to information dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/information', {
          fixture: 'information_items.json',
        })
        cy.intercept('GET', '**/api/app_data', {
          fixture: 'app_data.json',
        })
        cy.intercept('POST', '**/api/information/**', {
          statusCode: 200,
          body: {
            message: 'Information has been updated',
          },
        })

        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        cy.visit('/information')
      })
      it('is expected to show a table with list of all information snippets', () => {
        cy.get('[data-cy=information-table]').within(() => {
          cy.get('[data-cy=information]')
            .should('have.length', 10)
            .first()
            .within(() => {
              cy.get('[data-cy=status]').should('contain.text', 'Published')
              cy.get('[data-cy=pinned]').should('contain.text', 'Pinned')
              cy.get('[data-cy=header]').should('contain.text', 'Item-0')
              cy.get('[data-cy=description]').should(
                'contain.text',
                'Often just simple changes'
              )
              cy.get('[data-cy=action]').should('contain.text', 'Placeholder')
            })
        })
      })

      context('successfully, by clicking `publish` switch', () => {
        it('is expected to show success message', () => {
          cy.get('[data-cy=publish-2]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain',
            'Information has been updated'
          )
        })
      })

      context('successfully, by clicking `pinned` switch', () => {
        it('is expected to show success message', () => {
          cy.get('[data-cy=pinned-2]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain',
            'Information has been updated'
          )
        })
      })

      context('unsuccessfully', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/api/information/**', {
            statusCode: 400,
            body: {
              error_message: 'An error occurred',
            },
          })
        })

        context('unsuccessfully, by clicking `publish` switch', () => {
          it('is expected to show error message', () => {
            cy.get('[data-cy=publish-1]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain',
              'An error occurred'
            )
          })
        })

        context('unsuccessfully, by clicking `pinned` switch', () => {
          it('is expected to show error message', () => {
            cy.get('[data-cy=pinned-1]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain',
              'An error occurred'
            )
          })
        })
      })
    })
  })
})
