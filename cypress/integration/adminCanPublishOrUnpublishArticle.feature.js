import sizes from '../support/index'

sizes.forEach((size) => {
describe('admin can publish or unpublish article', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/articles', {
      fixture: 'all_articles.json',
    })
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
    switch (size) {
      case 'macbook-15':
        cy.get('[data-cy=articles-dashboard]').click()
        break

      default:
        cy.get('[data-cy=hamburger-menu]').click()
        cy.get('[data-cy=articles-dashboard]').click()
        break
    }
  })

    context(`${size}`, () => {
      beforeEach(() => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
      })
      context('successfully, by clicking `publish` switch', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/api/articles/**', {
            statusCode: 200,
            body: {
              message: 'Article has been unpublished',
            },
          })
        })

        it('is expected to show success message', () => {
          cy.get('[data-cy=publish-1]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain',
            'Article has been unpublished'
          )
        })
      })

      context('unsuccessfully, by clicking `publish` switch', () => {
        beforeEach(() => {
          cy.intercept('POST', '**/api/articles/**', {
            statusCode: 400,
            body: {
              error_message: 'An error occurred',
            },
          })
        })
        it('is expected to show error message', () => {
          cy.get('[data-cy=publish-1]').click()
          cy.get('[data-cy=snack-content]').should(
            'contain',
            'An error occurred'
          )
        })
      })
    })
  })
})
