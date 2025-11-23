import { LoginPage } from '../support/pages/LoginPage';

describe('Login E2E Automation Testing', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  // 2.d) Test UI elements interactions
  it('should display all login UI elements correctly', () => {
    loginPage.getUsernameInput().should('be.visible');
    loginPage.getPasswordInput().should('be.visible');
    loginPage.getLoginButton().should('be.visible').and('contain.text', 'Đăng nhập');
  });

  // 2.b) Test validation messages
  it('should show validation errors for empty fields', () => {
    loginPage.submit();
    // As per component implementation, browser validation might trigger "required"
    // Or if we implemented custom validation, error message appears.
    // Since we rely on backend validation in current App implementation or basic form validation:
    // Let's assume our component handles basic validation or backend returns it.
    // If it relies on HTML5 required attribute:
    loginPage.getUsernameInput().should('have.attr', 'required');
    loginPage.getPasswordInput().should('have.attr', 'required');
  });

  // 2.c) Test error flows (Wrong credentials)
  it('should show error message for invalid credentials', () => {
    // We need the backend running for this, or intercept the request
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        success: false,
        message: 'Username hoặc password không đúng'
      }
    }).as('loginRequest');

    loginPage.login('wronguser', 'wrongpass');

    cy.wait('@loginRequest');
    loginPage.getErrorMessage().should('be.visible').and('contain.text', 'Username hoặc password không đúng');
  });

  // 2.a) & 2.c) Test complete login flow (Success)
  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Đăng nhập thành công',
        token: 'fake-jwt-token'
      }
    }).as('loginRequest');

    loginPage.login('testuser', 'password123');

    cy.wait('@loginRequest');
    loginPage.getSuccessMessage().should('be.visible').and('contain.text', 'Đăng nhập thành công');
  });
});
