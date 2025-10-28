# Быстрая настройка Netlify Blobs

## Шаг 1: Получите параметры из Netlify Dashboard

### Site ID:
1. Откройте [Netlify Dashboard](https://app.netlify.com/)
2. Выберите ваш сайт
3. Перейдите в **Site settings** → **General** → **Site details**
4. Скопируйте **Site ID** (выглядит как: `abc123-456def-789ghi`)

### Blobs Token:
1. В том же разделе перейдите в **Site settings** → **API keys**
2. Создайте новый API токен или скопируйте существующий
3. Это UUID вида: `c1fb9773-760d-45d2-afef-b71816c8e0a5`

## Шаг 2: Настройте локальное окружение

Создайте файл `.env.local` в корне проекта:

```bash
# Скопируйте пример
cp env.example .env.local
```

Откройте `.env.local` и замените значения:

```bash
VITE_NETLIFY_SITE_ID=ваш-реальный-site-id
VITE_NETLIFY_BLOBS_TOKEN=ваш-реальный-token
```

## Шаг 3: Настройте переменные в Netlify (для продакшена)

1. Откройте **Site settings** → **Environment variables**
2. Добавьте две переменные:
   - `VITE_NETLIFY_SITE_ID` = ваш Site ID
   - `VITE_NETLIFY_BLOBS_TOKEN` = ваш Token

## Шаг 4: Запустите проект

```bash
# Установите зависимости (если еще не сделали)
npm install

# Запустите dev сервер
npm run dev
```

## Проверка подключения

При запуске приложения откройте консоль браузера. Вы должны увидеть:

✅ `Netlify Blobs клиент инициализирован с параметрами`

Если видите ошибку:
❌ `Параметры Netlify Blobs не найдены`

Проверьте:
1. Файл `.env.local` существует в корне проекта
2. Переменные правильно названы (с префиксом `VITE_`)
3. Перезапустите dev сервер после изменения `.env.local`

## Тестирование

Используйте тестовый скрипт:

```bash
npm run test-blobs
```

## Важно

- ❌ **НЕ коммитьте** `.env.local` в git (уже в `.gitignore`)
- ✅ Всегда используйте префикс `VITE_` для переменных в браузере
- ✅ Для продакшена настройте переменные в Netlify Dashboard, а не в `netlify.toml`

