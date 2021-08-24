const TestHelpers = {
  sizeCase(size, selection) {
    switch (size) {
      case 'macbook-16':
        cy.get(`[data-cy=${selection}]`).click()
        break

      default:
        cy.get('[data-cy=hamburger-menu]').click()
        cy.get(`[data-cy=${selection}]`).click()
        break
    }
  },

  authenticate() {
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
  },

  sizeParameters(size) {
    if (Cypress._.isArray(size)) {
      cy.viewport(size[0], size[1])
    } else {
      cy.viewport(size)
    }
  },
}

export default TestHelpers
