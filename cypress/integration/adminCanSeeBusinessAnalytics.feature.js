/* eslint-disable no-undef */
describe('Broker can see business analytics', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
  })

  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        '**/api/analytics',
        {
          body: {},
        }
      )
      cy.get('[data-cy=menu-analytics]').click()
    })
    it('is expected to take broker to analytics page', () => {
      cy.url().should('contain', '/analytics')
    })

   
  })

  describe('When no data is present', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        '**/api/analytics',
        {
          statusCode: 500,
        }
      )
      cy.get('[data-cy=menu-analytics]').click()
    })

    it('is expected to show a message for no analytics', () => {
      cy.get('[data-cy=analytics-error-message]').should('contain', 'There were no analytics to be found. Let\'s hope we can dig them up later!')
    })
  })
})
