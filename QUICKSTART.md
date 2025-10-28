# Быстрый старт - Netlify Blobs

## Важно: Приложение работает БЕЗ настройки

Приложение работает в режиме "только память" без Netlify Blobs. Прогресс не сохраняется между сеансами, но все функции доступны. Чтобы включить облачное хранилище, следуйте инструкциям ниже.

---

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
- **Site settings** → **Build & deploy** → **Environment variables** → **Add a variable**
- Или используйте существующий токен из **Site settings** → **API keys**

## 3. Заполните `.env.local`

```bash
VITE_NETLIFY_SITE_ID=ваш-site-id
VITE_NETLIFY_BLOBS_TOKEN=ваш-token
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
🎉 Все тесты прошли успешно!
```

## 5. Запустите проект

```bash
npm run dev
```

Откройте консоль браузера, должны увидеть:
```
✅ Netlify Blobs хранилище инициализировано
✅ Загружено N тем из Netlify Blobs
```

Если параметры не настроены:
```
⚠️ Параметры Netlify Blobs не найдены, работаем без сохранения
📝 Работаем без облачного хранилища (только в памяти)
```

## 6. Настройте продакшен

В [Netlify Dashboard](https://app.netlify.com/):
- **Site settings** → **Environment variables**
- Добавьте:
  - `VITE_NETLIFY_SITE_ID` = ваш Site ID
  - `VITE_NETLIFY_BLOBS_TOKEN` = ваш Token

---

✅ Готово! Данные о прогрессе теперь сохраняются в Netlify Blobs

