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
        cy.intercept('PUT', '**/api/sections/**', {
          statusCode: 200,
          body: {
            message: 'Info has been updated',
          },
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

      it('is expected to be able to edit section no image', () => {
        cy.get('[data-cy=navigation-tab]').eq(1).click()
        cy.get('[data-cy=section-edit-form]')
          .eq(1)
          .within(() => {
            cy.get('[data-cy=header-input]')
              .find('input')
              .should('have.value', 'Plans')
            cy.get('[data-cy=description-input]')
              .find('textarea')
              .should(
                'contain.text',
                'This section tells vistor Community Health West London plans to improve lives of people'
              )
            cy.get('[data-cy=section-submit-button]').click()
          })
        cy.get('[data-cy=snack-content]').should(
          'contain.text',
          'Info has been updated'
        )
      })

      it.only('is expected to edit section regular', () => {
        cy.get('[data-cy=navigation-tab]').eq(1).click()
        cy.get('[data-cy=section-edit-form]')
          .eq(4)
          .within(() => {
            cy.get('[data-cy=header-input]')
              .find('input')
              .should('have.value', 'VCS info')
            cy.get('[data-cy=description-input]')
              .find('textarea')
              .should('contain.text', 'This section tells vistor about VCS')
            cy.get('[data-cy=alt-input]')
              .find('textarea')
              .should('have.text', 'Picture of happy woman')
            cy.get('[data-cy=image-upload-button]').should('be.visible')
            cy.get('[data-cy=image-preview]').should('be.visible')
            cy.get('[data-cy=buttons-grid]').within(() => {
              cy.get('[data-cy=button-form]').should('have.length', 2)
              cy.get('[data-cy=button-form]')
                .first()
                .within(() => {
                  cy.get('[data-cy=text-input]')
                    .find('input')
                    .should('have.value', 'KCSC Contact')
                  cy.get('[data-cy=link-input]')
                    .find('input')
                    .should('have.value', 'https://www.kcsc.org.uk/contact-us')
                })
            })
            cy.get('[data-cy=section-submit-button]').click()
          })
        cy.get('[data-cy=snack-content]').should(
          'contain.text',
          'Info has been updated'
        )
      })
    })
  })
})
