# 🎨 Angular Frontend - Пошаговая Установка

## 📋 **Текущий Статус**

✅ **Backend**: Полностью готов, работает со Swagger UI  
✅ **Angular Code**: Весь код подготовлен в `ANGULAR_FILES/`  
⏳ **Node.js**: Требуется установка  
⏳ **Angular CLI**: Требуется установка после Node.js  
⏳ **Angular App**: Создадим после установки инструментов

---

## 🔧 **ШАГ 1: Установка Node.js**

### **1.1 Скачайте Node.js**

Перейдите по ссылке: **https://nodejs.org/**

**Выберите:**
- ✅ **LTS версию** (Long Term Support) - рекомендуется
- Например: **Node.js 20.x LTS** или новее

### **1.2 Установка на Windows**

1. Скачайте **Windows Installer (.msi)**
2. Запустите установщик
3. Нажмите **Next** → **Next** → **Install**
4. Важно: ✅ Отметьте галочку **"Automatically install necessary tools"**
5. Дождитесь завершения установки
6. Перезапустите PowerShell/Visual Studio

### **1.3 Проверка Установки**

После установки откройте **новый** PowerShell и выполните:

```powershell
node --version
# Ожидается: v20.x.x или выше

npm --version
# Ожидается: 10.x.x или выше
```

Если видите версии - ✅ **Node.js установлен успешно!**

---

## 🔧 **ШАГ 2: Установка Angular CLI**

После успешной установки Node.js выполните:

```powershell
npm install -g @angular/cli
```

**Это может занять 2-3 минуты.**

### **2.1 Проверка Установки Angular CLI**

```powershell
ng version
```

**Ожидается:**
```
Angular CLI: 19.x.x
Node: 20.x.x
Package Manager: npm 10.x.x
OS: win32 x64
```

Если видите это - ✅ **Angular CLI установлен успешно!**

---

## 🎨 **ШАГ 3: Создание Angular Приложения**

### **3.1 Перейдите в Корневую Папку Проекта**

```powershell
cd C:\work\ProjectAssignmentManager
```

### **3.2 Создайте Angular Приложение**

```powershell
ng new ProjectAssignmentManager.UI --routing --style=css --standalone --skip-git
```

**Что значат эти флаги:**
- `--routing` - Добавить Angular Router
- `--style=css` - Использовать CSS для стилей
- `--standalone` - Использовать standalone компоненты (современный подход)
- `--skip-git` - Не создавать новый git репозиторий (уже есть)

### **3.3 Ответьте на Вопросы**

Angular CLI может спросить:
```
? Would you like to enable Server-Side Rendering (SSR) and Static Site 
  Generation (SSG/Prerendering)? (y/N)
```

**Ответьте:** `N` (нажмите Enter)

**Процесс создания займет 3-5 минут.**

### **3.4 Перейдите в Созданную Папку**

```powershell
cd ProjectAssignmentManager.UI
```

---

## 📁 **ШАГ 4: Создание Структуры Папок**

Выполните эти команды по очереди:

```powershell
# Создаем папки для моделей
New-Item -ItemType Directory -Path "src\app\core\models" -Force

# Создаем папки для сервисов
New-Item -ItemType Directory -Path "src\app\core\services" -Force

# Создаем папки для компонентов разработчиков
New-Item -ItemType Directory -Path "src\app\features\developers" -Force

# Создаем папки для компонентов проектов
New-Item -ItemType Directory -Path "src\app\features\projects" -Force

# Создаем папки для общих компонентов
New-Item -ItemType Directory -Path "src\app\shared\components" -Force

# Создаем папку для environments
New-Item -ItemType Directory -Path "src\environments" -Force
```

---

## 🎯 **ШАГ 5: Генерация Сервисов**

Выполните эти команды:

```powershell
# Генерируем сервис для разработчиков
ng generate service core/services/developer --skip-tests

# Генерируем сервис для проектов
ng generate service core/services/project --skip-tests

# Генерируем сервис для назначений
ng generate service core/services/assignment --skip-tests
```

---

## 🎯 **ШАГ 6: Генерация Компонентов**

### **6.1 Компоненты Разработчиков**

```powershell
ng generate component features/developers/developers-list --standalone --skip-tests
ng generate component features/developers/developer-form --standalone --skip-tests
ng generate component features/developers/developer-details --standalone --skip-tests
```

### **6.2 Компоненты Проектов**

```powershell
ng generate component features/projects/projects-list --standalone --skip-tests
ng generate component features/projects/project-form --standalone --skip-tests
ng generate component features/projects/project-details --standalone --skip-tests
```

### **6.3 Общие Компоненты**

```powershell
ng generate component shared/components/navbar --standalone --skip-tests
```

---

## 📝 **ШАГ 7: Копирование Кода**

Теперь нужно скопировать код из папки `ANGULAR_FILES/` в созданные файлы.

### **Структура Копирования:**

```
ANGULAR_FILES/models.ts
    ↓ Разделить на 3 файла:
    → src/app/core/models/developer.model.ts
    → src/app/core/models/project.model.ts
    → src/app/core/models/api-response.model.ts

ANGULAR_FILES/services.ts
    ↓ Разделить на 3 файла:
    → src/app/core/services/developer.service.ts
    → src/app/core/services/project.service.ts
    → src/app/core/services/assignment.service.ts

ANGULAR_FILES/environment.ts
    → src/environments/environment.ts

ANGULAR_FILES/app.routes.ts
    → src/app/app.routes.ts

ANGULAR_FILES/app.component.ts
    → src/app/app.component.ts

ANGULAR_FILES/navbar.component.ts
    → Разделить на 3 файла компонента navbar

ANGULAR_FILES/developers-list.component.ts
    → Разделить на 3 файла компонента developers-list

ANGULAR_FILES/additional-components.md
    → Скопировать developer-form и developer-details

ANGULAR_FILES/projects-components.md
    → Скопировать все 3 project компонента
```

---

## ⚡ **БЫСТРЫЙ ПУТЬ: После Установки Node.js**

Если вы уже установили Node.js и Angular CLI, выполните все команды одним блоком:

```powershell
# 1. Создать приложение
cd C:\work\ProjectAssignmentManager
ng new ProjectAssignmentManager.UI --routing --style=css --standalone --skip-git
cd ProjectAssignmentManager.UI

# 2. Создать структуру папок
New-Item -ItemType Directory -Path "src\app\core\models" -Force
New-Item -ItemType Directory -Path "src\app\core\services" -Force
New-Item -ItemType Directory -Path "src\app\features\developers" -Force
New-Item -ItemType Directory -Path "src\app\features\projects" -Force
New-Item -ItemType Directory -Path "src\app\shared\components" -Force
New-Item -ItemType Directory -Path "src\environments" -Force

# 3. Генерация сервисов
ng g service core/services/developer --skip-tests
ng g service core/services/project --skip-tests
ng g service core/services/assignment --skip-tests

# 4. Генерация компонентов разработчиков
ng g component features/developers/developers-list --standalone --skip-tests
ng g component features/developers/developer-form --standalone --skip-tests
ng g component features/developers/developer-details --standalone --skip-tests

# 5. Генерация компонентов проектов
ng g component features/projects/projects-list --standalone --skip-tests
ng g component features/projects/project-form --standalone --skip-tests
ng g component features/projects/project-details --standalone --skip-tests

# 6. Генерация общих компонентов
ng g component shared/components/navbar --standalone --skip-tests
```

---

## 📋 **Чеклист Установки**

- [ ] Node.js установлен (v20+)
- [ ] npm доступен
- [ ] Angular CLI установлен
- [ ] Angular приложение создано
- [ ] Структура папок создана
- [ ] Сервисы сгенерированы
- [ ] Компоненты сгенерированы
- [ ] Готовы копировать код

---

## 🆘 **Возможные Проблемы**

### **Проблема 1: Node.js не найден после установки**
**Решение:** Перезапустите PowerShell или Visual Studio

### **Проблема 2: ng команда не найдена**
**Решение:** 
```powershell
npm install -g @angular/cli --force
```

### **Проблема 3: Ошибки при создании приложения**
**Решение:** Очистите npm cache:
```powershell
npm cache clean --force
npm install -g @angular/cli
```

---

## ✅ **Следующие Шаги**

После завершения установки:

1. ✅ Сообщите мне, и я помогу скопировать код
2. ✅ Или следуйте **CHECKLIST.md** для копирования кода вручную
3. ✅ Затем запустим приложение: `ng serve`

---

## 🎯 **Финальная Цель**

После всех шагов у вас будет:

```
Terminal 1: Backend API + Swagger
https://localhost:5001/

Terminal 2: Angular Frontend
http://localhost:4200/
```

**Полнофункциональное Full-Stack приложение!** 🎉

---

**Начните с установки Node.js, затем продолжим!** 😊
