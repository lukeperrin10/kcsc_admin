const sizes = ['iphone-x'[('iphone-x', 'landscape')], 'ipad-2', 'macbook-16']

describe('admin can navigate to articles dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/app_data', {
      fixture: 'app_data.json',
    })
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
    cy.visit('/app_data')
  })

  it('is expected to show dashboard header', () => {
    cy.get('[data-cy=dashboard-header]').should(
      'contain.text',
      'Edit General App Info'
    )
  })

  describe('and edit Footer info', () => {
    sizes.forEach((size) => {
      context(`viewport = ${size}`, () => {
        beforeEach(() => {
          if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1])
          } else {
            cy.viewport(size)
          }
        })

        it('is expected to show footer accordion with pre-filled form in details', () => {
          cy.get('[data-cy=footer-form]').within(() => {
            cy.get('[data-cy=about-field]').should(
              'contain.text',
              'Community Health West London is a Community Interest Company'
            )

            cy.get('[data-cy=copyright-field]').should(
              'contain.text',
              '2021 All Rights Reserved by Community Health West London.'
            )

            cy.get('[data-cy=accessability-field]').should(
              'contain.text',
              'This site is built according to Web Content Accessibility Guidelines'
            )
          })
        })

        context('successfully', () => {
          beforeEach(() => {
            cy.intercept('POST', '**/api/app_data/**', {
              statusCode: 200,
              body: {
                message: 'Info has been updated',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=footer-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain',
              'Info has been updated'
            )
          })
        })

        context('unsuccessfully', () => {
          beforeEach(() => {
            cy.intercept('POST', '**/api/app_data/**', {
              statusCode: 400,
              body: {
                message: 'Something went wrong, try again later',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=footer-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain',
              'Something went wrong, try again later'
            )
          })
        })
      })
    })
  })
})
