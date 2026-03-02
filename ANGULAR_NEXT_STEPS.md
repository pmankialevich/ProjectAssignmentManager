# 🚀 Angular Setup - Простые Шаги

## ✅ **Текущий Статус**
- ✅ Node.js установлен
- ⏳ Angular CLI - нужно установить
- ⏳ Angular App - нужно создать

---

## 📝 **ЧТО ДЕЛАТЬ ДАЛЬШЕ**

### **Вариант 1: Автоматический Скрипт** ⭐ **Рекомендуется!**

1. **Откройте PowerShell как Администратор**
   - Нажмите `Win + X`
   - Выберите "Windows PowerShell (Admin)" или "Terminal (Admin)"

2. **Перейдите в папку проекта**
   ```powershell
   cd C:\work\ProjectAssignmentManager
   ```

3. **Разрешите выполнение скриптов** (если попросит)
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

4. **Запустите скрипт установки**
   ```powershell
   .\setup-angular.ps1
   ```

**Скрипт автоматически:**
- ✅ Проверит Node.js
- ✅ Установит Angular CLI
- ✅ Создаст Angular приложение
- ✅ Создаст всю структуру папок
- ✅ Сгенерирует все сервисы
- ✅ Сгенерирует все компоненты

**Время: 10-15 минут**

---

### **Вариант 2: Ручная Установка** 

Если скрипт не работает, выполните команды вручную:

#### **1. Откройте обычный PowerShell (не в VS)**
- Нажмите `Win + X` → PowerShell

#### **2. Установите Angular CLI**
```powershell
npm install -g @angular/cli
```

#### **3. Проверьте установку**
```powershell
ng version
```

#### **4. Перейдите в папку проекта**
```powershell
cd C:\work\ProjectAssignmentManager
```

#### **5. Создайте Angular приложение**
```powershell
ng new ProjectAssignmentManager.UI --routing --style=css --standalone --skip-git
```

**На вопрос о SSR:** Ответьте `N`

#### **6. Перейдите в созданную папку**
```powershell
cd ProjectAssignmentManager.UI
```

#### **7. Создайте структуру папок**
```powershell
New-Item -ItemType Directory -Path "src\app\core\models" -Force
New-Item -ItemType Directory -Path "src\app\core\services" -Force
New-Item -ItemType Directory -Path "src\app\features\developers" -Force
New-Item -ItemType Directory -Path "src\app\features\projects" -Force
New-Item -ItemType Directory -Path "src\app\shared\components" -Force
New-Item -ItemType Directory -Path "src\environments" -Force
```

#### **8. Генерация сервисов**
```powershell
ng g service core/services/developer --skip-tests
ng g service core/services/project --skip-tests
ng g service core/services/assignment --skip-tests
```

#### **9. Генерация компонентов разработчиков**
```powershell
ng g component features/developers/developers-list --standalone --skip-tests
ng g component features/developers/developer-form --standalone --skip-tests
ng g component features/developers/developer-details --standalone --skip-tests
```

#### **10. Генерация компонентов проектов**
```powershell
ng g component features/projects/projects-list --standalone --skip-tests
ng g component features/projects/project-form --standalone --skip-tests
ng g component features/projects/project-details --standalone --skip-tests
```

#### **11. Генерация navbar**
```powershell
ng g component shared/components/navbar --standalone --skip-tests
```

---

## 🎯 **После Завершения**

Когда всё создано, напишите мне:
**"Структура создана!"**

И я помогу:
1. ✅ Автоматически скопировать весь код
2. ✅ Настроить конфигурацию
3. ✅ Запустить приложение

---

## 📂 **Что Получится**

```
ProjectAssignmentManager.UI/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/           (Создано ✅)
│   │   │   └── services/         (Создано ✅)
│   │   ├── features/
│   │   │   ├── developers/       (Создано ✅)
│   │   │   └── projects/         (Создано ✅)
│   │   └── shared/
│   │       └── components/       (Создано ✅)
│   └── environments/             (Создано ✅)
├── package.json                   (Angular CLI)
└── angular.json                   (Angular CLI)
```

---

## ⏱️ **Время Выполнения**

| Способ | Время |
|--------|-------|
| **Автоматический скрипт** | 10-15 мин |
| **Ручная установка** | 15-20 мин |

---

## 🆘 **Проблемы?**

### **Скрипт не запускается**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **ng команда не найдена**
```powershell
npm install -g @angular/cli --force
# Перезапустите PowerShell
```

### **Ошибки при создании приложения**
```powershell
npm cache clean --force
npm install -g @angular/cli
```

---

## 🚀 **НАЧНИТЕ ПРЯМО СЕЙЧАС!**

### **Рекомендуемый путь:**

1. Откройте PowerShell как Администратор
2. `cd C:\work\ProjectAssignmentManager`
3. `.\setup-angular.ps1`
4. Дождитесь завершения
5. Напишите "Готово!"

---

**После завершения установки я помогу скопировать код!** 😊
