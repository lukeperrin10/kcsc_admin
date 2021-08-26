/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use Articles Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to articles dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/info/information', {
          fixture: 'information_items.json',
        })
        cy.visit('/')
        TestHelpers.sizeParameters(size)
        TestHelpers.authenticate()
        cy.visit('/information')
      })
      it('is expected to show a table with list of all information snippets', () => {
        cy.get('[data-cy=information-table]').within(() => {
          cy.get('[data-cy=information]')
            .should('have.length', 10)
            .first()
            .within(() => {
              cy.get('[data-cy=status]').should('be.visible')
              cy.get('[data-cy=header]').should('contain.text', 'item-0')
              cy.get('[data-cy=description]').should(
                'contain.text',
                'Often just simple changes'
              )
              cy.get('[data-cy=link]').should(
                'contain.text',
                'https://www.netdoctor.co.uk/health-services/'
              )
            })
        })
      })
    })
  })
})
