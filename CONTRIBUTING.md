# Contributing to FloginFE_BE

Thank you for your interest in contributing to this project! This is an academic project following Test-Driven Development (TDD) principles.

## Development Process

### 1. Setting Up Development Environment

1. Fork the repository
2. Clone your fork
3. Install dependencies (see README.md)
4. Create a feature branch

### 2. Test-Driven Development Workflow

**Always write tests before implementation:**

#### Backend TDD Flow
```bash
cd backend

# 1. Create test file
# src/test/java/unit/UserServiceTest.java

# 2. Write failing test
@Test
void shouldCreateUser() {
    // Arrange
    UserDto userDto = new UserDto("test@example.com", "password");

    // Act & Assert
    assertThrows(UserNotFoundException.class,
        () -> userService.createUser(userDto));
}

# 3. Run test (should fail)
mvn test -Dtest=UserServiceTest

# 4. Implement minimal code to pass
# src/main/java/com/flogin/service/UserService.java

# 5. Run test again (should pass)
mvn test -Dtest=UserServiceTest

# 6. Refactor and run all tests
mvn test
```

#### Frontend TDD Flow
```bash
cd frontend

# 1. Create test file
# src/components/__tests__/LoginForm.test.tsx

# 2. Write failing test
describe('LoginForm', () => {
  it('should display validation error for invalid email', () => {
    render(<LoginForm />);
    // Test implementation
  });
});

# 3. Run test (should fail)
npm test

# 4. Implement component
# src/components/LoginForm.tsx

# 5. Run test again (should pass)
npm test

# 6. Refactor
npm test
```

### 3. Code Quality Standards

#### Backend
- Follow Java naming conventions
- Use meaningful variable names
- Keep methods small and focused
- Document public APIs with JavaDoc
- Maintain ≥80% test coverage

#### Frontend
- Follow React/TypeScript best practices
- Use functional components with hooks
- Implement proper TypeScript types
- Use semantic HTML
- Maintain ≥80% test coverage

### 4. Commit Guidelines

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `test`: Adding tests
- `refactor`: Code refactoring
- `docs`: Documentation
- `style`: Code style changes
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "test(user): add user registration validation tests"
git commit -m "feat(user): implement user registration endpoint"
git commit -m "test(product): add product CRUD operation tests"
git commit -m "feat(product): implement product management API"
```

### 5. Pull Request Process

1. **Ensure all tests pass:**
   ```bash
   # Backend
   cd backend && mvn test

   # Frontend
   cd frontend && npm test
   ```

2. **Check code coverage:**
   ```bash
   # Backend
   mvn jacoco:report

   # Frontend
   npm run test:coverage
   ```

3. **Update documentation** if needed

4. **Create Pull Request** with:
   - Clear title
   - Description of changes
   - List of tests added
   - Coverage report summary

### 6. Testing Requirements

#### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Cover edge cases
- Aim for 100% coverage of business logic

#### Integration Tests
- Test component interactions
- Test API endpoints
- Test database operations
- Use test databases

#### E2E Tests
- Test complete user workflows
- Test critical paths
- Use Cypress for frontend
- Cover main features

### 7. Code Review Checklist

Before submitting PR:

- [ ] All tests pass
- [ ] Code coverage ≥80%
- [ ] No console errors/warnings
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Commits follow convention
- [ ] No merge conflicts
- [ ] Tests are meaningful and thorough

### 8. Getting Help

If you have questions:

1. Check existing documentation
2. Review similar implementations
3. Ask in project discussions
4. Consult course materials

## Project-Specific Guidelines

### Backend Specific

**Testing Structure:**
```
src/test/java/
├── unit/              # Unit tests (fast, isolated)
├── integration/       # Integration tests (database, APIs)
└── e2e/              # End-to-end tests (full scenarios)
```

**Test Naming:**
```java
@Test
void should[ExpectedBehavior]When[StateUnderTest]() {
    // Test implementation
}
```

### Frontend Specific

**Testing Structure:**
```
src/
├── components/
│   └── __tests__/    # Component tests
├── hooks/
│   └── __tests__/    # Hook tests
└── utils/
    └── __tests__/    # Utility tests

cypress/
└── e2e/              # E2E tests
```

**Test Naming:**
```typescript
describe('ComponentName', () => {
  it('should do something when condition', () => {
    // Test implementation
  });
});
```

## Academic Integrity

This is an educational project. Please:
- Follow TDD principles strictly
- Write your own tests and implementation
- Document your learning process
- Respect academic honesty policies

---

Thank you for contributing to this learning project! 🎓
