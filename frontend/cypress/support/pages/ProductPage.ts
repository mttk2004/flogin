export class ProductPage {

  // Navigation
  visit() {
    cy.visit('/products');
  }

  visitCreatePage() {
    cy.visit('/products/create');
  }

  visitEditPage(productId: number) {
    cy.visit(`/products/edit/${productId}`);
  }

  // Form Elements
  getNameInput() {
    return cy.get('#name');
  }

  getPriceInput() {
    return cy.get('#price');
  }

  getQuantityInput() {
    return cy.get('#quantity');
  }

  getCategoryInput() {
    return cy.get('#category');
  }

  getDescriptionInput() {
    return cy.get('#description');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  getAddProductButton() {
    return cy.get('.add-product-btn');
  }

  // List Elements
  getProductTable() {
    return cy.get('.product-list table');
  }

  getProductRows() {
    return cy.get('.product-list tbody tr');
  }

  getDeleteButton(productName: string) {
    return cy.contains('tr', productName).find('button:contains("Xóa")');
  }

  getEditButton(productName: string) {
    return cy.contains('tr', productName).find('button:contains("Sửa")');
  }

  // Search/Filter Elements
  getSearchInput() {
    return cy.get('input[placeholder*="Tìm kiếm"]');
  }

  getCategoryFilter() {
    return cy.get('select[name="category"]');
  }

  // Messages
  getErrorMessage() {
    return cy.get('[role="alert"]');
  }

  getSuccessMessage() {
    return cy.get('.success-message');
  }

  // Actions
  fillProductForm(product: {
    name: string;
    price: number;
    quantity: number;
    category: string;
    description?: string;
  }) {
    this.getNameInput().clear().type(product.name);
    this.getPriceInput().clear().type(product.price.toString());
    this.getQuantityInput().clear().type(product.quantity.toString());
    this.getCategoryInput().clear().type(product.category);
    if (product.description) {
      this.getDescriptionInput().clear().type(product.description);
    }
  }

  submitForm() {
    this.getSubmitButton().click();
  }

  createProduct(product: {
    name: string;
    price: number;
    quantity: number;
    category: string;
    description?: string;
  }) {
    this.fillProductForm(product);
    this.submitForm();
  }

  deleteProduct(productName: string) {
    this.getDeleteButton(productName).click();
  }

  searchProduct(searchTerm: string) {
    this.getSearchInput().clear().type(searchTerm);
  }

  filterByCategory(category: string) {
    this.getCategoryFilter().select(category);
  }

  // Assertions
  assertProductInList(productName: string) {
    this.getProductTable().should('contain', productName);
  }

  assertProductNotInList(productName: string) {
    this.getProductTable().should('not.contain', productName);
  }

  assertFormHasError() {
    this.getErrorMessage().should('be.visible');
  }
}
