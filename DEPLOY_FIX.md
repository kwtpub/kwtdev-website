# Деплой исправленной версии на Netlify

## Что было исправлено

✅ Заменен кастомный клиент на официальную библиотеку `@netlify/blobs`  
✅ Исправлена проблема CORS  
✅ Добавлен graceful degradation (работает без Blobs)

## Шаги для деплоя

### 1. Закоммитьте изменения

```bash
cd /Users/a1/Desktop/Repository/kwtDevWebsite

# Проверьте изменения
git status

# Добавьте файлы
git add .

# Закоммитьте
git commit -m "Fix CORS: switch to official @netlify/blobs library"

# Запушьте на Netlify
git push origin main
```

### 2. Настройте переменные окружения в Netlify

Если еще не настроили, откройте [Netlify Dashboard](https://app.netlify.com/):

1. Выберите сайт **kwt.pub**
2. **Site settings** → **Build & deploy** → **Environment**
3. Добавьте переменные:

```
VITE_NETLIFY_SITE_ID = c1fb9773-760d-45d2-afef-b71816c8e0a5
VITE_NETLIFY_BLOBS_TOKEN = ваш-токен
```

### 3. Дождитесь автоматического деплоя

Netlify автоматически запустит деплой после push в main.

Или вручную в Dashboard:
- **Deploys** → **Trigger deploy** → **Deploy site**

### 4. Проверьте работу

Откройте https://kwt.pub и консоль браузера (F12):

**Ожидаемый результат:**
```
✅ Netlify Blobs хранилище инициализировано
✅ Загружено 0 тем из Netlify Blobs
```

**Или (если переменные не настроены):**
```
⚠️ Параметры Netlify Blobs не найдены, работаем без сохранения
📝 Работаем без облачного хранилища (только в памяти)
```

**Не должно быть:**
```
❌ Origin https://kwt.pub is not allowed by Access-Control-Allow-Origin
❌ Fetch API cannot load https://api.netlify.com/...
```

---

## Быстрая команда для деплоя

```bash
cd /Users/a1/Desktop/Repository/kwtDevWebsite && \
git add . && \
git commit -m "Fix CORS: switch to official @netlify/blobs" && \
git push origin main
```

Готово! 🚀

