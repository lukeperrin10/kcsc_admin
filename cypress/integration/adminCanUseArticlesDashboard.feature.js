/* eslint-disable no-undef */
const sizes = [
  'iphone-x',
  ['ipad-2', 'landscape'],
  [1024, 768],
  [1920, 1080],
  [2560, 1440],
]

describe('admin can navigate to articles dashboard on ', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/articles', {
      fixture: 'all_articles.json',
    })
    cy.visit('/')
    cy.window().its('store').invoke('dispatch', {
      type: 'AUTHENTICATE',
      payload: 'Johhny Cage',
    })
    cy.visit('/articles')
  })

  sizes.forEach((size) => {
    context(`viewport = ${size}`, () => {
      beforeEach(() => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
      })

      it('is expected to show a table with the list of all articles', () => {
        cy.get('[data-cy=articles-table]').within(() => {
          cy.get('[data-cy=article]')
            .should('have.length', 6)
            .first()
            .within(() => {
              cy.get('[data-cy=status]').should('be.visible')
              cy.get('[data-cy=title]').should(
                'contain.text',
                'Most recent article'
              )
              cy.get('[data-cy=author]').should('contain.text', 'Liu Kang')
              cy.get('[data-cy=date]').should('contain.text', '2021-05-12')
              cy.get('[data-cy=action]').scrollIntoView().should('be.visible')
            })
        })
      })

      it('can create a new article', () => {
        cy.get('[data-cy=new-article-btn').click()
        cy.get('[data-cy=new-article-modal]').within(() => {
          cy.get('[data-cy=title-input]').type('Free burgers')
          cy.get('[data-cy=teaser-input]').type('wow burgers')
          cy.get('[data-cy=body-input]').type('Burgers everywhere UwU')
          cy.get('[data-cy=author-input]').type('Squidward')
          cy.get('[data-cy=image-input]')
            .attachFile('imageFixture.jpg', { subjectType: 'drag-n-drop' })
            .trigger('change')
          cy.get('[data-cy=cancel-btn]').click()
          cy.get('[data-cy=submit-btn]').click()
        })
        cy.get('[data-cy=submit-message]').should(
          'contain',
          'Article has been created'
        )
      })
    })
  })
})
