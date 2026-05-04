# Backend

Backend application built with **Java 21** and **Spring Boot 3.5.14** following **Hexagonal Architecture** (Ports and Adapters pattern).

## Architecture Overview

The codebase is organized into four main layers following the dependency rule (dependencies only point inward):

```
backend/
├── src/main/java/com/prueba/backend/
│   ├── domain/                # Core business logic (no external dependencies)
│   │   ├── model/             # Entities and Value Objects (e.g., Task record)
│   │   ├── service/           # Pure domain logic
│   │   ├── port/              # Interfaces (contracts)
│   │   │   ├── in/            # Input ports (use cases)
│   │   │   └── out/           # Output ports (repositories, external APIs)
│   │
│   ├── application/           # Use case orchestration
│   │   ├── usecase/           # Input port implementations
│   │   ├── dto/               # Data Transfer Objects
│   │   └── mapper/            # Layer conversion
│   │
│   ├── infrastructure/        # Technical implementations (adapters)
│   │   ├── adapter/
│   │   │   ├── in/            # Input adapters (REST, GraphQL, CLI)
│   │   │   │   └── rest/
│   │   │   │       ├── controller/
│   │   │   │       └── route/
│   │   │   └── out/           # Output adapters (DB, external APIs)
│   │   │       ├── persistence/
│   │   │       │   ├── entity/
│   │   │       │   ├── repository/
│   │   │       │   └── mapper/
│   │   │       └── client/
│   │   ├── config/            # Configuration (DI, env)
│   │   └── security/          # Security (JWT, filters)
│   │
│   ├── shared/                # Shared code
│   │   ├── utils/
│   │   ├── exceptions/
│   │   └── constants/
│   │
│   └── main/                  # Entry point (bootstrap)
│       └── BackendApplication.java
│
├── src/main/resources/         # Application properties, static files
├── src/test/                  # Test sources
└── pom.xml                    # Maven build configuration
```

### Key Principles
- **Dependency Rule**: Dependencies only flow inward (`infrastructure → application → domain`)
- **Ports & Adapters**: Domain defines interfaces (ports), infrastructure provides implementations (adapters)
- **Framework Independence**: Core domain logic has no Spring/Java EE dependencies

## Technology Stack

- **Java**: 21 (LTS, with Virtual Threads support)
- **Spring Boot**: 3.5.14 (latest stable as of April 2026)
- **Build Tool**: Maven (with Spring Boot parent POM)
- **Validation**: Spring Boot Validation Starter
- **Testing**: Spring Boot Test Starter (JUnit 5, Mockito, AssertJ)
- **Storage**: In-memory (no database required, data is temporary)

## Getting Started

### Prerequisites
- Java 21 JDK (e.g., OpenJDK, Oracle JDK)
- Maven 3.5+ (or use Maven Wrapper)

### Build the Project
```bash
cd backend
mvn clean install
```

### Run the Application
```bash
cd backend
mvn spring-boot:run
```

Or after building:
```bash
cd backend
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

### Run Tests
```bash
cd backend
mvn test
```

## Example Implementation

The backend includes a sample `Task` domain with:

- **Domain Model**: `Task` (Java record with `id`, `title`, `description`, `completed`, `createdAt`)
- **Output Port**: `TaskRepositoryPort` (interface in domain layer)
- **Input Port**: `CreateTaskUseCase` (interface in domain layer)
- **Application**: `CreateTaskUseCaseImpl` (use case implementation with `@Service`)
- **Infrastructure Adapter (In)**: `TaskController` (`@RestController` with `/api/tasks` endpoint)
- **Infrastructure Adapter (Out)**: `InMemoryTaskRepository` (`@Repository` implementation)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks?title=...&description=...` | Create a new task |

## Current State
- **In-memory storage**: Data stored in `ConcurrentHashMap`, lost on application restart
- **REST endpoints**: POST, GET (all), GET (by ID), DELETE
- **No database dependency**: Temporary storage for development/testing
- **Spring Boot validation** enabled but not yet applied to DTOs
- **No security/authentication** configured yet

## Additional Resources

- [Spring Boot 3.5 Reference Documentation](https://docs.spring.io/spring-boot/3.5/reference/)
- [Spring Boot Maven Plugin](https://docs.spring.io/spring-boot/3.5/maven-plugin/)
- [Java 21 Documentation](https://docs.oracle.com/en/java/javase/21/)
