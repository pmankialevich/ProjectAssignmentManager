# Project Assignment Manager
A local platform for managing developers, projects, and assignments: an ASP.NET Core API with file-based JSON storage (via JsonRepository) and an Angular frontend using standalone components, signals, and a minimalist UI.

## Used Technologies
Backend: ASP.NET Core 8, controllers, scoped services, custom GlobalExceptionHandlerMiddleware, OpenAPI, CORS policies, and file-based JSON storage using SemaphoreSlim for synchronization.

Frontend: Angular 17 standalone architecture, @angular/core signals with takeUntilDestroyed, HttpClient, router, and shared styles.

Tooling: Node.js/npm 11+ for the Angular CLI, .NET SDK 8+ for the API, and start-app.bat for running both applications simultaneously.

## Initial Prompt (full text)
```
I want you to act as a senior .NET solution architect with extensive experience in building scalable web applications using ASP.NET Core and Angular.
Your task is to guide me step by step through the design and implementation of a small full-stack application called Project Assignment Manager.
Current State
Backend: An empty .NET 10 ASP.NET Core Web API project already exists.
Frontend: A separate folder exists but no Angular application has been created yet.
No database should be used — all data must be persisted in a JSON file.
The solution should be clean, well-structured, and production-oriented (within reasonable scope).
Functional Requirements Developer Management
Create developer (Name, Email, SeniorityLevel)
Update developer
Delete developer
Get all developers
Get developer by ID (including assigned projects)
Project Management
Create project (Name, Description)
Update project
Delete project
Get all projects
Developer–Project Relationship (Many-to-Many)
Assign developer to project
Remove developer from project
Search developers by project
Search projects by developer
Backend Requirements
Use Controllers, Services, DTOs, Models
Proper folder structure
Clean separation of concerns
Thread-safe JSON file persistence
Proper validation (DataAnnotations or FluentValidation)
Global exception handling
Consistent API response patterns
Proper modeling of many-to-many relationship
Avoid overengineering but keep clean architecture principles
JSON persistence must:
Be abstracted behind a service/repository
Handle concurrent file access safely
Prevent file corruption
Keep data consistent
Frontend Requirements (Angular)
Create Angular app using Angular CLI
Implement routing
At least 3 main pages:
Developers List Page
Developer Details Page
Projects Management Page
Use:
Angular services for API communication
Reactive Forms
Basic form validation
Clean component architecture
Keep UI simple and clean (no heavy UI libraries required unless suggested)
Proper state handling without overcomplication
Implementation Rules
Start with high-level architecture explanation.
Define folder structure for backend and frontend.
Implement step by step.
For each step:
Clearly specify which file to create or modify
Provide relevant implementation only
Briefly explain the reasoning
Do not silently change decisions.
Ask clarification questions before proceeding if needed.
```

## Additional Adjustments After the Prompt
Backend JSON camelCase: Added JsonNamingPolicy.CamelCase in Program.cs so that Angular receives success/data fields without manual mapping.

Resilient DevelopersListComponent: Refactored the component to use signals and takeUntilDestroyed, added response.success validation, state reset for empty responses, and proper error logging.

Artifact Cleanup: Removed all auxiliary .md and .bat/.ps1 files, keeping only start-app.bat as the single unified startup script.

Documentation: Documented the entire workflow, prompts, and conclusions in the README to make onboarding easier for new contributors.

Global Error Handling: Centralized exception processing via custom middleware to ensure consistent API error responses and cleaner controller logic.

Thread-Safe JSON Repository: Implemented synchronization with SemaphoreSlim to prevent race conditions during concurrent file access.

Improved CORS Configuration: Configured explicit CORS policies to support secure local frontend–backend interaction.

OpenAPI Integration: Enabled OpenAPI/Swagger for easier API testing and faster development feedback loops.

Minimalist UI Refinement: Standardized layout and shared styles for a cleaner and more maintainable frontend structure.

Project Structure Optimization: Simplified folder organization in both backend and frontend for better scalability and readability.

## Quick Start
start-app.bat — launches the backend (http://localhost:5000) and the Angular app (http://localhost:4200) in separate windows. Wait approximately 30–40 seconds until both services are fully ready, then open the frontend in your browser.

## Insights
## Effective Prompting Strategies

Clear symptom description: Precisely describing the issue (e.g., “Loading developers… remains indefinitely”) enabled fast identification of combined root causes (PascalCase JSON serialization + missing frontend error handling).

Well-defined, atomic requests: Explicit instructions such as “keep only start-app.bat” resulted in deterministic outcomes and eliminated ambiguity in file management tasks.

Contextual references: Mentioning the exact layer (backend/Angular) or specific file significantly reduced clarification cycles and improved turnaround time.

## Less Effective Prompting Approaches

Overly broad requests: General prompts like “review the entire history” lacked actionable scope, requiring additional clarification to determine objectives and expected outcomes.

Undefined success criteria: Requests without measurable or observable results made it harder to validate completeness or correctness.

## High-Impact Prompting Patterns

Problem → Context → Expected Result: Clearly stating the issue, the relevant technical scope (e.g., backend serialization, Angular component lifecycle), and the desired outcome consistently produced efficient and accurate solutions.

Iterative refinement: Breaking work into sequential, focused steps (fix behavior → clean artifacts → update documentation) preserved context, minimized regressions, and improved overall quality.

Outcome-oriented phrasing: Framing prompts around the desired system behavior rather than implementation details encouraged more robust architectural decisions.
