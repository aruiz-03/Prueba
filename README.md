# Prueba

Monorepo project with an Angular 21 frontend application and a Java 21 + Spring Boot backend following hexagonal architecture.

## Project Overview

- **Monorepo Structure**: `frontend/` (Angular 21.2.0) and `backend/` (Java 21 + Spring Boot, hexagonal architecture)
- **Frontend Component Architecture**: Atomic design pattern with components organized in `src/app/components/{atoms,molecules,organisms,pages}/`
- **Frontend Entry Point**: `src/main.ts` → `src/app/app.ts` with routing configured in `app.routes.ts`
- **Styling**: SCSS across all frontend components
- **TypeScript**: Strict mode enabled in frontend
- **Java**: Version 21 with Spring Boot (latest stable)
- **Authentication**: User registration and login with JWT-free session management (localStorage + in-memory backend)

## Backend Architecture

The backend follows **Hexagonal Architecture** (Ports and Adapters) with **Java 21** and **Spring Boot**, with clear separation of concerns:

```
backend/
├── src/main/java/com/prueba/backend/
│   ├── domain/                # Core business logic (no external dependencies)
│   │   ├── model/             # Entities and Value Objects (User, Task records)
│   │   ├── service/           # Pure domain logic
│   │   ├── port/              # Interfaces (contracts)
│   │   │   ├── in/            # Input ports (use cases: Register, Login, Tasks)
│   │   │   └── out/           # Output ports (repositories, external APIs)
│   │
│   ├── application/           # Use case orchestration
│   │   ├── usecase/           # Input port implementations (with @Service)
│   │   ├── dto/               # Data Transfer Objects
│   │   └── mapper/            # Layer conversion
│   │
│   ├── infrastructure/        # Technical implementations (adapters)
│   │   ├── adapter/
│   │   │   ├── in/            # Input adapters (REST, GraphQL, CLI)
│   │   │   │   └── rest/
│   │   │   │       └── controller/  # @RestController (AuthController, TaskController)
│   │   │   └── out/           # Output adapters (DB, external APIs)
│   │   │       └── persistence/
│   │   │           ├── entity/
│   │   │           ├── repository/  # @Repository implementations (InMemory)
│   │   │           └── mapper/
│   │   ├── config/            # Configuration (DI, env, @Configuration)
│   │   │   ├── CorsConfig.java      # CORS for frontend integration
│   │   │   └── OpenApiConfig.java   # OpenAPI/Swagger documentation
│   │   └── security/          # Security (JWT, filters, Spring Security)
│   │
│   └── main/                  # Entry point (bootstrap)
│       └── BackendApplication.java  # @SpringBootApplication
│
├── src/main/resources/         # application.properties, static files
├── src/test/java/              # Test sources (JUnit 5 + Mockito + AssertJ)
└── pom.xml                     # Maven build
```

### API Documentation (OpenAPI)
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs
- Annotations: `@Tag`, `@Operation`, `@ApiResponse` in controllers

### Key Principles
- **Dependency Rule**: Dependencies only point inward (domain ← application ← infrastructure)
- **Ports & Adapters**: Domain defines interfaces (ports), infrastructure provides implementations (adapters)
- **Framework Independence**: Core domain logic has no Spring/Java EE dependencies
- **Spring Boot**: Used only in infrastructure layer and main entry point for dependency injection and auto-configuration
- **In-Memory Storage**: `ConcurrentHashMap` repository, no database required (data lost on restart)
- **CORS Enabled**: Configured to allow `http://localhost:4200` (Angular dev server)

## Prerequisites

- **Frontend**: Node.js (compatible with Angular 21 and npm@11.9.0)
- **Backend**: Java 21 JDK (e.g., OpenJDK, Oracle JDK), Maven 3.5+

## Getting Started

### Frontend (Angular 21)

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Development Server

Start the local development server (runs on `http://localhost:4200`, auto-reloads on file changes):

```bash
cd frontend
npm start
```

#### Production Build

Compile the application for production, outputting artifacts to `frontend/dist/`:

```bash
cd frontend
npm run build
```

#### Run Tests

Execute unit tests using Jest (test files use `*.spec.ts` extension):

```bash
cd frontend
ng test              # Run tests with watch mode
ng test --no-watch   # Run tests once without watch
```

### Backend (Java 21 + Spring Boot)

#### Build the Project

```bash
cd backend
mvn clean install
```

#### Run the Application

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

#### Run Tests

```bash
cd backend
mvn test
```

## API Endpoints (Backend)

### Authentication
- `POST /api/auth/register?username=...&password=...` — Register new user
- `POST /api/auth/login?username=...&password=...` — Login user

### Tasks (requires authentication)
- `POST /api/tasks` — Create new task
- `GET /api/tasks` — List all tasks
- `GET /api/tasks/{id}` — Get task by ID
- `DELETE /api/tasks/{id}` — Delete task

## Testing

### Frontend
- **Runner**: Jest via `@angular-builders/jest`
- **Config**: `angular.json` → `architect.test`
- **Setup**: `test-setup.ts` → `jest-preset-angular/setup-jest`
- **Pattern**: `*.spec.ts` next to source files
- **Run**: `ng test` (NOT `npx jest` directly)

#### Test Files (User Management)
- `src/app/services/auth.service.spec.ts` — 6 tests (loadUser, login, logout, register)
- `src/app/guards/auth.guard.spec.ts` — 2 tests (authenticated, unauthenticated)

### Backend
- **Runner**: JUnit 5 + Mockito + AssertJ
- **Pattern**: `src/test/java/**/*Test.java`
- **Run**: `mvn test`

#### Test Files (User Management)
- `src/test/java/.../application/usecase/RegisterUseCaseImplTest.java` — 2 tests
- `src/test/java/.../application/usecase/LoginUseCaseImplTest.java` — 3 tests
- `src/test/java/.../domain/model/UserTest.java` — 3 tests

## Key Conventions

- **Package Manager**: npm (version 11.9.0, enforced in `angular.json`)
- **Testing**: Jest (frontend), JUnit 5 + Mockito + AssertJ (backend)
- **Code Generation**: Angular CLI schematics; all generated files skip tests by default (configured in `angular.json`)
- **Angular Signals**: Used for state management in AuthService
- **Build Budgets**: Production builds enforce 500kB initial bundle warning (1MB error), 4kB component style warning (8kB error)

## Architecture

### Frontend Application (`frontend/`)

- **Services**: Located in `src/app/services/` (includes `auth.service.ts`, `task.service.ts`)
- **Guards**: Located in `src/app/guards/` (includes `auth.guard.ts`)
- **Models**: Located in `src/app/models/` (includes `task.model.ts`, `user.model.ts`)
- **Components**: Organized by atomic design in `src/app/components/{atoms,molecules,organisms,pages}/`

### Dependencies

#### Frontend Production Dependencies
- `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser` (^21.2.0)
- `rxjs` (~7.8.0)
- `tslib` (^2.3.0)

#### Frontend Dev Dependencies
- Angular CLI (^21.2.7), Angular Build (^21.2.7)
- Jest (`@angular-builders/jest`, `jest-preset-angular`)
- TypeScript (~5.9.2)

## Additional Resources

- Frontend-specific documentation: [frontend/README.md](frontend/README.md)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Jest Documentation](https://jestjs.io/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
