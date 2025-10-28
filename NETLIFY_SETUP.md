# Настройка Netlify Blobs для проекта

## 1. Установка Netlify CLI

```bash
npm install -g netlify-cli
```

## 2. Авторизация в Netlify

```bash
netlify login
```

## 3. Связывание проекта с сайтом

```bash
netlify link
```

Выберите ваш сайт из списка или введите Site ID.

## 4. Получение необходимых параметров

### Site ID:
1. Зайдите в [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт
3. Перейдите в **Site settings** → **General** → **Site details**
4. Скопируйте **Site ID**

### Blobs Token:
1. В Netlify Dashboard перейдите в **Site settings** → **API keys**
2. Скопируйте токен (например: `c1fb9773-760d-45d2-afef-b71816c8e0a5`)

## 5. Настройка переменных окружения

### Для локальной разработки:
1. Скопируйте файл `env.example` в `.env.local`
2. Заполните значения:
```bash
cp env.example .env.local
```

3. Отредактируйте `.env.local`:
```
VITE_NETLIFY_SITE_ID=ваш-site-id
VITE_NETLIFY_BLOBS_TOKEN=ваш-blobs-token
```

### Для продакшена в Netlify Dashboard:
1. Перейдите в **Site settings** → **Environment variables**
2. Добавьте переменные:
   - **Key**: `VITE_NETLIFY_SITE_ID`, **Value**: ваш Site ID
   - **Key**: `VITE_NETLIFY_BLOBS_TOKEN`, **Value**: ваш Blobs Token

## 6. Настройка Blobs Storage

1. В Netlify Dashboard перейдите в **Site settings** → **Storage**
2. Включите **Blobs** если еще не включено
3. Создайте новое хранилище с именем `learning-progress`

## 7. Локальная разработка

Для локальной разработки используйте:

```bash
npm run netlify-dev
```

Или обычный dev сервер (с переменными из .env.local):

```bash
npm run dev
```

## 8. Проверка конфигурации

Создайте тестовый файл для проверки:

```javascript
// test-blobs.js
import { getStore } from '@netlify/blobs';

const siteID = 'your-site-id';
const token = 'your-blobs-token';

const store = getStore({
  name: 'learning-progress',
  siteID: siteID,
  token: token
});

// Тест записи
await store.set('test', 'Hello Blobs!');

// Тест чтения
const data = await store.get('test');
console.log(data); // Должно вывести: Hello Blobs!
```

## 9. Деплой

```bash
netlify deploy --prod
```

## Возможные проблемы и решения

### Ошибка: "MissingBlobsEnvironmentError"
- Убедитесь, что передаете `siteID` и `token` при создании хранилища
- Проверьте переменные окружения `VITE_NETLIFY_SITE_ID` и `VITE_NETLIFY_BLOBS_TOKEN`

### Ошибка: "Blobs not configured"
- Убедитесь, что Blobs включены в настройках сайта
- Проверьте переменную окружения `VITE_NETLIFY_BLOBS_TOKEN`

### Ошибка: "Store not found"
- Создайте хранилище `learning-progress` в Netlify Dashboard
- Или используйте существующее хранилище

### Ошибка при локальной разработке
- Используйте `netlify dev` вместо обычного dev сервера
- Убедитесь, что проект связан с сайтом (`netlify link`)
- Проверьте файл `.env.local` с правильными значениями

## Структура проекта

```
project/
├── netlify.toml          # Конфигурация Netlify
├── .env.local           # Локальные переменные окружения (не коммитить!)
├── env.example          # Пример переменных окружения
├── src/
│   └── services/
│       └── progress/    # Классы для работы с прогрессом
└── package.json
```

## Важные замечания

- **НЕ коммитьте** файл `.env.local` в git!
- Используйте префикс `VITE_` для переменных, доступных в браузере
- Для продакшена настройте переменные в Netlify Dashboard
