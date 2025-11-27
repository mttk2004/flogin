import { ProductPage } from '../support/pages/ProductPage';

describe('Product E2E Automation Testing', () => {
  const productPage = new ProductPage();
  
  const mockProducts = [
    { id: 1, name: 'Initial Product 1', price: 100, quantity: 10, category: 'Electronics' },
    { id: 2, name: 'Initial Product 2', price: 200, quantity: 20, category: 'Books' },
  ];

  beforeEach(() => {
    // Intercept the initial GET request for the product list
    cy.intercept('GET', '/api/products*', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          products: mockProducts,
          totalItems: mockProducts.length,
          totalPages: 1,
          currentPage: 0
        }
      }
    }).as('getProducts');

    // Visit the product page
    productPage.visit();
    cy.wait('@getProducts'); // Wait for initial data to load
  });

  // Test case for reading/listing products
  it('should display the initial list of products', () => {
    productPage.getProductRows().should('have.length', mockProducts.length);
    productPage.assertProductInList('Initial Product 1');
    productPage.assertProductInList('Initial Product 2');
  });

  // Test case for creating a new product
  it('should allow a user to create a new product', () => {
    const newProduct = {
      name: 'New Awesome Laptop',
      price: 2500,
      quantity: 5,
      category: 'Electronics',
      description: 'A brand new laptop for testing'
    };

    // Intercept the POST request for creating a product
    cy.intercept('POST', 'http://localhost:8080/api/products', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Tạo sản phẩm thành công',
        data: { id: 3, ...newProduct }
      }
    }).as('createProduct');
    
    // After creating, the list will be refetched. We need to intercept that too.
    cy.intercept('GET', 'http://localhost:8080/api/products*', (req) => {
      // Now, return the updated list
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [...mockProducts, { id: 3, ...newProduct }],
            totalItems: mockProducts.length + 1,
            totalPages: 1,
            currentPage: 0
          }
        }
      });
    }).as('getProductsAfterCreate');

    // Click the "Add Product" button to show the form
    productPage.getAddProductButton().click();

    // Fill and submit the form
    productPage.createProduct(newProduct);

    // Wait for the API call and assert
    cy.wait('@createProduct').its('request.body').should('deep.include', {
        name: newProduct.name,
        price: newProduct.price, // Assert as number
        quantity: newProduct.quantity // Assert as number
    });

    // Check for success message
    productPage.getSuccessMessage().should('be.visible').and('contain.text', 'Lưu sản phẩm thành công!');
    
    // Verify the new product appears in the list
    cy.wait('@getProductsAfterCreate');
    productPage.assertProductInList(newProduct.name);
  });
});