# Flogin Project - Structure Overview

## Project Information
- **Project Name**: FloginFE_BE
- **Description**: Login & Product Management Application
- **Course**: Software Testing
- **Methodology**: Test-Driven Development (TDD)

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.0
- **Language**: Java 21
- **Build Tool**: Maven 3.9+
- **Database**: H2 (dev/test), PostgreSQL (prod)
- **Security**: Spring Security + JWT
- **API Documentation**: SpringDoc OpenAPI (Swagger)
- **Testing**: JUnit 5, Spring Boot Test
- **Code Coverage**: JaCoCo

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Zod
- **Testing**: Vitest, Testing Library, Cypress

## Project Structure

```
flogin-project/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/flogin/
│   │   │   │   ├── controller/      # REST API Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── repository/      # Data Access Layer
│   │   │   │   ├── model/           # JPA Entities
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Custom Exceptions
│   │   │   │   ├── config/          # Spring Configuration
│   │   │   │   ├── security/        # Security Config & JWT
│   │   │   │   └── FloginApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       ├── application-test.properties
│   │   │       └── application-prod.properties
│   │   └── test/
│   │       └── java/
│   │           ├── unit/            # Unit Tests
│   │           ├── integration/     # Integration Tests
│   │           └── e2e/             # End-to-End Tests
│   └── pom.xml
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   ├── pages/                   # Page Components
│   │   ├── services/                # API Services
│   │   ├── hooks/                   # Custom React Hooks
│   │   ├── contexts/                # React Contexts
│   │   ├── types/                   # TypeScript Types
│   │   ├── lib/                     # Utility Libraries
│   │   ├── constants/               # Constants
│   │   ├── assets/                  # Static Assets
│   │   ├── tests/                   # Unit Tests
│   │   ├── utils/                   # Utility Functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── cypress/                     # E2E Tests
│   │   ├── e2e/
│   │   └── support/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env.example
│
├── docs/                            # Documentation
│   ├── test-plan/                   # Test Planning Documents
│   ├── test-cases/                  # Test Case Specifications
│   ├── test-reports/                # Test Execution Reports
│   ├── coverage-reports/            # Code Coverage Reports
│   └── api-documentation/           # API Documentation
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml                # CI/CD Pipeline
│
└── README.md

```

## Key Features to Implement

### User Management
- User Registration
- User Login/Logout
- User Profile Management
- JWT Authentication & Authorization

### Product Management
- Create Product
- Read Product(s)
- Update Product
- Delete Product
- Product Search/Filter

## Testing Strategy (TDD Approach)

### 1. Unit Tests
- Repository Layer Tests
- Service Layer Tests
- Controller Layer Tests
- Component Tests (Frontend)
- Hook Tests (Frontend)

### 2. Integration Tests
- API Integration Tests
- Database Integration Tests
- Service Integration Tests

### 3. End-to-End Tests
- User Flow Tests (Login, Register, etc.)
- Product Management Flow Tests
- Cypress E2E Tests

### 4. Code Coverage Goals
- Backend: ≥ 80% (JaCoCo)
- Frontend: ≥ 80% (Vitest)

## Development Workflow (TDD)

1. **Write Test First** (Red Phase)
   - Write failing test
   - Define expected behavior

2. **Implement Code** (Green Phase)
   - Write minimal code to pass test
   - Focus on functionality

3. **Refactor** (Refactor Phase)
   - Improve code quality
   - Maintain passing tests

4. **Repeat**
   - Continue for next feature

## Setup Instructions

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Running Tests

#### Backend
```bash
cd backend
mvn test                    # Run all tests
mvn test -Dtest=ClassName   # Run specific test
mvn jacoco:report           # Generate coverage report
```

#### Frontend
```bash
cd frontend
npm test                    # Run unit tests
npm run test:coverage       # Run with coverage
npm run cypress:open        # Open Cypress
npm run cypress:run         # Run E2E tests headless
```

## Environment Configuration

### Backend
- `application.properties` - Main configuration
- `application-dev.properties` - Development profile
- `application-test.properties` - Test profile
- `application-prod.properties` - Production profile

### Frontend
- `.env.example` - Example environment variables
- Create `.env` file for local development

## API Documentation

Once backend is running, access Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

## CI/CD Pipeline

GitHub Actions workflow includes:
- Backend build and test
- Frontend build and test
- Code coverage reporting
- Automated deployment (to be configured)

## Next Steps

1. ✅ Project structure created
2. ✅ Dependencies installed
3. ⏳ Implement features using TDD:
   - Start with User Login feature
   - Write tests first
   - Implement code
   - Repeat for other features
4. ⏳ Generate test reports
5. ⏳ Document APIs
6. ⏳ Create comprehensive test cases

---

**Note**: This is a foundational structure. All business logic and features should be implemented following TDD principles.
