import { ProductPage } from '../support/pages/ProductPage';

describe('Product E2E Automation Testing', () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    // Mock authentication if needed
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });
  });

  // 2.a) Test Create product flow (0.5 điểm)
  describe('Create Product', () => {
    beforeEach(() => {
      productPage.visitCreatePage();
    });

    it('should create a new product successfully', () => {
      const newProduct = {
        name: 'Test Product ' + Date.now(),
        price: 99.99,
        quantity: 50,
        category: 'Electronics',
        description: 'Test product description'
      };

      // Mock API response for create
      cy.intercept('POST', '/api/products', {
        statusCode: 201,
        body: {
          success: true,
          message: 'Tạo sản phẩm thành công',
          data: { id: 1, ...newProduct }
        }
      }).as('createProduct');

      productPage.createProduct(newProduct);

      cy.wait('@createProduct');
      // Should redirect to list or show success message
      cy.url().should('include', '/products');
    });

    it('should show validation errors for empty required fields', () => {
      productPage.submitForm();

      // Check required attributes
      productPage.getNameInput().should('have.attr', 'required');
      productPage.getPriceInput().should('have.attr', 'required');
      productPage.getQuantityInput().should('have.attr', 'required');
      productPage.getCategoryInput().should('have.attr', 'required');
    });

    it('should show error message when API fails', () => {
      cy.intercept('POST', '/api/products', {
        statusCode: 400,
        body: {
          success: false,
          message: 'Lỗi khi tạo sản phẩm'
        }
      }).as('createProductError');

      productPage.createProduct({
        name: 'Invalid Product',
        price: -10,
        quantity: 0,
        category: 'Test'
      });

      cy.wait('@createProductError');
      productPage.assertFormHasError();
    });
  });

  // 2.b) Test Read/List products (0.5 điểm)
  describe('Read/List Products', () => {
    it('should display product list correctly', () => {
      const mockProducts = {
        products: [
          { id: 1, name: 'Product 1', price: 100, quantity: 10, category: 'Electronics' },
          { id: 2, name: 'Product 2', price: 200, quantity: 20, category: 'Books' },
          { id: 3, name: 'Product 3', price: 300, quantity: 30, category: 'Clothing' }
        ],
        totalItems: 3,
        totalPages: 1,
        currentPage: 0
      };

      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: mockProducts
        }
      }).as('getProducts');

      productPage.visit();

      cy.wait('@getProducts');

      // Verify all products are displayed
      productPage.getProductRows().should('have.length', 3);
      productPage.assertProductInList('Product 1');
      productPage.assertProductInList('Product 2');
      productPage.assertProductInList('Product 3');
    });

    it('should show loading state while fetching products', () => {
      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: { products: [], totalItems: 0, totalPages: 0, currentPage: 0 }
        },
        delay: 1000
      }).as('getProductsSlow');

      productPage.visit();

      cy.contains('Đang tải').should('be.visible');
      cy.wait('@getProductsSlow');
    });

    it('should show error message when fetching fails', () => {
      cy.intercept('GET', '/api/products*', {
        statusCode: 500,
        body: {
          success: false,
          message: 'Lỗi khi tải danh sách sản phẩm'
        }
      }).as('getProductsError');

      productPage.visit();

      cy.wait('@getProductsError');
      cy.get('[role="alert"]').should('contain', 'Lỗi');
    });
  });

  // 2.c) Test Update product (0.5 điểm)
  describe('Update Product', () => {
    const existingProduct = {
      id: 1,
      name: 'Existing Product',
      price: 150,
      quantity: 25,
      category: 'Electronics',
      description: 'Original description'
    };

    beforeEach(() => {
      cy.intercept('GET', '/api/products/1', {
        statusCode: 200,
        body: {
          success: true,
          data: existingProduct
        }
      }).as('getProduct');

      productPage.visitEditPage(1);
      cy.wait('@getProduct');
    });

    it('should update product successfully', () => {
      const updatedData = {
        name: 'Updated Product Name',
        price: 199.99,
        quantity: 100,
        category: 'Electronics',
        description: 'Updated description'
      };

      cy.intercept('PUT', '/api/products/1', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Cập nhật sản phẩm thành công',
          data: { id: 1, ...updatedData }
        }
      }).as('updateProduct');

      productPage.fillProductForm(updatedData);
      productPage.submitForm();

      cy.wait('@updateProduct');
      cy.url().should('include', '/products');
    });

    it('should pre-fill form with existing product data', () => {
      productPage.getNameInput().should('have.value', existingProduct.name);
      productPage.getPriceInput().should('have.value', existingProduct.price.toString());
      productPage.getQuantityInput().should('have.value', existingProduct.quantity.toString());
      productPage.getCategoryInput().should('have.value', existingProduct.category);
    });

    it('should show error when update fails', () => {
      cy.intercept('PUT', '/api/products/1', {
        statusCode: 400,
        body: {
          success: false,
          message: 'Lỗi khi cập nhật sản phẩm'
        }
      }).as('updateProductError');

      productPage.fillProductForm({
        name: 'Invalid Update',
        price: -50,
        quantity: 0,
        category: 'Test'
      });
      productPage.submitForm();

      cy.wait('@updateProductError');
      productPage.assertFormHasError();
    });
  });

  // 2.d) Test Delete product (0.5 điểm)
  describe('Delete Product', () => {
    beforeEach(() => {
      const mockProducts = {
        products: [
          { id: 1, name: 'Product To Delete', price: 100, quantity: 10, category: 'Electronics' },
          { id: 2, name: 'Product To Keep', price: 200, quantity: 20, category: 'Books' }
        ],
        totalItems: 2,
        totalPages: 1,
        currentPage: 0
      };

      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: mockProducts
        }
      }).as('getProducts');

      productPage.visit();
      cy.wait('@getProducts');
    });

    it('should delete product successfully', () => {
      cy.intercept('DELETE', '/api/products/1', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Xóa sản phẩm thành công'
        }
      }).as('deleteProduct');

      // Mock the refreshed list after delete
      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [
              { id: 2, name: 'Product To Keep', price: 200, quantity: 20, category: 'Books' }
            ],
            totalItems: 1,
            totalPages: 1,
            currentPage: 0
          }
        }
      }).as('getProductsAfterDelete');

      // Stub window.confirm to return true
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
      });

      productPage.deleteProduct('Product To Delete');

      cy.wait('@deleteProduct');
      cy.wait('@getProductsAfterDelete');

      productPage.assertProductNotInList('Product To Delete');
      productPage.assertProductInList('Product To Keep');
    });

    it('should not delete when user cancels confirmation', () => {
      // Stub window.confirm to return false
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(false);
      });

      productPage.deleteProduct('Product To Delete');

      // Product should still be in the list
      productPage.assertProductInList('Product To Delete');
    });

    it('should show error message when delete fails', () => {
      cy.intercept('DELETE', '/api/products/1', {
        statusCode: 500,
        body: {
          success: false,
          message: 'Lỗi khi xóa sản phẩm'
        }
      }).as('deleteProductError');

      // Stub window.confirm and window.alert
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
        cy.stub(win, 'alert').as('alertStub');
      });

      productPage.deleteProduct('Product To Delete');

      cy.wait('@deleteProductError');
      cy.get('@alertStub').should('have.been.calledOnce');
    });
  });

  // 2.e) Test Search/Filter functionality (0.5 điểm)
  describe('Search/Filter Products', () => {
    const allProducts = {
      products: [
        { id: 1, name: 'Laptop HP', price: 1000, quantity: 10, category: 'Electronics' },
        { id: 2, name: 'Laptop Dell', price: 1200, quantity: 5, category: 'Electronics' },
        { id: 3, name: 'Book JavaScript', price: 50, quantity: 100, category: 'Books' },
        { id: 4, name: 'T-Shirt Nike', price: 30, quantity: 50, category: 'Clothing' }
      ],
      totalItems: 4,
      totalPages: 1,
      currentPage: 0
    };

    it('should filter products by search term', () => {
      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: { success: true, data: allProducts }
      }).as('getProducts');

      cy.intercept('GET', '/api/products*search=Laptop*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: allProducts.products.filter(p => p.name.includes('Laptop')),
            totalItems: 2,
            totalPages: 1,
            currentPage: 0
          }
        }
      }).as('searchProducts');

      productPage.visit();
      cy.wait('@getProducts');

      productPage.searchProduct('Laptop');
      cy.wait('@searchProducts');

      productPage.assertProductInList('Laptop HP');
      productPage.assertProductInList('Laptop Dell');
      productPage.assertProductNotInList('Book JavaScript');
    });

    it('should filter products by category', () => {
      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: { success: true, data: allProducts }
      }).as('getProducts');

      cy.intercept('GET', '/api/products*category=Books*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: allProducts.products.filter(p => p.category === 'Books'),
            totalItems: 1,
            totalPages: 1,
            currentPage: 0
          }
        }
      }).as('filterByCategory');

      productPage.visit();
      cy.wait('@getProducts');

      productPage.filterByCategory('Books');
      cy.wait('@filterByCategory');

      productPage.assertProductInList('Book JavaScript');
      productPage.assertProductNotInList('Laptop HP');
    });

    it('should show empty state when no products match search', () => {
      cy.intercept('GET', '/api/products*', {
        statusCode: 200,
        body: { success: true, data: allProducts }
      }).as('getProducts');

      cy.intercept('GET', '/api/products*search=NonExistent*', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            products: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 0
          }
        }
      }).as('searchNoResults');

      productPage.visit();
      cy.wait('@getProducts');

      productPage.searchProduct('NonExistent');
      cy.wait('@searchNoResults');

      productPage.getProductRows().should('have.length', 0);
    });
  });
});
