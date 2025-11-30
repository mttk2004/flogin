import { ProductPage } from '../support/pages/ProductPage';

describe('Product E2E Automation Testing', () => {
  const productPage = new ProductPage();
  
  const mockProducts = [
    { id: 1, name: 'Initial Product 1', price: 100, quantity: 10, category: 'Electronics' },
    { id: 2, name: 'Initial Product 2', price: 200, quantity: 20, category: 'Books' },
    { id: 3, name: 'Search Me', price: 300, quantity: 30, category: 'Toys' },
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

  // 5.2.2.b Test Read/List products
  it('should display the initial list of products', () => {
    productPage.getProductRows().should('have.length', mockProducts.length);
    productPage.assertProductInList('Initial Product 1');
    productPage.assertProductInList('Initial Product 2');
  });

  // 5.2.2.a Test Create product flow
  it('should allow a user to create a new product', () => {
    const newProduct = {
      name: 'New Awesome Laptop',
      price: 2500,
      quantity: 5,
      category: 'Electronics',
      description: 'A brand new laptop for testing'
    };

    // Intercept the POST request for creating a product
    cy.intercept('POST', '/api/products', {
      statusCode: 201,
      body: {
        success: true,
        message: 'Tạo sản phẩm thành công',
        data: { id: 4, ...newProduct }
      }
    }).as('createProduct');
    
    // After creating, the list will be refetched. We need to intercept that too.
    cy.intercept('GET', '/api/products*', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [...mockProducts, { id: 4, ...newProduct }],
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
        price: newProduct.price.toString(),
        quantity: newProduct.quantity.toString()
    });

    // Check for success message
    productPage.getSuccessMessage().should('be.visible').and('contain.text', 'Lưu sản phẩm thành công!');
    
    // Verify the new product appears in the list
    cy.wait('@getProductsAfterCreate');
    productPage.assertProductInList(newProduct.name);
  });

  // 5.2.2.c Test Update product
  it('should allow a user to update a product', () => {
    const updatedName = 'Updated Product 1';
    const updatedPrice = 150;

    // Intercept the PUT request
    cy.intercept('PUT', '/api/products/1', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Cập nhật thành công',
        data: { id: 1, name: updatedName, price: updatedPrice, quantity: 10, category: 'Electronics' }
      }
    }).as('updateProduct');

    // Intercept list refresh
    cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [
                { id: 1, name: updatedName, price: updatedPrice, quantity: 10, category: 'Electronics' },
                mockProducts[1],
                mockProducts[2]
            ],
            totalItems: mockProducts.length,
            totalPages: 1,
            currentPage: 0
          }
        }
    }).as('getProductsAfterUpdate');

    // Click Edit button for first product
    productPage.getEditButton('Initial Product 1').click();

    // Update fields
    productPage.getNameInput().clear().type(updatedName);
    productPage.getPriceInput().clear().type(updatedPrice.toString());
    productPage.submitForm();

    // Verify API call
    cy.wait('@updateProduct');
    
    // Verify list update
    cy.wait('@getProductsAfterUpdate');
    productPage.assertProductInList(updatedName);
  });

  // 5.2.2.d Test Delete product
  it('should allow a user to delete a product', () => {
    const productToDelete = 'Initial Product 2';

    // Intercept DELETE request
    cy.intercept('DELETE', '/api/products/2', {
      statusCode: 200,
      body: { success: true, message: 'Xóa thành công' }
    }).as('deleteProduct');

    // Intercept list refresh
    cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [mockProducts[0], mockProducts[2]],
            totalItems: mockProducts.length - 1,
            totalPages: 1,
            currentPage: 0
          }
        }
    }).as('getProductsAfterDelete');

    // Mock window.confirm to return true
    cy.on('window:confirm', () => true);

    // Click Delete button
    productPage.deleteProduct(productToDelete);

    // Verify API call
    cy.wait('@deleteProduct');

    // Verify list update
    cy.wait('@getProductsAfterDelete');
    productPage.assertProductNotInList(productToDelete);
  });

  // 5.2.2.e Test Search/Filter functionality
  it('should allow a user to search for products', () => {
    const searchTerm = 'Search Me';

    // Intercept search request
    cy.intercept('GET', `/api/products*search=${encodeURIComponent(searchTerm)}*`, {
      statusCode: 200,
      body: {
        success: true,
        data: {
          products: [mockProducts[2]], // Only "Search Me" product
          totalItems: 1,
          totalPages: 1,
          currentPage: 0
        }
      }
    }).as('searchProducts');

    // Type in search box
    productPage.searchProduct(searchTerm);

    // Verify results
    cy.wait('@searchProducts');
    productPage.getProductRows().should('have.length', 1);
    productPage.assertProductInList(searchTerm);
    productPage.assertProductNotInList('Initial Product 1');
  });

  it('should allow a user to filter products by category', () => {
    const category = 'Books';

    // Intercept filter request
    cy.intercept('GET', `/api/products*category=${category}*`, {
      statusCode: 200,
      body: {
        success: true,
        data: {
          products: [mockProducts[1]], // Only Books product
          totalItems: 1,
          totalPages: 1,
          currentPage: 0
        }
      }
    }).as('filterProducts');

    // Select category
    productPage.filterByCategory(category);

    // Verify results
    cy.wait('@filterProducts');
    productPage.getProductRows().should('have.length', 1);
    productPage.assertProductInList('Initial Product 2');
    productPage.assertProductNotInList('Initial Product 1');
  });
});
