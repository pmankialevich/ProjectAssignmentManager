# 🔧 ИСПРАВЛЕНИЕ: ERR_CONNECTION_REFUSED

## ❌ **ПРОБЛЕМА:**
```
GET https://localhost:5001/api/developers net::ERR_CONNECTION_REFUSED
```

Angular не может подключиться к Backend API.

---

## ✅ **ПРИЧИНЫ И РЕШЕНИЯ:**

### **Причина 1: Backend не запущен**

**Решение:**
```powershell
cd ProjectAssignmentManager.API
dotnet run
```

Дождитесь сообщения:
```
Now listening on: https://localhost:5001
```

### **Причина 2: HTTPS сертификат не доверенный**

**Решение: Установите dev-сертификат**

```powershell
dotnet dev-certs https --trust
```

Нажмите "Yes" в диалоговом окне.

### **Причина 3: Angular запустился быстрее чем Backend**

**Решение: Используйте обновленный launcher**

```powershell
.\start-app.bat
```

Теперь ждет 10 секунд перед запуском Angular!

---

## 🚀 **ПРАВИЛЬНЫЙ ПОРЯДОК ЗАПУСКА:**

### **Способ 1: Автоматический (Рекомендуется)**

```powershell
# 1. Установите dev-сертификат (один раз)
dotnet dev-certs https --trust

# 2. Запустите launcher
.\start-app.bat
```

Launcher теперь:
- ✅ Запустит backend
- ✅ Подождет 10 секунд
- ✅ Запустит Angular
- ✅ Откроет браузер

### **Способ 2: Вручную (2 терминала)**

**Terminal 1 - Backend:**
```powershell
cd ProjectAssignmentManager.API
dotnet run
```

**Дождитесь:**
```
Now listening on: https://localhost:5001
Now listening on: http://localhost:5000
```

**Terminal 2 - Frontend:**
```powershell
cd ProjectAssignmentManager.UI
ng serve --open
```

---

## 🔍 **ПРОВЕРКА ПОДКЛЮЧЕНИЯ:**

### **1. Проверьте что backend работает:**

Откройте в браузере: https://localhost:5001/api/developers

**Ожидается:**
```json
{
  "success": true,
  "data": [],
  "message": "Operation successful"
}
```

### **2. Проверьте environment.ts:**

`ProjectAssignmentManager.UI/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'  // ← правильный!
};
```

### **3. Проверьте консоль браузера (F12):**

Не должно быть ошибок CORS или 404.

---

## 🆘 **ЕСЛИ ВСЕ ЕЩЕ НЕ РАБОТАЕТ:**

### **Проблема: Порт занят**

**Проверка:**
```powershell
netstat -ano | findstr :5001
```

**Решение:**
```powershell
# Найдите PID и остановите
taskkill /PID <PID> /F
```

### **Проблема: Firewall блокирует**

**Решение:**
```powershell
# Разрешите порты в Windows Firewall
netsh advfirewall firewall add rule name="ASP.NET Dev" dir=in action=allow protocol=TCP localport=5001
```

### **Проблема: Angular кэширует старый URL**

**Решение:**
```powershell
# Очистите кэш Angular
cd ProjectAssignmentManager.UI
rm -rf .angular
ng serve
```

---

## 📋 **БЫСТРЫЙ ФИКС (COPY-PASTE):**

```powershell
# 1. Доверие к сертификату
dotnet dev-certs https --trust

# 2. Остановите все процессы
Get-Process -Name "dotnet","node" -ErrorAction SilentlyContinue | Stop-Process -Force

# 3. Запустите launcher
.\start-app.bat
```

---

## ✅ **ПОСЛЕ ИСПРАВЛЕНИЯ:**

1. Backend запустится на https://localhost:5001
2. Через 10 секунд запустится Angular
3. Браузер откроется на http://localhost:4200/
4. Данные загрузятся из API

**Никаких ERR_CONNECTION_REFUSED!** ✨

---

## 🎊 **ГОТОВО!**

```
╔════════════════════════════════════════╗
║  ✅ Backend: https://localhost:5001    ║
║  ✅ Frontend: http://localhost:4200    ║
║  ✅ Подключение работает!              ║
╚════════════════════════════════════════╝
```

**Просто запустите `start-app.bat` и всё заработает!** 🚀
