export class LoginPage {

  visit() {
    cy.visit('/'); // Assuming base URL is configured or root is login
  }

  // Elements
  getUsernameInput() {
    return cy.get('#username');
  }

  getPasswordInput() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  getErrorMessage() {
    return cy.get('[role="alert"][style*="color: red"]');
  }

  getSuccessMessage() {
    return cy.get('[role="alert"][style*="color: green"]');
  }

  // Actions
  fillUsername(username: string) {
    this.getUsernameInput().clear().type(username);
  }

  fillPassword(password: string) {
    this.getPasswordInput().clear().type(password);
  }

  submit() {
    this.getLoginButton().click();
  }

  login(username: string, password: string) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }
}
