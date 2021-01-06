describe('Blog App', function() {
    beforeEach(function() {
      
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Tahsin',
        username: 'tahsin',
        password: '12345'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')

      it('Login form is shown', function() {
        cy.contains('login').click()
        cy.get('#username')
        cy.get('#password')
      })

    })
    
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
          cy.contains('login').click()
          cy.get('#username').type('tahsin')
          cy.get('#password').type('12345')
          cy.get('#login-button').click()
      
          cy.contains('Successfully logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('wrongTestUser')
        cy.get('#password').type('123456')
        cy.get('#login-button').click()
    
        cy.contains('Wrong username or password')
      })
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('tahsin')
        cy.get('#password').type('12345')
        cy.get('#login-button').click()
        cy.contains('Successfully logged in')

        cy.contains('Add blog').click()
        cy.get('#title').type('New Test Blog')
        cy.get('#author').type('tahsin')
        cy.get('#url').type('www.testblog.com')
        cy.get('#createBlogButton').click()

      })
  
      it('A blog can be created', function() {
        cy.contains('New Test Blog tahsin')
      })

      it('Check user can like blog', function() {
        cy.contains('view').first().click()
        cy.contains('likes').first().click()
      })

      it('Check user who added blog can delete it', function() {
        cy.contains('view').first().click()
        cy.contains('delete').first().click()
        cy.contains('Blog New Test Blog by tahsin has been deleted') 
      })

      it('Check blogs are sorted by number of likes', function() {
        cy.wait(5000)
        cy.contains('Add blog').click() 
        cy.get('#title').type('Second Test Blog')
        cy.get('#author').type('tahsin')
        cy.get('#url').type('www.blog.com')
        cy.get('#createBlogButton').click()

        cy.contains('view').first().click()
        cy.contains('Second Test Blog tahsin').contains('view').click()
        cy.get('.hiddenInfo').contains('Second Test Blog tahsin').contains('like').click()
        
        cy.wait(3000)
        cy.get('.hiddenInfo').first().should("contain.text", 'Second Test Blog tahsin');
      })
    })
    
})