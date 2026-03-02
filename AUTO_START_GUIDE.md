# 🚀 ОДИН КЛИК - ВСЁ ЗАПУСКАЕТСЯ!

## ✅ **ГОТОВО! АВТОЗАПУСК НАСТРОЕН!**

Теперь при запуске backend **автоматически**:
- ✅ Запускается Angular dev server
- ✅ Открывается браузер с фронтом
- ✅ Оба сервера работают одновременно

---

## 🎯 **КАК ЗАПУСТИТЬ:**

### **Способ 1: Через Visual Studio** ⭐ **САМЫЙ ПРОСТОЙ!**

1. Откройте `ProjectAssignmentManager.sln` в Visual Studio
2. Нажмите **F5** или кнопку **▶ Start**
3. **ВСЁ!** Backend и Frontend запустятся автоматически!

### **Способ 2: Через командную строку**

```powershell
cd ProjectAssignmentManager.API
dotnet run
```

**Angular запустится автоматически!** 🎉

### **Способ 3: Батник (двойной клик)**

Двойной клик на: `start-app.bat`

---

## 📺 **ЧТО ПРОИЗОЙДЁТ:**

```
1. Backend запускается на https://localhost:5001/
2. Автоматически открывается CMD с Angular
3. Angular компилируется (10-15 сек)
4. Браузер открывается на http://localhost:4200/
5. Приложение работает! 🎊
```

### **Вы увидите в консоли:**

```
✅ Angular dev server starting...
✅ Frontend will open at: http://localhost:4200/
✅ Backend API running at: https://localhost:5001/
```

---

## 🌐 **URLs:**

- **Frontend (Angular):** http://localhost:4200/
- **Backend API:** https://localhost:5001/
- **OpenAPI JSON:** https://localhost:5001/openapi/v1.json

---

## 🎮 **ЧТО МОЖНО ДЕЛАТЬ:**

### **В браузере (http://localhost:4200/):**

1. **Developers** - управление разработчиками
   - Создать нового
   - Редактировать
   - Удалить
   - Просмотреть детали и проекты

2. **Projects** - управление проектами
   - Создать новый
   - Редактировать
   - Удалить
   - Просмотреть детали и назначенных разработчиков

3. **Assignments** - назначение разработчиков на проекты
   - В деталях проекта - добавить разработчика
   - В деталях разработчика - добавить проект

---

## 📋 **ПЕРВЫЙ ЗАПУСК (ЕСЛИ ЕЩЁ НЕ УСТАНОВЛЕНЫ ЗАВИСИМОСТИ):**

### **1. Установите Angular зависимости (один раз):**

```powershell
cd ProjectAssignmentManager.UI
npm install
cd ..
```

### **2. Скопируйте templates (один раз):**

```powershell
cd ProjectAssignmentManager.UI
.\copy-all-templates.ps1
cd ..
```

### **3. Запустите backend:**

```powershell
cd ProjectAssignmentManager.API
dotnet run
```

**Angular запустится сам!** 🚀

---

## 🎯 **ДЕМО СЦЕНАРИЙ:**

После запуска попробуйте:

### **1. Создайте разработчиков:**
- Alice Smith (Junior) - alice@example.com
- Bob Johnson (Senior) - bob@example.com
- Charlie Brown (Lead) - charlie@example.com

### **2. Создайте проекты:**
- E-Commerce Platform
- Mobile Application
- Admin Dashboard

### **3. Назначьте:**
- Alice → E-Commerce Platform
- Bob → E-Commerce Platform + Mobile App
- Charlie → все проекты

### **4. Проверьте:**
- Откройте детали Bob - увидите 2 проекта
- Откройте E-Commerce Platform - увидите Alice и Bob

---

## 🆘 **TROUBLESHOOTING:**

### **Проблема: "Angular dependencies not installed"**

**Решение:**
```powershell
cd ProjectAssignmentManager.UI
npm install
cd ..
```

### **Проблема: Порт 4200 занят**

**Решение 1:** Остановите другой Angular процесс:
```powershell
Get-Process -Name "node" | Stop-Process -Force
```

**Решение 2:** Запустите на другом порту:
```powershell
cd ProjectAssignmentManager.UI
ng serve --port 4300
```

### **Проблема: Порт 5001 занят**

**Решение:**
```powershell
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### **Проблема: CORS ошибки**

Проверьте `ProjectAssignmentManager.UI/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'  // ← Должен быть правильный URL
};
```

---

## 🎊 **ВСЁ РАБОТАЕТ!**

```
╔═══════════════════════════════════════════╗
║  🚀 АВТОЗАПУСК НАСТРОЕН!                  ║
╠═══════════════════════════════════════════╣
║  1. Запустите backend                     ║
║  2. Angular запустится автоматически      ║
║  3. Браузер откроется автоматически       ║
║  4. Используйте приложение!               ║
╚═══════════════════════════════════════════╝
```

---

## 🚀 **ЗАПУСК ПРЯМО СЕЙЧАС:**

### **В Visual Studio:**
Нажмите **F5**

### **В PowerShell:**
```powershell
cd ProjectAssignmentManager.API
dotnet run
```

### **Двойной клик:**
`start-app.bat`

---

**Всё запустится автоматически! Наслаждайтесь!** 🎉

---

## 📖 **ДОПОЛНИТЕЛЬНАЯ ДОКУМЕНТАЦИЯ:**

- `LAUNCH_NOW.md` - быстрый старт
- `SUCCESS_READY_TO_RUN.md` - подробное описание
- `START_GUIDE.md` - разные способы запуска
- `README.md` - обзор проекта

---

*Backend запустит Frontend автоматически!* ⚡  
*Один запуск - оба сервера!* 🚀  
*Браузер откроется сам!* 🎊
