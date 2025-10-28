# Решение проблемы CORS с Netlify Blobs

## Проблема

При использовании кастомного клиента (`NetlifyBlobsClient.js`) возникала CORS ошибка:

```
Origin https://kwt.pub is not allowed by Access-Control-Allow-Origin
Fetch API cannot load https://api.netlify.com/api/v1/sites/.../blobs/...
```

## Причина

Браузер блокирует прямые fetch запросы к `api.netlify.com` из-за политики CORS. Netlify API не разрешает прямые запросы из браузера к эндпоинтам Blobs.

## Решение

Переключились на **официальную библиотеку `@netlify/blobs`**, которая:

1. ✅ Правильно работает в браузере
2. ✅ Обходит CORS используя специальные прокси
3. ✅ Автоматически определяет окружение (dev/production)
4. ✅ Поддерживается Netlify официально

## Изменения в коде

### Было (кастомный клиент):

```javascript
import NetlifyBlobsClient from './NetlifyBlobsClient.js';

// Прямые fetch запросы к api.netlify.com
this.client = new NetlifyBlobsClient(siteID, token);
await this.client.get('topics');
```

### Стало (официальная библиотека):

```javascript
import { getStore } from '@netlify/blobs';

// Используем официальную библиотеку
this.store = getStore({
  name: 'learning-progress',
  siteID: siteID,
  token: token
});
await this.store.get('topics', { type: 'text' });
```

## Graceful degradation

Приложение теперь работает в 2 режимах:

### 1. С Netlify Blobs (если настроены переменные):
```
✅ Netlify Blobs хранилище инициализировано
✅ Данные сохранены в Netlify Blobs
```

### 2. Без Blobs (если переменные не настроены):
```
⚠️ Параметры Netlify Blobs не найдены, работаем без сохранения
📝 Работаем без облачного хранилища (только в памяти)
💾 Данные хранятся только в памяти (Blobs не настроен)
```

Приложение не падает, а продолжает работать в памяти.

## Дополнительно

Кастомный клиент `NetlifyBlobsClient.js` можно удалить, так как он больше не используется.

