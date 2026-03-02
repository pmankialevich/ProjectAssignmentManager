# 🚀 Запуск Backend + Frontend Одновременно

## 📋 **ДОСТУПНЫЕ СПОСОБЫ ЗАПУСКА**

---

## **Способ 1: PowerShell Скрипт** ⭐ **РЕКОМЕНДУЕТСЯ!**

### **Одна команда в корне проекта:**

```powershell
.\start-app.ps1
```

**Что происходит:**
- ✅ Проверяет наличие Angular dependencies
- ✅ Копирует template файлы
- ✅ Запускает Backend в отдельном окне
- ✅ Запускает Frontend в отдельном окне
- ✅ Автоматически открывает браузер

**Результат:**
- Backend: `https://localhost:5001/` (Swagger UI)
- Frontend: `http://localhost:4200/` (Angular App)

---

## **Способ 2: Batch Файл (Windows)**

### **Двойной клик или команда:**

```cmd
start-app.bat
```

**Что происходит:**
- ✅ Запускает Backend в новом cmd окне
- ✅ Запускает Frontend в новом cmd окне
- ✅ Оба сервера работают независимо

---

## **Способ 3: Только Backend (Angular запустится автоматически)**

### **Запустите только Backend:**

```powershell
cd ProjectAssignmentManager.API
dotnet run
```

**Что происходит:**
- ✅ Backend запускается
- ✅ Swagger UI открывается
- ✅ **Angular автоматически запускается в новом окне!** 🎉

> **Примечание:** Работает только в Development режиме

---

## **Способ 4: NPM Scripts (Продвинутый)**

### **Установите зависимости один раз:**

```powershell
npm install
```

### **Запуск обоих приложений:**

```powershell
npm start
```

**Другие команды:**

```powershell
# Только Backend
npm run start:api

# Только Frontend
npm run start:ui

# Build обоих
npm run build

# Установка UI зависимостей
npm run install:ui

# Полная настройка
npm run setup
```

---

## **Способ 5: Visual Studio**

### **Через Visual Studio 2026:**

1. Откройте `ProjectAssignmentManager.sln`
2. Нажмите **F5** или **"Start Debugging"**
3. Backend запустится, Angular запустится автоматически
4. Оба откроются в браузере

---

## **Способ 6: VS Code Tasks**

Если используете VS Code, создайте `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "dotnet run",
      "options": {
        "cwd": "${workspaceFolder}/ProjectAssignmentManager.API"
      },
      "isBackground": true
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "ng serve --open",
      "options": {
        "cwd": "${workspaceFolder}/ProjectAssignmentManager.UI"
      },
      "isBackground": true
    },
    {
      "label": "Start Full Stack",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "problemMatcher": []
    }
  ]
}
```

Затем: **Ctrl+Shift+P** → **Tasks: Run Task** → **Start Full Stack**

---

## 🎯 **БЫСТРЫЙ СТАРТ (ПЕРВЫЙ РАЗ)**

### **1. Установка зависимостей:**

```powershell
# Angular зависимости
cd ProjectAssignmentManager.UI
npm install
cd ..

# NPM scripts (опционально)
npm install
```

### **2. Копирование templates:**

```powershell
cd ProjectAssignmentManager.UI
.\copy-all-templates.ps1
cd ..
```

### **3. Запуск:**

```powershell
# Выберите любой способ:

# Способ 1: PowerShell скрипт
.\start-app.ps1

# Способ 2: Batch файл
.\start-app.bat

# Способ 3: NPM
npm start

# Способ 4: Только Backend (Angular запустится сам)
cd ProjectAssignmentManager.API
dotnet run
```

---

## 🔧 **НАСТРОЙКА АВТОЗАПУСКА**

### **Настройки в Program.cs**

Автозапуск Angular настроен в `Program.cs`:

```csharp
// Auto-start Angular development server
if (app.Environment.IsDevelopment())
{
    StartAngularDevServer();
}
```

**Отключить автозапуск:**

Закомментируйте строку:
```csharp
// StartAngularDevServer();
```

**Изменить порт Angular:**

В `ProjectAssignmentManager.UI/angular.json`:
```json
"serve": {
  "options": {
    "port": 4200
  }
}
```

---

## 📊 **СРАВНЕНИЕ СПОСОБОВ**

| Способ | Удобство | Скорость | Автоматизация |
|--------|----------|----------|---------------|
| PowerShell скрипт | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Batch файл | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Только Backend | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| NPM scripts | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Visual Studio | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| VS Code Tasks | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🆘 **TROUBLESHOOTING**

### **Проблема: Angular не запускается автоматически**

**Решение 1:** Проверьте наличие node_modules:
```powershell
cd ProjectAssignmentManager.UI
npm install
```

**Решение 2:** Запустите вручную:
```powershell
cd ProjectAssignmentManager.UI
ng serve
```

### **Проблема: Порт 5001 или 4200 занят**

**Backend (5001):**

В `ProjectAssignmentManager.API/Properties/launchSettings.json`:
```json
"applicationUrl": "https://localhost:5002;http://localhost:5001"
```

**Frontend (4200):**

```powershell
ng serve --port 4300
```

### **Проблема: CORS ошибки**

Убедитесь, что в `environment.ts` правильный URL:
```typescript
apiUrl: 'https://localhost:5001/api'
```

---

## ✨ **ДОПОЛНИТЕЛЬНЫЕ КОМАНДЫ**

### **Остановить все процессы:**

```powershell
# Остановить все dotnet процессы
Get-Process -Name "dotnet" | Stop-Process -Force

# Остановить node процессы
Get-Process -Name "node" | Stop-Process -Force
```

### **Проверить что работает:**

```powershell
# Backend
curl https://localhost:5001/api/developers

# Frontend
Start-Process "http://localhost:4200"
```

### **Логи:**

```powershell
# Backend логи
cd ProjectAssignmentManager.API
dotnet run --verbosity detailed

# Angular логи
cd ProjectAssignmentManager.UI
ng serve --verbose
```

---

## 🎉 **РЕКОМЕНДУЕМЫЙ WORKFLOW**

### **Для разработки:**

1. **Первый запуск:**
   ```powershell
   .\start-app.ps1
   ```

2. **Ежедневная работа:**
   ```powershell
   cd ProjectAssignmentManager.API
   dotnet run
   # Angular запустится автоматически
   ```

### **Для демонстрации:**

```powershell
.\start-app.ps1
```
Откроется оба окна, браузер с обоими приложениями.

### **Для тестирования:**

```powershell
# Terminal 1: Backend с логами
cd ProjectAssignmentManager.API
dotnet run

# Terminal 2: Frontend с логами
cd ProjectAssignmentManager.UI
ng serve
```

---

## 📝 **ЧЕКЛИСТ ПЕРВОГО ЗАПУСКА**

- [ ] Node.js установлен (`node --version`)
- [ ] Angular CLI установлен (`ng version`)
- [ ] .NET 10 SDK установлен (`dotnet --version`)
- [ ] Git репозиторий склонирован
- [ ] Angular зависимости установлены (`npm install` в UI папке)
- [ ] Templates скопированы (`.\copy-all-templates.ps1`)
- [ ] Backend компилируется (`dotnet build` в API папке)
- [ ] Выбран способ запуска
- [ ] Запущены оба приложения
- [ ] Backend доступен: `https://localhost:5001/`
- [ ] Frontend доступен: `http://localhost:4200/`
- [ ] Приложение работает! 🎉

---

## 🚀 **ИТОГО: САМЫЙ ПРОСТОЙ СПОСОБ**

```powershell
# В корне проекта
.\start-app.ps1
```

**ИЛИ**

```powershell
# Запустите только Backend - Angular запустится сам!
cd ProjectAssignmentManager.API
dotnet run
```

**Всё! Оба приложения работают!** 🎊

---

*Обновлено: 2026-03-02*  
*Автозапуск Angular добавлен в Program.cs*  
*Несколько способов запуска на выбор*
