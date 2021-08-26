/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use Sections Dashboard', () => {
  sizes.forEach((size) => {
    describe('admin can navigate to sections dashboard', () => {
      const selection = 'sections'
      beforeEach(() => {
        cy.intercept('GET', '**/api/app_data', {
          fixture: 'app_data.json',
        })
        cy.intercept('GET', '**/api/sections?view=services', {
          fixture: 'services_view_sections.json',
        })
        cy.intercept('GET', '**/api/sections?view=about_us', {
          fixture: 'about_us_view_sections.json',
        })
        cy.intercept('GET', '**/api/sections?view=about_self_care', {
          fixture: 'about_self_care_view_sections.json',
        })
        cy.intercept('GET', '**/api/sections?view=information', {
          fixture: 'information_view_sections.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.sizeCase(size, selection)
        TestHelpers.authenticate()
      })

      it('is expected to show view structure', () => {
        cy.get('[data-cy=dashboard-header]').should(
          'contain.text',
          'Edit Sections Information'
        )
        cy.get('[data-cy=navigation-tab]').should('have.length', 4)
        cy.get('[data-cy=navigation-tab]')
          .first()
          .should('contain.text', 'Services')
        cy.get('[data-cy=section-edit-form]').should('have.length', 5)
        cy.get('[data-cy=navigation-tab]').eq(1).click()
        cy.get('[data-cy=section-edit-form]').should('have.length', 5)
        cy.get('[data-cy=navigation-tab]').eq(2).click()
        cy.get('[data-cy=section-edit-form]').should('have.length', 4)
        cy.get('[data-cy=navigation-tab]').eq(3).click()
        cy.get('[data-cy=section-edit-form]').should('have.length', 1)
      })
    })
  })
})
