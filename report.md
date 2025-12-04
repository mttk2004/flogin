# Tóm Tắt Kiểm Tra Dự Án (FloginFE_BE)

---

### 1. Phân Tích & Test Cases
**Login (1.1)**
- Files: `docs/test-cases/login-test-scenarios.md`

**Product (1.2)**
- Files: `docs/test-cases/product-test-scenarios.md`

---

### 2. Unit Testing
**Login (2.1)**
- Files: `frontend/src/tests/loginValidation.test.ts`, `backend/src/test/java/unit/AuthServiceTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/loginValidation.test.ts`
- Backend: `cd backend && mvn test -Dtest=AuthServiceTest`

**Product (2.2)**
- Files: `frontend/src/tests/productValidation.test.ts`, `backend/src/test/java/unit/ProductServiceTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/productValidation.test.ts`
- Backend: `cd backend && mvn test -Dtest=ProductServiceTest`

---

### 3. Integration Testing
**Login (3.1)**
- Files: `frontend/src/tests/Login.integration.test.tsx`, `backend/src/test/java/integration/AuthControllerIntegrationTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/Login.integration.test.tsx`
- Backend: `cd backend && mvn test -Dtest=AuthControllerIntegrationTest`

**Product (3.2)**
- Files: `frontend/src/tests/ProductList.integration.test.tsx`, `frontend/src/tests/ProductDetail.integration.test.tsx`, `frontend/src/tests/ProductForm.integration.test.tsx`, `backend/src/test/java/integration/ProductControllerIntegrationTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/ProductList.integration.test.tsx src/tests/ProductDetail.integration.test.tsx src/tests/ProductForm.integration.test.tsx`
- Backend: `cd backend && mvn test -Dtest=ProductControllerIntegrationTest`

---

### 4. Mock Testing
**Login (4.1)**
- Files: `frontend/src/tests/Login.mock.test.tsx`, `backend/src/test/java/mock/AuthServiceMockTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/Login.mock.test.tsx`
- Backend: `cd backend && mvn test -Dtest=AuthServiceMockTest`

**Product (4.2)**
- Files: `frontend/src/tests/Product.mock.test.tsx`, `backend/src/test/java/mock/ProductServiceMockTest.java`
- Frontend: `cd frontend && npx vitest run src/tests/Product.mock.test.tsx`
- Backend: `cd backend && mvn test -Dtest=ProductServiceMockTest`

---

### 5. Automation & CI/CD
**Login E2E (5.1)**
- Files: `frontend/cypress/e2e/login.cy.ts`
- Run: `cd frontend && npx cypress run --spec "cypress/e2e/login.cy.ts"`

**Product E2E (5.2)**
- Files: `frontend/cypress/e2e/product.cy.ts`
- Run: `cd frontend && npx cypress run --spec "cypress/e2e/product.cy.ts"`

**CI/CD**
- Config: `.github/workflows/ci.yml`

---

### 6. Bonus
**Performance Testing (7.1)**
- Files: `performance/login-test.js`
- Run: `k6 run performance/login-test.js`

