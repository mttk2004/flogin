# 🔐 FloginFE_BE - Login & Product Management Application

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Software Testing Assignment** - Test-Driven Development (TDD) Project

A full-stack application demonstrating TDD principles with comprehensive testing coverage for user authentication and product management features.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Development Workflow](#-development-workflow)
- [Contributing](#-contributing)

## ✨ Features

### User Management
- 🔐 User Registration with validation
- 🔑 User Login/Logout with JWT authentication
- 👤 User Profile Management
- 🛡️ Role-based Authorization

### Product Management
- ➕ Create Product
- 📖 Read Product(s) with pagination
- ✏️ Update Product
- 🗑️ Delete Product
- 🔍 Search/Filter Products

## 🛠 Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.0
- **Language**: Java 21
- **Security**: Spring Security + JWT
- **Database**: H2 (dev/test), PostgreSQL (production)
- **API Docs**: SpringDoc OpenAPI (Swagger)
- **Build Tool**: Maven 3.9+
- **Testing**: JUnit 5, Mockito, Spring Boot Test
- **Code Coverage**: JaCoCo

### Frontend
- **Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Zod
- **Testing**: Vitest, Testing Library, Cypress
- **Code Coverage**: Vitest Coverage

## 📁 Project Structure

```
flogin-project/
├── backend/                 # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/flogin/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── repository/      # Data Access
│   │   │   │   ├── model/           # JPA Entities
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exception/       # Custom Exceptions
│   │   │   │   ├── config/          # Configuration
│   │   │   │   └── security/        # Security & JWT
│   │   │   └── resources/
│   │   └── test/
│   │       └── java/
│   │           ├── unit/            # Unit Tests
│   │           ├── integration/     # Integration Tests
│   │           └── e2e/             # E2E Tests
│   └── pom.xml
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Page Components
│   │   ├── services/        # API Services
│   │   ├── hooks/           # Custom Hooks
│   │   ├── contexts/        # React Contexts
│   │   ├── types/           # TypeScript Types
│   │   └── ...
│   ├── cypress/             # E2E Tests
│   └── package.json
│
├── docs/                    # Documentation
│   ├── test-plan/           # Test Plans
│   ├── test-cases/          # Test Cases
│   ├── test-reports/        # Test Reports
│   └── coverage-reports/    # Coverage Reports
│
└── .github/
    └── workflows/           # CI/CD Pipelines
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** or higher ([Download](https://adoptium.net/))
- **Maven 3.9+** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 20+** ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/mttk2004/flogin.git
cd flogin
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
# or
yarn install
```

### 4. Environment Configuration

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
```

**Backend:**
- Development: `application-dev.properties` (default)
- Testing: `application-test.properties`
- Production: `application-prod.properties`

## 🏃 Running the Application

### Development Mode

**Backend** (runs on http://localhost:8080):
```bash
cd backend
mvn spring-boot:run
```

**Frontend** (runs on http://localhost:5173):
```bash
cd frontend
npm run dev
# or
yarn dev
```

### Production Build

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn clean test jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run cypress:open   # Interactive mode
npm run cypress:run    # Headless mode
```

### Coverage Goals

- Backend: ≥ 80% code coverage
- Frontend: ≥ 80% code coverage

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

## 🔄 Development Workflow (TDD)

This project follows Test-Driven Development principles:

1. **🔴 Red Phase**: Write failing test
   ```java
   @Test
   void shouldCreateUser() {
       // Test implementation
       assertThrows(Exception.class, () -> userService.createUser(userDto));
   }
   ```

2. **🟢 Green Phase**: Write minimal code to pass
   ```java
   public User createUser(UserDto userDto) {
       // Implementation
   }
   ```

3. **🔵 Refactor Phase**: Improve code quality
   - Clean up code
   - Optimize performance
   - Ensure tests still pass

4. **🔁 Repeat**: Continue for next feature

## 📝 Contributing

This is an academic project for Software Testing course. Contributions follow TDD methodology:

1. Create feature branch
2. Write tests first
3. Implement feature
4. Ensure all tests pass
5. Submit pull request

## 📄 License

This project is created for educational purposes as part of Software Testing course.

## 👥 Authors

- Mai Trần Tuấn Kiệt

## 🙏 Acknowledgments

- Software Testing Course Materials
- Spring Boot Documentation
- React Documentation
- Test-Driven Development Best Practices

---

**Note**: This is a learning project demonstrating TDD principles and comprehensive testing strategies.
