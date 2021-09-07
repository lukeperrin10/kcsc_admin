/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use information Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to information dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/information', {
          fixture: 'information_items.json',
        })
        cy.intercept('GET', '**/app_data', {
          fixture: 'app_data.json',
        })
        cy.intercept('POST', '**/information/**', {
          statusCode: 200,
          body: {
            message: 'Information has been updated',
          },
        })

        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        const selection = 'information-edit'
        TestHelpers.sizeCase(size, selection)
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

      context('Admin is able to edit info snippet', () => {
        beforeEach(() => {
          cy.intercept('GET', '**/information/1', {
            fixture: 'single_information.json',
          })
          cy.intercept('PUT', '**/information/1', {
            message: 'The information has been successfully updated.',
          })
          cy.get('[data-cy=edit-button]').first().click()
        })

        it('is expected to be able to update the information header, description and link', () => {
          cy.get('[data-cy=info-container]').within(() => {
            cy.get('[data-cy=info-header]')
              .find('input')
              .clear()
              .type('This is the new Header for this information')
          })
          cy.get('[data-cy=info-description]')
            .clear()
            .type(
              'This is the new text for this information, which might be this long but max length is 300 characters'
            )
          cy.get('[data-cy=info-description]').clear().type('www.klockren.se')
          cy.get('[data-cy=submit-button]').click()
          cy.get('[data-cy=success-message]').should(
            'contain',
            'The information has been successfully updated.'
          )
        })
      })

      context('unsuccessfully', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/information/**', {
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
