describe('Homepage', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9', {
            ok: true,
            statusCode: 200,
            fixture: 'sampleImages'
        }).as('getImages')
        .visit('http://localhost:3000/')
    })

    it('Should show a loading icon while waiting for images to load', () => {
        cy
            .get('.loading-message')
            .should('be.visible')
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

    it('Should be able to like an image, see a success message, and see the like button change to an unlike button', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .contains('Like')
            .get(':nth-child(1) > .like-button')
            .click()
            .get('.like-message')
            .contains('Liked')
            .get(':nth-child(1) > .like-button')
            .contains('Unlike')
    })

    it('Should be able to like multiple images and see buttons change to unlike buttons', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(2) > .like-button')
            .contains('Like')
            .get(':nth-child(2) > .like-button')
            .click()
            .get('.like-message')
            .contains('Liked')
            .get(':nth-child(2) > .like-button')
            .contains('Unlike')
            .get(':nth-child(3) > .like-button')
            .contains('Like')
            .get(':nth-child(3) > .like-button')
            .click()
            .get('.like-message')
            .contains('Liked')
            .get(':nth-child(3) > .like-button')
            .contains('Unlike')
            .get(':nth-child(4) > .like-button')
            .contains('Like')
            .get(':nth-child(4) > .like-button')
            .click()
            .get('.like-message')
            .contains('Liked')
            .get(':nth-child(4) > .like-button')
            .contains('Unlike')
    })
    
    it('Should be able to Unlike an image, see a success message, and see a like button instead of an unlike button', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .click()
            .get(':nth-child(1) > .like-button')
            .click()
            .get('.like-message')
            .contains('Unliked')
            .get(':nth-child(1) > .like-button')
            .contains('Like')

    })

    it('Should be able to view all liked images in a separate page', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .click()
            .get(':nth-child(2) > .like-button')
            .click()
            .get(':nth-child(3) > .like-button')
            .click()
            .get(':nth-child(4) > .like-button')
            .click()
            .get('.liked-images-nav')
            .click()
            .get('.images')
            .children()
            .should('have.length', 4)
            .get('.like-button')
            .contains('Unlike')
    })

    it('Should be able to unlike images from the liked images page', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .click()
            .get(':nth-child(2) > .like-button')
            .click()
            .get(':nth-child(3) > .like-button')
            .click()
            .get(':nth-child(4) > .like-button')
            .click()
            .get('.liked-images-nav')
            .click()
            .get(':nth-child(1) > .like-button')
            .click()
            .get('.images')
            .children()
            .should('have.length', 3)
    })

    it('Should be able to go back from the liked images page and identify which images are still liked', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .click()
            .get(':nth-child(2) > .like-button')
            .click()
            .get(':nth-child(3) > .like-button')
            .click()
            .get(':nth-child(4) > .like-button')
            .click()
            .get('.liked-images-nav')
            .click()
            .get(':nth-child(1) > .like-button')
            .click()
            .get('.back-button')
            .click()
            .get(':nth-child(1)')
            .contains('Unlike')
            .get(':nth-child(2)')
            .contains('Unlike')
            .get(':nth-child(3)')
            .contains('Unlike')
    })

    it('Should show a message if there are no liked images', () => {
        cy
            .wait('@getImages')
            .get('.liked-images-nav')
            .click()
            .get('.error-message')
            .contains('No Saved Images. Go back and add some!')
    })

    it('Should show liked images even after page refreshes', () => {
        cy
            .wait('@getImages')
            .get(':nth-child(1) > .like-button')
            .click()
            .get('.liked-images-nav')
            .click()
            .reload()
            .get('.images > :nth-child(1)')
            .contains('The Climber and the Eclipse')
    })

    it('Should redirect to a 404 page if a bad URL is entered', () => {
        cy
            .wait('@getImages')
            .visit('http://localhost:3000/banana')
            .get('.error-message')
            .contains('404 page not found. Click title above.')
    })

    it('Should be able to click on the title from a 404 page to get back to the homepage', () => {
        cy
            .wait('@getImages')
            .visit('http://localhost:3000/banana')
            .get('.error-message')
            .contains('404 page not found. Click title above.')
            .get('.error-title')
            .click()
            .get('.images')
            .children()
            .should('have.length', 9)
    })
})

describe('Homepage sad paths', () => {
    it('Should display an error if the initial fetch fails', () => {
        cy
            .intercept('GET', 'https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9', {
                ok: false,
                statusCode: 403
            })
            .visit('http://localhost:3000/')
            .get('.error-message')
            .contains('Error: Hmm looks like those images are lost in space...try refreshing the page!')
    })

    it('Should filter out videos from the fetch', () => {
        cy
            .intercept('GET', 'https://api.nasa.gov/planetary/apod?api_key=iFKelpSH9TLhm1UyPVmKoRwpzbZm9mZWe9WeDBRy&count=9', {
                ok: true,
                statusCode: 200,
                fixture: 'sampleImagesWithVideo'
            }).as('getImagesWithVideos')
            .visit('http://localhost:3000/')
            .wait('@getImagesWithVideos')
            .get('.images')
            .children()
            .should('have.length', 7)
    })
})