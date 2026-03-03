# Project Assignment Manager
Локальная платформа для управления разработчиками, проектами и назначениями: ASP.NET Core API с файловым JSON‑хранилищем (через `JsonRepository`) и Angular-frontend со standalone-компонентами, сигналами и минималистичным UI.

## Used Technologies
- **Backend:** ASP.NET Core 8, controllers, scoped сервисы, кастомный middleware `GlobalExceptionHandlerMiddleware`, OpenAPI, CORS-политики, JSON-хранилище на основе `SemaphoreSlim`.
- **Frontend:** Angular 17 standalone, `@angular/core` signals + `takeUntilDestroyed`, HttpClient, router, общие стили.
- **Tooling:** Node.js/npm 11+ для Angular CLI, .NET SDK 8+ для API, `start-app.bat` для одновременного запуска.

## Initial Prompt (full text)
Пользователь предоставил контекст и описал проблему целиком:

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

Loading developers... висит и не отображается грид со значениями
```

Этот промт подсветил переключение frontend на HTTP и зависающий список разработчиков.

## Additional Adjustments After the Prompt
1. **Backend JSON camelCase:** добавили `JsonNamingPolicy.CamelCase` в `Program.cs`, чтобы Angular получал поля `success`/`data` без ручного преобразования.
2. **Устойчивый DevelopersListComponent:** переписали компонент на сигналы и `takeUntilDestroyed`, добавили проверку `response.success`, сброс состояния при пустых ответах и логирование ошибок.
3. **Чистка артефактов:** удалили все вспомогательные `.md` и `.bat/.ps1` файлы, оставив только `start-app.bat` как единый сценарий запуска.
4. **Документация:** описали весь процесс, промты и выводы в README, чтобы новым участникам было понятно, что уже сделано.

## Quick Start
`start-app.bat` — запускает backend (`http://localhost:5000`) и Angular (`http://localhost:4200`) в отдельных окнах. Подождите ~30–40 секунд до полной готовности, затем откройте фронтенд.

## Insights
**Which prompts worked well?**
- Конкретное описание симптома (“Loading developers… висит…”) позволило быстро локализовать сочетание проблем (PascalCase JSON + отсутствие error handling).
- Чёткая операция “оставить только start-app.bat” дала однозначный список файлов к удалению без лишних вопросов.

**Which prompts did not work (or worked poorly), and why?**
- Общие просьбы вроде “посмотри всю историю” требовали дополнительных уточнений, так как не было понятно, что именно нужно просмотреть или изменить.

**Prompting patterns that gave the best results**
- Фокус на результате/симптоме + ссылка на конкретный файл или стек (backend/Angular) ускоряли разработку.
- Последовательные небольшие задачи (исправить поведение → почистить файлы → обновить документацию) помогали держать контекст и избегать откатов.
