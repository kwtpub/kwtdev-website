# Быстрый старт - Netlify Blobs

## 1. Создайте файл `.env.local`

```bash
cp env.example .env.local
```

## 2. Получите параметры из Netlify

### Site ID:
- Откройте [Netlify Dashboard](https://app.netlify.com/)
- Выберите сайт → **Site settings** → **General** → **Site details**
- Скопируйте **Site ID**

### API Token:
- **Site settings** → **API keys**
- Скопируйте или создайте новый токен

## 3. Заполните `.env.local`

```bash
VITE_NETLIFY_SITE_ID=abc123-456def-789ghi
VITE_NETLIFY_BLOBS_TOKEN=c1fb9773-760d-45d2-afef-b71816c8e0a5
```

## 4. Протестируйте подключение

```bash
npm run test-blobs
```

Ожидаемый результат:
```
✅ Хранилище создано с параметрами
✅ Запись успешна
✅ Чтение успешно
✅ Удаление успешно
🎉 Все тесты прошли успешно!
```

## 5. Запустите проект

```bash
npm run dev
```

Откройте консоль браузера, должны увидеть:
```
✅ Netlify Blobs клиент инициализирован с параметрами
```

## 6. Настройте продакшен

В [Netlify Dashboard](https://app.netlify.com/):
- **Site settings** → **Environment variables**
- Добавьте:
  - `VITE_NETLIFY_SITE_ID` = ваш Site ID
  - `VITE_NETLIFY_BLOBS_TOKEN` = ваш Token

---

✅ Готово! Данные о прогрессе будут сохраняться в Netlify Blobs

