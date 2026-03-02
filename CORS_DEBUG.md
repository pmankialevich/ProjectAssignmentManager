# 🔍 CORS DEBUGGING - Логирование запросов

## ✅ **ЧТО ДОБАВЛЕНО:**

### **Middleware для логирования CORS запросов:**

```csharp
app.Use(async (context, next) =>
{
    var origin = context.Request.Headers["Origin"].ToString();
    var method = context.Request.Method;
    var path = context.Request.Path;
    
    Console.WriteLine($"📡 {method} {path} from origin: {origin}");
    
    await next();
    
    Console.WriteLine($"   Response: {context.Response.StatusCode}");
});
```

**Теперь в консоли backend будет видно:**
- ✅ Откуда приходит запрос (Origin)
- ✅ Какой метод (GET, POST, PUT, DELETE)
- ✅ Какой путь (/api/developers)
- ✅ Какой статус ответа (200, 404, 500)

---

## 🚀 **ЧТО ДЕЛАТЬ:**

### **1. Остановите backend:**

```powershell
Get-Process -Name "dotnet" -ErrorAction SilentlyContinue | Stop-Process -Force
```

### **2. Перезапустите:**

```cmd
start-app.bat
```

### **3. Откройте окно "Backend API"**

Вы должны увидеть логи запросов:

```
📡 GET /api/developers from origin: http://localhost:4200
   Response: 200

📡 POST /api/developers from origin: http://localhost:4200
   Response: 201

📡 OPTIONS /api/developers from origin: http://localhost:4200
   Response: 204
```

### **4. Проверьте что видите origin**

**Если origin пустой:**
```
📡 GET /api/developers from origin: 
```

**Значит проблема в запросе с фронта!**

**Если origin есть:**
```
📡 GET /api/developers from origin: http://localhost:4200
```

**Значит CORS должен работать!**

---

## 📋 **ДИАГНОСТИКА:**

### **Сценарий 1: Origin пустой**

```
📡 GET /api/developers from origin: 
   Response: 200
```

**Проблема:** Запрос идет БЕЗ Origin header.

**Причина:** Запрос делается не из браузера ИЛИ с того же origin.

**Решение:** 
- Проверьте что Angular запущен на `http://localhost:4200`
- Проверьте что запрос идет через HttpClient, а не fetch без credentials

### **Сценарий 2: Origin есть, но CORS ошибка**

```
📡 OPTIONS /api/developers from origin: http://localhost:4200
   Response: 204

📡 GET /api/developers from origin: http://localhost:4200
   Response: 200
```

**Проблема:** Preflight (OPTIONS) проходит, но браузер все равно блокирует.

**Причина:** Response headers не содержат правильные CORS заголовки.

**Решение:**
- Убедитесь что `UseCors` идет ПЕРВЫМ
- Проверьте что в Response Headers есть `access-control-allow-origin`

### **Сценарий 3: Origin другой**

```
📡 GET /api/developers from origin: https://localhost:4200
   Response: 200
```

**Заметили?** Origin - `https` вместо `http`!

**Решение:** Уже работает! `SetIsOriginAllowed(_ => true)` разрешает любой origin.

---

## 🔍 **ПРОВЕРКА В БРАУЗЕРЕ:**

### **1. Откройте DevTools (F12)**

### **2. Network tab**

### **3. Найдите запрос к `/api/developers`**

### **4. Request Headers:**

```
Origin: http://localhost:4200
```

**Это должно быть!**

### **5. Response Headers:**

```
access-control-allow-origin: http://localhost:4200
access-control-allow-credentials: true
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: *
```

**Это тоже должно быть!**

---

## 🆘 **ЕСЛИ CORS ВСЕ ЕЩЕ НЕ РАБОТАЕТ:**

### **1. Проверьте логи backend:**

В окне "Backend API" должны быть логи:

```
📡 OPTIONS /api/developers from origin: http://localhost:4200
   Response: 204
📡 GET /api/developers from origin: http://localhost:4200
   Response: 200
```

### **2. Проверьте консоль браузера:**

Должно быть:
```
✅ GET https://localhost:5001/api/developers - 200 OK
```

Не должно быть:
```
❌ Access to XMLHttpRequest blocked by CORS policy
```

### **3. Проверьте environment.ts:**

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'  // ✅ HTTPS правильно!
};
```

### **4. Проверьте что сервисы используют правильный URL:**

```typescript
// developer.service.ts
private apiUrl = `${environment.apiUrl}/developers`;  // ✅ Правильно
```

---

## 💡 **ДОПОЛНИТЕЛЬНАЯ ДИАГНОСТИКА:**

### **Тест в консоли браузера:**

```javascript
// F12 → Console
fetch('https://localhost:5001/api/developers', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => {
  console.log('Status:', r.status);
  console.log('Headers:', [...r.headers.entries()]);
  return r.json();
})
.then(data => console.log('Data:', data))
.catch(err => console.error('Error:', err));
```

**Должно вернуть:**
```
Status: 200
Headers: [
  ["access-control-allow-origin", "http://localhost:4200"],
  ["access-control-allow-credentials", "true"],
  ...
]
Data: {success: true, data: [...]}
```

---

## 🎯 **ОЖИДАЕМЫЙ РЕЗУЛЬТАТ:**

### **В консоли Backend API:**

```
✅ Backend API ready!
✅ API URL: https://localhost:5001/

Now listening on: https://localhost:5001
Now listening on: http://localhost:5000

📡 OPTIONS /api/developers from origin: http://localhost:4200
   Response: 204
📡 GET /api/developers from origin: http://localhost:4200
   Response: 200
```

### **В консоли браузера (F12):**

```
✅ GET https://localhost:5001/api/developers - 200 OK
✅ Response: {success: true, data: [...]}
✅ Нет CORS ошибок
```

---

## 🎊 **ИТОГО:**

```
╔════════════════════════════════════════╗
║  ✅ Добавлено логирование CORS         ║
║  ✅ Backend собран                     ║
║  ✅ Можно диагностировать проблемы     ║
║  ✅ Commit сделан                      ║
╚════════════════════════════════════════╝
```

---

## 🚀 **ЗАПУСТИТЕ СЕЙЧАС:**

```powershell
# Остановите backend
Get-Process -Name "dotnet" | Stop-Process -Force

# Запустите
start-app.bat

# Смотрите в окно "Backend API" - там будут логи!
```

**Теперь вы увидите ЧТО именно происходит с CORS запросами!** 🔍

---

## 📝 **ПОСЛЕ ДИАГНОСТИКИ:**

Покажите мне логи из окна "Backend API", например:

```
📡 GET /api/developers from origin: http://localhost:4200
   Response: 200
```

И я помогу решить проблему если что-то не так!

---

**Перезапустите backend и смотрите логи!** 🔍🚀
