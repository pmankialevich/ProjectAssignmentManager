# Project Assignment Manager
Локальная платформа для управления разработчиками, проектами и назначениями: ASP.NET Core API с файловым JSON‑хранилищем (через `JsonRepository`) и Angular-frontend со standalone-компонентами, сигналами и минималистичным UI.

## Used Technologies
- **Backend:** ASP.NET Core 8, controllers, scoped сервисы, кастомный middleware `GlobalExceptionHandlerMiddleware`, OpenAPI, CORS-политики, JSON-хранилище на основе `SemaphoreSlim`.
- **Frontend:** Angular 17 standalone, `@angular/core` signals + `takeUntilDestroyed`, HttpClient, router, общие стили.
- **Tooling:** Node.js/npm 11+ для Angular CLI, .NET SDK 8+ для API, `start-app.bat` для одновременного запуска.

## Initial Prompt (full text)
Пользователь предоставил контекст и описал проблему целиком:

```
# FILE CONTEXT
```typescript ProjectAssignmentManager.UI\src\environments\environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // HTTP вместо HTTPS
};

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
