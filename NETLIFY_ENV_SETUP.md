# Настройка переменных окружения на Netlify (Production)

## Проблема

Приложение работает локально, но на продакшене (kwt.pub) падает с ошибкой CORS, потому что не настроены переменные окружения.

## Решение: Настроить переменные в Netlify Dashboard

### Шаг 1: Откройте Netlify Dashboard

1. Перейдите на [https://app.netlify.com/](https://app.netlify.com/)
2. Войдите в аккаунт
3. Найдите ваш сайт (kwt.pub)

### Шаг 2: Получите Site ID

1. Нажмите на ваш сайт
2. Перейдите в **Site settings** (левое меню)
3. В разделе **General** → **Site details** найдите:
   - **Site ID** (например: `c1fb9773-760d-45d2-afef-b71816c8e0a5`)
   - Скопируйте это значение

### Шаг 3: Получите или создайте Blobs Token

#### Вариант А: Использовать существующий токен
1. В настройках сайта перейдите в **Build & deploy**
2. Откройте **Environment** (или **Environment variables**)
3. Если есть токен `NETLIFY_BLOBS_TOKEN` - скопируйте его значение

#### Вариант Б: Создать новый токен
1. Перейдите в **User settings** (правый верхний угол → кликните на аватар)
2. Откройте **Applications** → **Personal access tokens**
3. Нажмите **New access token**
4. Дайте имя (например: "kwt-blobs-token")
5. Скопируйте сгенерированный токен (показывается только 1 раз!)

### Шаг 4: Добавьте переменные окружения

1. Вернитесь к вашему сайту (kwt.pub)
2. **Site settings** → **Build & deploy** → **Environment**
3. Нажмите **Add a variable** или **Edit variables**
4. Добавьте две переменные:

```
Key: VITE_NETLIFY_SITE_ID
Value: ваш-site-id (например: c1fb9773-760d-45d2-afef-b71816c8e0a5)
Scopes: ✅ Production ✅ Deploy Previews ✅ Branch deploys
```

```
Key: VITE_NETLIFY_BLOBS_TOKEN
Value: ваш-токен
Scopes: ✅ Production ✅ Deploy Previews ✅ Branch deploys
```

5. Нажмите **Save**

### Шаг 5: Передеплойте сайт

После добавления переменных нужно пересобрать проект:

#### Вариант А: Через Netlify Dashboard
1. Перейдите в **Deploys**
2. Нажмите **Trigger deploy** → **Clear cache and deploy site**

#### Вариант Б: Через git push
```bash
git commit --allow-empty -m "Trigger rebuild for env vars"
git push origin main
```

### Шаг 6: Проверьте работу

1. Откройте https://kwt.pub
2. Откройте консоль браузера (F12)
3. Должны увидеть:
```
✅ Netlify Blobs хранилище инициализировано
✅ Загружено N тем из Netlify Blobs
```

Вместо:
```
⚠️ Параметры Netlify Blobs не найдены
```

---

## Важно!

- ⚠️ Используйте префикс `VITE_` - без него переменные не будут доступны в браузере
- ⚠️ После добавления переменных обязательно передеплойте сайт
- ⚠️ Токен показывается только при создании - сохраните его сразу

## Если всё равно не работает

Проверьте в консоли:
```javascript
// Откройте консоль браузера на kwt.pub и выполните:
console.log('SITE_ID:', import.meta.env.VITE_NETLIFY_SITE_ID)
console.log('TOKEN exists:', !!import.meta.env.VITE_NETLIFY_BLOBS_TOKEN)
```

Если видите `undefined` - переменные не настроены или не сделан редеплой.

