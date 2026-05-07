#### Architecture Layers

**Domain: Business Rules (What the system is)**

- Entities
- Value Objects
- Domain Services
- Repository interfaces (contracts)
- Business invariants

**Application: Use Cases (What the system does)**

- Orchestration logic
- Flow coordination
- Transaction boundaries
- Calls to repositories
- Calls to external services

### Folder structure example

/modules
-- /auth
---- /application
---- /presentation
---- /domain
------ /entities
------ /interfaces

shared
/infrastructure
/database
/repositories

**Common Mistakes in NestJS Clean Architecture:**

- Putting DTOs inside domain
- Returning entities from controllers
- Injecting Prisma/TypeORM in use cases
- Using class-validator in application layer
- Putting business logic in controllers

## Working on IT

- Inject UserRepositoryImpl into application layer
