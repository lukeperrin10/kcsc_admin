/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use General Dashboard', () => {
  sizes.forEach((size) => {
    describe('admin can navigate to articles dashboard', () => {
      beforeEach(() => {
        TestHelpers.sizeParameters(size)
        cy.intercept('GET', '**/api/app_data', {
          fixture: 'app_data.json',
        })
        cy.intercept('PUT', '**/api/app_data**', {
          statusCode: 200,
          body: {
            message: 'Info has been updated',
          },
        })

        cy.visit('/')
        TestHelpers.authenticate()
      })

      it('is expected to show dashboard header', () => {
        cy.get('[data-cy=dashboard-header]').should(
          'contain.text',
          'Edit General App Info'
        )
      })

      describe('and edit Footer info', () => {
        it('is expected to show footer accordion with pre-filled form in details', () => {
          cy.get('[data-cy=footer-form]').within(() => {
            cy.get('[data-cy=about-field]')
              .find('textarea')
              .should(
                'contain.text',
                'Community Health West London is a Community Interest Company'
              )

            cy.get('[data-cy=copyright-field]')
              .find('input')
              .should(
                'have.value',
                '2021 All Rights Reserved by Community Health West London.'
              )

            cy.get('[data-cy=accessability-field]')
              .find('input')
              .should(
                'have.value',
                'This site is built according to Web Content Accessibility Guidelines'
              )
          })
        })

        context('successfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/api/app_data**', {
              statusCode: 200,
              body: {
                message: 'Info has been updated',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=footer-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain.text',
              'Info has been updated'
            )
          })
        })

        context('unsuccessfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/api/app_data**', {
              statusCode: 400,
              body: {
                error_message: 'Something went wrong, try again later',
              },
            })
          })
          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=footer-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain.text',
              'Something went wrong, try again later'
            )
          })
        })
      })

      describe('and edit Navigation info', () => {
        it('is expected to show navigation accordion with pre-filled form in details', () => {
          cy.get('[data-cy=navigation-form]').within(() => {
            cy.get('[data-cy=tab-input]')
              .first()
              .find('input')
              .should('have.value', 'home')
            cy.get('[data-cy=tab-switch]').should('have.length', 14)
          })
        })

        context('successfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/api/app_data**', {
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
            cy.intercept('PUT', '**/api/app_data**', {
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

      describe.only('and edit Testimonials info', () => {
        it('is expected to show testimonial accordion with pre-filled form in details', () => {
          cy.get('[data-cy=testimonial-form]').should('have.length', 2)
          cy.get('[data-cy=testimonial-form]')
            .first()
            .within(() => {
              cy.get('[data-cy=testimonial-name]')
                .find('input')
                .should('have.value', 'Maggie Black')
                cy.get('[data-cy=testimonial-text]')
                .find('textarea')
                .should('contain.text', '"In my personal life, I am a daughter, a mother, ')
                cy.get('[data-cy=testimonial-alt]')
                .find('input')
                .should('have.value', 'Maggie Black smiling to the camera')
            })
        })

        context('successfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/api/app_data**', {
              statusCode: 200,
              body: {
                message: 'Info has been updated',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=testimonial-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain.text',
              'Info has been updated'
            )
          })
        })

        context('unsuccessfully', () => {
          beforeEach(() => {
            cy.intercept('PUT', '**/api/app_data**', {
              statusCode: 400,
              body: {
                error_message: 'Something went wrong, try again later',
              },
            })
          })

          it('is expected to show success message on submit', () => {
            cy.get('[data-cy=testimonial-submit-button]').click()
            cy.get('[data-cy=snack-content]').should(
              'contain.text',
              'Something went wrong, try again later'
            )
          })
        })
      })
    })
  })
})
