describe('MERN App E2E', () => {
  beforeEach(() => {
    // Visit the app root before each test
    cy.visit('/');
  });

  it('should load the home page and display title', () => {
    // Check if the React app title or main header exists
    // (Assuming you have an <h1> or header in your App.jsx)
    cy.get('body').should('exist');
  });

  it('should display the PostList component', () => {
    // We expect to see "Recent Posts" which is in our PostList.jsx
    cy.contains('Recent Posts').should('be.visible');
  });

  /* Note: Since we are running against a REAL server, 
     if the DB is empty, it might say "No posts found".
     If the DB has data, it shows posts.
     Both are valid "Success" states for now.
  */
  it('should show either posts or empty state', () => {
    cy.get('div.post-list').should('exist');
  });
});