# Backend README

## Overview

Spring Boot 3.4.0 backend application for FloginFE_BE project, implementing user authentication and product management with comprehensive testing coverage.

## Technology Stack

- **Java**: 21
- **Spring Boot**: 3.4.0
- **Spring Security**: JWT-based authentication
- **Database**: H2 (dev/test), PostgreSQL (prod)
- **API Documentation**: SpringDoc OpenAPI (Swagger)
- **Testing**: JUnit 5, Mockito, Spring Boot Test
- **Code Coverage**: JaCoCo

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/flogin/
│   │   │   ├── controller/      # REST API Controllers
│   │   │   ├── service/         # Business Logic Layer
│   │   │   ├── repository/      # Data Access Layer (JPA)
│   │   │   ├── model/           # JPA Entities
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── exception/       # Custom Exceptions & Handlers
│   │   │   ├── config/          # Application Configuration
│   │   │   ├── security/        # Security Config & JWT Utilities
│   │   │   └── FloginApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-test.properties
│   │       └── application-prod.properties
│   └── test/
│       └── java/
│           ├── unit/            # Unit Tests
│           ├── integration/     # Integration Tests
│           └── e2e/             # End-to-End Tests
└── pom.xml
```

## Quick Start

### Prerequisites
- Java 21
- Maven 3.9+

### Installation

```bash
# Install dependencies
mvn clean install

# Run application (dev profile)
mvn spring-boot:run

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Configuration

The application uses Spring profiles for different environments:

- **dev**: Development environment (H2 database)
- **test**: Testing environment (H2 in-memory)
- **prod**: Production environment (PostgreSQL)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Testing

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=UserServiceTest
```

### Run Tests with Coverage
```bash
mvn clean test jacoco:report
```

### View Coverage Report
```bash
# Generate report
mvn jacoco:report

# Open in browser (Windows)
start target/site/jacoco/index.html

# Open in browser (Mac)
open target/site/jacoco/index.html

# Open in browser (Linux)
xdg-open target/site/jacoco/index.html
```

## Test Structure

### Unit Tests (`src/test/java/unit/`)
- Test individual methods/classes in isolation
- Mock dependencies
- Fast execution
- High coverage

Example:
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldCreateUserSuccessfully() {
        // Test implementation
    }
}
```

### Integration Tests (`src/test/java/integration/`)
- Test component interactions
- Use real database (H2)
- Test API endpoints
- Test security

Example:
```java
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldRegisterUser() throws Exception {
        // Test implementation
    }
}
```

### E2E Tests (`src/test/java/e2e/`)
- Test complete user scenarios
- Test full application flow
- Use TestRestTemplate

## Database Configuration

### H2 Console (Development)
Access H2 console at: `http://localhost:8080/h2-console`

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:flogindb`
- Username: `sa`
- Password: `password`

### PostgreSQL (Production)
Configure in `application-prod.properties` or environment variables:
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
```

## API Documentation

Access Swagger UI at: `http://localhost:8080/swagger-ui.html`

API Docs JSON: `http://localhost:8080/api-docs`

## Security

### JWT Configuration
Configure JWT secret and expiration in properties:
```properties
jwt.secret=${JWT_SECRET}
jwt.expiration=86400000  # 24 hours in milliseconds
```

### Secured Endpoints
Most endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

### Public Endpoints
- `/api/auth/register`
- `/api/auth/login`
- `/swagger-ui.html`
- `/api-docs`

## Building for Production

```bash
# Create executable JAR
mvn clean package

# Run JAR
java -jar target/backend-0.0.1-SNAPSHOT.jar

# Run with production profile
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## Troubleshooting

### Port Already in Use
Change port in `application.properties`:
```properties
server.port=8081
```

### Database Connection Issues
Check database configuration and ensure database is running.

### Tests Failing
```bash
# Clean and rebuild
mvn clean install

# Skip tests temporarily
mvn clean install -DskipTests
```

## Code Quality

### Run Checkstyle (if configured)
```bash
mvn checkstyle:check
```

### Run SpotBugs (if configured)
```bash
mvn spotbugs:check
```

## Logging

Configure logging in `application.properties`:
```properties
# Application logging
logging.level.com.flogin=DEBUG

# Spring Security logging
logging.level.org.springframework.security=DEBUG

# Hibernate SQL logging
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development workflow and TDD guidelines.

## License

See [LICENSE](../LICENSE) file for details.
