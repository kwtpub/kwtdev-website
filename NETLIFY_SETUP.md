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

## 4. Настройка переменных окружения в Netlify Dashboard

1. Зайдите в [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт
3. Перейдите в **Site settings** → **Environment variables**
4. Добавьте переменную:
   - **Key**: `NETLIFY_BLOBS_TOKEN`
   - **Value**: Получите токен в разделе **Site settings** → **API keys**

## 5. Настройка Blobs Storage

1. В Netlify Dashboard перейдите в **Site settings** → **Storage**
2. Включите **Blobs** если еще не включено
3. Создайте новое хранилище с именем `learning-progress`

## 6. Локальная разработка

Для локальной разработки используйте:

```bash
netlify dev
```

Это запустит локальный сервер с поддержкой Blobs.

## 7. Проверка конфигурации

Создайте тестовый файл для проверки:

```javascript
// test-blobs.js
import { getStore } from '@netlify/blobs';

const store = getStore('learning-progress');

// Тест записи
await store.set('test', 'Hello Blobs!');

// Тест чтения
const data = await store.get('test');
console.log(data); // Должно вывести: Hello Blobs!
```

## 8. Деплой

```bash
netlify deploy --prod
```

## Возможные проблемы и решения

### Ошибка: "Blobs not configured"
- Убедитесь, что Blobs включены в настройках сайта
- Проверьте переменную окружения `NETLIFY_BLOBS_TOKEN`

### Ошибка: "Store not found"
- Создайте хранилище `learning-progress` в Netlify Dashboard
- Или используйте существующее хранилище

### Ошибка при локальной разработке
- Используйте `netlify dev` вместо обычного dev сервера
- Убедитесь, что проект связан с сайтом (`netlify link`)

## Структура проекта

```
project/
├── netlify.toml          # Конфигурация Netlify
├── src/
│   └── services/
│       └── progress/     # Классы для работы с прогрессом
└── package.json
```
