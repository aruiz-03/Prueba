# Prueba

Monorepo project with an Angular 21 frontend application and a TypeScript backend following hexagonal architecture.

## Project Overview

- **Monorepo Structure**: `frontend/` (Angular 21.2.7) and `backend/` (Java 21 + Spring Boot 3.5.14, hexagonal architecture)
- **Frontend Component Architecture**: Atomic design pattern with components organized in `src/app/components/{atoms,molecules,organisms,pages}/`
- **Frontend Entry Point**: `src/main.ts` → `src/app/app.ts` with routing configured in `app.routes.ts`
- **Styling**: SCSS across all frontend components
- **TypeScript**: Strict mode enabled in frontend
- **Java**: Version 21 with Spring Boot 3.5.14 (latest stable, April 2026)

## Backend Architecture

The backend follows **Hexagonal Architecture** (Ports and Adapters) with **Java 21** and **Spring Boot 3.5.14**, with clear separation of concerns:

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
│   │   ├── usecase/           # Input port implementations (with @Service)
│   │   ├── dto/               # Data Transfer Objects
│   │   └── mapper/            # Layer conversion
│   │
│   ├── infrastructure/        # Technical implementations (adapters)
│   │   ├── adapter/
│   │   │   ├── in/            # Input adapters (REST, GraphQL, CLI)
│   │   │   │   └── rest/
│   │   │   │       ├── controller/  # @RestController (Spring MVC)
│   │   │   │       └── route/
│   │   │   └── out/           # Output adapters (DB, external APIs)
│   │   │       ├── persistence/
│   │   │       │   ├── entity/
│   │   │       │   ├── repository/  # @Repository implementations
│   │   │       │   └── mapper/
│   │   │       └── client/
│   │   ├── config/            # Configuration (DI, env, @Configuration)
│   │   │   ├── CorsConfig.java      # CORS for frontend integration
│   │   │   └── OpenApiConfig.java   # OpenAPI/Swagger documentation
│   │   └── security/          # Security (JWT, filters, Spring Security)
│   │
│   ├── shared/                # Shared code
│   │   ├── utils/
│   │   ├── exceptions/
│   │   └── constants/
│   │
│   └── main/                  # Entry point (bootstrap)
│       └── BackendApplication.java  # @SpringBootApplication
│
├── src/main/resources/         # application.properties, static files
├── src/test/java/              # Test sources
└── pom.xml                     # Maven build with Spring Boot 3.5.14 parent
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

- Node.js (compatible with Angular 21 and npm@11.9.0)
- npm (package manager, enforced via `angular.json` CLI configuration)

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

Execute unit tests using Vitest (test files use `*.spec.ts` extension):

```bash
cd frontend
npm test
```

### Backend (Java 21 + Spring Boot 3.5.14)

#### Prerequisites

- Java 21 JDK (e.g., OpenJDK, Oracle JDK)
- Maven 3.5+ (or use Maven Wrapper)

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

## Key Conventions

- **Package Manager**: npm (version 11.9.0, enforced in `angular.json`)
- **Testing**: Vitest with Angular Analog plugin (`@analogjs/vite-plugin-angular`)
- **Code Generation**: Angular CLI schematics; all generated files (components, services, guards, etc.) skip tests by default (configured in `angular.json`)
- **Prettier**: Available as a dev dependency but no configuration file present
- **Build Budgets**: Production builds enforce 500kB initial bundle warning (1MB error), 4kB component style warning (8kB error)

## Architecture

### Frontend Application (`frontend/`)

- **Services**: Located in `src/app/services/` (includes `auth.service.ts`, `task.service.ts`)
- **Guards**: Located in `src/app/guards/` (includes `auth.guard.ts`)
- **Models**: Located in `src/app/models/` (includes `task.model.ts`, `user.model.ts`)
- **Current State**: No backend or API mock configured yet

### Dependencies

#### Production Dependencies
- `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser` (^21.2.0)
- `rxjs` (~7.8.0)
- `tslib` (^2.3.0)

#### Dev Dependencies
- Angular CLI (^21.2.7), Angular Build (^21.2.7)
- Vitest (^4.1.5), `@analogjs/vite-plugin-angular` (^2.5.0)
- TypeScript (~5.9.2)
- Prettier (^3.8.1)

## Additional Resources

- Frontend-specific documentation: [frontend/README.md](frontend/README.md)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Vitest Documentation](https://vitest.dev/)
