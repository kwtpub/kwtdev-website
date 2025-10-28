# Быстрый старт - Netlify Blobs

## Важно: Приложение работает БЕЗ настройки

Приложение работает в режиме "только память" без Netlify Blobs. Прогресс не сохраняется между сеансами, но все функции доступны. Чтобы включить облачное хранилище, следуйте инструкциям ниже.

---

## 1. Настройте переменные в Netlify Dashboard

**Важно:** Настройка нужна только для продакшена. Локально работает без настройки.

### Получите параметры:

1. **Site ID:**
   - [Netlify Dashboard](https://app.netlify.com/) → ваш сайт
   - **Site settings** → **General** → **Site details**
   - Скопируйте **Site ID**

2. **API Token:**
   - **User settings** → **Applications** → **Personal access tokens**
   - Создайте новый токен

### Добавьте переменные:

1. Откройте ваш сайт в Netlify Dashboard
2. **Site settings** → **Build & deploy** → **Environment**
3. Добавьте:

```
VITE_NETLIFY_SITE_ID = ваш-site-id
VITE_NETLIFY_BLOBS_TOKEN = ваш-token
```

## 2. Передеплойте сайт

После добавления переменных:

```bash
# В Netlify Dashboard → Deploys → Trigger deploy
# Или сделайте git push
git commit --allow-empty -m "Redeploy with env vars"
git push origin main
```

## 3. Запустите проект локально

```bash
npm run dev
```

Откройте консоль браузера:

**Локально (localhost):**
```
📝 Локальная разработка: работаем в режиме памяти
📝 Работаем без облачного хранилища (только в памяти)
```

**На продакшене (kwt.pub) после настройки:**
```
✅ Используем Netlify Blobs через Edge Function
✅ Загружено N тем из Netlify Blobs
```

---

✅ Готово! Данные о прогрессе теперь сохраняются в Netlify Blobs

