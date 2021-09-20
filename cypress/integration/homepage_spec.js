describe('Homepage', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9', {
            ok: true,
            statusCode: 200,
            fixture: 'sampleImages'
        }).as('getImages')
        .visit('http://localhost:3000/')
    })

    it('Should be able to visit the homepage and see a url, title images, and buttons', () => {
        cy
            .url().should('include', 'http://localhost:3000/')
            .wait('@getImages')
            .get('h1')
            .contains('My Space Book')
            .get('.get-images')
            .contains('Get New Images')
            .get('.liked-images-nav')
            .contains('My Liked Images')
            .get('.images')
            .children()
            .should('have.length', 9)
            .get('.images > :nth-child(1)')
            .contains('The Climber and the Eclipse')
            .get('.images > :nth-child(1)')
            .contains('9/5/2017')
            .get('.images > :nth-child(1)')
            .contains('Like')
            .get('.images > :nth-child(1) > img')
            .should('be.visible')
    })

    it('Should be able to click the get new images button and see a new list of images', () => {
        cy
            .wait('@getImages')
            .intercept('GET', 'https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9', {
                ok: true,
                stausCode: 200,
                fixture: 'sampleImages2'
            }).as('getImages2')
            .get('.get-images')
            .click()
            .wait('@getImages2')
            .get('.images')
            .children()
            .should('have.length', 9)
            .get('.images > :nth-child(1)')
            .contains('Markarian\'s Chain of Galaxies')
            .get('.images > :nth-child(1)')
            .contains('3/30/2019')
            .get('.images > :nth-child(1)')
            .contains('Like')
            .get('.images > :nth-child(1) > img')
            .should('be.visible')
    })
})